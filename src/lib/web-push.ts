import webPush from "web-push";
import prisma from "./prisma";

const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || "";
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY || "";
const VAPID_SUBJECT = "mailto:contacto@doctorfoam.mx"; // Best practice is a mailto link

// Only configure web-push if keys are present (prevents crashing on dev machines without env vars)
if (VAPID_PUBLIC_KEY && VAPID_PRIVATE_KEY) {
    webPush.setVapidDetails(
        VAPID_SUBJECT,
        VAPID_PUBLIC_KEY,
        VAPID_PRIVATE_KEY
    );
}

/**
 * Sends a Push Notification to a specific user using their stored subscriptions in Prisma.
 */
export async function sendPushNotification(
    userId: string,
    payload: { title: string; body: string; url?: string; icon?: string; badge?: string }
) {
    if (!VAPID_PUBLIC_KEY || !VAPID_PRIVATE_KEY) {
        console.warn("VAPID Keys not set. Cannot send push notifications.");
        return;
    }

    try {
        // Fetch all active subscriptions for this user
        const subscriptions = await prisma.pushSubscription.findMany({
            where: { userId: userId }
        });

        if (!subscriptions || subscriptions.length === 0) {
            return; // No devices registered
        }

        const stringifiedPayload = JSON.stringify({
            title: payload.title,
            body: payload.body,
            url: payload.url || "/",
            icon: payload.icon || "/icon-192.png",
            badge: payload.badge || "/icon-192.png"
        });

        const promises = subscriptions.map(async (row: { id: string; endpoint: string; subscriptionData: any }) => {
            const pushSubscription = {
                endpoint: row.endpoint,
                keys: {
                    p256dh: row.subscriptionData?.keys?.p256dh || "",
                    auth: row.subscriptionData?.keys?.auth || "",
                },
            };
            try {
                // @ts-ignore
                await webPush.sendNotification(pushSubscription, stringifiedPayload);
            } catch (err: any) {
                // If standard 410 or 404 error, the subscription has expired or been revoked
                if (err.statusCode === 410 || err.statusCode === 404) {
                    console.log(`Subscription deleted (status: ${err.statusCode}) for user ${userId}`);
                    await prisma.pushSubscription.delete({
                        where: { id: row.id }
                    });
                } else {
                    console.error("Error sending push to a specific subscription:", err);
                }
            }
        });

        await Promise.all(promises);
    } catch (err) {
        console.error("Fatal error inside sendPushNotification:", err);
    }
}

/**
 * Sends a push notification to ALL users with the "admin" role.
 */
export async function sendPushToAdmins(
    payload: { title: string; body: string; url?: string; icon?: string; badge?: string }
) {
    if (!VAPID_PUBLIC_KEY || !VAPID_PRIVATE_KEY) {
        return;
    }

    try {
        const adminProfiles = await prisma.user.findMany({
            where: { role: "admin" },
            select: { id: true }
        });

        if (!adminProfiles) {
            console.error("Could not fetch admins for push notification");
            return;
        }

        const promises = adminProfiles.map((admin: { id: string }) =>
            sendPushNotification(admin.id, payload)
        );

        await Promise.all(promises);

    } catch (err) {
        console.error("Fatal error broadcasting to admins:", err);
    }
}
