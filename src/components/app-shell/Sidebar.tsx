"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  Bell,
  BrainCircuit,
  Building2,
  CalendarDays,
  ClipboardList,
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
    items: [{ href: "/dashboard", label: "Dashboard Chuyên khoa", icon: LayoutDashboard }],
  },
  {
    label: "LÂM SÀNG & TIẾP NHẬN",
    items: [
      { href: "/dashboard/benh-nhan", label: "Hồ sơ Người bệnh", icon: Users },
      { href: "/dashboard/chi-dinh", label: "Chỉ định Chụp X-quang", icon: ClipboardList },
      { href: "/dashboard/lich-chup", label: "Lịch chụp Chuyên khoa", icon: CalendarDays },
      { href: "/dashboard/hang-doi", label: "Check-in & Hàng đợi", icon: ListChecks },
      { href: "/dashboard/studies/upload", label: "Thu nhận & Upload DICOM", icon: Upload },
    ],
  },
  {
    label: "CHẨN ĐOÁN HÌNH ẢNH",
    items: [
      { href: "/dashboard/worklist", label: "Worklist Đọc phim", icon: Images },
      { href: "/dashboard/studies", label: "Kho Ca chụp (Studies)", icon: Activity },
      { href: "/dashboard/bao-cao", label: "Báo cáo Đã ký số", icon: FileText },
    ],
  },
  {
    label: "ĐÀO TẠO & NGHIÊN CỨU",
    items: [
      { href: "/dashboard/dataset", label: "Bộ dữ liệu Nghiên cứu", icon: Database },
      { href: "/dashboard/danh-gia-ai", label: "Kiểm định Mô hình AI", icon: FlaskConical },
      { href: "/dashboard/danh-gia-xai", label: "Đánh giá Bản đồ XAI", icon: BrainCircuit },
      { href: "/dashboard/mo-hinh", label: "Quản lý Phiên bản AI", icon: BrainCircuit },
    ],
  },
  {
    label: "QUẢN TRỊ BỆNH VIỆN",
    items: [
      { href: "/dashboard/co-so", label: "Cơ sở & Thiết bị", icon: Building2 },
      { href: "/dashboard/nguoi-dung", label: "Nhân sự & Phân quyền", icon: Shield },
      { href: "/dashboard/thong-bao", label: "Thông báo Lâm sàng", icon: Bell },
      { href: "/dashboard/nhat-ky", label: "Nhật ký Kiểm toán", icon: ScrollText },
      { href: "/dashboard/tich-hop", label: "Tích hợp HIS / PACS", icon: Plug },
      { href: "/dashboard/cai-dat", label: "Cấu hình Hệ thống", icon: Settings },
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
    <aside className="flex h-full w-[256px] shrink-0 flex-col overflow-hidden border-r border-primary-700/40 bg-gradient-to-b from-primary-700 via-primary-700 to-primary-800 text-white">
      {/* Brand Header */}
      <div className="flex h-16 items-center border-b border-white/12 px-4">
        <Logo variant="onDark" href={role.home} size="sm" />
      </div>

      {/* Active Role Card (UMC Institutional Badge) */}
      <div className="border-b border-white/12 bg-primary-600/45 px-4 py-3">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.06em] text-primary-200">
            <Stethoscope className="size-3" /> VAI TRÒ ĐANG TRỰC
          </span>
          <span className="size-2 rounded-full bg-emerald-400" title="Đang hoạt động" />
        </div>
        <p className="mt-1 truncate text-xs font-bold text-white">{role.label}</p>
        <p className="truncate text-[11px] text-primary-100/85">{role.name}</p>
      </div>

      {/* Navigation Groups */}
      <nav className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-4">
        <div className="flex flex-col gap-5">
          {visibleGroups.map((group) => (
            <div key={group.label}>
              <p className="mb-1.5 px-2.5 text-[10px] font-bold uppercase tracking-[0.08em] text-primary-200/85">
                {group.label}
              </p>
              <ul className="flex flex-col gap-0.5">
                {group.items.map((item) => {
                  const active =
                    pathname === item.href ||
                    (item.href !== "/dashboard" && pathname.startsWith(item.href));
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`relative flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] transition-all duration-150 ${
                          active
                            ? "border-l-[3px] border-l-primary-200 bg-white font-bold text-primary-700 shadow-xs"
                            : "font-medium text-primary-75/90 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        <item.icon
                          className={`size-4 shrink-0 ${
                            active ? "text-primary-600" : "text-primary-200"
                          }`}
                        />
                        <span className="truncate">{item.label}</span>
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
      <div className="flex flex-col gap-0.5 border-t border-white/12 bg-primary-800/70 p-3">
        <Link
          href="/dashboard/trang-thai"
          className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-primary-100 transition-colors hover:bg-white/10 hover:text-white"
        >
          <HelpCircle className="size-4 text-primary-200" /> Trợ giúp & Trạng thái UI
        </Link>
        <Link
          href="/dashboard/ho-so"
          className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-primary-100 transition-colors hover:bg-white/10 hover:text-white"
        >
          <UserRound className="size-4 text-primary-200" /> Hồ sơ Cá nhân
        </Link>
        <Link
          href="/dang-nhap"
          className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-primary-100 transition-colors hover:bg-white/10 hover:text-white"
        >
          <LogOut className="size-4 text-primary-200" /> Đăng xuất Hệ thống
        </Link>
      </div>
    </aside>
  );
}
