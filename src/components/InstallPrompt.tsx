"use client";

import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function InstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [visible, setVisible] = useState(false);
    const [installed, setInstalled] = useState(false);

    // Push Notification State
    const [pushPermission, setPushPermission] = useState<string>("default");

    useEffect(() => {
        // Check if already dismissed within the last 7 days
        const dismissedAt = localStorage.getItem("pwa-install-dismissed-at");
        const legacyDismissed = localStorage.getItem("pwa-install-dismissed");

        // Clear legacy
        if (legacyDismissed) {
            localStorage.removeItem("pwa-install-dismissed");
            localStorage.setItem("pwa-install-dismissed-at", Date.now().toString());
            checkPushPermission();
            return;
        }

        if (dismissedAt) {
            const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
            if (Date.now() - parseInt(dismissedAt, 10) < SEVEN_DAYS_MS) {
                checkPushPermission(); // Still check push in background just in case
                return;
            }
        }

        // Check if already installed (standalone mode)
        if (window.matchMedia("(display-mode: standalone)").matches) {
            checkPushPermission();
            return;
        }

        const handler = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e as BeforeInstallPromptEvent);
            // Brief delay for smoother UX
            setTimeout(() => setVisible(true), 2000);
        };

        window.addEventListener("beforeinstallprompt", handler);
        checkPushPermission(); // Also check push
        return () => window.removeEventListener("beforeinstallprompt", handler);
    }, []);

    const checkPushPermission = () => {
        if ("Notification" in window) {
            setPushPermission(Notification.permission);
            const dismissedAt = localStorage.getItem("pwa-install-dismissed-at");
            const isDismissed = dismissedAt && (Date.now() - parseInt(dismissedAt, 10) < 7 * 24 * 60 * 60 * 1000);

            if (Notification.permission === "default" && !isDismissed) {
                setTimeout(() => setVisible(true), 2000);
            }
        }
    };

    const handleInstall = async () => {
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === "accepted") {
            setInstalled(true);

            // Ask for push if they haven't yet
            if (pushPermission === "default") {
                await requestPushPermission();
            } else {
                setTimeout(() => setVisible(false), 2000);
            }
        }
        setDeferredPrompt(null);
    };

    const requestPushPermission = async () => {
        if (!("Notification" in window)) return;
        try {
            const permission = await Notification.requestPermission();
            setPushPermission(permission);
            if (permission === "granted") {
                await subscribeUserToPush();
            }
            setVisible(false);
        } catch (err) {
            console.error("Error requesting push permission:", err);
            setVisible(false);
        }
    };

    const subscribeUserToPush = async () => {
        if (!("serviceWorker" in navigator) || !("PushManager" in window)) return;
        try {
            const registration = await navigator.serviceWorker.ready;
            const applicationServerKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || "";

            const existingSubscription = await registration.pushManager.getSubscription();
            if (existingSubscription) {
                await sendSubscriptionToServer(existingSubscription);
                return;
            }

            const subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey,
            });

            await sendSubscriptionToServer(subscription);
        } catch (err) {
            console.error("Failed to subscribe the user:", err);
        }
    };

    const sendSubscriptionToServer = async (subscription: PushSubscription) => {
        try {
            await fetch("/api/web-push/subscribe", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ subscription }),
            });
        } catch (err) {
            console.error("Failed to send push obj to server:", err);
        }
    };

    const handleDismiss = () => {
        setVisible(false);
        localStorage.setItem("pwa-install-dismissed-at", Date.now().toString());
    };

    if (!visible) return null;

    // Determine what to show
    const showInstall = !!deferredPrompt && !installed;
    const showPush = pushPermission === "default";

    if (!showInstall && !showPush) return null;

    return (
        <div style={{
            position: "fixed", bottom: "1.5rem", left: "50%", transform: "translateX(-50%)",
            zIndex: 1000, width: "calc(100% - 2rem)", maxWidth: "360px",
            background: "rgba(10,22,40,0.92)", backdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.08)", borderRadius: "1rem",
            padding: "1rem", boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
            animation: "slideUp 0.6s cubic-bezier(0.16,1,0.3,1)",
        }}>
            {installed && !showPush ? (
                <div style={{ textAlign: "center", color: "#10b981", fontWeight: 600, fontSize: "0.85rem" }}>
                    ✅ App instalada correctamente
                </div>
            ) : (
                <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", flexDirection: "column" }}>
                    <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", width: "100%" }}>
                        <div style={{
                            width: "38px", height: "38px", borderRadius: "0.5rem", flexShrink: 0,
                            background: "linear-gradient(135deg, #2563eb, #3b82f6)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: "1.2rem",
                        }}>
                            🚀
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ color: "white", fontWeight: 600, fontSize: "0.9rem", fontFamily: "var(--font-heading)" }}>
                                App Doctor Foam
                            </div>
                            <div style={{ color: "#94a3b8", fontSize: "0.75rem", marginTop: "0.1rem", lineHeight: 1.3 }}>
                                Más rápida y con alertas instantáneas.
                            </div>
                        </div>
                        <button
                            onClick={handleDismiss}
                            style={{
                                background: "none", border: "none", color: "#64748b", flexShrink: 0,
                                cursor: "pointer", fontSize: "0.75rem", padding: "0.2rem", alignSelf: "flex-start"
                            }}
                        >
                            ✕
                        </button>
                    </div>

                    <div style={{ display: "flex", gap: "0.5rem", width: "100%", justifyContent: "flex-end" }}>
                        {showPush && !showInstall && (
                            <button
                                onClick={requestPushPermission}
                                style={{
                                    background: "rgba(16, 185, 129, 0.15)",
                                    border: "1px solid rgba(16, 185, 129, 0.3)", borderRadius: "0.4rem", width: "100%",
                                    color: "#10b981", fontWeight: 600, fontSize: "0.75rem",
                                    padding: "0.5rem 1rem", cursor: "pointer", transition: "all 0.2s"
                                }}
                            >
                                Activar Notificaciones
                            </button>
                        )}
                        {showInstall && (
                            <button
                                onClick={handleInstall}
                                style={{
                                    background: "linear-gradient(135deg, #2563eb, #3b82f6)",
                                    border: "none", borderRadius: "0.4rem", width: "100%",
                                    color: "white", fontWeight: 600, fontSize: "0.75rem",
                                    padding: "0.5rem 1rem", cursor: "pointer", transition: "all 0.2s"
                                }}
                            >
                                Instalar App
                            </button>
                        )}
                    </div>
                </div>
            )}

            <style>{`
                @keyframes slideUp {
                    from { transform: translateX(-50%) translateY(150%); opacity: 0; }
                    to { transform: translateX(-50%) translateY(0); opacity: 1; }
                }
            `}</style>
        </div>
    );
}
