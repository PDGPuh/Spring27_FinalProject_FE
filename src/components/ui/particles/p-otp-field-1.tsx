"use client";

import { useRef } from "react";

interface OtpFieldParticleProps {
  value: string[];
  onChange: (nextDigits: string[]) => void;
  length?: number;
  disabled?: boolean;
  hasError?: boolean;
}

export function OtpFieldParticle({
  value,
  onChange,
  length = 6,
  disabled = false,
  hasError = false,
}: OtpFieldParticleProps) {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const focusSlot = (idx: number) => {
    const target = inputRefs.current[Math.max(0, Math.min(length - 1, idx))];
    target?.focus();
    target?.select();
  };

  const handleSlotChange = (index: number, raw: string) => {
    const digitsOnly = raw.replace(/\D/g, "");
    if (!digitsOnly) {
      const next = [...value];
      next[index] = "";
      onChange(next);
      return;
    }

    // Handle multi-character input or single digit
    const next = [...value];
    for (let i = 0; i < digitsOnly.length && index + i < length; i++) {
      next[index + i] = digitsOnly[i];
    }
    onChange(next);

    const nextFocusIndex = Math.min(length - 1, index + digitsOnly.length);
    if (index + digitsOnly.length <= length - 1) {
      focusSlot(nextFocusIndex);
    } else {
      inputRefs.current[length - 1]?.blur();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (!value[index] && index > 0) {
        e.preventDefault();
        const next = [...value];
        next[index - 1] = "";
        onChange(next);
        focusSlot(index - 1);
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      focusSlot(index - 1);
    } else if (e.key === "ArrowRight" && index < length - 1) {
      e.preventDefault();
      focusSlot(index + 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    if (!pasted) return;
    const next = Array.from({ length }, (_, idx) => pasted[idx] ?? value[idx] ?? "");
    onChange(next);
    focusSlot(Math.min(length - 1, pasted.length));
  };

  return (
    <div className="flex flex-col gap-3">
      <div
        role="group"
        aria-label="Mã xác thực OTP 6 chữ số"
        className="flex items-center justify-between gap-2 sm:gap-2.5"
      >
        {Array.from({ length }).map((_, index) => {
          const digit = value[index] ?? "";
          const isFilled = Boolean(digit);
          return (
            <div key={index} className=" flex items-center gap-2">
              <input
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                id={`otp-slot-${index}`}
                type="text"
                inputMode="numeric"
                autoComplete={index === 0 ? "one-time-code" : "off"}
                maxLength={1}
                disabled={disabled}
                value={digit}
                aria-label={`Chữ số OTP thứ ${index + 1}`}
                onChange={(e) => handleSlotChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                onFocus={(e) => e.currentTarget.select()}
                className={`size-12 sm:size-13 rounded-xl border text-center text-lg font-bold tabular-nums shadow-xs outline-none transition-all duration-150 ${
                  hasError
                    ? "border-critical bg-red-50/60 text-critical focus:border-critical focus:ring-4 focus:ring-critical/15"
                    : isFilled
                      ? "border-primary-600 bg-primary-75/70 text-primary-800 ring-2 ring-primary-600/15"
                      : "border-border bg-white text-text hover:border-primary-400 focus:border-primary-600 focus:bg-white focus:ring-4 focus:ring-primary-600/15"
                }`}
              />
              {index === 2 && (
                <span
                  aria-hidden="true"
                  className="hidden text-lg font-bold text-primary-400 sm:inline-block"
                >
                  –
                </span>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between text-xs text-text-secondary">
        <span>Hỗ trợ dán nhanh (Ctrl+V) hoặc phím mũi tên</span>
        <button
          type="button"
          onClick={() => onChange(["2", "8", "4", "9", "1", "6"])}
          className="font-semibold text-primary-600 hover:text-primary-700 hover:underline"
        >
          Điền nhanh mã Demo (284916)
        </button>
      </div>
    </div>
  );
}
