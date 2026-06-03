/** Fixed cinematic overlays layered above the 3D canvas and below the content. */
export default function Overlays() {
  return (
    <div aria-hidden="true">
      {/* Directional gradients */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 2,
          pointerEvents: "none",
          background: `
            linear-gradient(to bottom,
              rgba(10,10,10,0.4) 0%,
              rgba(10,10,10,0.05) 20%,
              rgba(10,10,10,0.05) 60%,
              rgba(10,10,10,0.55) 100%
            ),
            linear-gradient(to right,
              rgba(10,10,10,0.25) 0%,
              rgba(10,10,10,0.0) 50%,
              rgba(10,10,10,0.25) 100%
            )`,
        }}
      />

      {/* Vignette */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 3,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse at center, transparent 45%, rgba(10,10,10,0.45) 100%)",
        }}
      />

      {/* Blueprint grid */}
      <div
        className="blueprint-grid pointer-events-none fixed inset-0"
        style={{ zIndex: 4, opacity: 0.03 }}
      />
    </div>
  );
}
