import type { RefObject } from "react";

interface ProgressBarProps {
  barRef: RefObject<HTMLDivElement | null>;
}

/** Bottom-edge scrub progress bar; width is driven imperatively for 60fps. */
export default function ProgressBar({ barRef }: ProgressBarProps) {
  return (
    <div
      ref={barRef}
      className="scroll-progress"
      style={{ width: "0%", zIndex: 100 }}
      aria-hidden="true"
    />
  );
}
