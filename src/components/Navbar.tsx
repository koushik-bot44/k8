"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Vision" },
  { href: "/craft", label: "Craft" },
  { href: "/structure", label: "Structure" },
  { href: "/legacy", label: "Legacy" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      className="fixed inset-x-0 top-0 flex items-center justify-between px-8 py-5"
      style={{ zIndex: 50, mixBlendMode: "difference" }}
    >
      <Link
        href="/"
        className="text-2xl font-black tracking-tight text-white"
        style={{ fontFamily: "var(--font-display)" }}
      >
        K8<span style={{ color: "#D16B28" }}>.</span>
      </Link>

      {/* Desktop nav */}
      <ul className="hidden md:flex gap-8 text-xs uppercase tracking-[0.3em] text-white">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="relative py-1 transition-colors duration-300"
              style={{
                color: pathname === l.href ? "#D16B28" : undefined,
              }}
            >
              {l.label}
              {pathname === l.href && (
                <span
                  className="absolute bottom-0 left-0 h-px w-full"
                  style={{ background: "#D16B28" }}
                />
              )}
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile burger */}
      <button
        className="md:hidden flex flex-col gap-1.5"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        <span
          className="block h-px w-6 transition-all duration-300"
          style={{
            background: "#D16B28",
            transform: mobileOpen ? "rotate(45deg) translateY(4px)" : undefined,
          }}
        />
        <span
          className="block h-px w-6 transition-all duration-300"
          style={{
            background: "#D16B28",
            opacity: mobileOpen ? 0 : 1,
          }}
        />
        <span
          className="block h-px w-6 transition-all duration-300"
          style={{
            background: "#D16B28",
            transform: mobileOpen ? "rotate(-45deg) translateY(-4px)" : undefined,
          }}
        />
      </button>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="fixed inset-0 top-16 flex flex-col items-center gap-8 pt-20 md:hidden"
          style={{ background: "rgba(13,13,13,0.95)", zIndex: 49 }}
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-2xl font-black uppercase tracking-[0.3em] text-white transition-colors"
              style={{ color: pathname === l.href ? "#D16B28" : undefined }}
              onClick={() => setMobileOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
