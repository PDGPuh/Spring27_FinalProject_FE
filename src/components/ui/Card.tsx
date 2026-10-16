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
        ? "border-l-[5px] border-l-primary-600"
        : accent === "top"
          ? "border-t-[5px] border-t-primary-600"
          : "";

  return (
    <div
      className={`rounded-2xl border border-primary-100 bg-card overview-wrapper-shadow ${
        lift ? "card-lift" : ""
      } ${padding ? "p-6 sm:p-7" : ""} ${accentClass} ${className}`}
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
    <div className="mb-5 flex items-start justify-between gap-4 border-b border-primary-100 pb-4">
      <div>
        <h2 className="text-[20px] font-extrabold text-primary-950">{title}</h2>
        {description && (
          <p className="mt-1 text-[14.5px] font-medium text-text-secondary">
            {description}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}
