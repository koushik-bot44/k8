import { services } from "@/lib/services";
import { studioInfo } from "@/lib/team";

const STUDIO_LINKS = [
  { label: "About Us", href: "#about-studio" },
  { label: "Our Team", href: "#founders" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services-detail" },
];

const hoverIn = (e: React.MouseEvent<HTMLAnchorElement>) =>
  (e.currentTarget.style.color = "#D16B28");
const hoverOut = (e: React.MouseEvent<HTMLAnchorElement>) =>
  (e.currentTarget.style.color = "rgba(255,255,255,0.35)");

export default function SiteFooter() {
  return (
    <footer
      className="relative px-6 py-12 md:px-12 md:py-16"
      style={{
        background: "#060606",
        borderTop: "1px solid rgba(255,255,255,0.04)",
        zIndex: 10,
      }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
          <div className="col-span-2 md:col-span-1">
            <span
              className="text-2xl font-black"
              style={{ fontFamily: "var(--font-display)", color: "#fff" }}
            >
              K8<span style={{ color: "#D16B28" }}>.</span>
            </span>
            <p
              className="mt-3 text-[11px] leading-relaxed"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              Architecture | Landscape | Interiors
              <br />
              Hyderabad, Telangana
            </p>
          </div>
          <div>
            <h4
              className="mb-4 text-[9px] uppercase tracking-[0.4em]"
              style={{ color: "#D16B28" }}
            >
              Studio
            </h4>
            <ul className="space-y-2">
              {STUDIO_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[11px] transition-colors duration-300"
                    style={{ color: "rgba(255,255,255,0.35)" }}
                    onMouseEnter={hoverIn}
                    onMouseLeave={hoverOut}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4
              className="mb-4 text-[9px] uppercase tracking-[0.4em]"
              style={{ color: "#D16B28" }}
            >
              Services
            </h4>
            <ul className="space-y-2">
              {services.slice(0, 5).map((svc) => (
                <li key={svc.slug}>
                  <span
                    className="text-[11px]"
                    style={{ color: "rgba(255,255,255,0.35)" }}
                  >
                    {svc.title}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4
              className="mb-4 text-[9px] uppercase tracking-[0.4em]"
              style={{ color: "#D16B28" }}
            >
              Connect
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href={`mailto:${studioInfo.email}`}
                  className="break-all text-[11px] transition-colors duration-300"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                  onMouseEnter={hoverIn}
                  onMouseLeave={hoverOut}
                >
                  {studioInfo.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${studioInfo.phone.replace(/\s/g, "")}`}
                  className="text-[11px] transition-colors duration-300"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                  onMouseEnter={hoverIn}
                  onMouseLeave={hoverOut}
                >
                  {studioInfo.phone}
                </a>
              </li>
              <li>
                <a
                  href={studioInfo.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] transition-colors duration-300"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                  onMouseEnter={hoverIn}
                  onMouseLeave={hoverOut}
                >
                  @{studioInfo.instagram}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div
          className="mt-12 flex flex-col items-center justify-between gap-4 pt-8 md:flex-row"
          style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
        >
          <p
            className="text-center text-[9px] uppercase tracking-[0.4em]"
            style={{ color: "rgba(255,255,255,0.15)" }}
          >
            © {new Date().getFullYear()} K8 Architecture Studio — All Rights
            Reserved
          </p>
          <p
            className="text-[9px] uppercase tracking-[0.4em]"
            style={{ color: "rgba(255,255,255,0.1)" }}
          >
            Designed with ◆ in Hyderabad
          </p>
        </div>
      </div>
    </footer>
  );
}
