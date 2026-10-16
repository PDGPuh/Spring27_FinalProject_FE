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
    <div className="grid min-h-screen lg:grid-cols-[1.05fr_1.15fr]">
      {/* Left Institutional Banner */}
      <aside className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-primary-500 via-primary-600 to-primary-800 px-10 py-12 text-white lg:flex">
        <div className="pointer-events-none absolute -right-16 -top-16 size-80 rounded-full bg-primary-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-16 size-80 rounded-full bg-primary-200/15 blur-3xl" />

        <div className="relative z-10">
          <Logo variant="onDark" href="/" />
        </div>

        <div className="relative z-10 my-auto max-w-lg py-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.04em] text-primary-100">
            <Stethoscope className="size-3.5" />
            Radiology Workflow · Explainable AI
          </span>
          <h1 className="display-3 mt-4 text-white">
            Quy trình đọc phim X-quang có giải thích, chuẩn hóa cho bệnh viện.
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-primary-75">
            Kết nối từ tiếp đón, chỉ định, kỹ thuật chụp đến AI/XAI và bác sĩ kết luận trên
            một nền tảng thống nhất, có kiểm soát phân quyền và nhật ký kiểm toán.
          </p>

          <div className="mt-7 grid grid-cols-2 gap-3">
            {[
              ["Phân quyền theo vai trò", "8 vai trò chuyên biệt trong quy trình"],
              ["Explainable AI", "Grad-CAM++ · vùng nhiệt trực quan"],
              ["Human-in-the-loop", "Bác sĩ luôn là người ký kết luận cuối"],
              ["Bảo mật đa lớp", "Xác thực hai lớp (2FA) & nhật ký truy cập"],
            ].map(([title, sub]) => (
              <div
                key={title}
                className="rounded-xl border border-white/15 bg-white/10 p-3.5 backdrop-blur-xs"
              >
                <p className="flex items-center gap-1.5 text-xs font-bold text-white">
                  <CheckCircle2 className="size-3.5 text-primary-200" />
                  {title}
                </p>
                <p className="mt-1 text-[11px] text-primary-100">{sub}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between border-t border-white/15 pt-4 text-xs text-primary-100">
          <span>Phiên bản lâm sàng 2.4 · 2026</span>
          <span>Tuân thủ quy định bảo mật dữ liệu y tế</span>
        </div>
      </aside>

      {/* Right Login Card */}
      <main className="flex flex-col justify-between bg-linear-overview px-4 py-8 sm:px-8">
        <div className="flex items-center justify-between lg:justify-end">
          <div className="lg:hidden">
            <Logo href="/" />
          </div>
          <Link
            href="/"
            className="rounded-lg border border-primary-600/30 bg-white px-3.5 py-1.5 text-xs font-semibold text-primary-600 transition-colors hover:bg-primary-50"
          >
            ← Quay lại trang giới thiệu
          </Link>
        </div>

        <div className="mx-auto my-8 w-full max-w-[460px]">
          <div className="relative overflow-hidden rounded-2xl border border-primary-100 bg-white p-7 sm:p-9 overview-wrapper-shadow border-t-4 border-t-primary-600">
            <BorderBeam size={240} duration={12} colorFrom="#0096d1" colorTo="#0d71ba" />

            <div className="flex items-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-full bg-primary-50 text-primary-600">
                <Lock className="size-5" />
              </div>
              <div>
                <h2 className="heading-1 text-primary-800">Đăng nhập hệ thống</h2>
                <p className="text-xs text-text-secondary">
                  Sử dụng tài khoản nội bộ bệnh viện hoặc SSO được cấp phát.
                </p>
              </div>
            </div>

            <form className="mt-6 flex flex-col gap-4" action="/xac-thuc-2fa">
              <label className="block">
                <span className="mb-1.5 block text-xs font-bold uppercase tracking-[0.03em] text-primary-800">
                  Tên đăng nhập hoặc Email
                </span>
                <input
                  type="text"
                  name="username"
                  defaultValue="bs.nguyenvana"
                  className="h-11 w-full rounded-lg border border-gray-200 bg-white px-3.5 text-sm outline-none transition-colors hover:border-primary-600 focus:border-primary-600 focus:ring-3 focus:ring-primary-600/15"
                  placeholder="ten.dangnhap hoặc email@benhvien.vn"
                  autoComplete="username"
                />
              </label>

              <label className="block">
                <span className="mb-1.5 block text-xs font-bold uppercase tracking-[0.03em] text-primary-800">
                  Mật khẩu
                </span>
                <input
                  type="password"
                  name="password"
                  defaultValue="••••••••"
                  className="h-11 w-full rounded-lg border border-gray-200 bg-white px-3.5 text-sm outline-none transition-colors hover:border-primary-600 focus:border-primary-600 focus:ring-3 focus:ring-primary-600/15"
                  autoComplete="current-password"
                />
              </label>

              <div className="flex items-center justify-between text-xs">
                <label className="inline-flex cursor-pointer items-center gap-2 text-text-secondary">
                  <input
                    type="checkbox"
                    className="size-4 rounded border-gray-300 accent-primary-600"
                    defaultChecked
                  />
                  Ghi nhớ đăng nhập trên thiết bị này
                </label>
                <Link
                  href="/xac-thuc-2fa"
                  className="font-semibold text-primary-600 hover:text-primary-700 hover:underline"
                >
                  Quên mật khẩu?
                </Link>
              </div>

              <div className="mt-1 flex flex-col gap-2.5">
                <Button type="submit" className="w-full" size="lg">
                  Đăng nhập
                </Button>
                <Button type="button" variant="secondary" className="w-full" size="lg">
                  Đăng nhập bằng SSO
                </Button>
              </div>
            </form>

            {/* Quick Role Switcher for Demo Evaluation */}
            <div className="mt-6 border-t border-primary-100 pt-5">
              <div className="mb-2.5 flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-[0.03em] text-primary-700">
                  Vào nhanh giao diện theo vai trò (demo)
                </p>
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-primary-600">
                  <ShieldCheck className="size-3.5" /> 1-Click
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
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
                    className="rounded-lg border border-primary-200 bg-primary-50/70 px-2.5 py-2 text-center text-xs font-semibold text-primary-700 transition-all hover:border-primary-600 hover:bg-primary-600 hover:text-white"
                  >
                    {d.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-text-secondary">
          Cần hỗ trợ tài khoản? Liên hệ bộ phận CNTT nội bộ (ext. 1080).
        </p>
      </main>
    </div>
  );
}
