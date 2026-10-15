import type { TextareaHTMLAttributes } from "react";

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
};

export function Textarea({ label, className = "", ...props }: Props) {
  return (
    <label className="block">
      {label && (
        <span className="mb-1.5 block text-sm font-medium text-text">
          {label}
          {props.required && <span className="text-critical"> *</span>}
        </span>
      )}
      <textarea
        className={`min-h-[96px] w-full rounded-[8px] border border-border bg-white px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 ${className}`}
        {...props}
      />
    </label>
  );
}
