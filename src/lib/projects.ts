export interface Project {
  slug: string;
  title: string;
  category: "Architecture" | "Landscape" | "Interiors";
  location: string;
  year: string;
  area: string;
  image: string;
  description: string;
  features: string[];
}

export const projects: Project[] = [
  {
    slug: "terra-villa",
    title: "Terra Villa Residence",
    category: "Architecture",
    location: "Jubilee Hills, Hyderabad",
    year: "2024",
    area: "8,500 sq.ft",
    image: "/images/project-villa.png",
    description:
      "A contemporary family residence that bridges traditional Indian courtyard planning with modern minimalism. Terracotta cladding and exposed concrete frame lush interior gardens visible from every room.",
    features: [
      "Double-height living pavilion",
      "Central courtyard with water body",
      "Terracotta jali screens",
      "Passive cooling design",
    ],
  },
  {
    slug: "green-canopy",
    title: "Green Canopy Gardens",
    category: "Landscape",
    location: "Banjara Hills, Hyderabad",
    year: "2024",
    area: "12,000 sq.ft",
    image: "/images/project-landscape.png",
    description:
      "A terraced landscape masterpiece integrating native plantings, stone pathways, and reflective water channels. The design creates a meditative journey through ascending garden rooms.",
    features: [
      "Terraced water cascade",
      "Native xeriscaping",
      "Outdoor pavilion with firepit",
      "Automated irrigation system",
    ],
  },
  {
    slug: "amber-house",
    title: "Amber House Interiors",
    category: "Interiors",
    location: "Gachibowli, Hyderabad",
    year: "2023",
    area: "6,200 sq.ft",
    image: "/images/project-interior.png",
    description:
      "A sculptural interior transformation featuring a sweeping timber staircase, double-height concrete walls warmed by teak paneling, and curated art integrated into the architecture itself.",
    features: [
      "Sculptural spiral staircase",
      "Custom teak wall paneling",
      "Integrated art gallery lighting",
      "Biophilic design throughout",
    ],
  },
  {
    slug: "aura-offices",
    title: "Aura Office Complex",
    category: "Architecture",
    location: "HITEC City, Hyderabad",
    year: "2023",
    area: "45,000 sq.ft",
    image: "/images/project-commercial.png",
    description:
      "A boutique commercial building that redefines the workspace with terracotta facade screens, vertical gardens, and naturally ventilated corridors. Daylight harvesting reduces energy use by 40%.",
    features: [
      "Terracotta parametric facade",
      "Living green walls",
      "Daylight harvesting atrium",
      "IGBC Gold rated",
    ],
  },
  {
    slug: "stone-retreat",
    title: "Stone Retreat Farmhouse",
    category: "Architecture",
    location: "Shamshabad, Hyderabad",
    year: "2024",
    area: "4,800 sq.ft",
    image: "/images/rooms/01-entrance.png",
    description:
      "A weekend retreat carved from local stone and timber, blending seamlessly into the rocky Deccan landscape. Massive pivoting doors dissolve the boundary between indoors and the surrounding hills.",
    features: [
      "Local Deccan stone construction",
      "10ft pivoting entry doors",
      "Infinity-edge plunge pool",
      "Off-grid solar system",
    ],
  },
  {
    slug: "courtyard-home",
    title: "The Courtyard Home",
    category: "Interiors",
    location: "Kondapur, Hyderabad",
    year: "2023",
    area: "5,500 sq.ft",
    image: "/images/rooms/03-courtyard.png",
    description:
      "Interior reimagination of a traditional haveli-style courtyard home. Jali screens cast moving shadow patterns throughout the day while lime-plastered walls create a cool, luminous atmosphere.",
    features: [
      "Hand-carved jali screens",
      "Lime plaster finishes",
      "Sunken living area",
      "Integrated indoor garden",
    ],
  },
];

export const categories = ["All", "Architecture", "Landscape", "Interiors"] as const;
