import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function verifyAdmin(request: NextRequest) {
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) return false;
    const token = authHeader.split(" ")[1];
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        { global: { headers: { Authorization: `Bearer ${token}` } } }
    );
    const { data: { user } } = await supabase.auth.getUser(token);
    if (!user) return false;
    return user.app_metadata?.role === "admin";
}

export async function GET(request: NextRequest) {
    const isAdmin = await verifyAdmin(request);
    if (!isAdmin) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const role = searchParams.get("role") || "all";

    try {
        // Get all users from auth
        const { data: { users }, error } = await supabaseAdmin.auth.admin.listUsers({ perPage: 1000 });
        if (error) throw error;

        let filtered = users || [];

        if (role === "admin") {
            filtered = filtered.filter(u => u.app_metadata?.role === "admin");
        } else if (role === "customer") {
            filtered = filtered.filter(u => u.app_metadata?.role !== "admin");
        }

        // Get customer profiles
        const { data: profiles } = await supabaseAdmin
            .from("customer_profiles")
            .select("*");

        const profileMap = new Map((profiles || []).map(p => [p.id, p]));

        const result = filtered.map(u => ({
            id: u.id,
            email: u.email,
            name: u.user_metadata?.name || u.user_metadata?.full_name || profileMap.get(u.id)?.full_name || "—",
            phone: profileMap.get(u.id)?.phone || u.phone || "—",
            role: u.app_metadata?.role || "customer",
            created_at: u.created_at,
            last_sign_in: u.last_sign_in_at,
        }));

        return NextResponse.json({ users: result });
    } catch (err) {
        console.error("[admin/users] Error:", err);
        return NextResponse.json({ error: "Error al obtener usuarios" }, { status: 500 });
    }
}
