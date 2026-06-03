/** Static metadata for the five-room architectural walkthrough. */
export interface ExperienceSection {
  id: string;
  label: string;
  room: string;
}

export const SECTIONS: ExperienceSection[] = [
  { id: "home", label: "Home", room: "Welcome" },
  { id: "about", label: "About", room: "The Studio" },
  { id: "services", label: "Services", room: "What We Do" },
  { id: "projects", label: "Projects", room: "Selected Works" },
  { id: "contact", label: "Contact", room: "Get in Touch" },
];
