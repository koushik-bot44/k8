"use client";

import { useEffect, useState } from "react";

/**
 * Resolves to `true` once the intro <Loader /> has removed itself from the DOM.
 * The loader marks its root with `data-loader`; we poll for its removal so the
 * scroll experience only initialises after the curtain lifts.
 */
export function useLoaderDone(): boolean {
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Poll for the loader's removal. State is only set from the timer callback
    // (never synchronously in the effect body) to avoid cascading renders.
    const interval = setInterval(() => {
      if (!document.querySelector("[data-loader]")) {
        setDone(true);
        clearInterval(interval);
      }
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return done;
}
