import PanelShell from "./PanelShell";
import { studioInfo } from "@/lib/team";

const DETAILS = [
  { label: "Studio", value: "Hyderabad, Telangana" },
  { label: "Phone", value: studioInfo.phone },
  { label: "Hours", value: "Mon–Fri 10–18 IST" },
];

export default function ContactPanel() {
  return (
    <PanelShell id="panel-4" showDivider={false}>
      <span className="panel-content chapter-marker mb-5 sm:mb-6">
        Get in Touch
      </span>

      <h2
        className="panel-content font-black"
        style={{
          fontSize: "clamp(2.6rem, 8vw, 7rem)",
          fontFamily: "var(--font-display)",
          lineHeight: 0.9,
          textShadow: "0 4px 50px rgba(0,0,0,0.9)",
        }}
      >
        Let&apos;s Create
        <br />
        Something <span style={{ color: "#D16B28" }}>Timeless</span>
      </h2>

      <div className="panel-content ornament-line mt-8 w-32" />

      <p
        className="panel-content mt-6 max-w-lg text-base italic leading-relaxed sm:mt-7 sm:text-lg"
        style={{
          color: "rgba(246,232,216,0.8)",
          textShadow: "0 2px 15px rgba(0,0,0,0.7)",
        }}
      >
        Every great project begins with a conversation. Tell us about your
        vision.
      </p>

      <div className="panel-content mt-10 flex flex-col items-center gap-4 sm:mt-12">
        <a
          href={`mailto:${studioInfo.email}`}
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
        <a
          href={`mailto:${studioInfo.email}`}
          className="break-all text-center text-[9px] uppercase tracking-[0.35em] transition-colors duration-300 sm:tracking-[0.45em]"
          style={{ color: "rgba(255,255,255,0.35)" }}
        >
          {studioInfo.email}
        </a>
      </div>

      <div className="panel-content mt-10 grid max-w-[500px] grid-cols-3 gap-6 text-center sm:mt-12 sm:gap-8">
        {DETAILS.map((item) => (
          <div key={item.label}>
            <h4
              className="mb-1 text-[9px] uppercase tracking-[0.3em] sm:tracking-[0.4em]"
              style={{ color: "#D16B28" }}
            >
              {item.label}
            </h4>
            <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.45)" }}>
              {item.value}
            </p>
          </div>
        ))}
      </div>

      <p
        className="panel-content mt-8 text-[8px] uppercase tracking-[0.35em] sm:tracking-[0.4em]"
        style={{ color: "rgba(255,255,255,0.18)" }}
      >
        K8 Architecture © {new Date().getFullYear()} — Architecture · Landscape ·
        Interiors
      </p>
    </PanelShell>
  );
}
