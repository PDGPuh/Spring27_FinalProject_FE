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
    <div className="mb-6 flex flex-wrap items-start justify-between gap-5 rounded-2xl border border-primary-100 border-l-[6px] border-l-primary-600 bg-gradient-to-r from-white via-white to-primary-75/70 px-7 py-6 overview-wrapper-shadow">
      <div>
        {breadcrumb && (
          <div className="mb-2 text-[13px] font-extrabold uppercase tracking-[0.04em] text-primary-700">
            {breadcrumb}
          </div>
        )}
        <div className="flex items-center gap-3">
          <h1 className="text-[26px] font-black tracking-tight text-primary-950 sm:text-[32px]">
            {title}
          </h1>
        </div>
        {description && (
          <p className="mt-2 max-w-3xl text-[15.5px] font-medium leading-relaxed text-text-secondary">
            {description}
          </p>
        )}
      </div>
      {actions && (
        <div className="my-auto flex flex-wrap items-center gap-3">{actions}</div>
      )}
    </div>
  );
}
