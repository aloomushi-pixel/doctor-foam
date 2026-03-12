import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    // `withAuth` augments your `Request` with the user's token.
    function middleware(req) {
        const token = req.nextauth.token;
        const path = req.nextUrl.pathname;

        // RBAC: If a customer tries to access the admin portal, redirect them.
        if (path.startsWith("/admin") && token?.role === "customer") {
            return NextResponse.redirect(new URL("/mi-cuenta", req.url));
        }

        // RBAC: If a corporate non-customer tries to access customer portal, redirect.
        if (path.startsWith("/mi-cuenta") && token?.role !== "customer") {
            return NextResponse.redirect(new URL("/admin", req.url));
        }

        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
        pages: {
            signIn: "/login",
        },
    }
);

export const config = {
    matcher: [
        "/admin/:path*",
        "/mi-cuenta/:path*",
        // Add any other restricted routes here
    ],
};
