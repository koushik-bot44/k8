import PanelShell from "./PanelShell";
import { projects } from "@/lib/projects";

const FEATURED = projects.slice(0, 3);

export default function ProjectsPanel() {
  return (
    <PanelShell id="panel-3" contentClassName="mx-auto max-w-4xl">
      <span className="panel-content chapter-marker mb-5 sm:mb-6">
        Selected Works
      </span>

      <h2
        className="panel-content font-black"
        style={{
          fontSize: "clamp(2.5rem, 7vw, 7rem)",
          fontFamily: "var(--font-display)",
          lineHeight: 0.9,
          textShadow: "0 4px 50px rgba(0,0,0,0.9)",
        }}
      >
        Projects That
        <br />
        <span style={{ color: "#D16B28" }}>Endure</span>
      </h2>

      <p
        className="panel-content mt-6 max-w-lg text-sm leading-relaxed sm:mt-7"
        style={{
          color: "rgba(255,255,255,0.6)",
          textShadow: "0 2px 12px rgba(0,0,0,0.8)",
        }}
      >
        Each project is a dialogue between site, material, and the lives that
        unfold within. A glimpse of our recent work.
      </p>

      <div className="panel-content mt-8 grid w-full max-w-2xl grid-cols-1 gap-3 sm:mt-10 sm:grid-cols-3">
        {FEATURED.map((project) => (
          <a
            key={project.slug}
            href="#projects"
            className="svc-card group rounded-lg px-5 py-4 text-left"
            style={{
              border: "1px solid rgba(255,255,255,0.06)",
              background: "rgba(0,0,0,0.5)",
              backdropFilter: "blur(24px)",
            }}
          >
            <span
              className="text-[8px] uppercase tracking-[0.3em]"
              style={{ color: "rgba(209,107,40,0.6)" }}
            >
              {project.category}
            </span>
            <h3
              className="mt-1.5 text-sm font-bold leading-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {project.title}
            </h3>
            <p
              className="mt-1 text-[10px]"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              {project.location}
            </p>
            <span
              className="mt-3 inline-block text-[8px] uppercase tracking-[0.3em] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{ color: "#D16B28" }}
            >
              View →
            </span>
          </a>
        ))}
      </div>

      <a
        href="#projects"
        className="panel-content mt-7 inline-block text-[10px] uppercase tracking-[0.4em] transition-colors duration-300"
        style={{ color: "rgba(209,107,40,0.7)" }}
      >
        See all projects →
      </a>
    </PanelShell>
  );
}
