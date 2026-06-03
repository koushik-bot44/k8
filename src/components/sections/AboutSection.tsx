import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import { studioInfo } from "@/lib/team";

const TAGS = [
  "Contextual Modernism",
  "Sustainable Design",
  "Material Craft",
  "Biophilic Design",
];

export default function AboutSection() {
  return (
    <section
      id="about-studio"
      className="relative px-6 py-20 md:px-12 md:py-32"
      style={{ background: "#0A0A0A", zIndex: 10 }}
    >
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <div className="mb-4 flex items-center gap-4">
            <div className="ornament-line max-w-[80px] flex-1" />
            <span className="chapter-marker">About the Studio</span>
            <div className="ornament-line max-w-[80px] flex-1" />
          </div>
        </ScrollReveal>

        <div className="mt-12 grid items-center gap-12 md:grid-cols-2 md:gap-20">
          <ScrollReveal delay={100}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="/images/heritage-bg.jpg"
                alt="K8 Architecture Studio"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(10,10,10,0.7) 0%, transparent 50%)",
                }}
              />
              <div className="absolute bottom-6 left-6">
                <span
                  className="text-[9px] uppercase tracking-[0.5em]"
                  style={{ color: "rgba(209,107,40,0.7)" }}
                >
                  Est. 2019 — Hyderabad
                </span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <h2
              className="font-black"
              style={{
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                fontFamily: "var(--font-display)",
                lineHeight: 1.05,
              }}
            >
              Architecture <span style={{ color: "#D16B28" }}>|</span> Landscape{" "}
              <span style={{ color: "#D16B28" }}>|</span> Interiors
            </h2>
            <p
              className="mt-6 text-sm leading-relaxed md:text-base"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              K8 Architecture Studio is a design practice rooted in the belief
              that architecture must honour its context — the land it sits on,
              the climate that shapes it, and the culture that inhabits it. We
              work across scales, from intimate interior transformations to
              sweeping landscape interventions.
            </p>
            <p
              className="mt-4 text-sm leading-relaxed md:text-base"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              Our studio blends the spatial wisdom of traditional Indian
              architecture — courtyards, jali screens, water channels — with the
              precision and minimalism of contemporary practice.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {TAGS.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full px-4 py-1.5 text-[10px] uppercase tracking-[0.2em]"
                  style={{
                    border: "1px solid rgba(209,107,40,0.3)",
                    color: "rgba(209,107,40,0.7)",
                    background: "rgba(209,107,40,0.05)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <a
              href={studioInfo.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] transition-colors duration-300"
              style={{ color: "rgba(209,107,40,0.6)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#D16B28")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(209,107,40,0.6)")
              }
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
              </svg>
              @{studioInfo.instagram}
            </a>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
