"use client";

import { Suspense } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { PageHeader } from "@/components/ui/PageHeader";
import { useDemoRole } from "@/components/app-shell/useDemoRole";

function ProfileInner() {
  const { role } = useDemoRole();

  return (
    <div>
      <PageHeader
        title="Hồ sơ cá nhân"
        description="Thông tin tài khoản và preferences Viewer theo vai trò demo hiện tại."
      />
      <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
        <Card className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary-soft text-xl font-semibold text-primary-dark">
            {role.initials}
          </div>
          <p className="mt-3 text-lg font-semibold">{role.name}</p>
          <p className="text-sm text-text-secondary">{role.label}</p>
          <p className="mt-1 text-xs text-muted">{role.email}</p>
          <div className="mt-3 flex flex-wrap justify-center gap-1">
            <Badge tone="primary">Demo role</Badge>
            <Badge tone="neutral">{role.shortLabel}</Badge>
          </div>
          <p className="mt-4 text-left text-xs text-text-secondary">{role.description}</p>
        </Card>
        <div className="space-y-4">
          <Card>
            <h2 className="mb-4 text-lg font-semibold">Thông tin cá nhân</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <Input label="Họ tên" defaultValue={role.name.replace(/^(BS\.|KTV\.|NV\.|TS\.|CN\.|Admin\.)\s*/, "")} />
              <Input label="Email" defaultValue={role.email} />
              <Input label="Điện thoại" defaultValue="0901 000 111" />
              <Input label="Chức danh" defaultValue={role.label} />
            </div>
            <Button size="sm" className="mt-4">
              Lưu thay đổi
            </Button>
          </Card>
          {(role.id === "cdha" || role.id === "admin") && (
            <Card>
              <h2 className="mb-4 text-lg font-semibold">Viewer Preferences</h2>
              <div className="space-y-3 text-sm">
                <label className="flex items-center justify-between">
                  <span>Default Layout</span>
                  <select className="h-9 rounded-[8px] border border-border px-2">
                    <option>1×1</option>
                    <option>1×2</option>
                  </select>
                </label>
                <label className="flex items-center justify-between">
                  <span>Default Window / Level</span>
                  <select className="h-9 rounded-[8px] border border-border px-2">
                    <option>Chest</option>
                    <option>Bone</option>
                  </select>
                </label>
                <label className="flex items-center justify-between">
                  <span>Auto-show AI Result</span>
                  <input type="checkbox" className="accent-primary" />
                </label>
                <label className="flex items-center justify-between">
                  <span>Auto-show Heatmap</span>
                  <input type="checkbox" className="accent-primary" />
                </label>
                <p className="text-xs text-text-secondary">
                  Mặc định OFF — bác sĩ chủ động bật AI/XAI.
                </p>
              </div>
            </Card>
          )}
          <Card>
            <h2 className="mb-2 text-lg font-semibold">Bảo mật & phiên</h2>
            <p className="text-sm text-text-secondary">
              2FA: {role.id === "ktv" || role.id === "tiepdon" ? "Khuyến nghị" : "Đang bật"} ·
              Phiên hiện tại: Chrome / macOS
            </p>
            <p className="mt-2 text-xs text-muted">
              Đổi vai trò demo ở Topbar — không phải đăng nhập thật.
            </p>
            <Button size="sm" variant="outline" className="mt-3">
              Đổi mật khẩu
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <Suspense fallback={<div className="text-sm text-text-secondary">Đang tải hồ sơ...</div>}>
      <ProfileInner />
    </Suspense>
  );
}
