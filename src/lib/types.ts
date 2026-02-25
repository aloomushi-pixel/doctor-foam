/* ─── Shared Types for Doctor Foam ─── */

export type Booking = {
    id: string;
    service_date: string;
    package_name: string;
    vehicle_size: string;
    total_amount: number;
    customer_name: string;
    customer_email: string;
    customer_phone: string;
    address: string;
    vehicle_info: string;
    payment_status: string;
    source: string;
    notes: string;
    created_at: string;
    customer_id?: string;
};

export type BlockedDate = {
    id: string;
    blocked_date: string;
    reason: string;
};

export type Conversation = {
    id: string;
    customer_id?: string;
    customer_name: string;
    customer_email: string;
    last_message_at: string;
    unread_count: number;
    status?: string;
    guest_name?: string;
    guest_email?: string;
};

export type Message = {
    id: string;
    conversation_id: string;
    sender_id?: string;
    sender_role: "admin" | "customer" | "guest";
    content: string;
    created_at: string;
    read: boolean;
};

export type Invitation = {
    id: string;
    email: string;
    role: string;
    status: string;
    created_at: string;
    expires_at: string;
};

export type User = {
    id: string;
    email: string;
    name: string;
    phone: string;
    role: string;
    display_role?: string;
    profit_share_pct?: number;
    created_at: string;
    last_sign_in: string | null;
};
