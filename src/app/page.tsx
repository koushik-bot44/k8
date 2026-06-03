"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Loader from "@/components/Loader";
import ScrollReveal from "@/components/ScrollReveal";
import StatsCounter from "@/components/StatsCounter";
import { services } from "@/lib/services";
import { projects } from "@/lib/projects";
import { team, studioInfo } from "@/lib/team";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const HouseScene = dynamic(() => import("@/components/HouseScene"), {
  ssr: false,
});

const SECTIONS = [
  { id: "entrance", label: "The Entrance", room: "Entrance Gallery" },
  { id: "bridge", label: "The Bridge", room: "Floating Walkway" },
  { id: "courtyard", label: "The Courtyard", room: "Open Courtyard" },
  { id: "corridor", label: "The Corridor", room: "Grand Corridor" },
  { id: "sanctum", label: "The Sanctum", room: "Inner Sanctum" },
];

export default function K8Experience() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef(0);
  const [activeSection, setActiveSection] = useState(0);
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [loaderDone, setLoaderDone] = useState(false);

  // Close modal on escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedService(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Watch for loader completion
  useEffect(() => {
    const check = setInterval(() => {
      const loaderEl = document.querySelector("[data-loader]");
      if (!loaderEl) {
        setLoaderDone(true);
        clearInterval(check);
      }
    }, 200);
    return () => clearInterval(check);
  }, []);

  // Main horizontal scroll with GSAP
  useEffect(() => {
    if (!loaderDone) return;

    const track = trackRef.current;
    const wrapper = wrapperRef.current;
    if (!track || !wrapper) return;

    const timer = setTimeout(() => {
      const panels = gsap.utils.toArray<HTMLElement>(".h-panel");
      const totalPanels = panels.length;
      const scrollWidth = track.scrollWidth - window.innerWidth;

      const mainST = ScrollTrigger.create({
        trigger: wrapper,
        start: "top top",
        end: () => `+=${scrollWidth}`,
        scrub: 1.8,
        pin: track,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;

          gsap.set(track, { x: -progress * scrollWidth });

          // Drive 3D walkthrough
          scrollProgressRef.current = progress;

          // Update progress bar
          if (progressRef.current) {
            progressRef.current.style.width = `${progress * 100}%`;
          }

          // Update active section
          const idx = Math.min(
            totalPanels - 1,
            Math.floor(progress * totalPanels)
          );
          setActiveSection(idx);
        },
      });

      // Animate first panel
      gsap.from("#panel-0 .panel-content", {
        y: 60,
        opacity: 0,
        duration: 1.4,
        stagger: 0.12,
        delay: 0.3,
        ease: "power3.out",
      });

      // Animate subsequent panels
      panels.forEach((panel, i) => {
        if (i === 0) return;
        const els = panel.querySelectorAll(".panel-content");
        let animated = false;

        ScrollTrigger.create({
          trigger: wrapper,
          start: () => {
            const startPct = (i - 0.4) / (totalPanels - 1);
            return `top+=${startPct * scrollWidth} top`;
          },
          onEnter: () => {
            if (animated) return;
            animated = true;
            gsap.from(els, {
              y: 50,
              opacity: 0,
              duration: 1,
              stagger: 0.1,
              ease: "power3.out",
            });
          },
        });
      });

      ScrollTrigger.refresh();

      return () => {
        mainST.kill();
      };
    }, 400);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [loaderDone]);

  const scrollToSection = useCallback((index: number) => {
    if (!wrapperRef.current || !trackRef.current) return;
    const scrollWidth = trackRef.current.scrollWidth - window.innerWidth;
    const targetY =
      wrapperRef.current.offsetTop +
      (index / (SECTIONS.length - 1)) * scrollWidth;
    gsap.to(window, {
      scrollTo: { y: targetY },
      duration: 2,
      ease: "power3.inOut",
    });
  }, []);

  return (
    <>
      <Loader />

      {/* ── 3D architectural walkthrough background ── */}
      <HouseScene progressRef={scrollProgressRef} />

      {/* ── Cinematic overlays ── */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 2,
          pointerEvents: "none",
          background: `
            linear-gradient(to bottom,
              rgba(10,10,10,0.4) 0%,
              rgba(10,10,10,0.05) 20%,
              rgba(10,10,10,0.05) 60%,
              rgba(10,10,10,0.55) 100%
            ),
            linear-gradient(to right,
              rgba(10,10,10,0.25) 0%,
              rgba(10,10,10,0.0) 50%,
              rgba(10,10,10,0.25) 100%
            )`,
        }}
      />

      {/* Vignette */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 3,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse at center, transparent 45%, rgba(10,10,10,0.45) 100%)",
        }}
      />

      {/* Blueprint grid */}
      <div
        className="fixed inset-0 blueprint-grid pointer-events-none"
        style={{ zIndex: 4, opacity: 0.03 }}
      />

      {/* ── Navigation Dots ── */}
      <div className="section-dots" style={{ zIndex: 90 }}>
        {SECTIONS.map((s, i) => (
          <button
            key={s.id}
            className={`section-dot ${activeSection === i ? "active" : ""}`}
            data-label={s.label}
            onClick={() => scrollToSection(i)}
            aria-label={`Go to ${s.label}`}
          />
        ))}
      </div>

      {/* ── Top Navbar ── */}
      <nav
        className="fixed inset-x-0 top-0 flex items-center justify-between px-8 py-5"
        style={{ zIndex: 90 }}
      >
        <span
          className="text-2xl font-black tracking-tight"
          style={{
            fontFamily: "var(--font-display)",
            color: "#fff",
            textShadow: "0 2px 12px rgba(0,0,0,0.9)",
          }}
        >
          K8<span style={{ color: "#D16B28" }}>.</span>
        </span>

        <ul className="hidden md:flex gap-8 text-xs uppercase tracking-[0.3em]">
          {SECTIONS.map((s, i) => (
            <li key={s.id}>
              <button
                onClick={() => scrollToSection(i)}
                className="relative py-1 transition-colors duration-400"
                style={{
                  color:
                    activeSection === i
                      ? "#D16B28"
                      : "rgba(255,255,255,0.55)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textShadow: "0 1px 10px rgba(0,0,0,0.8)",
                }}
              >
                {s.label}
                {activeSection === i && (
                  <span
                    className="absolute bottom-0 left-0 h-px w-full"
                    style={{ background: "#D16B28" }}
                  />
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* ── Room Label ── */}
      <div className="room-label room-name-tag" key={activeSection}>
        {SECTIONS[activeSection]?.room}
      </div>

      {/* ── Progress Bar ── */}
      <div
        ref={progressRef}
        className="scroll-progress"
        style={{ width: "0%", zIndex: 100 }}
      />

      {/* ── Horizontal Scroll Wrapper ── */}
      <div ref={wrapperRef} style={{ position: "relative", zIndex: 10 }}>
        <div
          ref={trackRef}
          style={{
            display: "flex",
            height: "100vh",
            willChange: "transform",
          }}
        >
          {/* ═══════ Panel 1 — THE ENTRANCE ═══════ */}
          <section id="panel-0" className="h-panel">
            <div className="panel-divider" />
            <div
              className="flex flex-col items-center justify-center text-center px-8 relative z-10 w-full"
              style={{ gap: 0 }}
            >
              <span className="panel-content chapter-marker mb-6">
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
                className="panel-content mt-7 max-w-md text-sm leading-relaxed"
                style={{
                  color: "rgba(255,255,255,0.6)",
                  textShadow: "0 2px 12px rgba(0,0,0,0.8)",
                }}
              >
                Step into a living exhibition of architecture — where terracotta
                walls breathe with centuries of wisdom, and skylights carve
                rivers of golden light through silence.
              </p>

              {/* Stats */}
              <div className="panel-content mt-10 flex gap-14">
                {[
                  { num: "5", label: "Architectural Spaces" },
                  { num: "∞", label: "Perspectives" },
                  { num: "1", label: "Journey" },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <div
                      className="text-3xl font-black"
                      style={{
                        color: "#D16B28",
                        fontFamily: "var(--font-display)",
                        textShadow:
                          "0 2px 20px rgba(209,107,40,0.5)",
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
            </div>

            {/* Scroll hint */}
            <div
              className="panel-content absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3"
              style={{ color: "rgba(209,107,40,0.5)", zIndex: 10 }}
            >
              <span className="text-[9px] uppercase tracking-[0.5em]">
                Scroll to begin the journey
              </span>
              <span className="scroll-hint-arrow text-base">→</span>
            </div>
          </section>

          {/* ═══════ Panel 2 — THE BRIDGE ═══════ */}
          <section id="panel-1" className="h-panel">
            <div className="panel-divider" />
            <div className="flex flex-col items-center justify-center text-center px-8 relative z-10 w-full max-w-4xl mx-auto">
              <span className="panel-content chapter-marker mb-6">
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
                className="panel-content mt-7 max-w-lg text-sm leading-relaxed"
                style={{
                  color: "rgba(255,255,255,0.6)",
                  textShadow: "0 2px 12px rgba(0,0,0,0.8)",
                }}
              >
                A wooden bridge hovers above still water, connecting the modern
                and the ancient. Grand staircases ascend through volumes of
                light and shadow, while hidden courtyards breathe through
                carved openings.
              </p>

              {/* Feature pillars */}
              <div className="panel-content mt-10 flex gap-4">
                {[
                  {
                    icon: "◇",
                    title: "Tadao Ando",
                    desc: "Concrete minimalism",
                  },
                  {
                    icon: "△",
                    title: "Peter Zumthor",
                    desc: "Material atmosphere",
                  },
                  {
                    icon: "○",
                    title: "Indian Haveli",
                    desc: "Carved stone craft",
                  },
                ].map((c) => (
                  <div
                    key={c.title}
                    className="glass rounded-xl px-6 py-5 text-center"
                    style={{ minWidth: 150 }}
                  >
                    <div
                      className="text-2xl mb-2"
                      style={{ color: "#D16B28" }}
                    >
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
            </div>
          </section>

          {/* ═══════ Panel 3 — THE COURTYARD ═══════ */}
          <section id="panel-2" className="h-panel">
            <div className="panel-divider" />
            <div className="flex flex-col items-center justify-center text-center px-8 relative z-10 w-full max-w-5xl mx-auto">
              <span className="panel-content chapter-marker mb-6">
                The Open Courtyard
              </span>

              <h1
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
              </h1>

              <p
                className="panel-content mt-6 max-w-lg text-sm leading-relaxed"
                style={{
                  color: "rgba(255,255,255,0.6)",
                  textShadow: "0 2px 12px rgba(0,0,0,0.8)",
                }}
              >
                Trees grow from polished stone, reflections double the
                architecture, and jali screens cast geometric shadow patterns
                that shift with the sun — a space that breathes.
              </p>

              {/* Services grid */}
              <div
                className="panel-content mt-8 grid grid-cols-3 gap-3 w-full"
                style={{ maxWidth: 780 }}
              >
                {services.map((svc, i) => (
                  <button
                    key={svc.slug}
                    className="svc-card text-left rounded-lg px-4 py-3 group"
                    style={{
                      border: "1px solid rgba(255,255,255,0.06)",
                      background: "rgba(0,0,0,0.5)",
                      backdropFilter: "blur(24px)",
                      cursor: "pointer",
                    }}
                    onClick={() => setSelectedService(i)}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="text-sm"
                        style={{ color: "rgba(209,107,40,0.7)" }}
                      >
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
                        WebkitBoxOrient: "vertical" as const,
                        overflow: "hidden",
                      }}
                    >
                      {svc.blurb}
                    </p>
                    <span
                      className="mt-2 inline-block text-[8px] uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ color: "#D16B28" }}
                    >
                      Explore →
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* ═══════ Panel 4 — THE CORRIDOR ═══════ */}
          <section id="panel-3" className="h-panel">
            <div className="panel-divider" />
            <div className="flex flex-col items-center justify-center text-center px-8 relative z-10 w-full max-w-4xl mx-auto">
              <span className="panel-content chapter-marker mb-6">
                The Grand Corridor
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
                The Path
                <br />
                <span style={{ color: "#D16B28" }}>Reveals</span>
              </h1>

              <p
                className="panel-content mt-7 max-w-lg text-sm leading-relaxed italic"
                style={{
                  color: "rgba(246,232,216,0.7)",
                  textShadow: "0 2px 12px rgba(0,0,0,0.8)",
                }}
              >
                &ldquo;Wood panels above, water channel below. Carved pilasters
                mark the rhythm of each bay. Through tall glass openings,
                gardens dissolve into light and mist.&rdquo;
              </p>

              {/* Material showcase */}
              <div className="panel-content mt-10 flex gap-5">
                {[
                  {
                    material: "Terracotta",
                    desc: "Hand-dressed stone",
                    color: "#D16B28",
                  },
                  {
                    material: "Lime Plaster",
                    desc: "Self-healing walls",
                    color: "#E8D5BF",
                  },
                  {
                    material: "Dark Wood",
                    desc: "Teak & rosewood",
                    color: "#8B6914",
                  },
                  {
                    material: "Water",
                    desc: "Reflecting channels",
                    color: "#5B8FA8",
                  },
                ].map((m) => (
                  <div key={m.material} className="text-center">
                    <div
                      className="w-12 h-12 rounded-full mx-auto mb-3"
                      style={{
                        background: m.color,
                        boxShadow: `0 4px 20px ${m.color}40`,
                      }}
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
            </div>
          </section>

          {/* ═══════ Panel 5 — THE SANCTUM ═══════ */}
          <section id="panel-4" className="h-panel">
            <div className="flex flex-col items-center justify-center text-center px-8 relative z-10 w-full">
              <span className="panel-content chapter-marker mb-6">
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
                className="panel-content mt-7 max-w-lg text-lg italic leading-relaxed"
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

              {/* Contact */}
              <div className="panel-content mt-12 flex flex-col items-center gap-4">
                <a
                  href="mailto:nikhithajinnapally@k8architecturestudio.com"
                  className="group relative overflow-hidden rounded-full px-10 py-3.5 text-white transition-all duration-600"
                  style={{
                    border: "1px solid rgba(209,107,40,0.4)",
                    background: "rgba(209,107,40,0.08)",
                    backdropFilter: "blur(20px)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#D16B28";
                    e.currentTarget.style.boxShadow =
                      "0 0 50px rgba(209,107,40,0.35)";
                    e.currentTarget.style.background =
                      "rgba(209,107,40,0.18)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor =
                      "rgba(209,107,40,0.4)";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.background =
                      "rgba(209,107,40,0.08)";
                  }}
                >
                  <span className="relative z-10 text-xs font-medium uppercase tracking-[0.35em]">
                    Begin Your Commission
                  </span>
                </a>
                <span
                  className="text-[9px] uppercase tracking-[0.45em]"
                  style={{ color: "rgba(255,255,255,0.25)" }}
                >
                  nikhithajinnapally@k8architecturestudio.com
                </span>
              </div>

              {/* Footer */}
              <div
                className="panel-content mt-12 grid grid-cols-3 gap-8 text-center"
                style={{ maxWidth: 500 }}
              >
                {[
                  { label: "Studio", value: "Hyderabad, Telangana" },
                  { label: "Phone", value: "+91 83418 54527" },
                  { label: "Hours", value: "Mon–Fri 10–18 IST" },
                ].map((item) => (
                  <div key={item.label}>
                    <h4
                      className="text-[9px] uppercase tracking-[0.4em] mb-1"
                      style={{ color: "#D16B28" }}
                    >
                      {item.label}
                    </h4>
                    <p
                      className="text-[10px]"
                      style={{ color: "rgba(255,255,255,0.4)" }}
                    >
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              <p
                className="panel-content mt-8 text-[8px] uppercase tracking-[0.4em]"
                style={{ color: "rgba(255,255,255,0.15)" }}
              >
                K8 Architecture © {new Date().getFullYear()} — A Timeless
                Architectural Experience
              </p>
            </div>
          </section>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          VERTICAL CONTINUATION — Sections below the horizontal scroll
          ═══════════════════════════════════════════════════════════════ */}

      {/* ── SECTION: About Studio ── */}
      <section
        id="about-studio"
        className="relative py-20 md:py-32 px-6 md:px-12"
        style={{ background: "#0A0A0A", zIndex: 10 }}
      >
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-4">
              <div className="ornament-line flex-1 max-w-[80px]" />
              <span className="chapter-marker">About the Studio</span>
              <div className="ornament-line flex-1 max-w-[80px]" />
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-12 md:gap-20 mt-12 items-center">
            <ScrollReveal delay={100}>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src="/images/heritage-bg.jpg"
                  alt="K8 Architecture Studio"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,10,10,0.7) 0%, transparent 50%)" }} />
                <div className="absolute bottom-6 left-6">
                  <span className="text-[9px] uppercase tracking-[0.5em]" style={{ color: "rgba(209,107,40,0.7)" }}>Est. 2019 — Hyderabad</span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <h2 className="font-black" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontFamily: "var(--font-display)", lineHeight: 1.05 }}>
                Architecture <span style={{ color: "#D16B28" }}>|</span> Landscape <span style={{ color: "#D16B28" }}>|</span> Interiors
              </h2>
              <p className="mt-6 text-sm md:text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                K8 Architecture Studio is a design practice rooted in the belief that architecture must honour its context — the land it sits on, the climate that shapes it, and the culture that inhabits it. We work across scales, from intimate interior transformations to sweeping landscape interventions.
              </p>
              <p className="mt-4 text-sm md:text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                Our studio blends the spatial wisdom of traditional Indian architecture — courtyards, jali screens, water channels — with the precision and minimalism of contemporary practice.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {["Contextual Modernism", "Sustainable Design", "Material Craft", "Biophilic Design"].map((tag) => (
                  <span key={tag} className="px-4 py-1.5 rounded-full text-[10px] uppercase tracking-[0.2em]" style={{ border: "1px solid rgba(209,107,40,0.3)", color: "rgba(209,107,40,0.7)", background: "rgba(209,107,40,0.05)" }}>{tag}</span>
                ))}
              </div>
              <a href={studioInfo.instagramUrl} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] transition-colors duration-300" style={{ color: "rgba(209,107,40,0.6)" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#D16B28")} onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(209,107,40,0.6)")}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" /></svg>
                @{studioInfo.instagram}
              </a>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── SECTION: Founders / Team ── */}
      <section id="founders" className="relative py-20 md:py-32 px-6 md:px-12" style={{ background: "#080808", zIndex: 10 }}>
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="chapter-marker">The Architects</span>
              <h2 className="mt-4 font-black" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", fontFamily: "var(--font-display)", lineHeight: 1 }}>
                Minds Behind <span style={{ color: "#D16B28" }}>K8</span>
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {team.map((member, idx) => (
              <ScrollReveal key={member.name} delay={idx * 150}>
                <div className="group rounded-2xl overflow-hidden transition-all duration-700" style={{ border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}>
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image src={member.image} alt={member.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 50vw" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0.1) 50%, transparent 100%)" }} />
                    <div className="absolute bottom-4 left-5 right-5">
                      <div className="text-[9px] uppercase tracking-[0.4em] mb-1" style={{ color: "#D16B28" }}>{member.role}</div>
                      <h3 className="text-xl md:text-2xl font-black" style={{ fontFamily: "var(--font-display)" }}>{member.name}</h3>
                    </div>
                  </div>
                  <div className="p-5 md:p-7">
                    <p className="text-xs md:text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{member.bio}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {member.specializations.map((s) => (
                        <span key={s} className="text-[9px] px-3 py-1 rounded-full uppercase tracking-[0.15em]" style={{ border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)" }}>{s}</span>
                      ))}
                    </div>
                    <a href={`https://www.instagram.com/${member.instagram}`} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] transition-colors duration-300" style={{ color: "rgba(209,107,40,0.5)" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#D16B28")} onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(209,107,40,0.5)")}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /></svg>
                      @{member.instagram}
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION: Projects Portfolio ── */}
      <section id="projects" className="relative py-20 md:py-32 px-6 md:px-12" style={{ background: "#0A0A0A", zIndex: 10 }}>
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
              <div>
                <span className="chapter-marker">Portfolio</span>
                <h2 className="mt-4 font-black" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", fontFamily: "var(--font-display)", lineHeight: 1 }}>
                  Selected <span style={{ color: "#D16B28" }}>Works</span>
                </h2>
              </div>
              <p className="max-w-md text-xs md:text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>Each project is a dialogue between site, material, and the lives that will unfold within.</p>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((project, idx) => (
              <ScrollReveal key={project.slug} delay={idx * 80}>
                <div className="group relative rounded-xl overflow-hidden cursor-pointer" style={{ border: "1px solid rgba(255,255,255,0.05)", background: "rgba(0,0,0,0.4)" }}>
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image src={project.image} alt={project.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                    <div className="absolute inset-0 transition-opacity duration-500" style={{ background: "linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.2) 40%, transparent 100%)" }} />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full text-[8px] uppercase tracking-[0.25em]" style={{ background: "rgba(209,107,40,0.2)", border: "1px solid rgba(209,107,40,0.3)", color: "#D16B28", backdropFilter: "blur(12px)" }}>{project.category}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-base md:text-lg font-black leading-tight" style={{ fontFamily: "var(--font-display)" }}>{project.title}</h3>
                    <div className="mt-1.5 flex items-center gap-3 text-[10px] uppercase tracking-[0.15em]" style={{ color: "rgba(255,255,255,0.35)" }}>
                      <span>{project.location}</span>
                      <span style={{ color: "rgba(209,107,40,0.4)" }}>•</span>
                      <span>{project.year}</span>
                      <span style={{ color: "rgba(209,107,40,0.4)" }}>•</span>
                      <span>{project.area}</span>
                    </div>
                    <p className="mt-3 text-[11px] leading-relaxed" style={{ color: "rgba(255,255,255,0.4)", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" as const, overflow: "hidden" }}>{project.description}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.features.slice(0, 2).map((f) => (
                        <span key={f} className="text-[8px] px-2.5 py-1 rounded-full uppercase tracking-[0.15em]" style={{ border: "1px solid rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.3)" }}>{f}</span>
                      ))}
                    </div>
                    <span className="mt-4 inline-block text-[9px] uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ color: "#D16B28" }}>View Project →</span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION: Design Process ── */}
      <section id="process" className="relative py-20 md:py-32 px-6 md:px-12" style={{ background: "#080808", zIndex: 10 }}>
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="chapter-marker">Our Process</span>
              <h2 className="mt-4 font-black" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", fontFamily: "var(--font-display)", lineHeight: 1 }}>
                From Vision to <span style={{ color: "#D16B28" }}>Reality</span>
              </h2>
            </div>
          </ScrollReveal>
          <div className="relative">
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px hidden md:block" style={{ background: "linear-gradient(to bottom, transparent, rgba(209,107,40,0.3), rgba(209,107,40,0.3), transparent)" }} />
            {[
              { phase: "01", title: "Discover", icon: "◇", desc: "We begin with deep listening — understanding the site, the client's aspirations, and the cultural context.", details: ["Site & Context Analysis", "Client Brief & Visioning", "Material Palette Research", "Regulatory Framework"] },
              { phase: "02", title: "Design", icon: "△", desc: "Concepts evolve through hand sketches, physical models, and 3D visualization until we achieve beauty, function, and buildability.", details: ["Concept Sketches & Massing", "3D Visualization & VR", "Technical Drawings", "Material Specifications"] },
              { phase: "03", title: "Build", icon: "○", desc: "Our execution team brings designs to life with meticulous craftsmanship. We source materials personally and maintain on-site presence.", details: ["Artisan Coordination", "Construction Management", "Quality Inspections", "Material Sourcing"] },
              { phase: "04", title: "Deliver", icon: "◆", desc: "The completed space is revealed — not just as a building, but as an experience. Every detail fine-tuned until the architecture breathes.", details: ["Final Detailing & Styling", "Landscape Installation", "Lighting Calibration", "Client Walkthrough"] },
            ].map((step, i) => (
              <ScrollReveal key={step.phase} delay={i * 120}>
                <div className={`relative flex flex-col md:flex-row items-start gap-6 md:gap-12 mb-16 ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
                  <div className="hidden md:block absolute left-1/2 top-6 -translate-x-1/2 z-10">
                    <div className="w-3 h-3 rounded-full" style={{ background: "#D16B28", boxShadow: "0 0 20px rgba(209,107,40,0.5)" }} />
                  </div>
                  <div className="md:w-1/2" />
                  <div className="md:w-1/2 glass rounded-xl p-6 md:p-8" style={{ background: "rgba(0,0,0,0.5)" }}>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xl" style={{ color: "#D16B28" }}>{step.icon}</span>
                      <span className="text-[9px] uppercase tracking-[0.4em]" style={{ color: "rgba(209,107,40,0.5)" }}>Phase {step.phase}</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-black" style={{ fontFamily: "var(--font-display)" }}>{step.title}</h3>
                    <p className="mt-3 text-xs md:text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{step.desc}</p>
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      {step.details.map((d) => (
                        <div key={d} className="flex items-center gap-2 text-[10px]" style={{ color: "rgba(255,255,255,0.35)" }}>
                          <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: "rgba(209,107,40,0.5)" }} />
                          {d}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION: Instagram Gallery ── */}
      <section id="instagram-feed" className="relative py-20 md:py-32 px-6 md:px-12" style={{ background: "#0A0A0A", zIndex: 10 }}>
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="chapter-marker">From Our Studio</span>
              <h2 className="mt-4 font-black" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", fontFamily: "var(--font-display)", lineHeight: 1 }}>
                Behind the <span style={{ color: "#D16B28" }}>Scenes</span>
              </h2>
              <p className="mt-4 text-xs md:text-sm max-w-lg mx-auto" style={{ color: "rgba(255,255,255,0.4)" }}>Glimpses from our design process, site visits, material explorations, and the moments where architecture comes alive.</p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {[
              { src: "/images/gallery/old-architecture.jpg", span: "md:col-span-2 md:row-span-2", aspect: "aspect-square", label: "Hawa Mahal — Jaipur Heritage" },
              { src: "/images/gallery/temple-golden.jpg", span: "", aspect: "aspect-square", label: "Temple Architecture" },
              { src: "/images/gallery/home-interior.jpg", span: "", aspect: "aspect-square", label: "Contemporary Interior" },
              { src: "/images/gallery/temple-pillars.jpg", span: "", aspect: "aspect-[3/4]", label: "Ancient Temple Pillars" },
              { src: "/images/gallery/interior-courtyard.jpg", span: "", aspect: "aspect-square", label: "Courtyard Living" },
              { src: "/images/gallery/heritage-stepwell.jpg", span: "md:col-span-2", aspect: "aspect-[2/1]", label: "India Gate — Delhi" },
              { src: "/images/gallery/temple-taj.jpg", span: "", aspect: "aspect-square", label: "Taj Mahal — Agra" },
              { src: "/images/gallery/temple-carved.jpg", span: "", aspect: "aspect-[3/4]", label: "Carved Temple Details" },
            ].map((item, i) => (
              <ScrollReveal key={item.src} delay={i * 60} className={item.span}>
                <div className={`group relative ${item.aspect} rounded-lg overflow-hidden cursor-pointer`}>
                  <Image src={item.src} alt={item.label} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width: 768px) 50vw, 25vw" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4" style={{ background: "linear-gradient(to top, rgba(10,10,10,0.85) 0%, transparent 60%)" }}>
                    <span className="text-[10px] uppercase tracking-[0.2em]" style={{ color: "rgba(255,255,255,0.8)" }}>{item.label}</span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal delay={200}>
            <div className="text-center mt-10">
              <a href={studioInfo.instagramUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full transition-all duration-500" style={{ border: "1px solid rgba(209,107,40,0.3)", background: "rgba(209,107,40,0.06)", backdropFilter: "blur(20px)", color: "rgba(209,107,40,0.7)" }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#D16B28"; e.currentTarget.style.boxShadow = "0 0 40px rgba(209,107,40,0.25)"; e.currentTarget.style.color = "#D16B28"; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(209,107,40,0.3)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.color = "rgba(209,107,40,0.7)"; }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" /></svg>
                <span className="text-xs uppercase tracking-[0.3em] font-medium">Follow on Instagram</span>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── SECTION: Stats ── */}
      <section id="stats" className="relative py-20 md:py-28 px-6 md:px-12" style={{ background: "linear-gradient(180deg, #080808 0%, rgba(209,107,40,0.04) 50%, #080808 100%)", zIndex: 10 }}>
        <div className="max-w-4xl mx-auto">
          <div className="ornament-line w-full mb-14" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <StatsCounter end={studioInfo.stats.projects} suffix="+" label="Projects Completed" />
            <StatsCounter end={studioInfo.stats.yearsExperience} suffix="+" label="Years of Practice" />
            <StatsCounter end={studioInfo.stats.teamSize} label="Team Members" />
            <StatsCounter end={studioInfo.stats.followers} suffix="+" label="Community" />
          </div>
          <div className="ornament-line w-full mt-14" />
        </div>
      </section>

      {/* ── SECTION: Services Deep Dive ── */}
      <section id="services-detail" className="relative py-20 md:py-32 px-6 md:px-12" style={{ background: "#0A0A0A", zIndex: 10 }}>
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="chapter-marker">What We Do</span>
              <h2 className="mt-4 font-black" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", fontFamily: "var(--font-display)", lineHeight: 1 }}>
                Our <span style={{ color: "#D16B28" }}>Services</span>
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-4">
            {services.map((svc, i) => (
              <ScrollReveal key={svc.slug} delay={i * 60}>
                <div className="group glass rounded-xl p-6 cursor-pointer h-full flex flex-col" onClick={() => setSelectedService(i)}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-lg" style={{ color: "rgba(209,107,40,0.7)" }}>{svc.icon}</span>
                    <span className="text-[8px] uppercase tracking-[0.3em]" style={{ color: "rgba(209,107,40,0.4)" }}>{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="text-base font-bold leading-tight" style={{ fontFamily: "var(--font-display)" }}>{svc.title}</h3>
                  <p className="mt-2 text-[11px] leading-relaxed flex-1" style={{ color: "rgba(255,255,255,0.4)" }}>{svc.blurb}</p>
                  <span className="mt-4 text-[9px] uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ color: "#D16B28" }}>Learn More →</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION: Contact / CTA ── */}
      <section id="contact" className="relative py-20 md:py-32 px-6 md:px-12" style={{ background: "#080808", zIndex: 10 }}>
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="chapter-marker">Get in Touch</span>
              <h2 className="mt-4 font-black" style={{ fontSize: "clamp(2rem, 6vw, 5rem)", fontFamily: "var(--font-display)", lineHeight: 1 }}>
                Let&apos;s Create Something <span style={{ color: "#D16B28" }}>Timeless</span>
              </h2>
              <p className="mt-4 text-sm max-w-md mx-auto" style={{ color: "rgba(255,255,255,0.4)" }}>Every great project begins with a conversation. Tell us about your vision.</p>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <ScrollReveal delay={100}>
              <form className="rounded-2xl p-6 md:p-8 space-y-5" style={{ border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)", backdropFilter: "blur(24px)" }} onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-[9px] uppercase tracking-[0.3em] mb-2" style={{ color: "rgba(209,107,40,0.6)" }}>Your Name</label>
                  <input type="text" className="w-full bg-transparent rounded-lg px-4 py-3 text-sm outline-none transition-colors duration-300" style={{ border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.8)" }} onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(209,107,40,0.4)")} onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")} placeholder="Enter your full name" />
                </div>
                <div>
                  <label className="block text-[9px] uppercase tracking-[0.3em] mb-2" style={{ color: "rgba(209,107,40,0.6)" }}>Email Address</label>
                  <input type="email" className="w-full bg-transparent rounded-lg px-4 py-3 text-sm outline-none transition-colors duration-300" style={{ border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.8)" }} onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(209,107,40,0.4)")} onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")} placeholder="your@email.com" />
                </div>
                <div>
                  <label className="block text-[9px] uppercase tracking-[0.3em] mb-2" style={{ color: "rgba(209,107,40,0.6)" }}>Project Type</label>
                  <select className="w-full bg-transparent rounded-lg px-4 py-3 text-sm outline-none transition-colors duration-300 appearance-none" style={{ border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)", background: "rgba(0,0,0,0.3)" }}>
                    <option value="">Select project type</option>
                    <option value="residential">Residential Architecture</option>
                    <option value="commercial">Commercial Architecture</option>
                    <option value="interior">Interior Design</option>
                    <option value="landscape">Landscape Design</option>
                    <option value="renovation">Renovation</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[9px] uppercase tracking-[0.3em] mb-2" style={{ color: "rgba(209,107,40,0.6)" }}>Your Message</label>
                  <textarea rows={4} className="w-full bg-transparent rounded-lg px-4 py-3 text-sm outline-none transition-colors duration-300 resize-none" style={{ border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.8)" }} onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(209,107,40,0.4)")} onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")} placeholder="Tell us about your project vision..." />
                </div>
                <button type="submit" className="w-full rounded-lg py-3.5 text-xs uppercase tracking-[0.35em] font-medium transition-all duration-500" style={{ background: "linear-gradient(135deg, #D16B28, #C9A96E)", color: "#0A0A0A", boxShadow: "0 4px 20px rgba(209,107,40,0.3)" }} onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 8px 40px rgba(209,107,40,0.5)")} onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 4px 20px rgba(209,107,40,0.3)")}>Send Inquiry</button>
              </form>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div className="space-y-8">
                {[
                  { icon: "◇", label: "Studio", value: studioInfo.location, sub: studioInfo.hours },
                  { icon: "○", label: "Email", value: studioInfo.email, href: `mailto:${studioInfo.email}` },
                  { icon: "△", label: "Phone", value: studioInfo.phone, href: `tel:${studioInfo.phone.replace(/\s/g, "")}` },
                  { icon: "◆", label: "Instagram", value: `@${studioInfo.instagram}`, href: studioInfo.instagramUrl },
                ].map((item) => (
                  <div key={item.label} className="flex gap-4">
                    <span className="text-lg mt-0.5 flex-shrink-0" style={{ color: "rgba(209,107,40,0.5)" }}>{item.icon}</span>
                    <div>
                      <h4 className="text-[9px] uppercase tracking-[0.4em] mb-1" style={{ color: "#D16B28" }}>{item.label}</h4>
                      {"href" in item && item.href ? (
                        <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="text-sm transition-colors duration-300" style={{ color: "rgba(255,255,255,0.6)" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#D16B28")} onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}>{item.value}</a>
                      ) : (
                        <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>{item.value}</p>
                      )}
                      {"sub" in item && item.sub && <p className="text-[10px] mt-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>{item.sub}</p>}
                    </div>
                  </div>
                ))}
                <div className="pt-6">
                  <h4 className="text-[9px] uppercase tracking-[0.4em] mb-4" style={{ color: "rgba(209,107,40,0.5)" }}>Follow Us</h4>
                  <div className="flex gap-3">
                    {[
                      { label: "Instagram", href: studioInfo.instagramUrl, d: "M2 7a5 5 0 0 1 5-5h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7z" },
                      { label: "WhatsApp", href: "https://wa.me/918341854527", d: "M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" },
                      { label: "Email", href: `mailto:${studioInfo.email}`, d: "M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6zm20-2L12 13 2 4" },
                    ].map((social) => (
                      <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300" style={{ border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)" }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(209,107,40,0.5)"; e.currentTarget.style.color = "#D16B28"; e.currentTarget.style.background = "rgba(209,107,40,0.08)"; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "rgba(255,255,255,0.4)"; e.currentTarget.style.background = "transparent"; }} aria-label={social.label}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d={social.d} /></svg>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="relative py-12 md:py-16 px-6 md:px-12" style={{ background: "#060606", borderTop: "1px solid rgba(255,255,255,0.04)", zIndex: 10 }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <div className="col-span-2 md:col-span-1">
              <span className="text-2xl font-black" style={{ fontFamily: "var(--font-display)", color: "#fff" }}>K8<span style={{ color: "#D16B28" }}>.</span></span>
              <p className="mt-3 text-[11px] leading-relaxed" style={{ color: "rgba(255,255,255,0.35)" }}>Architecture | Landscape | Interiors<br />Hyderabad, Telangana</p>
            </div>
            <div>
              <h4 className="text-[9px] uppercase tracking-[0.4em] mb-4" style={{ color: "#D16B28" }}>Studio</h4>
              <ul className="space-y-2">
                {[{ label: "About Us", href: "#about-studio" }, { label: "Our Team", href: "#founders" }, { label: "Projects", href: "#projects" }, { label: "Services", href: "#services-detail" }].map((link) => (
                  <li key={link.label}><a href={link.href} className="text-[11px] transition-colors duration-300" style={{ color: "rgba(255,255,255,0.35)" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#D16B28")} onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}>{link.label}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[9px] uppercase tracking-[0.4em] mb-4" style={{ color: "#D16B28" }}>Services</h4>
              <ul className="space-y-2">
                {services.slice(0, 5).map((svc) => (
                  <li key={svc.slug}><span className="text-[11px]" style={{ color: "rgba(255,255,255,0.35)" }}>{svc.title}</span></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[9px] uppercase tracking-[0.4em] mb-4" style={{ color: "#D16B28" }}>Connect</h4>
              <ul className="space-y-2">
                <li><a href={`mailto:${studioInfo.email}`} className="text-[11px] transition-colors duration-300" style={{ color: "rgba(255,255,255,0.35)" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#D16B28")} onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}>{studioInfo.email}</a></li>
                <li><a href={`tel:${studioInfo.phone.replace(/\s/g, "")}`} className="text-[11px] transition-colors duration-300" style={{ color: "rgba(255,255,255,0.35)" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#D16B28")} onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}>{studioInfo.phone}</a></li>
                <li><a href={studioInfo.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-[11px] transition-colors duration-300" style={{ color: "rgba(255,255,255,0.35)" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#D16B28")} onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}>@{studioInfo.instagram}</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
            <p className="text-[9px] uppercase tracking-[0.4em]" style={{ color: "rgba(255,255,255,0.15)" }}>© {new Date().getFullYear()} K8 Architecture Studio — All Rights Reserved</p>
            <p className="text-[9px] uppercase tracking-[0.4em]" style={{ color: "rgba(255,255,255,0.1)" }}>Designed with ◆ in Hyderabad</p>
          </div>
        </div>
      </footer>

      {/* ── Service Detail Modal ── */}
      {selectedService !== null && (
        <div
          className="service-modal-overlay"
          onClick={() => setSelectedService(null)}
          style={{ animation: "fadeInOverlay 0.35s ease forwards" }}
        >
          <div
            className="service-modal"
            onClick={(e) => e.stopPropagation()}
            style={{ animation: "fadeInModal 0.45s ease forwards" }}
          >
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-5 right-5 text-white hover:text-[#D16B28] transition-colors text-lg"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
              aria-label="Close modal"
            >
              ✕
            </button>

            <div className="flex items-center gap-3 mb-1">
              <span className="text-2xl" style={{ color: "#D16B28" }}>
                {services[selectedService].icon}
              </span>
              <span
                className="text-[9px] uppercase tracking-[0.5em]"
                style={{ color: "rgba(209,107,40,0.6)" }}
              >
                Service {String(selectedService + 1).padStart(2, "0")}
              </span>
            </div>

            <h2
              className="mt-3 font-black"
              style={{
                fontSize: "clamp(1.8rem, 4vw, 3.5rem)",
                fontFamily: "var(--font-display)",
              }}
            >
              {services[selectedService].title}
            </h2>

            <div className="ornament-line mt-5 w-20" />

            <p
              className="mt-6 text-sm leading-relaxed"
              style={{ color: "rgba(255,255,255,0.65)" }}
            >
              {services[selectedService].detail}
            </p>

            <div className="mt-8 grid grid-cols-3 gap-3">
              {["Discovery", "Design", "Deliver"].map((phase, i) => (
                <div
                  key={phase}
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
                    {phase}
                  </h4>
                  <p
                    className="mt-2 text-[10px] leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.35)" }}
                  >
                    {
                      [
                        "Site analysis, material sourcing, and spatial research to understand the project's essence.",
                        "Proportional studies, lighting plans, and artisan coordination for authentic execution.",
                        "Hands-on construction using the finest materials, with precision oversight at every stage.",
                      ][i]
                    }
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-between">
              {selectedService > 0 ? (
                <button
                  onClick={() =>
                    setSelectedService(selectedService - 1)
                  }
                  className="text-[9px] uppercase tracking-[0.3em] transition-colors duration-300"
                  style={{
                    color: "rgba(209,107,40,0.6)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#D16B28")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color =
                      "rgba(209,107,40,0.6)")
                  }
                >
                  ← {services[selectedService - 1].title}
                </button>
              ) : (
                <span />
              )}
              {selectedService < services.length - 1 ? (
                <button
                  onClick={() =>
                    setSelectedService(selectedService + 1)
                  }
                  className="text-[9px] uppercase tracking-[0.3em] transition-colors duration-300"
                  style={{
                    color: "rgba(209,107,40,0.6)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#D16B28")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color =
                      "rgba(209,107,40,0.6)")
                  }
                >
                  {services[selectedService + 1].title} →
                </button>
              ) : (
                <span />
              )}
            </div>
          </div>

          <style jsx>{`
            @keyframes fadeInOverlay {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }
            @keyframes fadeInModal {
              from {
                opacity: 0;
                transform: translateY(20px) scale(0.97);
              }
              to {
                opacity: 1;
                transform: translateY(0) scale(1);
              }
            }
          `}</style>
        </div>
      )}
    </>
  );
}
