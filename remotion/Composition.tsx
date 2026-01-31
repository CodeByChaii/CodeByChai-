import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const HeroComposition: React.FC<{ title: string; subtitle: string }> = ({
  title,
  subtitle,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const scale = interpolate(frame, [0, 25], [0.8, 1], { extrapolateRight: "clamp" });
  const subtitleOpacity = interpolate(frame, [15, 35], [0, 1], { extrapolateRight: "clamp" });

  // Gentle floating / antigravity drift (loops over ~3s)
  const cycle = (frame / fps) * Math.PI * 0.5;
  const floatY = Math.sin(cycle) * 8;
  const floatX = Math.cos(cycle * 0.7) * 6;

  // Orb positions and drift (background orbs)
  const orb1Y = interpolate(
    (frame % (fps * 4)) / (fps * 4),
    [0, 1],
    [0, 20],
    { extrapolateRight: "clamp" }
  );
  const orb2Y = interpolate(
    ((frame + fps * 2) % (fps * 5)) / (fps * 5),
    [0, 1],
    [10, -15],
    { extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0f0f23 0%, #1a1a3e 50%, #0d0d1a 100%)",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Floating / antigravity orbs in background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "15%",
            top: `${20 + orb1Y}%`,
            width: 120,
            height: 120,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(99, 102, 241, 0.25) 0%, transparent 70%)",
            filter: "blur(20px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: "20%",
            top: `${40 + orb2Y}%`,
            width: 160,
            height: 160,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%)",
            filter: "blur(24px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "50%",
            bottom: "25%",
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)",
            filter: "blur(16px)",
            transform: `translate(${floatX}px, ${floatY}px)`,
          }}
        />
      </div>

      <div
        style={{
          opacity,
          transform: `scale(${scale}) translate(${floatX * 0.5}px, ${floatY * 0.5}px)`,
          textAlign: "center",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <h1
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: "#fff",
            margin: 0,
            textShadow: "0 0 40px rgba(99, 102, 241, 0.5)",
          }}
        >
          {title}
        </h1>
        <p
          style={{
            fontSize: 28,
            color: "#a5b4fc",
            marginTop: 16,
            opacity: subtitleOpacity,
          }}
        >
          {subtitle}
        </p>
      </div>
    </AbsoluteFill>
  );
};
