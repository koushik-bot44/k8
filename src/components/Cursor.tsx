"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable custom cursor on touch devices
    const isTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches;

    if (isTouch) {
      if (dot.current) dot.current.style.display = "none";
      if (ring.current) ring.current.style.display = "none";
      return;
    }

    const move = (e: MouseEvent) => {
      gsap.to(dot.current, { x: e.clientX, y: e.clientY, duration: 0.1 });
      gsap.to(ring.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: "power3.out",
      });
    };

    const handleHover = () => {
      gsap.to(ring.current, { scale: 1.5, borderColor: "#D16B28", duration: 0.3 });
    };
    const handleLeave = () => {
      gsap.to(ring.current, { scale: 1, borderColor: "rgba(209,107,40,0.6)", duration: 0.3 });
    };

    window.addEventListener("mousemove", move);

    // Enlarge cursor on interactive elements
    const interactives = document.querySelectorAll("a, button, [role='button']");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", handleHover);
      el.addEventListener("mouseleave", handleLeave);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", handleHover);
        el.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={dot}
        className="pointer-events-none fixed left-0 top-0 z-[200] rounded-full"
        style={{
          height: 8,
          width: 8,
          transform: "translate(-50%, -50%)",
          background: "#D16B28",
        }}
      />
      <div
        ref={ring}
        className="pointer-events-none fixed left-0 top-0 z-[200] rounded-full"
        style={{
          height: 40,
          width: 40,
          transform: "translate(-50%, -50%)",
          border: "1px solid rgba(209,107,40,0.6)",
          mixBlendMode: "difference",
        }}
      />
    </>
  );
}
