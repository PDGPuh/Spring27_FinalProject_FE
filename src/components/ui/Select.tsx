import type { SelectHTMLAttributes } from "react";

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  options: { value: string; label: string }[];
};

export function Select({ label, options, className = "", id, ...props }: Props) {
  const selectId = id || props.name;
  return (
    <label className="block">
      {label && (
        <span className="mb-2 block text-[14px] font-extrabold text-primary-950">
          {label}
          {props.required && <span className="text-critical"> *</span>}
        </span>
      )}
      <select
        id={selectId}
        className={`h-12 w-full cursor-pointer rounded-xl border border-primary-200 bg-white px-4 text-[15px] font-medium text-primary-950 outline-none transition-colors hover:border-primary-500 focus:border-primary-600 focus:ring-3 focus:ring-primary-600/15 ${className}`}
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
