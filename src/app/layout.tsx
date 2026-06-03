import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Cursor from "@/components/Cursor";

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

export const metadata: Metadata = {
  title: "K8 — A Timeless Architectural Experience",
  description:
    "An immersive architectural gallery where light, stone, and craft converge. Walk through monumental spaces that blend Tadao Ando minimalism with traditional Indian Haveli craftsmanship.",
  keywords: [
    "architecture",
    "interior design",
    "luxury",
    "gallery",
    "walkthrough",
    "K8",
    "terracotta",
    "modern design",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full`}
    >
      <body
        className="noise min-h-full text-white antialiased"
        style={{
          background: "#0A0A0A",
          fontFamily: "var(--font-sans)",
        }}
      >
        <Cursor />
        {children}
      </body>
    </html>
  );
}
