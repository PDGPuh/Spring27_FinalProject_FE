"use client";

import Link from "next/link";
import { Bell, Building2, ChevronDown, RefreshCw, Search, ShieldCheck } from "lucide-react";
import { facilities, notifications } from "@/lib/demo-data";
import { useDemoRole } from "@/components/app-shell/useDemoRole";
import type { DemoRoleId } from "@/lib/roles";

export function Topbar() {
  const { role, roleId, setRole, roles } = useDemoRole();
  const unread = notifications.filter((n) => n.unread).length;

  return (
    <header className="z-30 flex h-[76px] shrink-0 items-center justify-between gap-4 border-b border-primary-100 bg-white px-5 shadow-2xs sm:px-7">
      {/* Left: Facility Badge & Role Switcher */}
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          className="inline-flex h-11 max-w-[260px] shrink-0 items-center gap-2.5 rounded-xl border border-primary-200 bg-primary-50/70 px-4 text-[14px] font-bold text-primary-900 transition-colors hover:border-primary-500"
        >
          <Building2 className="size-4.5 shrink-0 text-primary-600" />
          <span className="truncate">{facilities[0]}</span>
          <ChevronDown className="size-4 shrink-0 text-primary-600" />
        </button>

        <label className="hidden h-11 shrink-0 items-center gap-2.5 rounded-xl border border-primary-200 bg-white px-4 shadow-2xs sm:flex">
          <span className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap text-[12.5px] font-extrabold uppercase tracking-[0.03em] text-primary-700">
            <ShieldCheck className="size-4 text-primary-600" /> Vai trò:
          </span>
          <select
            value={roleId}
            onChange={(e) => setRole(e.target.value as DemoRoleId)}
            className="h-9 max-w-[200px] cursor-pointer bg-transparent pr-1 text-[14px] font-extrabold text-primary-950 outline-none"
            aria-label="Chọn vai trò demo"
          >
            {roles.map((r) => (
              <option key={r.id} value={r.id}>
                {r.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Center: Search Input with Blue Square Action Button */}
      <div className="relative hidden w-full max-w-md xl:block">
        <input
          type="search"
          placeholder="Tìm người bệnh, mã ca XR2026..., mã BHYT..."
          className="h-11 w-full rounded-xl border border-primary-200 bg-primary-50/35 pl-4 pr-12 text-[14px] font-medium text-primary-950 outline-none transition-colors placeholder:text-gray-400 hover:border-primary-500 focus:border-primary-600 focus:bg-white focus:ring-3 focus:ring-primary-600/15"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-1.5 top-1/2 flex size-8.5 -translate-y-1/2 items-center justify-center rounded-lg bg-primary-600 text-white shadow-2xs"
        >
          <Search className="size-4" />
        </span>
      </div>

      {/* Right: Actions & Clinician Profile */}
      <div className="flex shrink-0 items-center gap-2.5 whitespace-nowrap">
        <Link
          href="/portal"
          className="hidden h-11 shrink-0 items-center whitespace-nowrap rounded-xl border border-primary-600/35 bg-primary-50/70 px-4 text-[14px] font-bold text-primary-700 transition-colors hover:bg-primary-600 hover:text-white 2xl:inline-flex"
        >
          Cổng Bệnh nhân
        </Link>

        <Link
          href="/dashboard/thong-bao"
          className="relative inline-flex size-11 shrink-0 items-center justify-center rounded-xl border border-primary-200 bg-white text-primary-700 transition-colors hover:border-primary-600 hover:bg-primary-50"
          aria-label="Thông báo"
        >
          <Bell className="size-5" />
          {unread > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-critical px-1.5 text-[11px] font-extrabold text-white tabular-nums shadow-xs">
              {unread}
            </span>
          )}
        </Link>

        <button
          type="button"
          className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl border border-primary-200 bg-white text-primary-700 transition-colors hover:border-primary-600 hover:bg-primary-50"
          aria-label="Làm mới"
        >
          <RefreshCw className="size-5" />
        </button>

        <Link
          href="/dashboard/ho-so"
          className="flex h-11.5 shrink-0 items-center gap-3 rounded-xl border border-primary-200 bg-primary-50/60 pl-2.5 pr-4 transition-colors hover:border-primary-600 hover:bg-primary-50"
        >
          <div className="flex size-8.5 shrink-0 items-center justify-center rounded-lg border border-primary-400 bg-gradient-to-tl from-primary-75 to-primary-100 text-[12.5px] font-extrabold text-primary-800">
            {role.initials}
          </div>
          <div className="leading-tight whitespace-nowrap">
            <p className="text-[14px] font-extrabold text-primary-950">{role.name}</p>
            <p className="mt-0.5 text-[12px] font-semibold text-primary-700">{role.label}</p>
          </div>
        </Link>
      </div>
    </header>
  );
}
