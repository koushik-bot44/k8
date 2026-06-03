import ScrollReveal from "@/components/ScrollReveal";

const STEPS = [
  {
    phase: "01",
    title: "Discover",
    icon: "◇",
    desc: "We begin with deep listening — understanding the site, the client's aspirations, and the cultural context.",
    details: [
      "Site & Context Analysis",
      "Client Brief & Visioning",
      "Material Palette Research",
      "Regulatory Framework",
    ],
  },
  {
    phase: "02",
    title: "Design",
    icon: "△",
    desc: "Concepts evolve through hand sketches, physical models, and 3D visualization until we achieve beauty, function, and buildability.",
    details: [
      "Concept Sketches & Massing",
      "3D Visualization & VR",
      "Technical Drawings",
      "Material Specifications",
    ],
  },
  {
    phase: "03",
    title: "Build",
    icon: "○",
    desc: "Our execution team brings designs to life with meticulous craftsmanship. We source materials personally and maintain on-site presence.",
    details: [
      "Artisan Coordination",
      "Construction Management",
      "Quality Inspections",
      "Material Sourcing",
    ],
  },
  {
    phase: "04",
    title: "Deliver",
    icon: "◆",
    desc: "The completed space is revealed — not just as a building, but as an experience. Every detail fine-tuned until the architecture breathes.",
    details: [
      "Final Detailing & Styling",
      "Landscape Installation",
      "Lighting Calibration",
      "Client Walkthrough",
    ],
  },
];

export default function ProcessSection() {
  return (
    <section
      id="process"
      className="relative px-6 py-20 md:px-12 md:py-32"
      style={{ background: "#080808", zIndex: 10 }}
    >
      <div className="mx-auto max-w-5xl">
        <ScrollReveal>
          <div className="mb-16 text-center">
            <span className="chapter-marker">Our Process</span>
            <h2
              className="mt-4 font-black"
              style={{
                fontSize: "clamp(2rem, 5vw, 4rem)",
                fontFamily: "var(--font-display)",
                lineHeight: 1,
              }}
            >
              From Vision to <span style={{ color: "#D16B28" }}>Reality</span>
            </h2>
          </div>
        </ScrollReveal>
        <div className="relative">
          <div
            className="absolute bottom-0 left-6 top-0 hidden w-px md:left-1/2 md:block"
            style={{
              background:
                "linear-gradient(to bottom, transparent, rgba(209,107,40,0.3), rgba(209,107,40,0.3), transparent)",
            }}
          />
          {STEPS.map((step, i) => (
            <ScrollReveal key={step.phase} delay={i * 120}>
              <div
                className={`relative mb-16 flex flex-col items-start gap-6 md:flex-row md:gap-12 ${
                  i % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="absolute left-1/2 top-6 z-10 hidden -translate-x-1/2 md:block">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{
                      background: "#D16B28",
                      boxShadow: "0 0 20px rgba(209,107,40,0.5)",
                    }}
                  />
                </div>
                <div className="md:w-1/2" />
                <div
                  className="glass rounded-xl p-6 md:w-1/2 md:p-8"
                  style={{ background: "rgba(0,0,0,0.5)" }}
                >
                  <div className="mb-3 flex items-center gap-3">
                    <span className="text-xl" style={{ color: "#D16B28" }}>
                      {step.icon}
                    </span>
                    <span
                      className="text-[9px] uppercase tracking-[0.4em]"
                      style={{ color: "rgba(209,107,40,0.5)" }}
                    >
                      Phase {step.phase}
                    </span>
                  </div>
                  <h3
                    className="text-xl font-black md:text-2xl"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="mt-3 text-xs leading-relaxed md:text-sm"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    {step.desc}
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {step.details.map((d) => (
                      <div
                        key={d}
                        className="flex items-center gap-2 text-[10px]"
                        style={{ color: "rgba(255,255,255,0.35)" }}
                      >
                        <span
                          className="h-1 w-1 flex-shrink-0 rounded-full"
                          style={{ background: "rgba(209,107,40,0.5)" }}
                        />
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
  );
}
