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
        <span className="mb-1.5 block text-sm font-medium text-text">
          {label}
          {props.required && <span className="text-critical"> *</span>}
        </span>
      )}
      <input
        id={inputId}
        className={`h-10 w-full rounded-[8px] border bg-white px-3 text-sm outline-none transition placeholder:text-muted disabled:bg-slate-50 disabled:text-muted ${
          error
            ? "border-critical focus:ring-2 focus:ring-critical/20"
            : "border-border focus:border-primary focus:ring-2 focus:ring-primary/20"
        } ${className}`}
        {...props}
      />
      {error ? (
        <span className="mt-1 block text-xs text-critical">{error}</span>
      ) : hint ? (
        <span className="mt-1 block text-xs text-text-secondary">{hint}</span>
      ) : null}
    </label>
  );
}
