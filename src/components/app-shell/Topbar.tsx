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
    <header className="z-30 flex h-16 shrink-0 items-center justify-between gap-3 border-b border-primary-100 bg-white px-4 shadow-2xs sm:px-6">
      {/* Left: UMC Facility Badge & Role Switcher */}
      <div className="flex min-w-0 items-center gap-2.5">
        <button
          type="button"
          className="inline-flex h-10 max-w-[220px] shrink-0 items-center gap-2 rounded-lg border border-primary-100 bg-primary-50/70 px-3 text-xs font-semibold text-primary-800 transition-colors hover:border-primary-400"
        >
          <Building2 className="size-3.5 shrink-0 text-primary-600" />
          <span className="truncate">{facilities[0]}</span>
          <ChevronDown className="size-3.5 shrink-0 text-primary-600" />
        </button>

        <label className="hidden h-10 shrink-0 items-center gap-2 rounded-lg border border-primary-200/80 bg-white px-3 sm:flex">
          <span className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.03em] text-primary-600">
            <ShieldCheck className="size-3.5" /> Vai trò:
          </span>
          <select
            value={roleId}
            onChange={(e) => setRole(e.target.value as DemoRoleId)}
            className="h-8 max-w-[175px] cursor-pointer bg-transparent pr-1 text-xs font-semibold text-primary-900 outline-none"
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

      {/* Center: UMC Search Input with Blue Square Action Button */}
      <div className="relative hidden w-full max-w-sm xl:block">
        <input
          type="search"
          placeholder="Tìm người bệnh, mã ca XR2026..., mã BHYT..."
          className="h-10 w-full rounded-lg border border-gray-200 bg-primary-50/30 pl-3.5 pr-10 text-xs font-medium text-text outline-none transition-colors placeholder:text-gray-400 hover:border-primary-600 focus:border-primary-600 focus:bg-white focus:ring-2 focus:ring-primary-600/15"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-1 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-md bg-primary-600 text-white"
        >
          <Search className="size-3.5" />
        </span>
      </div>

      {/* Right: Actions & Clinician Profile */}
      <div className="flex shrink-0 items-center gap-2 whitespace-nowrap">
        <Link
          href="/portal"
          className="hidden h-10 shrink-0 items-center whitespace-nowrap rounded-lg border border-primary-600/30 bg-primary-50/60 px-3 text-xs font-semibold text-primary-600 transition-colors hover:bg-primary-600 hover:text-white 2xl:inline-flex"
        >
          Cổng Bệnh nhân
        </Link>

        <Link
          href="/dashboard/thong-bao"
          className="relative inline-flex size-10 shrink-0 items-center justify-center rounded-lg border border-primary-100 bg-white text-primary-700 transition-colors hover:border-primary-600 hover:bg-primary-50"
          aria-label="Thông báo"
        >
          <Bell className="size-4" />
          {unread > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-critical px-1 text-[10px] font-bold text-white tabular-nums">
              {unread}
            </span>
          )}
        </Link>

        <button
          type="button"
          className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg border border-primary-100 bg-white text-primary-700 transition-colors hover:border-primary-600 hover:bg-primary-50"
          aria-label="Làm mới"
        >
          <RefreshCw className="size-4" />
        </button>

        <Link
          href="/dashboard/ho-so"
          className="flex h-10 shrink-0 items-center gap-2.5 rounded-lg border border-primary-100 bg-primary-50/50 pl-2 pr-3 transition-colors hover:border-primary-600 hover:bg-primary-50"
        >
          <div className="flex size-7 shrink-0 items-center justify-center rounded-full border border-primary-400 bg-gradient-to-tl from-primary-75 to-primary-100 text-[11px] font-bold text-primary-700">
            {role.initials}
          </div>
          <div className="leading-tight whitespace-nowrap">
            <p className="text-xs font-bold text-primary-900">{role.name}</p>
            <p className="text-[10.5px] font-medium text-primary-600">{role.label}</p>
          </div>
        </Link>
      </div>
    </header>
  );
}
