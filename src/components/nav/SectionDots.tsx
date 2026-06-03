import type { ExperienceSection } from "@/lib/experience";

interface SectionDotsProps {
  sections: ExperienceSection[];
  activeSection: number;
  onNavigate: (index: number) => void;
}

/** Vertical room indicator dots, fixed to the right edge. */
export default function SectionDots({
  sections,
  activeSection,
  onNavigate,
}: SectionDotsProps) {
  return (
    <nav
      className="section-dots"
      style={{ zIndex: 90 }}
      aria-label="Room navigation"
    >
      {sections.map((s, i) => (
        <button
          key={s.id}
          className={`section-dot ${activeSection === i ? "active" : ""}`}
          data-label={s.label}
          onClick={() => onNavigate(i)}
          aria-label={`Go to ${s.label}`}
          aria-current={activeSection === i ? "true" : undefined}
        />
      ))}
    </nav>
  );
}
