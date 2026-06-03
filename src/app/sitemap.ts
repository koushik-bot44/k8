import type { MetadataRoute } from "next";

const SITE_URL = "https://www.k8architecturestudio.com";

const SECTIONS = [
  "about-studio",
  "founders",
  "projects",
  "process",
  "instagram-feed",
  "services-detail",
  "contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-06-03");
  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...SECTIONS.map((id) => ({
      url: `${SITE_URL}/#${id}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
