"use client";

import { supabase } from "@/lib/supabase";
import { useCallback, useEffect, useRef, useState } from "react";

type Conversation = {
    id: string;
    customer_name: string;
    guest_name?: string;
    customer_email?: string;
    guest_email?: string;
    last_message_at: string;
    unread_count: number;
    status?: string;
    type: "client" | "guest";
};

type Message = {
    id: string;
    content: string;
    sender_role: "admin" | "customer" | "guest";
    created_at: string;
};

export default function AdminChatFAB() {
    const [open, setOpen] = useState(false);
    const [session, setSession] = useState<{ access_token: string } | null>(null);
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [selectedConv, setSelectedConv] = useState<Conversation | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMsg, setNewMsg] = useState("");
    const [sending, setSending] = useState(false);
    const [loadingMsgs, setLoadingMsgs] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => {
            if (data.session) setSession(data.session);
        });
    }, []);

    const fetchConversations = useCallback(async () => {
        if (!session) return;
        try {
            const [clientRes, guestRes] = await Promise.all([
                fetch("/api/admin/chat", { headers: { Authorization: `Bearer ${session.access_token}` } }),
                fetch("/api/admin/guest-chat", { headers: { Authorization: `Bearer ${session.access_token}` } }),
            ]);
            const clients = clientRes.ok ? (await clientRes.json()).conversations || [] : [];
            const guests = guestRes.ok ? (await guestRes.json()).conversations || [] : [];

            const all: Conversation[] = [
                ...clients.map((c: Conversation) => ({ ...c, type: "client" as const })),
                ...guests.map((g: Conversation) => ({ ...g, type: "guest" as const })),
            ].sort((a, b) => new Date(b.last_message_at).getTime() - new Date(a.last_message_at).getTime());

            setConversations(all);
        } catch { /* silent */ }
    }, [session]);

    useEffect(() => {
        if (session && open) {
            fetchConversations();
            const i = setInterval(fetchConversations, 15000);
            return () => clearInterval(i);
        }
    }, [session, open, fetchConversations]);

    // Also poll for unread count when closed
    useEffect(() => {
        if (session && !open) {
            fetchConversations();
            const i = setInterval(fetchConversations, 30000);
            return () => clearInterval(i);
        }
    }, [session, open, fetchConversations]);

    const totalUnread = conversations.reduce((sum, c) => sum + (c.unread_count || 0), 0);

    const loadMessages = async (conv: Conversation) => {
        if (!session) return;
        setSelectedConv(conv);
        setLoadingMsgs(true);
        try {
            const endpoint = conv.type === "guest"
                ? `/api/admin/guest-chat?conversation_id=${conv.id}`
                : `/api/chat?conversation_id=${conv.id}`;
            const res = await fetch(endpoint, {
                headers: { Authorization: `Bearer ${session.access_token}` },
            });
            if (res.ok) {
                const data = await res.json();
                setMessages(data.messages || []);
            }
            // Mark as read
            if (conv.type === "guest") {
                await fetch("/api/admin/guest-chat", {
                    method: "PATCH",
                    headers: { Authorization: `Bearer ${session.access_token}`, "Content-Type": "application/json" },
                    body: JSON.stringify({ conversation_id: conv.id }),
                });
            } else {
                await fetch("/api/chat", {
                    method: "PATCH",
                    headers: { Authorization: `Bearer ${session.access_token}`, "Content-Type": "application/json" },
                    body: JSON.stringify({ conversation_id: conv.id, reader_role: "admin" }),
                });
            }
            fetchConversations();
        } catch { /* silent */ }
        setLoadingMsgs(false);
        setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    };

    const sendMessage = async () => {
        if (!session || !selectedConv || !newMsg.trim()) return;
        setSending(true);
        try {
            const endpoint = selectedConv.type === "guest" ? "/api/admin/guest-chat" : "/api/chat";
            const body = selectedConv.type === "guest"
                ? { conversation_id: selectedConv.id, content: newMsg, sender_role: "admin" }
                : { conversation_id: selectedConv.id, content: newMsg };

            const res = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${session.access_token}` },
                body: JSON.stringify(body),
            });
            if (res.ok) {
                setNewMsg("");
                loadMessages(selectedConv);
            }
        } catch { /* silent */ }
        setSending(false);
    };

    const getName = (c: Conversation) => c.type === "guest" ? (c.guest_name || c.guest_email || "Invitado") : (c.customer_name || c.customer_email || "Cliente");
    const formatTime = (iso: string) => {
        const d = new Date(iso);
        const now = new Date();
        if (d.toDateString() === now.toDateString()) return d.toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" });
        return d.toLocaleDateString("es-MX", { day: "numeric", month: "short" });
    };

    return (
        <>
            {/* FAB Button */}
            <button
                onClick={() => { setOpen(!open); if (!open) setSelectedConv(null); }}
                style={{
                    position: "fixed", bottom: "1.5rem", right: "1.5rem", zIndex: 300,
                    width: "56px", height: "56px", borderRadius: "50%",
                    background: "linear-gradient(135deg, #2563eb, #7c3aed)",
                    border: "none", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: "0 4px 20px rgba(37,99,235,0.4)",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    transform: open ? "rotate(45deg)" : "rotate(0deg)",
                }}
            >
                <span style={{ fontSize: "1.5rem", color: "white" }}>{open ? "✕" : "💬"}</span>
                {!open && totalUnread > 0 && (
                    <span style={{
                        position: "absolute", top: "-4px", right: "-4px",
                        background: "#ef4444", color: "white",
                        fontSize: "0.65rem", fontWeight: 700,
                        width: "20px", height: "20px", borderRadius: "50%",
                        display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                        {totalUnread > 9 ? "9+" : totalUnread}
                    </span>
                )}
            </button>

            {/* Chat Panel */}
            {open && (
                <div style={{
                    position: "fixed", bottom: "5rem", right: "1.5rem", zIndex: 299,
                    width: "380px", maxHeight: "520px",
                    borderRadius: "1rem", overflow: "hidden",
                    background: "rgba(10,22,40,0.98)", backdropFilter: "blur(20px)",
                    border: "1px solid rgba(96,165,250,0.15)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                    display: "flex", flexDirection: "column",
                }}>
                    {/* Header */}
                    <div style={{
                        padding: "0.75rem 1rem",
                        background: "rgba(15,34,64,0.6)", borderBottom: "1px solid rgba(96,165,250,0.1)",
                        display: "flex", alignItems: "center", gap: "0.5rem",
                    }}>
                        {selectedConv && (
                            <button onClick={() => setSelectedConv(null)} style={{
                                background: "none", border: "none", color: "#60a5fa", cursor: "pointer", fontSize: "1rem", padding: "0 0.25rem",
                            }}>←</button>
                        )}
                        <span style={{ color: "white", fontWeight: 700, fontSize: "0.9rem", fontFamily: "var(--font-heading)", flex: 1 }}>
                            {selectedConv ? getName(selectedConv) : "💬 Chats"}
                        </span>
                        {selectedConv && (
                            <span style={{
                                fontSize: "0.6rem", padding: "0.1rem 0.35rem", borderRadius: "0.25rem",
                                background: selectedConv.type === "guest" ? "rgba(245,158,11,0.15)" : "rgba(59,130,246,0.15)",
                                color: selectedConv.type === "guest" ? "#fbbf24" : "#60a5fa", fontWeight: 700,
                            }}>
                                {selectedConv.type === "guest" ? "Invitado" : "Cliente"}
                            </span>
                        )}
                    </div>

                    {!selectedConv ? (
                        /* Conversation List */
                        <div style={{ flex: 1, overflowY: "auto", maxHeight: "440px" }}>
                            {conversations.length === 0 ? (
                                <div style={{ padding: "2rem", textAlign: "center", color: "#64748b", fontSize: "0.85rem" }}>
                                    No hay conversaciones activas
                                </div>
                            ) : (
                                conversations.map(c => (
                                    <button
                                        key={`${c.type}-${c.id}`}
                                        onClick={() => loadMessages(c)}
                                        style={{
                                            width: "100%", padding: "0.75rem 1rem", textAlign: "left",
                                            background: "transparent", border: "none", borderBottom: "1px solid rgba(96,165,250,0.06)",
                                            cursor: "pointer", display: "flex", alignItems: "center", gap: "0.75rem",
                                            transition: "background 0.15s",
                                        }}
                                    >
                                        <div style={{
                                            width: "32px", height: "32px", borderRadius: "50%", flexShrink: 0,
                                            background: c.type === "guest" ? "rgba(245,158,11,0.15)" : "rgba(59,130,246,0.15)",
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            color: c.type === "guest" ? "#fbbf24" : "#60a5fa",
                                            fontWeight: 700, fontSize: "0.8rem",
                                        }}>
                                            {getName(c)[0].toUpperCase()}
                                        </div>
                                        <div style={{ flex: 1, overflow: "hidden" }}>
                                            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                                                <span style={{
                                                    color: "white", fontSize: "0.82rem", fontWeight: 600,
                                                    textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden"
                                                }}>
                                                    {getName(c)}
                                                </span>
                                                <span style={{
                                                    fontSize: "0.55rem", padding: "0.05rem 0.25rem", borderRadius: "0.2rem",
                                                    background: c.type === "guest" ? "rgba(245,158,11,0.12)" : "rgba(59,130,246,0.12)",
                                                    color: c.type === "guest" ? "#fbbf24" : "#60a5fa",
                                                    fontWeight: 600, flexShrink: 0,
                                                }}>
                                                    {c.type === "guest" ? "INV" : "CLI"}
                                                </span>
                                            </div>
                                            <span style={{ color: "#475569", fontSize: "0.7rem" }}>{formatTime(c.last_message_at)}</span>
                                        </div>
                                        {c.unread_count > 0 && (
                                            <span style={{
                                                background: "#ef4444", color: "white",
                                                fontSize: "0.6rem", fontWeight: 700,
                                                width: "18px", height: "18px", borderRadius: "50%",
                                                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                                            }}>
                                                {c.unread_count}
                                            </span>
                                        )}
                                    </button>
                                ))
                            )}
                        </div>
                    ) : (
                        /* Messages View */
                        <>
                            <div style={{ flex: 1, overflowY: "auto", padding: "0.75rem", maxHeight: "360px" }}>
                                {loadingMsgs ? (
                                    <div style={{ textAlign: "center", padding: "2rem", color: "#64748b" }}>Cargando...</div>
                                ) : messages.length === 0 ? (
                                    <div style={{ textAlign: "center", padding: "2rem", color: "#64748b", fontSize: "0.85rem" }}>Sin mensajes</div>
                                ) : (
                                    messages.map(m => {
                                        const isAdmin = m.sender_role === "admin";
                                        return (
                                            <div key={m.id} style={{
                                                display: "flex", justifyContent: isAdmin ? "flex-end" : "flex-start",
                                                marginBottom: "0.5rem",
                                            }}>
                                                <div style={{
                                                    maxWidth: "80%", padding: "0.5rem 0.75rem", borderRadius: "0.75rem",
                                                    background: isAdmin ? "rgba(37,99,235,0.2)" : "rgba(15,34,64,0.5)",
                                                    border: `1px solid ${isAdmin ? "rgba(37,99,235,0.25)" : "rgba(96,165,250,0.08)"}`,
                                                }}>
                                                    <p style={{ color: "white", fontSize: "0.82rem", margin: "0 0 0.15rem", wordBreak: "break-word" }}>
                                                        {m.content}
                                                    </p>
                                                    <span style={{ color: "#475569", fontSize: "0.6rem" }}>
                                                        {new Date(m.created_at).toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" })}
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                                <div ref={messagesEndRef} />
                            </div>
                            {/* Input */}
                            <div style={{
                                padding: "0.5rem 0.75rem", borderTop: "1px solid rgba(96,165,250,0.1)",
                                display: "flex", gap: "0.5rem",
                            }}>
                                <input
                                    value={newMsg}
                                    onChange={e => setNewMsg(e.target.value)}
                                    onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                                    placeholder="Escribe un mensaje..."
                                    style={{
                                        flex: 1, padding: "0.5rem 0.75rem", borderRadius: "0.5rem",
                                        border: "1px solid rgba(96,165,250,0.15)", background: "rgba(10,22,40,0.6)",
                                        color: "white", fontSize: "0.82rem", outline: "none",
                                    }}
                                />
                                <button onClick={sendMessage} disabled={!newMsg.trim() || sending} style={{
                                    padding: "0.5rem 0.75rem", borderRadius: "0.5rem",
                                    background: newMsg.trim() ? "rgba(37,99,235,0.3)" : "rgba(96,165,250,0.05)",
                                    border: `1px solid ${newMsg.trim() ? "rgba(37,99,235,0.4)" : "rgba(96,165,250,0.1)"}`,
                                    color: newMsg.trim() ? "#60a5fa" : "#475569",
                                    cursor: newMsg.trim() ? "pointer" : "default",
                                    fontSize: "0.85rem", fontWeight: 600,
                                }}>
                                    {sending ? "..." : "→"}
                                </button>
                            </div>
                        </>
                    )}
                </div>
            )}
        </>
    );
}
