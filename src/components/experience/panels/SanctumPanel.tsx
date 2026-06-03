import PanelShell from "./PanelShell";

const FOOTER_ITEMS = [
  { label: "Studio", value: "Hyderabad, Telangana" },
  { label: "Phone", value: "+91 83418 54527" },
  { label: "Hours", value: "Mon–Fri 10–18 IST" },
];

export default function SanctumPanel() {
  return (
    <PanelShell id="panel-4" showDivider={false}>
      <span className="panel-content chapter-marker mb-5 sm:mb-6">
        The Inner Sanctum
      </span>

      <h1
        className="panel-content font-black"
        style={{
          fontSize: "clamp(3rem, 8vw, 8rem)",
          fontFamily: "var(--font-display)",
          lineHeight: 0.9,
          textShadow: "0 4px 50px rgba(0,0,0,0.9)",
        }}
      >
        Built For
        <br />
        <span style={{ color: "#D16B28" }}>Eternity</span>
      </h1>

      <div className="panel-content ornament-line mt-8 w-32" />

      <p
        className="panel-content mt-6 max-w-lg text-base italic leading-relaxed sm:mt-7 sm:text-lg"
        style={{
          color: "rgba(246,232,216,0.8)",
          textShadow: "0 2px 15px rgba(0,0,0,0.7)",
        }}
      >
        &ldquo;Architecture should speak of its time and place,
        <br />
        but yearn for timelessness.&rdquo;
      </p>

      <p
        className="panel-content mt-1 text-[10px] uppercase tracking-[0.4em]"
        style={{ color: "rgba(209,107,40,0.5)" }}
      >
        — Frank Gehry
      </p>

      <div className="panel-content mt-10 flex flex-col items-center gap-4 sm:mt-12">
        <a
          href="mailto:nikhithajinnapally@k8architecturestudio.com"
          className="group relative overflow-hidden rounded-full px-8 py-3.5 text-white transition-all duration-500 sm:px-10"
          style={{
            border: "1px solid rgba(209,107,40,0.4)",
            background: "rgba(209,107,40,0.08)",
            backdropFilter: "blur(20px)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#D16B28";
            e.currentTarget.style.boxShadow = "0 0 50px rgba(209,107,40,0.35)";
            e.currentTarget.style.background = "rgba(209,107,40,0.18)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(209,107,40,0.4)";
            e.currentTarget.style.boxShadow = "none";
            e.currentTarget.style.background = "rgba(209,107,40,0.08)";
          }}
        >
          <span className="relative z-10 text-xs font-medium uppercase tracking-[0.3em] sm:tracking-[0.35em]">
            Begin Your Commission
          </span>
        </a>
        <span
          className="break-all text-center text-[9px] uppercase tracking-[0.35em] sm:tracking-[0.45em]"
          style={{ color: "rgba(255,255,255,0.25)" }}
        >
          nikhithajinnapally@k8architecturestudio.com
        </span>
      </div>

      <div className="panel-content mt-10 grid max-w-[500px] grid-cols-3 gap-6 text-center sm:mt-12 sm:gap-8">
        {FOOTER_ITEMS.map((item) => (
          <div key={item.label}>
            <h4
              className="mb-1 text-[9px] uppercase tracking-[0.3em] sm:tracking-[0.4em]"
              style={{ color: "#D16B28" }}
            >
              {item.label}
            </h4>
            <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.4)" }}>
              {item.value}
            </p>
          </div>
        ))}
      </div>

      <p
        className="panel-content mt-8 text-[8px] uppercase tracking-[0.35em] sm:tracking-[0.4em]"
        style={{ color: "rgba(255,255,255,0.15)" }}
      >
        K8 Architecture © {new Date().getFullYear()} — A Timeless Architectural
        Experience
      </p>
    </PanelShell>
  );
}
