/**
 * K8 brand mark — orange tile with the black "K8" wordmark and its signature
 * diagonal split. Rendered inline (crisp at any size) and mirrored in
 * /public/icon.svg for the favicon. Decorative SVG is aria-hidden; the
 * accessible name comes from the wrapping button in <TopNav />.
 */
export default function Logo() {
  return (
    <span className="flex items-center gap-2.5">
      <svg
        width="40"
        height="40"
        viewBox="0 0 100 100"
        fill="none"
        aria-hidden="true"
        focusable="false"
        className="shrink-0"
      >
        <rect width="100" height="100" rx="15" fill="#D8682B" />
        {/* K */}
        <path
          d="M27 34 h7 v11 l13 -11 h10 l-16 14 l17 19 h-10 l-13 -15 v15 h-7 Z"
          fill="#0F0F0F"
        />
        {/* 8 */}
        <circle cx="71" cy="45" r="9" fill="#0F0F0F" />
        <circle cx="71" cy="58" r="10" fill="#0F0F0F" />
        <circle cx="71" cy="45" r="3.6" fill="#D8682B" />
        <circle cx="71" cy="58" r="4.4" fill="#D8682B" />
        {/* signature diagonal split */}
        <path
          d="M62 67 L80 38"
          stroke="#D8682B"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
      </svg>

      <span className="hidden flex-col leading-none sm:flex">
        <span
          className="text-sm font-black tracking-wide text-white"
          style={{ fontFamily: "var(--font-display)" }}
        >
          K8
        </span>
        <span
          className="text-[7.5px] uppercase tracking-[0.3em]"
          style={{ color: "rgba(209,107,40,0.85)" }}
        >
          Architecture Studio
        </span>
      </span>
    </span>
  );
}
