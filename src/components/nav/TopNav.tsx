"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";
import type { ExperienceSection } from "@/lib/experience";

interface TopNavProps {
  sections: ExperienceSection[];
  activeSection: number;
  onNavigate: (index: number) => void;
}

export default function TopNav({
  sections,
  activeSection,
  onNavigate,
}: TopNavProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Close the menu on Escape.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const go = (index: number) => {
    setMenuOpen(false);
    onNavigate(index);
  };

  return (
    <header>
      <nav
        className="fixed inset-x-0 top-0 flex items-center justify-between px-5 py-4 sm:px-8 sm:py-5"
        // Sits above the fullscreen menu while open so the close (✕) toggle is
        // tappable; drops below the intro loader (z-100) when closed.
        style={{ zIndex: menuOpen ? 120 : 95 }}
        aria-label="Primary"
      >
        {/* Logo — hidden on phones (keeps the mobile bar clean) */}
        <button
          onClick={() => go(0)}
          className="hidden cursor-pointer border-none bg-transparent p-0 sm:block"
          aria-label="K8 Architecture Studio — go to start"
        >
          <Logo />
        </button>

        {/* Desktop links */}
        <ul className="hidden gap-8 text-xs uppercase tracking-[0.3em] lg:flex">
          {sections.map((s, i) => (
            <li key={s.id}>
              <button
                onClick={() => go(i)}
                className="relative cursor-pointer border-none bg-none py-1 transition-colors duration-300"
                aria-current={activeSection === i ? "true" : undefined}
                style={{
                  color:
                    activeSection === i ? "#D16B28" : "rgba(255,255,255,0.55)",
                  background: "none",
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

        {/* Mobile hamburger / close toggle */}
        <button
          className="-mr-2 ml-auto flex flex-col gap-1.5 p-2 lg:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          <span
            className="block h-0.5 w-7 rounded-full transition-all duration-300"
            style={{
              background: "#D16B28",
              transform: menuOpen ? "translateY(8px) rotate(45deg)" : "none",
            }}
          />
          <span
            className="block h-0.5 w-7 rounded-full transition-all duration-300"
            style={{ background: "#D16B28", opacity: menuOpen ? 0 : 1 }}
          />
          <span
            className="block h-0.5 w-7 rounded-full transition-all duration-300"
            style={{
              background: "#D16B28",
              transform: menuOpen ? "translateY(-8px) rotate(-45deg)" : "none",
            }}
          />
        </button>
      </nav>

      {/* Mobile fullscreen menu */}
      <div
        id="mobile-menu"
        aria-label="Mobile navigation"
        inert={!menuOpen}
        className="fixed inset-0 flex flex-col items-center justify-center gap-5 overflow-y-auto px-8 py-20 transition-all duration-500 lg:hidden"
        style={{
          zIndex: 100,
          background: "rgba(10,10,10,0.98)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          transform: menuOpen ? "translateY(0)" : "translateY(-12px)",
        }}
      >
        <span
          className="mb-2 text-3xl font-black"
          style={{ fontFamily: "var(--font-display)", color: "#fff" }}
        >
          K8<span style={{ color: "#D16B28" }}>.</span>
        </span>

        {sections.map((s, i) => (
          <button
            key={s.id}
            onClick={() => go(i)}
            className="cursor-pointer border-none bg-transparent text-center"
          >
            <span
              className="mb-1 block text-[9px] uppercase tracking-[0.5em]"
              style={{ color: "rgba(209,107,40,0.6)" }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span
              className="text-2xl font-black uppercase tracking-[0.15em]"
              style={{
                fontFamily: "var(--font-display)",
                color:
                  activeSection === i ? "#D16B28" : "rgba(255,255,255,0.85)",
              }}
            >
              {s.label}
            </span>
          </button>
        ))}

        <a
          href="#contact"
          onClick={() => setMenuOpen(false)}
          className="mt-4 rounded-full px-8 py-3 text-xs uppercase tracking-[0.3em]"
          style={{
            border: "1px solid rgba(209,107,40,0.4)",
            background: "rgba(209,107,40,0.1)",
            color: "#D16B28",
          }}
        >
          Get in Touch
        </a>
      </div>
    </header>
  );
}
