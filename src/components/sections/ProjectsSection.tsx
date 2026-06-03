import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import { projects } from "@/lib/projects";

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative px-6 py-20 md:px-12 md:py-32"
      style={{ background: "#0A0A0A", zIndex: 10 }}
    >
      <div className="mx-auto max-w-7xl">
        <ScrollReveal>
          <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <span className="chapter-marker">Portfolio</span>
              <h2
                className="mt-4 font-black"
                style={{
                  fontSize: "clamp(2rem, 5vw, 4rem)",
                  fontFamily: "var(--font-display)",
                  lineHeight: 1,
                }}
              >
                Selected <span style={{ color: "#D16B28" }}>Works</span>
              </h2>
            </div>
            <p
              className="max-w-md text-xs leading-relaxed md:text-sm"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              Each project is a dialogue between site, material, and the lives
              that will unfold within.
            </p>
          </div>
        </ScrollReveal>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, idx) => (
            <ScrollReveal key={project.slug} delay={idx * 80}>
              <div
                className="group relative cursor-pointer overflow-hidden rounded-xl"
                style={{
                  border: "1px solid rgba(255,255,255,0.05)",
                  background: "rgba(0,0,0,0.4)",
                }}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div
                    className="absolute inset-0 transition-opacity duration-500"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.2) 40%, transparent 100%)",
                    }}
                  />
                  <div className="absolute left-4 top-4">
                    <span
                      className="rounded-full px-3 py-1 text-[8px] uppercase tracking-[0.25em]"
                      style={{
                        background: "rgba(209,107,40,0.2)",
                        border: "1px solid rgba(209,107,40,0.3)",
                        color: "#D16B28",
                        backdropFilter: "blur(12px)",
                      }}
                    >
                      {project.category}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3
                    className="text-base font-black leading-tight md:text-lg"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {project.title}
                  </h3>
                  <div
                    className="mt-1.5 flex items-center gap-3 text-[10px] uppercase tracking-[0.15em]"
                    style={{ color: "rgba(255,255,255,0.35)" }}
                  >
                    <span>{project.location}</span>
                    <span style={{ color: "rgba(209,107,40,0.4)" }}>•</span>
                    <span>{project.year}</span>
                    <span style={{ color: "rgba(209,107,40,0.4)" }}>•</span>
                    <span>{project.area}</span>
                  </div>
                  <p
                    className="mt-3 text-[11px] leading-relaxed"
                    style={{
                      color: "rgba(255,255,255,0.4)",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {project.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.features.slice(0, 2).map((f) => (
                      <span
                        key={f}
                        className="rounded-full px-2.5 py-1 text-[8px] uppercase tracking-[0.15em]"
                        style={{
                          border: "1px solid rgba(255,255,255,0.06)",
                          color: "rgba(255,255,255,0.3)",
                        }}
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                  <span
                    className="mt-4 inline-block text-[9px] uppercase tracking-[0.3em] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ color: "#D16B28" }}
                  >
                    View Project →
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
