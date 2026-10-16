import Link from "next/link";
import { CheckCircle2, Lock, ShieldCheck, Stethoscope } from "lucide-react";
import { Logo } from "@/components/branding/Logo";
import { Button } from "@/components/ui/Button";
import { BorderBeam } from "@/components/magicui/BorderBeam";

export const metadata = {
  title: "Đăng nhập | Hệ thống X-quang AI",
};

export default function LoginPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-[1.08fr_1.12fr]">
      {/* Left Institutional Banner */}
      <aside className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-[#073B7A] via-primary-700 to-[#04244E] px-12 py-12 text-white lg:flex">
        <div className="pointer-events-none absolute -right-16 -top-16 size-96 rounded-full bg-primary-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-16 size-96 rounded-full bg-primary-200/15 blur-3xl" />

        <div className="relative z-10">
          <Logo variant="onDark" href="/" />
        </div>

        <div className="relative z-10 my-auto max-w-xl py-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/12 px-4 py-1.5 text-[13px] font-extrabold uppercase tracking-[0.04em] text-sky-100">
            <Stethoscope className="size-4 text-sky-300" />
            Radiology Workflow · Explainable AI
          </span>
          <h1 className="mt-5 text-[36px] font-black leading-[1.2] tracking-tight text-white xl:text-[42px]">
            Quy trình đọc phim X-quang có giải thích, chuẩn hóa cho bệnh viện.
          </h1>
          <p className="mt-4 text-[16.5px] font-medium leading-relaxed text-sky-100/95">
            Kết nối từ tiếp đón, chỉ định, kỹ thuật chụp đến AI/XAI và bác sĩ kết luận trên
            một nền tảng thống nhất, có kiểm soát phân quyền và nhật ký kiểm toán.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4">
            {[
              ["Phân quyền theo vai trò", "8 vai trò chuyên biệt trong quy trình"],
              ["Explainable AI", "Grad-CAM++ · vùng nhiệt trực quan"],
              ["Human-in-the-loop", "Bác sĩ luôn là người ký kết luận cuối"],
              ["Bảo mật đa lớp", "Xác thực hai lớp (2FA) & nhật ký truy cập"],
            ].map(([title, sub]) => (
              <div
                key={title}
                className="rounded-2xl border border-white/18 bg-white/10 p-4.5 backdrop-blur-xs"
              >
                <p className="flex items-center gap-2 text-[15px] font-extrabold text-white">
                  <CheckCircle2 className="size-4.5 shrink-0 text-sky-300" />
                  {title}
                </p>
                <p className="mt-1.5 text-[13.5px] font-medium text-sky-100/90">{sub}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between border-t border-white/15 pt-5 text-[13.5px] font-semibold text-sky-100/90">
          <span>Phiên bản lâm sàng 2.4 · 2026</span>
          <span>Tuân thủ quy định bảo mật dữ liệu y tế</span>
        </div>
      </aside>

      {/* Right Login Card */}
      <main className="flex flex-col justify-between bg-linear-overview px-5 py-8 sm:px-10">
        <div className="flex items-center justify-between lg:justify-end">
          <div className="lg:hidden">
            <Logo href="/" />
          </div>
          <Link
            href="/"
            className="rounded-xl border border-primary-600/35 bg-white px-4 py-2.5 text-[14px] font-bold text-primary-700 shadow-2xs transition-colors hover:bg-primary-50"
          >
            ← Quay lại trang giới thiệu
          </Link>
        </div>

        <div className="mx-auto my-8 w-full max-w-[560px]">
          <div className="relative overflow-hidden rounded-3xl border border-primary-100 border-t-[5px] border-t-primary-600 bg-white p-8 sm:p-10 overview-wrapper-shadow">
            <BorderBeam size={260} duration={12} colorFrom="#0096d1" colorTo="#0d71ba" />

            <div className="flex items-center gap-4">
              <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary-50 text-primary-600 shadow-2xs">
                <Lock className="size-6" />
              </div>
              <div>
                <h2 className="text-[26px] font-black tracking-tight text-primary-950 sm:text-[28px]">
                  Đăng nhập hệ thống
                </h2>
                <p className="mt-1 text-[14.5px] font-medium text-text-secondary">
                  Sử dụng tài khoản nội bộ bệnh viện hoặc SSO được cấp phát.
                </p>
              </div>
            </div>

            <form className="mt-7 flex flex-col gap-5" action="/xac-thuc-2fa">
              <label className="block">
                <span className="mb-2 block text-[13.5px] font-extrabold uppercase tracking-[0.03em] text-primary-900">
                  Tên đăng nhập hoặc Email
                </span>
                <input
                  type="text"
                  name="username"
                  defaultValue="bs.nguyenvana"
                  className="h-12.5 w-full rounded-xl border border-primary-200 bg-white px-4 text-[15.5px] font-semibold text-primary-950 outline-none transition-colors hover:border-primary-600 focus:border-primary-600 focus:ring-3 focus:ring-primary-600/15"
                  placeholder="ten.dangnhap hoặc email@benhvien.vn"
                  autoComplete="username"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-[13.5px] font-extrabold uppercase tracking-[0.03em] text-primary-900">
                  Mật khẩu
                </span>
                <input
                  type="password"
                  name="password"
                  defaultValue="••••••••"
                  className="h-12.5 w-full rounded-xl border border-primary-200 bg-white px-4 text-[15.5px] font-semibold text-primary-950 outline-none transition-colors hover:border-primary-600 focus:border-primary-600 focus:ring-3 focus:ring-primary-600/15"
                  autoComplete="current-password"
                />
              </label>

              <div className="flex items-center justify-between text-[14px]">
                <label className="inline-flex cursor-pointer items-center gap-2.5 font-medium text-text-secondary">
                  <input
                    type="checkbox"
                    className="size-4.5 rounded border-gray-300 accent-primary-600"
                    defaultChecked
                  />
                  Ghi nhớ đăng nhập trên thiết bị này
                </label>
                <Link
                  href="/xac-thuc-2fa"
                  className="font-bold text-primary-700 hover:text-primary-800 hover:underline"
                >
                  Quên mật khẩu?
                </Link>
              </div>

              <div className="mt-1 flex flex-col gap-3">
                <Button type="submit" className="w-full" size="lg">
                  Đăng nhập
                </Button>
                <Button type="button" variant="secondary" className="w-full" size="lg">
                  Đăng nhập bằng SSO
                </Button>
              </div>
            </form>

            {/* Quick Role Switcher for Demo Evaluation */}
            <div className="mt-7 border-t border-primary-100 pt-6">
              <div className="mb-3.5 flex items-center justify-between">
                <p className="text-[13px] font-extrabold uppercase tracking-[0.03em] text-primary-800">
                  Vào nhanh giao diện theo vai trò (demo)
                </p>
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-primary-50 px-2.5 py-1 text-[12.5px] font-bold text-primary-700">
                  <ShieldCheck className="size-4" /> 1-Click
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                {[
                  { href: "/dashboard/worklist?role=cdha", label: "Bác sĩ CĐHA" },
                  { href: "/dashboard/benh-nhan?role=chidinh", label: "BS chỉ định" },
                  { href: "/dashboard/hang-doi?role=ktv", label: "Kỹ thuật viên" },
                  { href: "/dashboard/hang-doi?role=tiepdon", label: "Tiếp đón" },
                  { href: "/dashboard/dataset?role=researcher", label: "Nghiên cứu" },
                  { href: "/dashboard/co-so?role=facility", label: "QL cơ sở" },
                  { href: "/dashboard?role=admin", label: "Quản trị" },
                  { href: "/portal", label: "Bệnh nhân" },
                ].map((d) => (
                  <Link
                    key={d.href}
                    href={d.href}
                    className="rounded-xl border border-primary-200 bg-primary-50/75 px-3 py-2.5 text-center text-[13.5px] font-bold text-primary-800 transition-all hover:border-primary-600 hover:bg-primary-600 hover:text-white"
                  >
                    {d.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-[14px] font-medium text-text-secondary">
          Cần hỗ trợ tài khoản? Liên hệ bộ phận CNTT nội bộ (ext. 1080).
        </p>
      </main>
    </div>
  );
}
