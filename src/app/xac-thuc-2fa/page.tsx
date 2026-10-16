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
    <div className="flex min-h-screen flex-col justify-between bg-linear-overview px-5 py-8 sm:px-8">
      <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between">
        <Logo href="/" />
        <Link
          href="/dang-nhap"
          className="inline-flex items-center gap-2 rounded-xl border border-primary-600/35 bg-white px-4 py-2.5 text-[14px] font-bold text-primary-700 shadow-2xs transition-colors hover:bg-primary-50"
        >
          <ArrowLeft className="size-4" /> Quay lại đăng nhập
        </Link>
      </div>

      <div className="mx-auto my-8 w-full max-w-[540px]">
        <div className="relative overflow-hidden rounded-3xl border border-primary-100 border-t-[5px] border-t-primary-600 bg-white p-8 sm:p-10 overview-wrapper-shadow">
          <BorderBeam size={260} duration={11} colorFrom="#0096d1" colorTo="#0d71ba" />

          <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-2xl bg-primary-50 text-primary-600 shadow-2xs">
            <KeyRound className="size-9" />
          </div>

          <div className="text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-75 px-3.5 py-1.5 text-[12.5px] font-extrabold uppercase tracking-[0.04em] text-primary-800">
              <ShieldCheck className="size-4 text-primary-600" /> Bảo mật hai lớp (2FA)
            </span>
            <h1 className="mt-3 text-[28px] font-black tracking-tight text-primary-950 sm:text-[30px]">
              Xác thực hai lớp (2FA)
            </h1>
            <p className="mt-2 text-[15.5px] font-medium leading-relaxed text-text-secondary">
              Nhập mã gồm 6 chữ số từ ứng dụng xác thực hoặc SMS đã gửi tới thiết bị đã
              đăng ký.
            </p>
          </div>

          <form onSubmit={submit} className="mt-8 flex flex-col gap-6">
            {/* Coss UI / Base UI 6-digit OTP Input Particle */}
            <OtpFieldParticle
              value={digits}
              onChange={handleOtpChange}
              hasError={Boolean(error)}
            />

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[14px] font-bold text-critical">
                {error}
              </div>
            )}

            <div className="flex items-center justify-between rounded-xl border border-primary-100 bg-primary-50/75 px-4 py-3 text-[14px] font-semibold text-text-secondary">
              <span>Hiệu lực mã xác thực còn lại:</span>
              <span className="font-mono text-[15px] font-black text-primary-800 tabular-nums">
                04:32
              </span>
            </div>

            <div className="flex flex-col gap-3">
              <Button type="submit" className="w-full" size="lg">
                Xác nhận & Vào Hệ thống
              </Button>
              <button
                type="button"
                onClick={() => {
                  setDigits(["", "", "", "", "", ""]);
                  setError("");
                }}
                className="w-full rounded-xl py-2.5 text-center text-[14px] font-bold text-primary-700 transition-colors hover:bg-primary-50 hover:text-primary-800"
              >
                Gửi lại mã OTP mới
              </button>
            </div>
          </form>
        </div>
      </div>

      <p className="text-center text-[14px] font-medium text-text-secondary">
        © 2026 Hệ thống X-quang AI · Khoa Chẩn đoán Hình ảnh · Xác thực An toàn Thông tin
      </p>
    </div>
  );
}
