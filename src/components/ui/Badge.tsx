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
  neutral: "bg-slate-100 text-slate-800 border-slate-200",
  success: "bg-emerald-50 text-emerald-800 border-emerald-200",
  warning: "bg-amber-50 text-amber-800 border-amber-200",
  critical: "bg-red-50 text-critical border-red-200",
  info: "bg-primary-75 text-primary-800 border-primary-200",
  ai: "bg-violet-50 text-violet-800 border-violet-200",
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
      className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1 text-[13px] font-bold tracking-[0.01em] ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
