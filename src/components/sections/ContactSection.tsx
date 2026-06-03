"use client";

import ScrollReveal from "@/components/ScrollReveal";
import { studioInfo } from "@/lib/team";

const PROJECT_TYPES = [
  { value: "residential", label: "Residential Architecture" },
  { value: "commercial", label: "Commercial Architecture" },
  { value: "interior", label: "Interior Design" },
  { value: "landscape", label: "Landscape Design" },
  { value: "renovation", label: "Renovation" },
];

const SOCIALS = [
  {
    label: "Instagram",
    href: studioInfo.instagramUrl,
    d: "M2 7a5 5 0 0 1 5-5h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7z",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/918341854527",
    d: "M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z",
  },
  {
    label: "Email",
    href: `mailto:${studioInfo.email}`,
    d: "M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6zm20-2L12 13 2 4",
  },
];

const inputStyle = {
  border: "1px solid rgba(255,255,255,0.08)",
  color: "rgba(255,255,255,0.8)",
} as const;

const focusOn = (e: React.FocusEvent<HTMLElement>) =>
  (e.currentTarget.style.borderColor = "rgba(209,107,40,0.4)");
const focusOff = (e: React.FocusEvent<HTMLElement>) =>
  (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)");

export default function ContactSection() {
  const contactItems = [
    {
      icon: "◇",
      label: "Studio",
      value: studioInfo.location,
      sub: studioInfo.hours,
    },
    {
      icon: "○",
      label: "Email",
      value: studioInfo.email,
      href: `mailto:${studioInfo.email}`,
    },
    {
      icon: "△",
      label: "Phone",
      value: studioInfo.phone,
      href: `tel:${studioInfo.phone.replace(/\s/g, "")}`,
    },
    {
      icon: "◆",
      label: "Instagram",
      value: `@${studioInfo.instagram}`,
      href: studioInfo.instagramUrl,
    },
  ];

  return (
    <section
      id="contact"
      className="relative px-6 py-20 md:px-12 md:py-32"
      style={{ background: "#080808", zIndex: 10 }}
    >
      <div className="mx-auto max-w-5xl">
        <ScrollReveal>
          <div className="mb-14 text-center">
            <span className="chapter-marker">Get in Touch</span>
            <h2
              className="mt-4 font-black"
              style={{
                fontSize: "clamp(2rem, 6vw, 5rem)",
                fontFamily: "var(--font-display)",
                lineHeight: 1,
              }}
            >
              Let&apos;s Create Something{" "}
              <span style={{ color: "#D16B28" }}>Timeless</span>
            </h2>
            <p
              className="mx-auto mt-4 max-w-md text-sm"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              Every great project begins with a conversation. Tell us about your
              vision.
            </p>
          </div>
        </ScrollReveal>
        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          <ScrollReveal delay={100}>
            <form
              className="space-y-5 rounded-2xl p-6 md:p-8"
              style={{
                border: "1px solid rgba(255,255,255,0.06)",
                background: "rgba(255,255,255,0.02)",
                backdropFilter: "blur(24px)",
              }}
              onSubmit={(e) => e.preventDefault()}
            >
              <div>
                <label
                  className="mb-2 block text-[9px] uppercase tracking-[0.3em]"
                  style={{ color: "rgba(209,107,40,0.6)" }}
                >
                  Your Name
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg bg-transparent px-4 py-3 text-sm outline-none transition-colors duration-300"
                  style={inputStyle}
                  onFocus={focusOn}
                  onBlur={focusOff}
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label
                  className="mb-2 block text-[9px] uppercase tracking-[0.3em]"
                  style={{ color: "rgba(209,107,40,0.6)" }}
                >
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full rounded-lg bg-transparent px-4 py-3 text-sm outline-none transition-colors duration-300"
                  style={inputStyle}
                  onFocus={focusOn}
                  onBlur={focusOff}
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label
                  className="mb-2 block text-[9px] uppercase tracking-[0.3em]"
                  style={{ color: "rgba(209,107,40,0.6)" }}
                >
                  Project Type
                </label>
                <select
                  className="w-full appearance-none rounded-lg bg-transparent px-4 py-3 text-sm outline-none transition-colors duration-300"
                  style={{
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "rgba(255,255,255,0.5)",
                    background: "rgba(0,0,0,0.3)",
                  }}
                >
                  <option value="">Select project type</option>
                  {PROJECT_TYPES.map((p) => (
                    <option key={p.value} value={p.value}>
                      {p.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  className="mb-2 block text-[9px] uppercase tracking-[0.3em]"
                  style={{ color: "rgba(209,107,40,0.6)" }}
                >
                  Your Message
                </label>
                <textarea
                  rows={4}
                  className="w-full resize-none rounded-lg bg-transparent px-4 py-3 text-sm outline-none transition-colors duration-300"
                  style={inputStyle}
                  onFocus={focusOn}
                  onBlur={focusOff}
                  placeholder="Tell us about your project vision..."
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-lg py-3.5 text-xs font-medium uppercase tracking-[0.35em] transition-all duration-500"
                style={{
                  background: "linear-gradient(135deg, #D16B28, #C9A96E)",
                  color: "#0A0A0A",
                  boxShadow: "0 4px 20px rgba(209,107,40,0.3)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0 8px 40px rgba(209,107,40,0.5)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0 4px 20px rgba(209,107,40,0.3)")
                }
              >
                Send Inquiry
              </button>
            </form>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <div className="space-y-8">
              {contactItems.map((item) => (
                <div key={item.label} className="flex gap-4">
                  <span
                    className="mt-0.5 flex-shrink-0 text-lg"
                    style={{ color: "rgba(209,107,40,0.5)" }}
                  >
                    {item.icon}
                  </span>
                  <div className="min-w-0">
                    <h4
                      className="mb-1 text-[9px] uppercase tracking-[0.4em]"
                      style={{ color: "#D16B28" }}
                    >
                      {item.label}
                    </h4>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="break-words text-sm transition-colors duration-300"
                        style={{ color: "rgba(255,255,255,0.6)" }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = "#D16B28")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color = "rgba(255,255,255,0.6)")
                        }
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p
                        className="break-words text-sm"
                        style={{ color: "rgba(255,255,255,0.6)" }}
                      >
                        {item.value}
                      </p>
                    )}
                    {item.sub && (
                      <p
                        className="mt-0.5 text-[10px]"
                        style={{ color: "rgba(255,255,255,0.3)" }}
                      >
                        {item.sub}
                      </p>
                    )}
                  </div>
                </div>
              ))}
              <div className="pt-6">
                <h4
                  className="mb-4 text-[9px] uppercase tracking-[0.4em]"
                  style={{ color: "rgba(209,107,40,0.5)" }}
                >
                  Follow Us
                </h4>
                <div className="flex gap-3">
                  {SOCIALS.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300"
                      style={{
                        border: "1px solid rgba(255,255,255,0.08)",
                        color: "rgba(255,255,255,0.4)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "rgba(209,107,40,0.5)";
                        e.currentTarget.style.color = "#D16B28";
                        e.currentTarget.style.background = "rgba(209,107,40,0.08)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                        e.currentTarget.style.color = "rgba(255,255,255,0.4)";
                        e.currentTarget.style.background = "transparent";
                      }}
                      aria-label={social.label}
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path d={social.d} />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
