import type { ReactNode } from "react";

type Tone =
  | "neutral"
  | "success"
  | "warning"
  | "critical"
  | "info"
  | "ai"
  | "primary";

const tones: Record<Tone, string> = {
  neutral: "bg-slate-100 text-slate-700 border-slate-200/80",
  success: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
  warning: "bg-amber-50 text-amber-800 border-amber-200/80",
  critical: "bg-red-50 text-critical border-red-200/80",
  info: "bg-primary-75 text-primary-700 border-primary-200/60",
  ai: "bg-primary-50 text-primary-600 border-primary-200/80",
  primary: "bg-primary-600 text-white border-primary-600",
};

export function Badge({
  children,
  tone = "neutral",
  className = "",
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md border px-2.5 py-0.5 text-xs font-semibold tracking-[0.01em] ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
