import type { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hint?: string;
  error?: string;
};

export function Input({ label, hint, error, className = "", id, ...props }: Props) {
  const inputId = id || props.name;
  return (
    <label className="block">
      {label && (
        <span className="mb-2 block text-[14px] font-extrabold text-primary-950">
          {label}
          {props.required && <span className="text-critical"> *</span>}
        </span>
      )}
      <input
        id={inputId}
        className={`h-12 w-full rounded-xl border bg-white px-4 text-[15px] font-medium text-primary-950 outline-none transition-colors placeholder:text-gray-400 disabled:bg-primary-50/50 disabled:text-muted ${
          error
            ? "border-critical focus:ring-3 focus:ring-critical/15"
            : "border-primary-200 hover:border-primary-500 focus:border-primary-600 focus:ring-3 focus:ring-primary-600/15"
        } ${className}`}
        {...props}
      />
      {error ? (
        <span className="mt-1.5 block text-[13px] font-semibold text-critical">{error}</span>
      ) : hint ? (
        <span className="mt-1.5 block text-[13px] text-text-secondary">{hint}</span>
      ) : null}
    </label>
  );
}
