"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const CHAPTER_NAMES = ["The Vision", "The Craft", "The Structure", "The Legacy"];

export default function BackgroundSplit({
  step,
  src,
}: {
  step: 1 | 2 | 3 | 4;
  src: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const pct = (step / 4) * 100;

    gsap.fromTo(
      ref.current,
      { clipPath: "inset(0 100% 0 0)" },
      {
        clipPath: `inset(0 ${100 - pct}% 0 0)`,
        duration: 1.8,
        ease: "expo.inOut",
        delay: step === 1 ? 5.5 : 0.4,
      }
    );

    // Slow cinematic pan
    if (imgRef.current) {
      gsap.to(imgRef.current, {
        scale: 1.08,
        duration: 18,
        ease: "none",
        repeat: -1,
        yoyo: true,
      });
    }
  }, [step]);

  return (
    <div className="fixed inset-0" style={{ zIndex: -10 }}>
      <div ref={ref} className="absolute inset-0">
        <img
          ref={imgRef}
          src={src}
          className="h-full w-full object-cover"
          style={{ transform: "scale(1.05)" }}
          alt="K8 Architecture heritage background"
        />
      </div>
      {/* Gradient overlay for readability */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(13,13,13,0.4), rgba(13,13,13,0.55), rgba(13,13,13,0.85))",
        }}
      />
      {/* Progress indicator */}
      <div
        className="absolute bottom-6 left-1/2 text-xs uppercase tracking-[0.5em]"
        style={{
          transform: "translateX(-50%)",
          color: "rgba(246,232,216,0.6)",
          zIndex: 10,
        }}
      >
        {step}/4 — {CHAPTER_NAMES[step - 1]}
      </div>
      {/* Progress bar */}
      <div
        className="absolute bottom-0 left-0 h-[2px]"
        style={{
          width: `${(step / 4) * 100}%`,
          background: "linear-gradient(90deg, #D16B28, #E08A4A)",
          transition: "width 1.8s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />
    </div>
  );
}
