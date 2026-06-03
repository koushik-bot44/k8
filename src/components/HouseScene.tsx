"use client";

import { useEffect, useRef, useMemo, useCallback } from "react";
import type { RefObject } from "react";

/* ──────────────────────────────────────────────────────────────────────────
   K8 — Scroll-driven architectural walkthrough on Canvas.

   Five architectural spaces rendered as a seamless camera walkthrough.
   As you scroll, the canvas interpolates between rooms with a zoom-push
   effect that simulates walking forward through the gallery, combined
   with parallax mouse tracking for depth.

   Uses a 2D canvas + image sequence approach (like the ICG Gallery)
   for buttery-smooth frame-accurate scrubbing.
   ────────────────────────────────────────────────────────────────────────── */

const ROOMS = [
  "/images/rooms/01-entrance.png",
  "/images/rooms/02-bridge.png",
  "/images/rooms/03-courtyard.png",
  "/images/rooms/04-corridor.png",
  "/images/rooms/05-sanctum.png",
];

export default function HouseScene({
  progressRef,
}: {
  progressRef: RefObject<number>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const smoothMouseRef = useRef({ x: 0, y: 0 });
  const loadedRef = useRef(0);
  const rafRef = useRef(0);
  const timeRef = useRef(0);

  // Load all room images
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loaded = 0;

    ROOMS.forEach((src, i) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        loaded++;
        loadedRef.current = loaded;
      };
      img.src = src;
      images[i] = img;
    });

    imagesRef.current = images;
  }, []);

  // Track mouse
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
    };
    resize();
    window.addEventListener("resize", resize);

    const smoothstep = (x: number) => {
      const t = Math.min(1, Math.max(0, x));
      return t * t * (3 - 2 * t);
    };

    const drawCover = (
      img: HTMLImageElement,
      cw: number,
      ch: number,
      offsetX: number,
      offsetY: number,
      zoom: number,
      alpha: number
    ) => {
      if (!img.complete || !img.naturalWidth) return;

      ctx.save();
      ctx.globalAlpha = alpha;

      const imgAsp = img.naturalWidth / img.naturalHeight;
      const canAsp = cw / ch;

      let sw: number, sh: number, sx: number, sy: number;

      if (canAsp > imgAsp) {
        sw = img.naturalWidth;
        sh = sw / canAsp;
        sx = 0;
        sy = (img.naturalHeight - sh) / 2;
      } else {
        sh = img.naturalHeight;
        sw = sh * canAsp;
        sx = (img.naturalWidth - sw) / 2;
        sy = 0;
      }

      // Apply zoom (scale from center)
      const zoomedW = cw * zoom;
      const zoomedH = ch * zoom;
      const dx = (cw - zoomedW) / 2 + offsetX * zoom;
      const dy = (ch - zoomedH) / 2 + offsetY * zoom;

      ctx.drawImage(img, sx, sy, sw, sh, dx, dy, zoomedW, zoomedH);
      ctx.restore();
    };

    const render = () => {
      const images = imagesRef.current;
      if (loadedRef.current < ROOMS.length) {
        rafRef.current = requestAnimationFrame(render);
        return;
      }

      const cw = canvas.width;
      const ch = canvas.height;
      const N = images.length;
      const p = Math.min(1, Math.max(0, progressRef.current ?? 0));
      timeRef.current += 0.016;
      const t = timeRef.current;

      // Smooth mouse lerp
      const m = mouseRef.current;
      smoothMouseRef.current.x += (m.x - smoothMouseRef.current.x) * 0.03;
      smoothMouseRef.current.y += (m.y - smoothMouseRef.current.y) * 0.03;
      const mx = smoothMouseRef.current.x;
      const my = smoothMouseRef.current.y;

      // Calculate which images to blend
      const seg = p * (N - 1);
      let i = Math.floor(seg);
      let f = seg - i;
      if (i >= N - 1) { i = N - 2; f = 1; }
      if (i < 0) { i = 0; f = 0; }

      const blend = smoothstep(f);

      // Idle drift
      const driftX = Math.sin(t * 0.25) * 8;
      const driftY = Math.cos(t * 0.18) * 5;

      // Mouse parallax offset (pixels)
      const parX = (mx + driftX * 0.01) * 30;
      const parY = (my + driftY * 0.01) * 20;

      // Zoom: base + slight breathing + push on transition
      const baseZoom = 1.06;
      const breathe = Math.sin(t * 0.15) * 0.015;
      const transitionPush = blend * 0.08;  // push-in during transitions
      const zoomA = baseZoom + breathe + (1 - blend) * 0.02;
      const zoomB = baseZoom + breathe + blend * 0.02 + transitionPush;

      // Clear
      ctx.fillStyle = "#0A0A0A";
      ctx.fillRect(0, 0, cw, ch);

      // Draw outgoing room (fading out, slight zoom-in = "walking past")
      drawCover(images[i], cw, ch, parX, parY, zoomA + blend * 0.06, 1 - blend);

      // Draw incoming room (fading in, zoom from larger = "approaching")
      drawCover(images[i + 1], cw, ch, parX, parY, zoomB, blend);

      // Cinematic color grade overlay
      // Warm tint
      ctx.save();
      ctx.globalCompositeOperation = "multiply";
      ctx.fillStyle = "rgba(255, 248, 235, 0.08)";
      ctx.fillRect(0, 0, cw, ch);
      ctx.restore();

      // Vignette
      const vGrad = ctx.createRadialGradient(
        cw / 2, ch / 2, cw * 0.25,
        cw / 2, ch / 2, cw * 0.7
      );
      vGrad.addColorStop(0, "rgba(0,0,0,0)");
      vGrad.addColorStop(1, "rgba(10,10,10,0.45)");
      ctx.fillStyle = vGrad;
      ctx.fillRect(0, 0, cw, ch);

      // Film grain (subtle)
      if (Math.random() > 0.5) {
        ctx.save();
        ctx.globalAlpha = 0.02;
        ctx.globalCompositeOperation = "overlay";
        for (let g = 0; g < 400; g++) {
          const gx = Math.random() * cw;
          const gy = Math.random() * ch;
          const gs = Math.random() * 2;
          const gl = Math.random() > 0.5 ? 255 : 0;
          ctx.fillStyle = `rgb(${gl},${gl},${gl})`;
          ctx.fillRect(gx, gy, gs, gs);
        }
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [progressRef]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1,
        pointerEvents: "none",
        background: "#0A0A0A",
      }}
    />
  );
}
