import type { ReactNode } from "react";
import { Inbox } from "lucide-react";

export function EmptyState({
  title,
  description,
  action,
  icon,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  icon?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-primary-100 border-b-[5px] border-b-primary-600 bg-white px-6 py-14 text-center overview-wrapper-shadow">
      <div className="mb-4 flex size-14 items-center justify-center rounded-2xl border border-primary-100 bg-primary-50 text-primary-600">
        {icon ?? <Inbox className="size-6" />}
      </div>
      <p className="text-lg font-extrabold text-primary-900">{title}</p>
      {description && (
        <p className="mt-1.5 max-w-md text-[14px] leading-relaxed text-text-secondary">
          {description}
        </p>
      )}
      {action && <div className="mt-6 flex flex-wrap justify-center gap-2.5">{action}</div>}
    </div>
  );
}
