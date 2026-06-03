import PanelShell from "./PanelShell";

const MATERIALS = [
  { material: "Terracotta", desc: "Hand-dressed stone", color: "#D16B28" },
  { material: "Lime Plaster", desc: "Self-healing walls", color: "#E8D5BF" },
  { material: "Dark Wood", desc: "Teak & rosewood", color: "#8B6914" },
  { material: "Water", desc: "Reflecting channels", color: "#5B8FA8" },
];

export default function CorridorPanel() {
  return (
    <PanelShell id="panel-3" contentClassName="mx-auto max-w-4xl">
      <span className="panel-content chapter-marker mb-5 sm:mb-6">
        The Grand Corridor
      </span>

      <h2
        className="panel-content font-black"
        style={{
          fontSize: "clamp(2.5rem, 7vw, 7rem)",
          fontFamily: "var(--font-display)",
          lineHeight: 0.9,
          textShadow: "0 4px 50px rgba(0,0,0,0.9)",
        }}
      >
        The Path
        <br />
        <span style={{ color: "#D16B28" }}>Reveals</span>
      </h2>

      <p
        className="panel-content mt-6 max-w-lg text-sm italic leading-relaxed sm:mt-7"
        style={{
          color: "rgba(246,232,216,0.7)",
          textShadow: "0 2px 12px rgba(0,0,0,0.8)",
        }}
      >
        &ldquo;Wood panels above, water channel below. Carved pilasters mark the
        rhythm of each bay. Through tall glass openings, gardens dissolve into
        light and mist.&rdquo;
      </p>

      <div className="panel-content mt-8 grid grid-cols-2 gap-6 sm:mt-10 sm:flex sm:flex-wrap sm:justify-center sm:gap-5">
        {MATERIALS.map((m) => (
          <div key={m.material} className="text-center">
            <div
              className="mx-auto mb-3 h-12 w-12 rounded-full"
              style={{ background: m.color, boxShadow: `0 4px 20px ${m.color}40` }}
            />
            <div
              className="text-[10px] font-bold uppercase tracking-[0.15em]"
              style={{ color: "rgba(255,255,255,0.8)" }}
            >
              {m.material}
            </div>
            <div
              className="mt-0.5 text-[9px]"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              {m.desc}
            </div>
          </div>
        ))}
      </div>
    </PanelShell>
  );
}
