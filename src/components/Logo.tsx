"use client";

/**
 * Official Doctor Foam logo — bubble cluster SVG + wordmark.
 * Shared across navbar, login, sidebar, etc.
 */
export default function Logo({
    className = "",
    size = "md",
}: {
    className?: string;
    size?: "sm" | "md" | "lg";
}) {
    const sizes = {
        sm: { svg: "1.8rem", font: "1rem" },
        md: { svg: "2.6rem", font: "1.3rem" },
        lg: { svg: "3.2rem", font: "1.8rem" },
    };
    const s = sizes[size];

    return (
        <span className={className} style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem" }}>
            <svg
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
                style={{ height: s.svg, width: s.svg, flexShrink: 0 }}
                aria-label="Doctor Foam"
                role="img"
            >
                <defs>
                    <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3182ce" />
                        <stop offset="100%" stopColor="#63b3ed" />
                    </linearGradient>
                </defs>
                {/* Main bubble */}
                <circle cx="40" cy="45" r="26" fill="url(#logo-grad)" opacity="0.08" />
                <circle cx="40" cy="45" r="26" fill="none" stroke="url(#logo-grad)" strokeWidth="2" />
                {/* Medium bubble — top right */}
                <circle cx="76" cy="30" r="14" fill="url(#logo-grad)" opacity="0.06" />
                <circle cx="76" cy="30" r="14" fill="none" stroke="url(#logo-grad)" strokeWidth="1.5" opacity="0.75" />
                {/* Small bubble — bottom right */}
                <circle cx="78" cy="68" r="9" fill="url(#logo-grad)" opacity="0.12" />
                {/* Tiny bubble — top left */}
                <circle cx="20" cy="18" r="6" fill="url(#logo-grad)" opacity="0.1" />
            </svg>

            {/* Wordmark */}
            <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: s.font, lineHeight: 1.1, letterSpacing: "-0.01em" }}>
                <span style={{ color: "#ffffff", WebkitTextStroke: "1.5px #3182ce", paintOrder: "stroke fill" }}>DOCTOR</span>{" "}
                <span className="gradient-text">FOAM</span>
            </span>
        </span>
    );
}
