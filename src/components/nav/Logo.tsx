/**
 * K8 brand mark — an arch/doorway emblem (echoing the walkthrough's portal
 * motif) paired with the Playfair wordmark. Decorative SVG is aria-hidden;
 * the accessible name comes from the wrapping link/button in <TopNav />.
 */
export default function Logo() {
  return (
    <span className="flex items-center gap-2">
      <svg
        width="24"
        height="24"
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M5 29 V15 a11 11 0 0 1 22 0 V29"
          stroke="#D16B28"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M16 29 V6"
          stroke="#D16B28"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.45"
        />
      </svg>
      <span
        className="text-2xl font-black tracking-tight"
        style={{
          fontFamily: "var(--font-display)",
          color: "#fff",
          textShadow: "0 2px 12px rgba(0,0,0,0.9)",
        }}
      >
        K8<span style={{ color: "#D16B28" }}>.</span>
      </span>
    </span>
  );
}
