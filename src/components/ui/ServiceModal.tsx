"use client";

import { useEffect } from "react";
import { services } from "@/lib/services";

interface ServiceModalProps {
  /** Index into `services`, or null when closed. */
  index: number | null;
  onClose: () => void;
  onSelect: (index: number) => void;
}

const PHASES = [
  {
    title: "Discovery",
    copy: "Site analysis, material sourcing, and spatial research to understand the project's essence.",
  },
  {
    title: "Design",
    copy: "Proportional studies, lighting plans, and artisan coordination for authentic execution.",
  },
  {
    title: "Deliver",
    copy: "Hands-on construction using the finest materials, with precision oversight at every stage.",
  },
];

export default function ServiceModal({
  index,
  onClose,
  onSelect,
}: ServiceModalProps) {
  // Close on Escape.
  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, onClose]);

  if (index === null) return null;
  const svc = services[index];

  return (
    <div
      className="service-modal-overlay"
      onClick={onClose}
      style={{ animation: "fadeInOverlay 0.35s ease forwards" }}
    >
      <div
        className="service-modal"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: "fadeInModal 0.45s ease forwards" }}
      >
        <button
          onClick={onClose}
          className="absolute right-5 top-5 cursor-pointer border-none bg-none text-lg text-white transition-colors hover:text-[#D16B28]"
          style={{ background: "none", border: "none" }}
          aria-label="Close modal"
        >
          ✕
        </button>

        <div className="mb-1 flex items-center gap-3">
          <span className="text-2xl" style={{ color: "#D16B28" }}>
            {svc.icon}
          </span>
          <span
            className="text-[9px] uppercase tracking-[0.5em]"
            style={{ color: "rgba(209,107,40,0.6)" }}
          >
            Service {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <h2
          className="mt-3 font-black"
          style={{
            fontSize: "clamp(1.8rem, 4vw, 3.5rem)",
            fontFamily: "var(--font-display)",
          }}
        >
          {svc.title}
        </h2>

        <div className="ornament-line mt-5 w-20" />

        <p
          className="mt-6 text-sm leading-relaxed"
          style={{ color: "rgba(255,255,255,0.65)" }}
        >
          {svc.detail}
        </p>

        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {PHASES.map((phase, i) => (
            <div
              key={phase.title}
              className="rounded-lg p-4"
              style={{
                border: "1px solid rgba(255,255,255,0.06)",
                background: "rgba(255,255,255,0.02)",
              }}
            >
              <span
                className="text-[8px] uppercase tracking-[0.3em]"
                style={{ color: "#D16B28" }}
              >
                Phase {String(i + 1).padStart(2, "0")}
              </span>
              <h4
                className="mt-1 text-base font-black"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {phase.title}
              </h4>
              <p
                className="mt-2 text-[10px] leading-relaxed"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                {phase.copy}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-between gap-4">
          {index > 0 ? (
            <button
              onClick={() => onSelect(index - 1)}
              className="cursor-pointer border-none bg-none text-left text-[9px] uppercase tracking-[0.3em] transition-colors duration-300"
              style={{ color: "rgba(209,107,40,0.6)", background: "none" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#D16B28")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(209,107,40,0.6)")
              }
            >
              ← {services[index - 1].title}
            </button>
          ) : (
            <span />
          )}
          {index < services.length - 1 ? (
            <button
              onClick={() => onSelect(index + 1)}
              className="cursor-pointer border-none bg-none text-right text-[9px] uppercase tracking-[0.3em] transition-colors duration-300"
              style={{ color: "rgba(209,107,40,0.6)", background: "none" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#D16B28")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(209,107,40,0.6)")
              }
            >
              {services[index + 1].title} →
            </button>
          ) : (
            <span />
          )}
        </div>
      </div>
    </div>
  );
}
