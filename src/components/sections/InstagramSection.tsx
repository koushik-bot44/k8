import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import { studioInfo } from "@/lib/team";

const GALLERY = [
  { src: "/images/interiors/livinghall.jpg", label: "Living Hall" },
  { src: "/images/interiors/tvunit.jpg", label: "TV Unit & Media Wall" },
  { src: "/images/interiors/kitchen.jpg", label: "Modular Kitchen" },
  { src: "/images/interiors/bedroom.jpg", label: "Bedroom Suite" },
  { src: "/images/interiors/dinning.jpg", label: "Dining Space" },
  { src: "/images/interiors/wardrope.jpg", label: "Wardrobe & Joinery" },
];

export default function InstagramSection() {
  return (
    <section
      id="instagram-feed"
      className="relative px-6 py-20 md:px-12 md:py-32"
      style={{ background: "#0A0A0A", zIndex: 10 }}
    >
      <div className="mx-auto max-w-7xl">
        <ScrollReveal>
          <div className="mb-12 text-center">
            <span className="chapter-marker">From Our Studio</span>
            <h2
              className="mt-4 font-black"
              style={{
                fontSize: "clamp(2rem, 5vw, 4rem)",
                fontFamily: "var(--font-display)",
                lineHeight: 1,
              }}
            >
              Behind the <span style={{ color: "#D16B28" }}>Scenes</span>
            </h2>
            <p
              className="mx-auto mt-4 max-w-lg text-xs md:text-sm"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              A glimpse of our interior design work — living halls, kitchens,
              bedrooms and bespoke joinery brought to life.
            </p>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {GALLERY.map((item, i) => (
            <ScrollReveal key={item.src} delay={i * 60}>
              <div className="group relative aspect-[4/5] cursor-pointer overflow-hidden rounded-lg">
                <Image
                  src={item.src}
                  alt={`${item.label} — interior design by K8 Architecture Studio`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div
                  className="absolute inset-0 flex items-end p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(10,10,10,0.85) 0%, transparent 60%)",
                  }}
                >
                  <span
                    className="text-[10px] uppercase tracking-[0.2em]"
                    style={{ color: "rgba(255,255,255,0.8)" }}
                  >
                    {item.label}
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal delay={200}>
          <div className="mt-10 text-center">
            <a
              href={studioInfo.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full px-8 py-3.5 transition-all duration-500"
              style={{
                border: "1px solid rgba(209,107,40,0.3)",
                background: "rgba(209,107,40,0.06)",
                backdropFilter: "blur(20px)",
                color: "rgba(209,107,40,0.7)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#D16B28";
                e.currentTarget.style.boxShadow = "0 0 40px rgba(209,107,40,0.25)";
                e.currentTarget.style.color = "#D16B28";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(209,107,40,0.3)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.color = "rgba(209,107,40,0.7)";
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
              </svg>
              <span className="text-xs font-medium uppercase tracking-[0.3em]">
                Follow on Instagram
              </span>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
