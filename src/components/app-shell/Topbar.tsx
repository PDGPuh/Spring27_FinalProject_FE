"use client";

import Link from "next/link";
import { Bell, ChevronDown, RefreshCw, Search } from "lucide-react";
import { facilities, notifications } from "@/lib/demo-data";
import { useDemoRole } from "@/components/app-shell/useDemoRole";
import type { DemoRoleId } from "@/lib/roles";

export function Topbar() {
  const { role, roleId, setRole, roles } = useDemoRole();
  const unread = notifications.filter((n) => n.unread).length;

  return (
    <header className="z-30 flex h-16 shrink-0 items-center justify-between gap-4 border-b border-border bg-card px-6">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          className="inline-flex h-9 max-w-[260px] items-center gap-2 rounded-[8px] border border-border bg-background px-3 text-[13px] text-text"
        >
          <span className="truncate">{facilities[0]}</span>
          <ChevronDown className="h-3.5 w-3.5 shrink-0 text-text-secondary" />
        </button>
        <label className="hidden items-center gap-1.5 sm:flex">
          <span className="text-[11px] text-text-secondary">Vai trò demo</span>
          <select
            value={roleId}
            onChange={(e) => setRole(e.target.value as DemoRoleId)}
            className="h-9 max-w-[200px] rounded-[8px] border border-border bg-background px-2 text-[13px] outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
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

      <div className="relative hidden w-full max-w-md lg:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" />
        <input
          type="search"
          placeholder="Tìm bệnh nhân, mã ca, Study..."
          className="h-9 w-full rounded-[8px] border border-border bg-background pl-9 pr-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div className="flex items-center gap-2">
        <Link
          href="/dashboard/thong-bao"
          className="relative inline-flex h-9 w-9 items-center justify-center rounded-[8px] border border-border text-text-secondary hover:bg-background"
          aria-label="Thông báo"
        >
          <Bell className="h-4 w-4" />
          {unread > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-critical px-1 text-[10px] font-semibold text-white">
              {unread}
            </span>
          )}
        </Link>
        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-[8px] border border-border text-text-secondary hover:bg-background"
          aria-label="Làm mới"
        >
          <RefreshCw className="h-4 w-4" />
        </button>
        <Link
          href="/dashboard/ho-so"
          className="ml-1 flex items-center gap-2.5 rounded-[8px] border border-border py-1.5 pl-1.5 pr-3 hover:bg-background"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-soft text-xs font-semibold text-primary-dark">
            {role.initials}
          </div>
          <div className="leading-tight">
            <p className="text-[13px] font-medium">{role.name}</p>
            <p className="text-[11px] text-text-secondary">{role.label}</p>
          </div>
        </Link>
      </div>
    </header>
  );
}
