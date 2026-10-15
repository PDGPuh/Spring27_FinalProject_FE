import { Search } from "lucide-react";
import type { ReactNode } from "react";

export function FilterBar({
  searchPlaceholder = "Tìm kiếm...",
  children,
}: {
  searchPlaceholder?: string;
  children?: ReactNode;
}) {
  return (
    <div className="mb-4 flex flex-wrap items-center gap-2">
      <div className="relative min-w-[240px] flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" />
        <input
          type="search"
          placeholder={searchPlaceholder}
          className="h-10 w-full rounded-[8px] border border-border bg-card pl-9 pr-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>
      {children}
    </div>
  );
}

export function FilterSelect({
  label,
  options,
}: {
  label: string;
  options: string[];
}) {
  return (
    <select
      aria-label={label}
      className="h-10 rounded-[8px] border border-border bg-card px-3 text-sm outline-none"
      defaultValue=""
    >
      <option value="" disabled>
        {label}
      </option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}
