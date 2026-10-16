import type { ReactNode } from "react";

export function Card({
  children,
  className = "",
  padding = true,
  lift = false,
  accent = "none",
}: {
  children: ReactNode;
  className?: string;
  padding?: boolean;
  lift?: boolean;
  accent?: "none" | "bottom" | "left" | "top";
}) {
  const accentClass =
    accent === "bottom"
      ? "border-b-[5px] border-b-primary-600 bg-primary-75/40"
      : accent === "left"
        ? "border-l-4 border-l-primary-600"
        : accent === "top"
          ? "border-t-4 border-t-primary-600"
          : "";

  return (
    <div
      className={`rounded-xl border border-border bg-card overview-wrapper-shadow ${
        lift ? "card-lift" : ""
      } ${padding ? "p-5" : ""} ${accentClass} ${className}`}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  title,
  action,
  description,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-4 flex items-start justify-between gap-3 border-b border-primary-50 pb-3">
      <div>
        <h2 className="heading-2 text-primary-800">{title}</h2>
        {description && (
          <p className="mt-0.5 text-xs text-text-secondary">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}
