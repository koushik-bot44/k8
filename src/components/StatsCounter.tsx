"use client";
import { useEffect, useRef, useState } from "react";

interface Props {
  end: number;
  suffix?: string;
  prefix?: string;
  label: string;
  duration?: number;
}

export default function StatsCounter({
  end,
  suffix = "",
  prefix = "",
  label,
  duration = 2000,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;

    const steps = 60;
    const stepDuration = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current++;
      const progress = current / steps;
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * end));

      if (current >= steps) {
        setCount(end);
        clearInterval(timer);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [started, end, duration]);

  return (
    <div ref={ref} className="text-center">
      <div
        className="text-4xl md:text-5xl font-black"
        style={{
          fontFamily: "var(--font-display)",
          color: "#D16B28",
          textShadow: "0 2px 20px rgba(209,107,40,0.4)",
        }}
      >
        {prefix}
        {count.toLocaleString()}
        {suffix}
      </div>
      <div
        className="mt-2 text-[10px] md:text-xs uppercase tracking-[0.35em]"
        style={{ color: "rgba(255,255,255,0.4)" }}
      >
        {label}
      </div>
    </div>
  );
}
