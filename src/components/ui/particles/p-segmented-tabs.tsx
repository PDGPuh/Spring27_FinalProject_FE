"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export interface SegmentedTabItem {
  id: string;
  label: string;
  count?: number;
  href?: string;
  tone?: "default" | "critical" | "warning" | "success";
}

interface SegmentedTabsParticleProps {
  items: SegmentedTabItem[];
  active?: string;
  onChange?: (id: string) => void;
  className?: string;
  size?: "sm" | "md";
}

export function SegmentedTabsParticle({
  items,
  active,
  onChange,
  className = "",
  size = "md",
}: SegmentedTabsParticleProps) {
  const instanceId = useId();
  const [internalActive, setInternalActive] = useState(active ?? items[0]?.id ?? "");
  const currentActive = onChange ? (active ?? internalActive) : internalActive;

  const handleSelect = (id: string) => {
    setInternalActive(id);
    onChange?.(id);
  };

  const padClass =
    size === "sm" ? "px-3.5 py-2 text-[13px]" : "px-4.5 py-2.5 text-[14.5px]";

  return (
    <div
      role="tablist"
      aria-label="Bộ lọc phân nhóm"
      className={`inline-flex max-w-full flex-wrap items-center gap-1 rounded-xl border border-primary-100 bg-primary-50/80 p-1.5 shadow-xs ${className}`}
    >
      {items.map((item) => {
        const isActive = item.id === currentActive;
        const badgeToneClass = isActive
          ? "bg-white/20 text-white"
          : item.tone === "critical"
            ? "bg-red-100 text-critical"
            : item.tone === "warning"
              ? "bg-amber-100 text-amber-800"
              : "bg-white text-primary-700 border border-primary-100";

        const inner = (
          <>
            {isActive && (
              <motion.span
                layoutId={`coss-segmented-pill-${instanceId}`}
                className="
                  pointer-events-none absolute inset-0 rounded-lg bg-primary-600
                  shadow-[0_3px_10px_rgba(13,113,186,0.28)]
                "
                transition={{ type: "spring", stiffness: 420, damping: 32 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2 whitespace-nowrap">
              <span>{item.label}</span>
              {typeof item.count === "number" && (
                <span
                  className={`inline-flex items-center justify-center rounded-md px-1.5 py-0.5 text-[11px] font-semibold tabular-nums transition-colors ${badgeToneClass}`}
                >
                  {item.count}
                </span>
              )}
            </span>
          </>
        );

        const baseBtnClass = `relative inline-flex items-center justify-center rounded-lg font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${padClass} ${
          isActive
            ? "text-white"
            : "text-primary-900/80 hover:bg-white/60 hover:text-primary-600"
        }`;

        if (item.href) {
          return (
            <Link
              key={item.id}
              href={item.href}
              role="tab"
              aria-selected={isActive}
              onClick={() => handleSelect(item.id)}
              className={baseBtnClass}
            >
              {inner}
            </Link>
          );
        }

        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => handleSelect(item.id)}
            className={baseBtnClass}
          >
            {inner}
          </button>
        );
      })}
    </div>
  );
}
