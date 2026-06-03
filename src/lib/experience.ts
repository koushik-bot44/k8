/** Static metadata for the five-room architectural walkthrough. */
export interface ExperienceSection {
  id: string;
  label: string;
  room: string;
}

export const SECTIONS: ExperienceSection[] = [
  { id: "entrance", label: "The Entrance", room: "Entrance Gallery" },
  { id: "bridge", label: "The Bridge", room: "Floating Walkway" },
  { id: "courtyard", label: "The Courtyard", room: "Open Courtyard" },
  { id: "corridor", label: "The Corridor", room: "Grand Corridor" },
  { id: "sanctum", label: "The Sanctum", room: "Inner Sanctum" },
];
