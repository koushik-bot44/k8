"use client";
import { useEffect, useRef } from "react";

export default function Particles() {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = canvas.current!;
    const ctx = c.getContext("2d")!;
    let w = (c.width = window.innerWidth);
    let h = (c.height = window.innerHeight);
    const mouse = { x: w / 2, y: h / 2 };

    const dots = Array.from({ length: 80 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.6 + 0.3,
    }));

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onResize = () => {
      w = c.width = window.innerWidth;
      h = c.height = window.innerHeight;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("resize", onResize);

    let raf = 0;
    const loop = () => {
      ctx.clearRect(0, 0, w, h);

      dots.forEach((d) => {
        const dx = mouse.x - d.x;
        const dy = mouse.y - d.y;
        const dist = Math.hypot(dx, dy);

        // Repel from cursor
        if (dist < 160) {
          d.x -= (dx / dist) * 0.4;
          d.y -= (dy / dist) * 0.4;
        }

        d.x += d.vx;
        d.y += d.vy;

        // Wrap around edges
        if (d.x < 0) d.x = w;
        if (d.x > w) d.x = 0;
        if (d.y < 0) d.y = h;
        if (d.y > h) d.y = 0;

        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(209,107,40,0.5)";
        ctx.fill();
      });

      // Draw connections between nearby dots
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dist = Math.hypot(dots[i].x - dots[j].x, dots[i].y - dots[j].y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = `rgba(209,107,40,${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvas}
      className="pointer-events-none fixed inset-0"
      style={{ zIndex: 8 }}
    />
  );
}
