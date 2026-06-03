"use client";

import { useSyncExternalStore } from "react";

/**
 * SSR-safe media query hook.
 *
 * Uses `useSyncExternalStore` so the server snapshot (`false`) and the first
 * client render agree — React then patches to the real value on hydration
 * without emitting a mismatch warning.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = (onChange: () => void) => {
    if (typeof window === "undefined") return () => {};
    const mql = window.matchMedia(query);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  };

  const getSnapshot = () => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  };

  const getServerSnapshot = () => false;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** Breakpoint shared across the experience: ≥1024px gets the horizontal scroll. */
export const DESKTOP_QUERY = "(min-width: 1024px)";

export function useIsDesktop(): boolean {
  return useMediaQuery(DESKTOP_QUERY);
}
