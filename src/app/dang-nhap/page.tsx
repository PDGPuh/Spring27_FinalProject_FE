import Link from "next/link";
import { Logo } from "@/components/branding/Logo";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "Đăng nhập | Hệ thống X-quang AI",
  description: "Đăng nhập vào Hệ thống X-quang AI",
};

export default function LoginPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-[2fr_3fr]">
      <aside className="relative hidden overflow-hidden bg-nav-dark px-10 py-12 text-white lg:flex lg:flex-col">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,_rgba(8,145,178,0.35),_transparent_45%),radial-gradient(ellipse_at_80%_80%,_rgba(124,58,237,0.18),_transparent_40%)]" />
        <div className="relative">
          <Logo variant="onDark" href="/" />
        </div>
        <div className="relative mt-auto max-w-md pb-8">
          <h1 className="text-[32px] font-semibold leading-tight tracking-tight">
            Quản lý quy trình X-quang trên một nền tảng thống nhất.
          </h1>
          <div className="mt-8 grid grid-cols-2 gap-3">
            {["DICOM", "AI hỗ trợ", "Explainable AI", "Radiology Workflow"].map(
              (item) => (
                <div
                  key={item}
                  className="rounded-[10px] border border-white/10 bg-white/5 px-3 py-3 text-sm"
                >
                  {item}
                </div>
              ),
            )}
          </div>
          <div className="mt-10 h-36 overflow-hidden rounded-[12px] border border-white/10 bg-[#071018]">
            <div className="relative h-full">
              <div className="absolute inset-4 rounded-md bg-[radial-gradient(ellipse_at_center,_#1f3a4d_0%,_#071018_70%)]" />
              <div className="absolute left-[32%] top-[28%] h-[40%] w-[22%] rounded-full bg-[radial-gradient(circle,_rgba(8,145,178,0.5)_0%,_transparent_70%)]" />
              <p className="absolute bottom-3 left-4 text-[11px] text-slate-400">
                Minh họa abstract DICOM / X-ray
              </p>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex flex-col bg-background px-6 py-10">
        <div className="mb-8 lg:hidden">
          <Logo href="/" />
        </div>
        <div className="m-auto w-full max-w-[420px]">
          <div className="rounded-[12px] border border-border bg-card p-8 shadow-[0_16px_40px_-28px_rgba(15,42,56,0.35)]">
            <h2 className="text-[28px] font-semibold tracking-tight">Đăng nhập</h2>
            <p className="mt-1 text-sm text-text-secondary">
              Đăng nhập vào tài khoản của bạn
            </p>

            <form className="mt-8 space-y-4" action="/xac-thuc-2fa">
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium">
                  Email hoặc tên đăng nhập
                </span>
                <input
                  type="text"
                  name="username"
                  defaultValue="bs.nguyenvana"
                  className="h-11 w-full rounded-[8px] border border-border bg-white px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="email@benhvien.vn"
                  autoComplete="username"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium">Mật khẩu</span>
                <input
                  type="password"
                  name="password"
                  defaultValue="••••••••"
                  className="h-11 w-full rounded-[8px] border border-border bg-white px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  autoComplete="current-password"
                />
              </label>
              <div className="flex items-center justify-between text-sm">
                <label className="inline-flex items-center gap-2 text-text-secondary">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                    defaultChecked
                  />
                  Ghi nhớ đăng nhập
                </label>
                <Link href="#" className="font-medium text-primary hover:text-primary-dark">
                  Quên mật khẩu?
                </Link>
              </div>
              <Button type="submit" className="w-full" size="lg">
                Đăng nhập
              </Button>
              <Button type="button" variant="secondary" className="w-full" size="lg">
                Đăng nhập bằng SSO
              </Button>
            </form>

            <div className="mt-6 border-t border-border pt-5">
              <p className="mb-2 text-xs font-medium text-text-secondary">
                Vào nhanh demo (không auth thật)
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  { href: "/dashboard/worklist?role=cdha", label: "CĐHA" },
                  { href: "/dashboard/benh-nhan?role=chidinh", label: "Chỉ định" },
                  { href: "/dashboard/hang-doi?role=ktv", label: "KTV" },
                  { href: "/dashboard/hang-doi?role=tiepdon", label: "Tiếp đón" },
                  { href: "/dashboard/dataset?role=researcher", label: "Research" },
                  { href: "/dashboard/co-so?role=facility", label: "Facility" },
                  { href: "/dashboard?role=admin", label: "Admin" },
                  { href: "/portal", label: "Portal BN" },
                ].map((d) => (
                  <Link
                    key={d.href}
                    href={d.href}
                    className="rounded-[6px] border border-border bg-background px-2.5 py-1 text-[11px] font-medium text-text hover:border-primary hover:text-primary"
                  >
                    {d.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <p className="mt-6 text-center text-xs text-text-secondary">
            © 2026 Hệ thống X-quang AI ·{" "}
            <Link href="#" className="underline-offset-2 hover:underline">
              Chính sách bảo mật
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
