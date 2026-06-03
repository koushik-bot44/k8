import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import { team } from "@/lib/team";

export default function FoundersSection() {
  return (
    <section
      id="founders"
      className="relative px-6 py-20 md:px-12 md:py-32"
      style={{ background: "#080808", zIndex: 10 }}
    >
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <div className="mb-16 text-center">
            <span className="chapter-marker">The Architects</span>
            <h2
              className="mt-4 font-black"
              style={{
                fontSize: "clamp(2rem, 5vw, 4rem)",
                fontFamily: "var(--font-display)",
                lineHeight: 1,
              }}
            >
              Minds Behind <span style={{ color: "#D16B28" }}>K8</span>
            </h2>
          </div>
        </ScrollReveal>
        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          {team.map((member, idx) => (
            <ScrollReveal key={member.name} delay={idx * 150}>
              <div
                className="group overflow-hidden rounded-2xl transition-all duration-700"
                style={{
                  border: "1px solid rgba(255,255,255,0.06)",
                  background: "rgba(255,255,255,0.02)",
                }}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0.1) 50%, transparent 100%)",
                    }}
                  />
                  <div className="absolute bottom-4 left-5 right-5">
                    <div
                      className="mb-1 text-[9px] uppercase tracking-[0.4em]"
                      style={{ color: "#D16B28" }}
                    >
                      {member.role}
                    </div>
                    <h3
                      className="text-xl font-black md:text-2xl"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {member.name}
                    </h3>
                  </div>
                </div>
                <div className="p-5 md:p-7">
                  <p
                    className="text-xs leading-relaxed md:text-sm"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    {member.bio}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {member.specializations.map((s) => (
                      <span
                        key={s}
                        className="rounded-full px-3 py-1 text-[9px] uppercase tracking-[0.15em]"
                        style={{
                          border: "1px solid rgba(255,255,255,0.08)",
                          color: "rgba(255,255,255,0.4)",
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <a
                    href={`https://www.instagram.com/${member.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] transition-colors duration-300"
                    style={{ color: "rgba(209,107,40,0.5)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#D16B28")}
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "rgba(209,107,40,0.5)")
                    }
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect x="2" y="2" width="20" height="20" rx="5" />
                      <circle cx="12" cy="12" r="5" />
                    </svg>
                    @{member.instagram}
                  </a>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
