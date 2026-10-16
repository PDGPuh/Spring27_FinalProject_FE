import { Search } from "lucide-react";
import type { ReactNode } from "react";

export function FilterBar({
  searchPlaceholder = "Tìm kiếm...",
  searchValue,
  onSearchChange,
  children,
}: {
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (val: string) => void;
  children?: ReactNode;
}) {
  return (
    <div className="mb-4 flex flex-wrap items-center gap-2.5 rounded-xl border border-primary-100 bg-white p-3 shadow-form">
      <div className="relative min-w-[260px] flex-1">
        <input
          type="search"
          value={searchValue}
          onChange={onSearchChange ? (e) => onSearchChange(e.target.value) : undefined}
          placeholder={searchPlaceholder}
          className="h-10 w-full rounded-lg border border-gray-200 bg-white pl-4 pr-11 text-sm text-text outline-none transition-colors duration-150 placeholder:text-gray-400 hover:border-primary-600 focus:border-primary-600 focus:ring-2 focus:ring-primary-600/15"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-1.5 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center rounded-md bg-primary-600 text-white shadow-2xs"
        >
          <Search className="size-3.5" />
        </span>
      </div>
      {children}
    </div>
  );
}

export function FilterSelect({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value?: string;
  onChange?: (val: string) => void;
}) {
  const isControlled = typeof value !== "undefined" && typeof onChange === "function";
  return (
    <select
      aria-label={label}
      value={isControlled ? value : undefined}
      defaultValue={isControlled ? undefined : ""}
      onChange={isControlled ? (e) => onChange(e.target.value) : undefined}
      className="h-10 cursor-pointer rounded-lg border border-gray-200 bg-white px-3.5 text-sm font-medium text-text outline-none transition-colors duration-150 hover:border-primary-600 focus:border-primary-600 focus:ring-2 focus:ring-primary-600/15"
    >
      <option value="">{label}: Tất cả</option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}
