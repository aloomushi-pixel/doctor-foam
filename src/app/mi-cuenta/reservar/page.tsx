"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ReservarMiCuenta() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch("/api/customer/profile");
                if (!res.ok) {
                    router.push("/reservar");
                    return;
                }
                const data = await res.json();
                const profile = data.profile;
                if (!profile) {
                    router.push("/reservar");
                    return;
                }

                const params = new URLSearchParams();
                if (profile.full_name) params.set("nombre", profile.full_name);
                if (profile.email) params.set("email", profile.email);
                if (profile.phone) params.set("telefono", profile.phone);
                if (profile.address) params.set("direccion", profile.address);
                if (profile.vehicle_type) params.set("vehiculo", profile.vehicle_type);

                const qs = params.toString();
                router.push(`/reservar${qs ? `?${qs}` : ""}`);
            } catch (err) {
                console.error("Failed to load profile", err);
                router.push("/reservar");
            }
        })();
    }, [router]);

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "40vh" }}>
            {loading && (
                <div style={{ textAlign: "center", color: "#94a3b8" }}>
                    <div className="spinner" style={{ margin: "0 auto 1rem" }} />
                    <p>Cargando tu perfil para reservar...</p>
                </div>
            )}
        </div>
    );
}
