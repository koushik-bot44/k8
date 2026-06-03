import { studioInfo } from "@/lib/team";

const SITE_URL = "https://www.k8architecturestudio.com";

/**
 * JSON-LD structured data so search engines understand K8 as a local
 * architecture practice (rich results, knowledge panel eligibility).
 */
export default function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#organization`,
    name: studioInfo.name,
    description:
      "K8 Architecture Studio — architecture, landscape and interior design practice in Hyderabad blending traditional Indian craft with contemporary minimalism.",
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`,
    image: `${SITE_URL}/images/master-bg.jpg`,
    email: studioInfo.email,
    telephone: studioInfo.phone,
    foundingDate: "2019",
    areaServed: "IN",
    priceRange: "$$$",
    knowsAbout: [
      "Architecture",
      "Landscape Design",
      "Interior Design",
      "Sustainable Design",
      "Contextual Modernism",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hyderabad",
      addressRegion: "Telangana",
      addressCountry: "IN",
    },
    sameAs: [studioInfo.instagramUrl],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
