import type { ReactNode } from "react";

export function Card({
  children,
  className = "",
  padding = true,
  lift = false,
}: {
  children: ReactNode;
  className?: string;
  padding?: boolean;
  lift?: boolean;
}) {
  return (
    <div
      className={`rounded-[12px] border border-border bg-card ${lift ? "card-lift" : ""} ${padding ? "p-5" : ""} ${className}`}
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
    <div className="mb-4 flex items-start justify-between gap-3">
      <div>
        <h2 className="text-lg font-semibold text-text">{title}</h2>
        {description && (
          <p className="mt-0.5 text-sm text-text-secondary">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}
