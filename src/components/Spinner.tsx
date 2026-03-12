
export default function Spinner({ size = 16, color = "currentColor", className = "" }: { size?: number; color?: string; className?: string }) {
    return (
        <svg
            className={`spinner-rotate ${className}`}
            width={size} height={size} viewBox="0 0 24 24"
            fill="none" xmlns="http://www.w3.org/2000/svg"
            style={{ display: "inline-block", verticalAlign: "middle" }}
        >
            <path d="M12 2V6M12 18V22M6 12H2M22 12H18M19.0711 19.0711L16.2426 16.2426M19.0711 4.92893L16.2426 7.75736M4.92893 19.0711L7.75736 16.2426M4.92893 4.92893L7.75736 7.75736" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}
