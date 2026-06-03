import ScrollReveal from "@/components/ScrollReveal";
import { services } from "@/lib/services";

interface ServicesSectionProps {
  onOpenService: (index: number) => void;
}

export default function ServicesSection({
  onOpenService,
}: ServicesSectionProps) {
  return (
    <section
      id="services-detail"
      className="relative px-6 py-20 md:px-12 md:py-32"
      style={{ background: "#0A0A0A", zIndex: 10 }}
    >
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <div className="mb-16 text-center">
            <span className="chapter-marker">What We Do</span>
            <h2
              className="mt-4 font-black"
              style={{
                fontSize: "clamp(2rem, 5vw, 4rem)",
                fontFamily: "var(--font-display)",
                lineHeight: 1,
              }}
            >
              Our <span style={{ color: "#D16B28" }}>Services</span>
            </h2>
          </div>
        </ScrollReveal>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {services.map((svc, i) => (
            <ScrollReveal key={svc.slug} delay={i * 60}>
              <button
                type="button"
                className="group glass flex h-full w-full cursor-pointer flex-col rounded-xl p-6 text-left"
                onClick={() => onOpenService(i)}
              >
                <div className="mb-3 flex items-center gap-3">
                  <span
                    className="text-lg"
                    style={{ color: "rgba(209,107,40,0.7)" }}
                  >
                    {svc.icon}
                  </span>
                  <span
                    className="text-[8px] uppercase tracking-[0.3em]"
                    style={{ color: "rgba(209,107,40,0.4)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3
                  className="text-base font-bold leading-tight"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {svc.title}
                </h3>
                <p
                  className="mt-2 flex-1 text-[11px] leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  {svc.blurb}
                </p>
                <span
                  className="mt-4 text-[9px] uppercase tracking-[0.3em] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ color: "#D16B28" }}
                >
                  Learn More →
                </span>
              </button>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
