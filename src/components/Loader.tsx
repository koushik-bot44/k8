"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Loader() {
  const root = useRef<HTMLDivElement>(null);
  const particle = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const quote = useRef<HTMLParagraphElement>(null);
  const door = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const lines = svgRef.current?.querySelectorAll("path, circle, line") ?? [];
    lines.forEach((el) => {
      const svgEl = el as SVGGeometryElement;
      if (svgEl.getTotalLength) {
        const len = svgEl.getTotalLength();
        svgEl.style.strokeDasharray = String(len);
        svgEl.style.strokeDashoffset = String(len);
      }
    });

    const tl = gsap.timeline({
      onComplete: () => setDone(true),
    });

    // Scene 1 — particle glow + quote
    tl.fromTo(
      particle.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.2, ease: "power3.out" }
    )
      .fromTo(
        quote.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1 },
        "-=0.4"
      )
      .to(quote.current, { opacity: 0, duration: 0.6, delay: 1.0 })

      // Scene 2 — particle expands, blueprint draws
      .to(
        particle.current,
        {
          x: 100,
          y: -50,
          duration: 1.2,
          ease: "power2.inOut",
        },
        "<"
      )
      .to(
        lines,
        {
          strokeDashoffset: 0,
          duration: 2.2,
          stagger: 0.06,
          ease: "power2.inOut",
        },
        "<"
      )

      // Scene 3 — K8 logo constructs
      .fromTo(
        ".k8-letter",
        { y: 60, opacity: 0, rotateX: -90 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: "back.out(1.6)",
        }
      )
      .to(".blueprint-fade", { opacity: 0.15, duration: 0.6 }, "<")

      // Scene 4 — doorway portal
      .to(particle.current, { opacity: 0, duration: 0.3 })
      .to(door.current, {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
      })
      .to(".k8-letter", { color: "#0D0D0D", duration: 0.4 }, "<")
      .to(door.current, {
        scale: 40,
        duration: 1.6,
        ease: "expo.inOut",
      })
      .to(
        root.current,
        { opacity: 0, duration: 0.5, pointerEvents: "none" },
        "-=0.3"
      )
      .set(root.current, { display: "none" });
  }, []);

  if (done) return null;

  return (
    <div
      ref={root}
      data-loader="true"
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
      style={{ background: "#0D0D0D" }}
    >
      {/* blueprint geometry */}
      <svg
        ref={svgRef}
        viewBox="0 0 800 800"
        className="blueprint-fade absolute"
        style={{
          height: "90vmin",
          width: "90vmin",
          color: "#D16B28",
        }}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      >
        <path id="trace" d="M100,400 Q400,100 700,400 T100,400" />
        <circle cx="400" cy="400" r="280" />
        <circle cx="400" cy="400" r="180" />
        <circle cx="400" cy="400" r="80" />
        <line x1="0" y1="400" x2="800" y2="400" />
        <line x1="400" y1="0" x2="400" y2="800" />
        <line x1="120" y1="120" x2="680" y2="680" />
        <line x1="680" y1="120" x2="120" y2="680" />
        <path d="M250,550 L400,250 L550,550 Z" />
        <path d="M300,550 L300,400 L500,400 L500,550" />
      </svg>

      {/* glowing particle */}
      <div
        ref={particle}
        className="absolute rounded-full"
        style={{
          height: 12,
          width: 12,
          background: "#D16B28",
          boxShadow: "0 0 30px 10px rgba(209,107,40,0.7)",
        }}
      />

      {/* opening quote */}
      <p
        ref={quote}
        className="absolute bottom-24 text-sm uppercase tracking-[0.4em]"
        style={{ color: "rgba(246,232,216,0.7)" }}
      >
        Every masterpiece begins with a mark.
      </p>

      {/* K8 logo */}
      <h1 className="relative z-10 flex gap-2 font-black leading-none" style={{ fontSize: "18vmin" }}>
        <span className="k8-letter inline-block" style={{ color: "#D16B28" }}>
          K
        </span>
        <span className="k8-letter inline-block" style={{ color: "#D16B28" }}>
          8
        </span>
      </h1>

      {/* doorway portal */}
      <div
        ref={door}
        className="absolute origin-center rounded-t-full"
        style={{
          height: 200,
          width: 140,
          background: "#D16B28",
          transform: "scale(0)",
          opacity: 0,
        }}
      />
    </div>
  );
}
