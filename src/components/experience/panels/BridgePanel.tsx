import PanelShell from "./PanelShell";

const PILLARS = [
  { icon: "◇", title: "Tadao Ando", desc: "Concrete minimalism" },
  { icon: "△", title: "Peter Zumthor", desc: "Material atmosphere" },
  { icon: "○", title: "Indian Haveli", desc: "Carved stone craft" },
];

export default function BridgePanel() {
  return (
    <PanelShell id="panel-1" contentClassName="mx-auto max-w-4xl">
      <span className="panel-content chapter-marker mb-5 sm:mb-6">
        The Floating Bridge
      </span>

      <h1
        className="panel-content font-black"
        style={{
          fontSize: "clamp(2.5rem, 7vw, 6.5rem)",
          fontFamily: "var(--font-display)",
          lineHeight: 0.9,
          textShadow: "0 4px 50px rgba(0,0,0,0.9)",
        }}
      >
        Suspended
        <br />
        Between
        <br />
        <span className="text-stroke" style={{ textShadow: "none" }}>
          Worlds
        </span>
      </h1>

      <p
        className="panel-content mt-6 max-w-lg text-sm leading-relaxed sm:mt-7"
        style={{
          color: "rgba(255,255,255,0.6)",
          textShadow: "0 2px 12px rgba(0,0,0,0.8)",
        }}
      >
        A wooden bridge hovers above still water, connecting the modern and the
        ancient. Grand staircases ascend through volumes of light and shadow,
        while hidden courtyards breathe through carved openings.
      </p>

      <div className="panel-content mt-8 grid w-full max-w-md grid-cols-1 gap-3 sm:mt-10 sm:flex sm:max-w-none sm:flex-wrap sm:justify-center sm:gap-4">
        {PILLARS.map((c) => (
          <div
            key={c.title}
            className="glass rounded-xl px-6 py-5 text-center sm:min-w-[150px]"
          >
            <div className="mb-2 text-2xl" style={{ color: "#D16B28" }}>
              {c.icon}
            </div>
            <div
              className="text-[10px] font-bold uppercase tracking-[0.15em]"
              style={{ color: "rgba(255,255,255,0.8)" }}
            >
              {c.title}
            </div>
            <div
              className="mt-1 text-[9px]"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              {c.desc}
            </div>
          </div>
        ))}
      </div>
    </PanelShell>
  );
}
