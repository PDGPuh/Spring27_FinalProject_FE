"use client";

import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import type { ReactNode } from "react";

export function Tilt3D({
  children,
  className = "",
  maxTilt = 8,
}: {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
}) {
  const reduce = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 180, damping: 22 });
  const y = useSpring(rawY, { stiffness: 180, damping: 22 });
  const transform = useMotionTemplate`perspective(1100px) rotateX(${y}deg) rotateY(${x}deg)`;

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={`[transform-style:preserve-3d] ${className}`}
      style={{ transform }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        rawX.set((px - 0.5) * maxTilt * 2);
        rawY.set((0.5 - py) * maxTilt * 1.4);
      }}
      onMouseLeave={() => {
        rawX.set(0);
        rawY.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
