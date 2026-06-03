import PanelShell from "./PanelShell";
import { services } from "@/lib/services";

interface CourtyardPanelProps {
  onOpenService: (index: number) => void;
}

export default function CourtyardPanel({ onOpenService }: CourtyardPanelProps) {
  return (
    <PanelShell id="panel-2" contentClassName="mx-auto max-w-5xl">
      <span className="panel-content chapter-marker mb-5 sm:mb-6">
        The Open Courtyard
      </span>

      <h2
        className="panel-content font-black"
        style={{
          fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
          fontFamily: "var(--font-display)",
          lineHeight: 0.92,
          textShadow: "0 4px 50px rgba(0,0,0,0.9)",
        }}
      >
        Where Earth
        <br />
        Meets <span style={{ color: "#D16B28" }}>Sky</span>
      </h2>

      <p
        className="panel-content mt-5 max-w-lg text-sm leading-relaxed sm:mt-6"
        style={{
          color: "rgba(255,255,255,0.6)",
          textShadow: "0 2px 12px rgba(0,0,0,0.8)",
        }}
      >
        Trees grow from polished stone, reflections double the architecture, and
        jali screens cast geometric shadow patterns that shift with the sun — a
        space that breathes.
      </p>

      <div className="panel-content mt-7 grid w-full max-w-[780px] grid-cols-2 gap-3 sm:mt-8 sm:grid-cols-3">
        {services.map((svc, i) => (
          <button
            key={svc.slug}
            className="svc-card group rounded-lg px-4 py-3 text-left"
            style={{
              border: "1px solid rgba(255,255,255,0.06)",
              background: "rgba(0,0,0,0.5)",
              backdropFilter: "blur(24px)",
              cursor: "pointer",
            }}
            onClick={() => onOpenService(i)}
          >
            <div className="mb-1 flex items-center gap-2">
              <span className="text-sm" style={{ color: "rgba(209,107,40,0.7)" }}>
                {svc.icon}
              </span>
              <span
                className="text-[8px] uppercase tracking-[0.3em]"
                style={{ color: "rgba(209,107,40,0.5)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <h3
              className="text-sm font-bold leading-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {svc.title}
            </h3>
            <p
              className="mt-1 text-[10px] leading-snug"
              style={{
                color: "rgba(255,255,255,0.35)",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {svc.blurb}
            </p>
            <span
              className="mt-2 inline-block text-[8px] uppercase tracking-[0.3em] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{ color: "#D16B28" }}
            >
              Explore →
            </span>
          </button>
        ))}
      </div>
    </PanelShell>
  );
}
