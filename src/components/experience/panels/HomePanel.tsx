import PanelShell from "./PanelShell";
import { studioInfo } from "@/lib/team";

const STATS = [
  { num: `${studioInfo.stats.projects}+`, label: "Projects" },
  { num: `${studioInfo.stats.yearsExperience}+`, label: "Years" },
  { num: `${studioInfo.stats.teamSize}`, label: "Team" },
];

export default function HomePanel() {
  return (
    <PanelShell id="panel-0">
      <span className="panel-content chapter-marker mb-5 sm:mb-6">
        K8 Architecture Studio
      </span>

      <h1
        className="panel-content font-black"
        style={{
          fontSize: "clamp(2.5rem, 7vw, 7rem)",
          fontFamily: "var(--font-display)",
          lineHeight: 0.9,
          textShadow: "0 4px 50px rgba(0,0,0,0.9)",
        }}
      >
        Where Light
        <br />
        Meets
        <br />
        <span style={{ color: "#D16B28" }}>Stone</span>
      </h1>

      <p
        className="panel-content mt-6 max-w-md text-sm leading-relaxed sm:mt-7"
        style={{
          color: "rgba(255,255,255,0.6)",
          textShadow: "0 2px 12px rgba(0,0,0,0.8)",
        }}
      >
        An architecture, landscape and interior design studio in Hyderabad —
        where terracotta walls breathe with centuries of wisdom, and skylights
        carve rivers of golden light through silence.
      </p>

      <div className="panel-content mt-8 flex flex-wrap justify-center gap-8 sm:mt-10 sm:gap-14">
        {STATS.map((s) => (
          <div key={s.label} className="text-center">
            <div
              className="text-2xl font-black sm:text-3xl"
              style={{
                color: "#D16B28",
                fontFamily: "var(--font-display)",
                textShadow: "0 2px 20px rgba(209,107,40,0.5)",
              }}
            >
              {s.num}
            </div>
            <div
              className="mt-1 text-[9px] uppercase tracking-[0.35em]"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>

      <div
        className="panel-content absolute bottom-10 left-1/2 hidden -translate-x-1/2 items-center gap-3 lg:flex"
        style={{ color: "rgba(209,107,40,0.5)", zIndex: 10 }}
      >
        <span className="text-[9px] uppercase tracking-[0.5em]">
          Scroll to explore
        </span>
        <span className="scroll-hint-arrow text-base">→</span>
      </div>
    </PanelShell>
  );
}
