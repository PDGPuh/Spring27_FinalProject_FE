import type { SelectHTMLAttributes } from "react";

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  options: { value: string; label: string }[];
};

export function Select({ label, options, className = "", ...props }: Props) {
  return (
    <label className="block">
      {label && (
        <span className="mb-1.5 block text-sm font-medium text-text">
          {label}
          {props.required && <span className="text-critical"> *</span>}
        </span>
      )}
      <select
        className={`h-10 w-full rounded-[8px] border border-border bg-white px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 ${className}`}
        {...props}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
