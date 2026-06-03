"use client";

import type { RefObject } from "react";
import { cn } from "@/lib/utils";
import HomePanel from "./panels/HomePanel";
import AboutPanel from "./panels/AboutPanel";
import ServicesPanel from "./panels/ServicesPanel";
import ProjectsPanel from "./panels/ProjectsPanel";
import ContactPanel from "./panels/ContactPanel";

interface ExperienceGalleryProps {
  wrapperRef: RefObject<HTMLDivElement | null>;
  trackRef: RefObject<HTMLDivElement | null>;
  isDesktop: boolean;
  onOpenService: (index: number) => void;
}

/**
 * The five-room walkthrough. The wrapper + track refs are wired by
 * `useExperienceScroll`; the track's mode class switches the panels between a
 * horizontal flex row (desktop) and a vertical stack (mobile/tablet).
 */
export default function ExperienceGallery({
  wrapperRef,
  trackRef,
  isDesktop,
  onOpenService,
}: ExperienceGalleryProps) {
  return (
    <div ref={wrapperRef} style={{ position: "relative", zIndex: 10 }}>
      <div
        ref={trackRef}
        className={cn(
          "gallery-track",
          isDesktop ? "is-horizontal" : "is-vertical"
        )}
      >
        <HomePanel />
        <AboutPanel />
        <ServicesPanel onOpenService={onOpenService} />
        <ProjectsPanel />
        <ContactPanel />
      </div>
    </div>
  );
}
