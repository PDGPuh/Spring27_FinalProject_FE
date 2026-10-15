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
  neutral: "bg-slate-100 text-slate-700",
  success: "bg-emerald-50 text-success",
  warning: "bg-amber-50 text-amber-700",
  critical: "bg-red-50 text-critical",
  info: "bg-blue-50 text-info",
  ai: "bg-violet-50 text-ai",
  primary: "bg-primary-soft text-primary-dark",
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
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
