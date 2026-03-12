import prisma from "@/lib/prisma";
import webpush from "web-push";

// Configure VAPID
const VAPID_PUBLIC = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!;
const VAPID_PRIVATE = process.env.VAPID_PRIVATE_KEY!;
const VAPID_SUBJECT = process.env.VAPID_SUBJECT || "mailto:info@drfoam.com.mx";

if (VAPID_PUBLIC && VAPID_PRIVATE) {
    webpush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC, VAPID_PRIVATE);
}

interface PushPayload {
    title: string;
    body: string;
    url?: string;
    icon?: string;
}

/**
 * Send push notification to all subscribed admin users.
 * Silently cleans up expired/invalid subscriptions.
 */
export async function sendPushToAdmins(payload: PushPayload): Promise<void> {
    if (!VAPID_PUBLIC || !VAPID_PRIVATE) {
        console.warn("VAPID keys not configured, skipping push notifications");
        return;
    }

    // Get all push subscriptions for admins
    const subscriptions = await prisma.pushSubscription.findMany({
        where: {
            user: {
                role: "admin"
            }
        }
    });

    if (!subscriptions.length) {
        return;
    }

    const notification = JSON.stringify({
        title: payload.title,
        body: payload.body,
        url: payload.url || "/admin",
        icon: payload.icon || "/icon-192.png",
        badge: "/icon-192.png",
    });

    const expiredIds: string[] = [];

    await Promise.allSettled(
        subscriptions.map(async (sub: { id: string; endpoint: string; subscriptionData: any }) => {
            const subData = sub.subscriptionData as { keys?: { p256dh?: string; auth?: string } };
            const pushSubscription = {
                endpoint: sub.endpoint,
                keys: {
                    p256dh: subData?.keys?.p256dh || "",
                    auth: subData?.keys?.auth || "",
                },
            };

            try {
                // @ts-ignore - web-push types can be tricky
                await webpush.sendNotification(pushSubscription, notification);
            } catch (err: unknown) {
                const pushErr = err as { statusCode?: number };
                // 410 Gone or 404 = subscription expired
                if (pushErr.statusCode === 410 || pushErr.statusCode === 404) {
                    expiredIds.push(sub.id);
                } else {
                    console.error("Push send error:", err);
                }
            }
        })
    );

    // Clean up expired subscriptions
    if (expiredIds.length > 0) {
        await prisma.pushSubscription.deleteMany({
            where: {
                id: { in: expiredIds }
            }
        });
    }
}
