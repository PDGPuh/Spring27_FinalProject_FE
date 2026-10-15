"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  Bell,
  Building2,
  CalendarDays,
  ClipboardList,
  Database,
  FileText,
  FlaskConical,
  HelpCircle,
  Images,
  LayoutDashboard,
  LogOut,
  Settings,
  Shield,
  UserRound,
  Users,
  BrainCircuit,
  ListChecks,
  Plug,
  ScrollText,
  Upload,
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
    label: "LÂM SÀNG",
    items: [
      { href: "/dashboard/benh-nhan", label: "Bệnh nhân", icon: Users },
      { href: "/dashboard/chi-dinh", label: "Chỉ định chụp", icon: ClipboardList },
      { href: "/dashboard/lich-chup", label: "Lịch chụp", icon: CalendarDays },
      { href: "/dashboard/hang-doi", label: "Check-in & Hàng đợi", icon: ListChecks },
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
    label: "NGHIÊN CỨU",
    items: [
      { href: "/dashboard/dataset", label: "Bộ dữ liệu", icon: Database },
      { href: "/dashboard/danh-gia-ai", label: "Đánh giá AI", icon: FlaskConical },
      { href: "/dashboard/danh-gia-xai", label: "Đánh giá XAI", icon: BrainCircuit },
      { href: "/dashboard/mo-hinh", label: "Mô hình AI", icon: BrainCircuit },
    ],
  },
  {
    label: "QUẢN TRỊ",
    items: [
      { href: "/dashboard/co-so", label: "Cơ sở", icon: Building2 },
      { href: "/dashboard/nguoi-dung", label: "Người dùng & Phân quyền", icon: Shield },
      { href: "/dashboard/thong-bao", label: "Thông báo", icon: Bell },
      { href: "/dashboard/nhat-ky", label: "Nhật ký hệ thống", icon: ScrollText },
      { href: "/dashboard/tich-hop", label: "Tích hợp", icon: Plug },
      { href: "/dashboard/cai-dat", label: "Cài đặt", icon: Settings },
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
    <aside className="flex h-full w-[240px] shrink-0 flex-col overflow-hidden bg-nav-dark text-slate-300">
      <div className="flex h-16 items-center border-b border-white/10 px-4">
        <Logo variant="onDark" href={role.home} size="sm" />
      </div>

      <div className="border-b border-white/10 px-4 py-2.5">
        <p className="text-[10px] font-semibold tracking-[0.08em] text-slate-500">
          DEMO ROLE
        </p>
        <p className="mt-0.5 truncate text-[12px] text-white">{role.label}</p>
      </div>

      <nav className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-4">
        {visibleGroups.map((group) => (
          <div key={group.label} className="mb-5">
            <p className="mb-2 px-2 text-[10px] font-semibold tracking-[0.08em] text-slate-500">
              {group.label}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const active =
                  pathname === item.href ||
                  (item.href !== "/dashboard" && pathname.startsWith(item.href));
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-2.5 rounded-[8px] px-2.5 py-2 text-[13px] transition-colors ${
                        active
                          ? "bg-white/10 text-white"
                          : "hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <item.icon className="h-4 w-4 shrink-0 opacity-80" />
                      <span className="truncate">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t border-white/10 p-3 space-y-0.5">
        <Link
          href="/dashboard/trang-thai"
          className="flex items-center gap-2.5 rounded-[8px] px-2.5 py-2 text-[13px] hover:bg-white/5 hover:text-white"
        >
          <HelpCircle className="h-4 w-4" /> Trợ giúp / States
        </Link>
        <Link
          href="/dashboard/ho-so"
          className="flex items-center gap-2.5 rounded-[8px] px-2.5 py-2 text-[13px] hover:bg-white/5 hover:text-white"
        >
          <UserRound className="h-4 w-4" /> Hồ sơ cá nhân
        </Link>
        <Link
          href="/dang-nhap"
          className="flex items-center gap-2.5 rounded-[8px] px-2.5 py-2 text-[13px] hover:bg-white/5 hover:text-white"
        >
          <LogOut className="h-4 w-4" /> Đăng xuất
        </Link>
      </div>
    </aside>
  );
}
