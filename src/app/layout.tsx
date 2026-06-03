import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Cursor from "@/components/Cursor";
import StructuredData from "@/components/StructuredData";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://www.k8architecturestudio.com";
const TITLE =
  "K8 Architecture Studio — Architecture, Landscape & Interiors in Hyderabad";
const DESCRIPTION =
  "K8 Architecture Studio is an award-driven architecture, landscape and interior design practice in Hyderabad. We blend traditional Indian craft — courtyards, jali screens, water channels — with contemporary minimalism to create timeless, contextual spaces.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | K8 Architecture Studio",
  },
  description: DESCRIPTION,
  applicationName: "K8 Architecture Studio",
  keywords: [
    "K8 Architecture Studio",
    "architects in Hyderabad",
    "architecture studio Hyderabad",
    "interior designers Hyderabad",
    "landscape design Hyderabad",
    "luxury architecture India",
    "contextual modernism",
    "sustainable architecture",
    "residential architects",
    "commercial architects",
    "jali screen design",
    "courtyard house design",
    "Telangana architects",
  ],
  authors: [{ name: "K8 Architecture Studio", url: SITE_URL }],
  creator: "K8 Architecture Studio",
  publisher: "K8 Architecture Studio",
  category: "architecture",
  alternates: { canonical: "/" },
  formatDetection: { telephone: true, email: true, address: true },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "K8 Architecture Studio",
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/images/master-bg.jpg",
        width: 1200,
        height: 630,
        alt: "K8 Architecture Studio — a timeless architectural experience",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/images/master-bg.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // Favicon is provided by the file-convention icon at src/app/icon.svg.
  appleWebApp: {
    capable: true,
    title: "K8 Architecture Studio",
    statusBarStyle: "black-translucent",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0A0A0A",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${playfair.variable} h-full`}
    >
      <body
        className="noise min-h-full text-white antialiased"
        suppressHydrationWarning
      >
        <StructuredData />
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Cursor />
        {children}
      </body>
    </html>
  );
}
