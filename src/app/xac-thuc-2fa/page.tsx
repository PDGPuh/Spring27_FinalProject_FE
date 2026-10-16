"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, KeyRound, ShieldCheck } from "lucide-react";
import { Logo } from "@/components/branding/Logo";
import { Button } from "@/components/ui/Button";
import { BorderBeam } from "@/components/magicui/BorderBeam";
import { OtpFieldParticle } from "@/components/ui/particles/p-otp-field-1";

export default function TwoFactorPage() {
  const router = useRouter();
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");

  const handleOtpChange = (next: string[]) => {
    setDigits(next);
    if (error) setError("");
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (digits.some((d) => !d)) {
      setError("Vui lòng nhập đầy đủ 6 chữ số xác thực OTP.");
      return;
    }
    if (digits.join("") === "000000") {
      setError("Mã xác thực đã hết hạn. Vui lòng yêu cầu gửi lại mã mới.");
      return;
    }
    router.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen flex-col justify-between bg-linear-overview px-4 py-8 sm:px-6">
      <div className="mx-auto flex w-full max-w-[1120px] items-center justify-between">
        <Logo href="/" />
        <Link
          href="/dang-nhap"
          className="inline-flex items-center gap-1.5 rounded-lg border border-primary-600/30 bg-white px-3.5 py-1.5 text-xs font-semibold text-primary-600 transition-colors hover:bg-primary-50"
        >
          <ArrowLeft className="size-3.5" /> Quay lại đăng nhập
        </Link>
      </div>

      <div className="mx-auto my-8 w-full max-w-[460px]">
        <div className="relative overflow-hidden rounded-2xl border border-primary-100 bg-white p-7 sm:p-9 overview-wrapper-shadow border-t-4 border-t-primary-600">
          <BorderBeam size={240} duration={11} colorFrom="#0096d1" colorTo="#0d71ba" />

          <div className="mx-auto mb-5 flex size-16 items-center justify-center rounded-full bg-primary-50 text-primary-600 shadow-2xs">
            <KeyRound className="size-7" />
          </div>

          <div className="text-center">
            <span className="inline-flex items-center gap-1 rounded-full bg-primary-75 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.04em] text-primary-700">
              <ShieldCheck className="size-3.5" /> Bảo mật hai lớp (2FA)
            </span>
            <h1 className="heading-1 mt-2.5 text-primary-800">
              Xác thực hai lớp (2FA)
            </h1>
            <p className="mt-1.5 text-sm text-text-secondary">
              Nhập mã gồm 6 chữ số từ ứng dụng xác thực hoặc SMS đã gửi tới thiết bị đã
              đăng ký.
            </p>
          </div>

          <form onSubmit={submit} className="mt-7 flex flex-col gap-5">
            {/* Coss UI / Base UI 6-digit OTP Input Particle */}
            <OtpFieldParticle
              value={digits}
              onChange={handleOtpChange}
              hasError={Boolean(error)}
            />

            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-3.5 py-2.5 text-xs font-medium text-critical">
                {error}
              </div>
            )}

            <div className="flex items-center justify-between rounded-lg bg-primary-50/70 px-3.5 py-2.5 text-xs text-text-secondary">
              <span>Hiệu lực mã xác thực còn lại:</span>
              <span className="font-bold text-primary-700 tabular-nums">04:32</span>
            </div>

            <div className="flex flex-col gap-2.5">
              <Button type="submit" className="w-full" size="lg">
                Xác nhận & Vào Hệ thống
              </Button>
              <button
                type="button"
                onClick={() => {
                  setDigits(["", "", "", "", "", ""]);
                  setError("");
                }}
                className="w-full rounded-lg py-2 text-center text-xs font-semibold text-primary-600 transition-colors hover:bg-primary-50 hover:text-primary-700"
              >
                Gửi lại mã OTP mới
              </button>
            </div>
          </form>
        </div>
      </div>

      <p className="text-center text-xs text-text-secondary">
        © 2026 Hệ thống X-quang AI · Khoa Chẩn đoán Hình ảnh · Xác thực An toàn Thông tin
      </p>
    </div>
  );
}
