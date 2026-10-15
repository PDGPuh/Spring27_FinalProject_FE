import type { ReactNode } from "react";

export function PageHeader({
  title,
  description,
  actions,
  breadcrumb,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
  breadcrumb?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
      <div>
        {breadcrumb && (
          <div className="mb-1 text-xs text-text-secondary">{breadcrumb}</div>
        )}
        <h1 className="text-[28px] font-semibold tracking-tight text-text">
          {title}
        </h1>
        {description && (
          <p className="mt-1 max-w-3xl text-sm text-text-secondary">{description}</p>
        )}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}
