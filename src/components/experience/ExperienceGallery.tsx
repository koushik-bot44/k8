"use client";

import type { RefObject } from "react";
import { cn } from "@/lib/utils";
import EntrancePanel from "./panels/EntrancePanel";
import BridgePanel from "./panels/BridgePanel";
import CourtyardPanel from "./panels/CourtyardPanel";
import CorridorPanel from "./panels/CorridorPanel";
import SanctumPanel from "./panels/SanctumPanel";

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
        <EntrancePanel />
        <BridgePanel />
        <CourtyardPanel onOpenService={onOpenService} />
        <CorridorPanel />
        <SanctumPanel />
      </div>
    </div>
  );
}
