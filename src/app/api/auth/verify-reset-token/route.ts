import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
    try {
        const { token, email, newPassword } = await request.json();

        if (!token || !email || !newPassword) {
            return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
        }

        if (newPassword.length < 6) {
            return NextResponse.json({ error: "La contraseña debe tener al menos 6 caracteres" }, { status: 400 });
        }

        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!
        );

        // Verify token via SQL RPC
        const { data: userId, error: verifyError } = await supabase.rpc("verify_reset_token", {
            user_email: email,
            token: token,
        });

        if (!userId || verifyError) {
            console.error("[verify-reset] Token invalid or expired:", verifyError?.message);
            return NextResponse.json({ error: "Enlace inválido o expirado" }, { status: 400 });
        }

        console.log("[verify-reset] Token valid for user:", userId);

        // Hash the new password (Supabase uses bcrypt)
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update password via SQL RPC
        const { data: updated, error: updateError } = await supabase.rpc("update_user_password", {
            user_email: email,
            new_password_hash: hashedPassword,
        });

        if (updateError || !updated) {
            console.error("[verify-reset] Failed to update password:", updateError?.message);
            return NextResponse.json({ error: "Error al actualizar la contraseña" }, { status: 500 });
        }

        console.log("[verify-reset] ✅ Password updated successfully for:", email);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("[verify-reset] Unexpected error:", error);
        return NextResponse.json({ error: "Error interno" }, { status: 500 });
    }
}
