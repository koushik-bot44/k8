"use client";
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

export const LiquidButton = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "group relative overflow-hidden rounded-full px-10 py-4 text-white transition-all duration-500",
      className
    )}
    style={{
      border: "1px solid rgba(255,255,255,0.2)",
      background: "rgba(255,255,255,0.05)",
      backdropFilter: "blur(20px)",
    }}
    onMouseEnter={(e) => {
      const target = e.currentTarget;
      target.style.borderColor = "#D16B28";
      target.style.boxShadow = "0 0 50px rgba(209,107,40,0.5)";
    }}
    onMouseLeave={(e) => {
      const target = e.currentTarget;
      target.style.borderColor = "rgba(255,255,255,0.2)";
      target.style.boxShadow = "none";
    }}
    {...props}
  >
    <span
      className="absolute inset-0 transition-transform duration-700"
      style={{
        background:
          "linear-gradient(to right, transparent, rgba(209,107,40,0.5), transparent)",
        transform: "translateX(-100%)",
      }}
      ref={(el) => {
        if (!el) return;
        const parent = el.parentElement;
        parent?.addEventListener("mouseenter", () => {
          el.style.transform = "translateX(100%)";
        });
        parent?.addEventListener("mouseleave", () => {
          el.style.transform = "translateX(-100%)";
        });
      }}
    />
    <span className="relative z-10 text-sm font-medium uppercase tracking-[0.3em]">
      {children}
    </span>
  </button>
));
LiquidButton.displayName = "LiquidButton";
