"use client";

import type { ReactNode } from "react";

export function Tilt3D({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
}) {
  return <div className={className}>{children}</div>;
}
