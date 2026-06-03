import PanelShell from "./PanelShell";

const STATS = [
  { num: "5", label: "Architectural Spaces" },
  { num: "∞", label: "Perspectives" },
  { num: "1", label: "Journey" },
];

export default function EntrancePanel() {
  return (
    <PanelShell id="panel-0">
      <span className="panel-content chapter-marker mb-5 sm:mb-6">
        The Entrance Gallery
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
        Step into a living exhibition of architecture — where terracotta walls
        breathe with centuries of wisdom, and skylights carve rivers of golden
        light through silence.
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
        className="panel-content absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-3 sm:bottom-10"
        style={{ color: "rgba(209,107,40,0.5)", zIndex: 10 }}
      >
        <span className="text-[9px] uppercase tracking-[0.4em] sm:tracking-[0.5em]">
          Scroll to begin the journey
        </span>
        <span className="scroll-hint-arrow text-base">→</span>
      </div>
    </PanelShell>
  );
}
