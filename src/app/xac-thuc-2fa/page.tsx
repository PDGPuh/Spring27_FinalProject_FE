"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/branding/Logo";
import { Button } from "@/components/ui/Button";

export default function TwoFactorPage() {
  const router = useRouter();
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");

  const onChange = (index: number, value: string) => {
    const v = value.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[index] = v;
    setDigits(next);
    setError("");
    if (v && index < 5) {
      const el = document.getElementById(`otp-${index + 1}`);
      el?.focus();
    }
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (digits.some((d) => !d)) {
      setError("Vui lòng nhập đủ 6 chữ số.");
      return;
    }
    if (digits.join("") === "000000") {
      setError("Mã đã hết hạn. Vui lòng yêu cầu mã mới.");
      return;
    }
    router.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6 py-10">
      <div className="w-full max-w-[420px]">
        <div className="mb-8 flex justify-center">
          <Logo href="/" />
        </div>
        <div className="rounded-[12px] border border-border bg-card p-8">
          <h1 className="text-[28px] font-semibold tracking-tight">Xác thực tài khoản</h1>
          <p className="mt-2 text-sm text-text-secondary">
            Nhập mã gồm 6 chữ số được gửi đến thiết bị xác thực của bạn.
          </p>
          <form onSubmit={submit} className="mt-8">
            <div className="flex justify-between gap-2">
              {digits.map((d, i) => (
                <input
                  key={i}
                  id={`otp-${i}`}
                  inputMode="numeric"
                  maxLength={1}
                  value={d}
                  onChange={(e) => onChange(i, e.target.value)}
                  className="h-12 w-12 rounded-[8px] border border-border text-center text-lg font-semibold outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              ))}
            </div>
            {error && <p className="mt-3 text-sm text-critical">{error}</p>}
            <p className="mt-4 text-xs text-text-secondary">
              Mã còn hiệu lực trong <span className="font-medium text-text">04:32</span>
            </p>
            <Button type="submit" className="mt-6 w-full" size="lg">
              Xác nhận
            </Button>
            <button
              type="button"
              className="mt-3 w-full text-center text-sm font-medium text-primary"
            >
              Gửi lại mã
            </button>
          </form>
        </div>
        <p className="mt-6 text-center text-xs text-text-secondary">
          <Link href="/dang-nhap" className="hover:underline">
            Quay lại đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
}
