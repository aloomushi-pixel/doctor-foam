"use client";

import UnifiedDashboardLayout from "@/components/UnifiedDashboardLayout";

export default function PortalLayoutWrapper({ children }: { children: React.ReactNode }) {
    return (
        <UnifiedDashboardLayout requiredRole="customer">
            {children}
        </UnifiedDashboardLayout>
    );
}
