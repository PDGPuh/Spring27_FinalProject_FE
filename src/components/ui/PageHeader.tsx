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
    <div className="mb-6 flex flex-wrap items-start justify-between gap-4 rounded-xl border border-primary-100 bg-gradient-to-r from-white via-white to-primary-75/70 px-5 py-4 overview-wrapper-shadow border-l-4 border-l-primary-600">
      <div>
        {breadcrumb && (
          <div className="mb-1 text-xs font-medium text-primary-600">{breadcrumb}</div>
        )}
        <div className="flex items-center gap-2.5">
          <h1 className="text-[24px] font-bold tracking-tight text-primary-800 sm:text-[26px]">
            {title}
          </h1>
        </div>
        {description && (
          <p className="mt-1 max-w-3xl text-sm text-text-secondary">{description}</p>
        )}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2 my-auto">{actions}</div>}
    </div>
  );
}
