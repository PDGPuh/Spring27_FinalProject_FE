"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  Bell,
  BrainCircuit,
  Building2,
  CalendarDays,
  ChevronRight,
  ClipboardList,
  Cpu,
  Database,
  FileText,
  FlaskConical,
  HelpCircle,
  Images,
  LayoutDashboard,
  ListChecks,
  LogOut,
  Plug,
  ScrollText,
  Settings,
  Shield,
  Stethoscope,
  Upload,
  UserRound,
  Users,
} from "lucide-react";
import { Logo } from "@/components/branding/Logo";
import { useDemoRole } from "@/components/app-shell/useDemoRole";
import { canAccessHref } from "@/lib/roles";

const groups = [
  {
    label: "TỔNG QUAN",
    items: [{ href: "/dashboard", label: "Dashboard", icon: LayoutDashboard }],
  },
  {
    label: "LÂM SÀNG & TIẾP NHẬN",
    items: [
      { href: "/dashboard/benh-nhan", label: "Bệnh nhân", icon: Users },
      { href: "/dashboard/chi-dinh", label: "Chỉ định chụp", icon: ClipboardList },
      { href: "/dashboard/lich-chup", label: "Lịch chụp", icon: CalendarDays },
      { href: "/dashboard/hang-doi", label: "Hàng đợi", icon: ListChecks },
      { href: "/dashboard/studies/upload", label: "Upload DICOM", icon: Upload },
    ],
  },
  {
    label: "CHẨN ĐOÁN HÌNH ẢNH",
    items: [
      { href: "/dashboard/worklist", label: "Worklist đọc phim", icon: Images },
      { href: "/dashboard/studies", label: "Studies", icon: Activity },
      { href: "/dashboard/bao-cao", label: "Báo cáo", icon: FileText },
    ],
  },
  {
    label: "ĐÀO TẠO & NGHIÊN CỨU",
    items: [
      { href: "/dashboard/dataset", label: "Bộ dữ liệu nghiên cứu", icon: Database },
      { href: "/dashboard/danh-gia-ai", label: "Đánh giá AI", icon: FlaskConical },
      { href: "/dashboard/danh-gia-xai", label: "Đánh giá XAI", icon: BrainCircuit },
      { href: "/dashboard/mo-hinh", label: "Mô hình AI", icon: Cpu },
    ],
  },
  {
    label: "QUẢN TRỊ BỆNH VIỆN",
    items: [
      { href: "/dashboard/co-so", label: "Cơ sở", icon: Building2 },
      { href: "/dashboard/nguoi-dung", label: "Người dùng & Phân quyền", icon: Shield },
      { href: "/dashboard/thong-bao", label: "Thông báo", icon: Bell },
      { href: "/dashboard/nhat-ky", label: "Nhật ký hệ thống", icon: ScrollText },
      { href: "/dashboard/tich-hop", label: "Tích hợp", icon: Plug },
      { href: "/dashboard/cai-dat", label: "Cài đặt hệ thống", icon: Settings },
      { href: "/dashboard/trang-thai", label: "Trạng thái UI", icon: Activity },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { role } = useDemoRole();

  const visibleGroups = groups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => canAccessHref(role, item.href)),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <aside className="flex h-full w-[296px] shrink-0 flex-col overflow-hidden border-r border-[#04244E] bg-gradient-to-b from-[#073B7A] via-[#063268] to-[#04244E] text-white shadow-xl">
      {/* Brand Header */}
      <div className="flex h-[76px] shrink-0 items-center border-b border-white/15 bg-white/[0.04] px-4.5">
        <Logo variant="onDark" href={role.home} size="sm" />
      </div>

      {/* Active Role Card */}
      <div className="px-4 pt-4 pb-2">
        <div className="rounded-2xl border border-white/20 bg-white/[0.10] p-4 shadow-inner backdrop-blur-xs">
          <div className="flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 text-[11.5px] font-extrabold uppercase tracking-[0.06em] text-sky-200">
              <Stethoscope className="size-4 text-sky-300" />
              VAI TRÒ ĐANG TRỰC
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[11px] font-extrabold text-emerald-300 ring-1 ring-emerald-400/40">
              <span className="size-2 rounded-full bg-emerald-400" />
              Online
            </span>
          </div>
          <div className="mt-3 flex items-center gap-3">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-white/25 bg-gradient-to-br from-sky-400 to-primary-600 text-[14px] font-black text-white shadow-sm">
              {role.initials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[15.5px] font-black leading-tight text-white">
                {role.label}
              </p>
              <p className="mt-1 truncate text-[13.5px] font-semibold text-sky-100/95">
                {role.name}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Groups */}
      <nav className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-3.5">
        <div className="flex flex-col gap-6">
          {visibleGroups.map((group) => (
            <div key={group.label}>
              <div className="mb-2.5 flex items-center gap-2 px-2">
                <span className="h-2 w-2 rounded-full bg-sky-300" />
                <p className="text-[12px] font-extrabold uppercase tracking-[0.08em] text-sky-200">
                  {group.label}
                </p>
              </div>
              <ul className="flex flex-col gap-1.5">
                {group.items.map((item) => {
                  const active =
                    pathname === item.href ||
                    (item.href !== "/dashboard" &&
                      item.href !== "/dashboard/studies" &&
                      pathname.startsWith(item.href)) ||
                    (item.href === "/dashboard/studies" &&
                      pathname === "/dashboard/studies");
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`group flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-[15px] transition-all duration-150 ${
                          active
                            ? "bg-white font-extrabold text-[#063268] shadow-[0_4px_14px_rgba(0,0,0,0.22)]"
                            : "font-semibold text-white/95 hover:bg-white/12 hover:text-white"
                        }`}
                      >
                        <span className="flex min-w-0 items-center gap-3">
                          <span
                            className={`flex size-8.5 shrink-0 items-center justify-center rounded-lg transition-colors ${
                              active
                                ? "bg-primary-600 text-white shadow-xs"
                                : "bg-white/12 text-sky-200 group-hover:bg-white/20 group-hover:text-white"
                            }`}
                          >
                            <item.icon className="size-[18px] shrink-0" />
                          </span>
                          <span className="truncate">{item.label}</span>
                        </span>
                        {active && (
                          <ChevronRight className="size-4.5 shrink-0 text-primary-600" />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </nav>

      {/* Bottom Utility Links */}
      <div className="flex flex-col gap-1 border-t border-white/15 bg-[#031B3B]/85 p-3.5">
        <Link
          href="/dashboard/trang-thai"
          className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-[14px] font-semibold text-sky-100/95 transition-colors hover:bg-white/12 hover:text-white"
        >
          <HelpCircle className="size-4.5 shrink-0 text-sky-300" />
          <span className="truncate">Trợ giúp & Trạng thái UI</span>
        </Link>
        <Link
          href="/dashboard/ho-so"
          className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-[14px] font-semibold text-sky-100/95 transition-colors hover:bg-white/12 hover:text-white"
        >
          <UserRound className="size-4.5 shrink-0 text-sky-300" />
          <span className="truncate">Hồ sơ cá nhân</span>
        </Link>
        <Link
          href="/dang-nhap"
          className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-[14px] font-semibold text-sky-100/95 transition-colors hover:bg-red-500/20 hover:text-red-200"
        >
          <LogOut className="size-4.5 shrink-0 text-sky-300" />
          <span className="truncate">Đăng xuất</span>
        </Link>
      </div>
    </aside>
  );
}
