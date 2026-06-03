export interface TeamMember {
  name: string;
  role: string;
  instagram: string;
  image: string;
  bio: string;
  specializations: string[];
}

export const team: TeamMember[] = [
  {
    name: "Nikhitha Jinnapally",
    role: "Founder & Principal Architect",
    instagram: "nikhitha_jinnapally",
    image: "/images/founder-nikhitha.png",
    bio: "With a vision rooted in contextual modernism, Nikhitha founded K8 Architecture Studio to bridge the gap between India's rich architectural heritage and contemporary design sensibility. Her work explores materiality, light, and the poetic relationship between built form and landscape.",
    specializations: [
      "Contextual Design",
      "Material Research",
      "Spatial Planning",
      "Design Leadership",
    ],
  },
  {
    name: "Nikhi",
    role: "Partner & Execution Head",
    instagram: "nikhi_q0",
    image: "/images/partner-nikhi.png",
    bio: "Nikhi brings architectural visions to life through meticulous execution and construction management. His deep understanding of materials, craftsmanship, and structural systems ensures every K8 project achieves the highest standards of build quality and detail.",
    specializations: [
      "Construction Management",
      "Structural Coordination",
      "Material Sourcing",
      "Quality Control",
    ],
  },
];

export const studioInfo = {
  name: "K8 Architecture Studio",
  tagline: "Architecture | Landscape | Interiors",
  instagram: "k8.architecturestudio",
  instagramUrl: "https://www.instagram.com/k8.architecturestudio",
  email: "nikhithajinnapally@k8architecturestudio.com",
  phone: "+91 83418 54527",
  location: "Hyderabad, Telangana, India",
  hours: "Mon – Fri, 10:00 AM – 6:00 PM IST",
  stats: {
    projects: 103,
    yearsExperience: 5,
    teamSize: 12,
    followers: 1765,
  },
};
