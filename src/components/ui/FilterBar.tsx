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
    <div className="mb-5 flex flex-wrap items-center gap-3.5 rounded-2xl border border-primary-100 bg-white p-4 overview-wrapper-shadow">
      <div className="relative min-w-[280px] flex-1">
        <input
          type="search"
          value={searchValue}
          onChange={onSearchChange ? (e) => onSearchChange(e.target.value) : undefined}
          placeholder={searchPlaceholder}
          className="h-12 w-full rounded-xl border border-primary-200 bg-primary-50/35 pl-4.5 pr-13 text-[15px] font-medium text-primary-950 outline-none transition-colors duration-150 placeholder:text-gray-400 hover:border-primary-500 focus:border-primary-600 focus:bg-white focus:ring-3 focus:ring-primary-600/15"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-1.5 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-lg bg-primary-600 text-white shadow-2xs"
        >
          <Search className="size-4.5" />
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
      className="h-12 cursor-pointer rounded-xl border border-primary-200 bg-white px-4 text-[14.5px] font-bold text-primary-950 outline-none transition-colors duration-150 hover:border-primary-500 focus:border-primary-600 focus:ring-3 focus:ring-primary-600/15"
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
