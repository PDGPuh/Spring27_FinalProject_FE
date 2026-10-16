import type { TextareaHTMLAttributes } from "react";

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
};

export function Textarea({ label, className = "", ...props }: Props) {
  return (
    <label className="block">
      {label && (
        <span className="mb-1.5 block text-[13px] font-bold text-primary-900">
          {label}
          {props.required && <span className="text-critical"> *</span>}
        </span>
      )}
      <textarea
        className={`min-h-[104px] w-full rounded-xl border border-primary-200 bg-white px-3.5 py-2.5 text-[14px] font-medium leading-relaxed text-primary-950 outline-none transition-colors placeholder:text-gray-400 hover:border-primary-500 focus:border-primary-600 focus:ring-3 focus:ring-primary-600/15 ${className}`}
        {...props}
      />
    </label>
  );
}
