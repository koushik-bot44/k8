"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useIsDesktop } from "./useMediaQuery";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export type GalleryMode = "horizontal" | "vertical";

interface Options {
  /** Number of story panels in the gallery. */
  sectionCount: number;
  /** Only wire up scroll behaviour once the intro loader has lifted. */
  enabled: boolean;
}

export interface ExperienceScroll {
  wrapperRef: React.RefObject<HTMLDivElement | null>;
  trackRef: React.RefObject<HTMLDivElement | null>;
  progressBarRef: React.RefObject<HTMLDivElement | null>;
  /** 0→1 progress fed to the 3D walkthrough canvas. */
  progressRef: React.RefObject<number>;
  activeSection: number;
  isDesktop: boolean;
  scrollToSection: (index: number) => void;
}

/**
 * Drives the architectural walkthrough with a single GSAP `matchMedia`:
 *
 *  • ≥1024px → the track is pinned and scrubbed horizontally (cinematic).
 *  • <1024px → panels stack vertically and scroll natively over the fixed
 *    canvas; progress is sampled to keep the 3D rooms, dots and progress bar
 *    in sync without any fragile mobile pinning.
 *
 * `matchMedia` auto-reverts pins, inline transforms and tweens when the
 * breakpoint flips (e.g. device rotation), so there is no cross-mode bleed.
 */
export function useExperienceScroll({
  sectionCount,
  enabled,
}: Options): ExperienceScroll {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const modeRef = useRef<GalleryMode>("vertical");

  const [activeSection, setActiveSection] = useState(0);
  const isDesktop = useIsDesktop();

  useEffect(() => {
    if (!enabled) return;
    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    if (!wrapper || !track) return;

    const mm = gsap.matchMedia();

    const syncProgress = (progress: number, total: number) => {
      progressRef.current = progress;
      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${progress * 100}%`;
      }
      setActiveSection(Math.min(total - 1, Math.floor(progress * total)));
    };

    // ── Desktop / landscape: pinned horizontal scrub ──
    mm.add("(min-width: 1024px)", () => {
        modeRef.current = "horizontal";
        const panels = gsap.utils.toArray<HTMLElement>(".h-panel");
        const total = panels.length;

        ScrollTrigger.create({
          trigger: wrapper,
          start: "top top",
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
          scrub: 1.2,
          pin: track,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          // One scroll gesture settles on the next/previous room.
          snap: {
            snapTo: 1 / (total - 1),
            duration: { min: 0.3, max: 0.7 },
            delay: 0.04,
            ease: "power2.inOut",
            directional: true,
          },
          onUpdate: (self) => {
            gsap.set(track, {
              x: -self.progress * (track.scrollWidth - window.innerWidth),
            });
            syncProgress(self.progress, total);
          },
        });

        // First panel reveals on entry; the rest reveal as the camera approaches.
        gsap.from("#panel-0 .panel-content", {
          y: 60,
          opacity: 0,
          duration: 1.4,
          stagger: 0.12,
          delay: 0.3,
          ease: "power3.out",
        });

        panels.forEach((panel, i) => {
          if (i === 0) return;
          const els = panel.querySelectorAll(".panel-content");
          let animated = false;
          ScrollTrigger.create({
            trigger: wrapper,
            start: () => {
              const scrollWidth = track.scrollWidth - window.innerWidth;
              return `top+=${((i - 0.4) / (total - 1)) * scrollWidth} top`;
            },
            onEnter: () => {
              if (animated) return;
              animated = true;
              gsap.from(els, {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power3.out",
              });
            },
          });
        });

        ScrollTrigger.refresh();

        // Clear the manual horizontal transform if we leave this breakpoint.
        return () => gsap.set(track, { clearProps: "transform" });
      });

    // ── Mobile / portrait: native vertical scroll over the fixed canvas ──
    mm.add("(max-width: 1023px)", () => {
        modeRef.current = "vertical";
        const panels = gsap.utils.toArray<HTMLElement>(".h-panel");
        const total = panels.length;

        // Natural touch scrolling on mobile/tablet — no snapping (it fights
        // the finger and felt jarring). We only sample progress to keep the 3D
        // rooms, dots and progress bar in sync.
        ScrollTrigger.create({
          trigger: wrapper,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => syncProgress(self.progress, total),
        });

        panels.forEach((panel) => {
          ScrollTrigger.create({
            trigger: panel,
            start: "top 78%",
            once: true,
            onEnter: () =>
              gsap.from(panel.querySelectorAll(".panel-content"), {
                y: 40,
                opacity: 0,
                duration: 0.9,
                stagger: 0.08,
                ease: "power3.out",
              }),
          });
        });

        ScrollTrigger.refresh();
      });

    return () => mm.revert();
  }, [enabled, sectionCount]);

  const scrollToSection = useCallback(
    (index: number) => {
      const wrapper = wrapperRef.current;
      const track = trackRef.current;
      if (!wrapper) return;

      if (modeRef.current === "horizontal" && track) {
        const scrollWidth = track.scrollWidth - window.innerWidth;
        const targetY =
          wrapper.offsetTop +
          (index / Math.max(1, sectionCount - 1)) * scrollWidth;
        gsap.to(window, {
          scrollTo: { y: targetY },
          duration: 2,
          ease: "power3.inOut",
        });
      } else {
        const panel = document.getElementById(`panel-${index}`);
        if (panel) {
          gsap.to(window, {
            scrollTo: { y: panel, offsetY: 0 },
            duration: 1.2,
            ease: "power3.inOut",
          });
        }
      }
    },
    [sectionCount]
  );

  return {
    wrapperRef,
    trackRef,
    progressBarRef,
    progressRef,
    activeSection,
    isDesktop,
    scrollToSection,
  };
}
