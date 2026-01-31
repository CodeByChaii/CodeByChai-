"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export function AnimatedBackground() {
  const { scrollYProgress } = useScroll();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Transform scroll progress into gradient positions
  const gradient1Y = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const gradient2Y = useTransform(scrollYProgress, [0, 1], ["100%", "0%"]);
  const gradient3X = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  
  // Color transformations based on scroll
  const hue = useTransform(scrollYProgress, [0, 0.5, 1], [280, 240, 320]);
  const saturation = useTransform(scrollYProgress, [0, 0.5, 1], [70, 80, 60]);

  if (!isMounted) {
    return (
      <div className="fixed inset-0 -z-10" style={{ background: "var(--background)" }}>
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--gradient-start)] via-[var(--gradient-mid)] to-[var(--gradient-end)]" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" style={{ background: "var(--background)" }}>
      {/* Animated gradient layers */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% ${gradient1Y}, var(--orb-pink), transparent 50%)`,
        }}
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 80% ${gradient2Y}, var(--orb-violet), transparent 50%)`,
        }}
        animate={{
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at ${gradient3X} 50%, var(--orb-aqua), transparent 50%)`,
        }}
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Scroll-reactive color overlay */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: useTransform(
            [hue, saturation],
            ([h, s]) => `radial-gradient(circle at 30% 50%, hsla(${h}, ${s}%, 50%, 0.15), transparent 60%)`
          ),
        }}
      />

      {/* Moving gradient mesh */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "linear-gradient(45deg, var(--gradient-start), var(--gradient-mid), var(--gradient-end))",
            "linear-gradient(135deg, var(--gradient-mid), var(--gradient-end), var(--gradient-start))",
            "linear-gradient(225deg, var(--gradient-end), var(--gradient-start), var(--gradient-mid))",
            "linear-gradient(315deg, var(--gradient-start), var(--gradient-mid), var(--gradient-end))",
          ],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          opacity: 0.4,
          mixBlendMode: "overlay",
        }}
      />

      {/* Subtle noise texture */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          mixBlendMode: "overlay",
        }}
      />
    </div>
  );
}
