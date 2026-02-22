import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    if (!email) {
      return NextResponse.json({ error: "Email requerido" }, { status: 400 });
    }

    console.log("[reset-password] Processing reset for:", email);

    const supabase = createServerSupabase();

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/restablecer-password`,
    });

    if (error) {
      console.error("[reset-password] Supabase resetPasswordForEmail error:", error.message);
      return NextResponse.json({ error: "Error al enviar el correo" }, { status: 500 });
    }

    console.log("[reset-password] Reset email sent successfully for:", email);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[reset-password] Unexpected error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
