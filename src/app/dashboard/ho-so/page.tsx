"use client";

import { Suspense, useState } from "react";
import {
  CheckCircle2,
  KeyRound,
  Mail,
  Monitor,
  Save,
  ShieldCheck,
  Sliders,
  UserCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { BorderBeam } from "@/components/ui/BorderBeam";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { PageHeader } from "@/components/ui/PageHeader";
import { Select } from "@/components/ui/Select";
import { useDemoRole } from "@/components/app-shell/useDemoRole";

function ProfileInner() {
  const { role } = useDemoRole();
  const [saved, setSaved] = useState(false);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Hồ sơ cá nhân"
        description="Thông tin tài khoản và preferences Viewer theo vai trò demo hiện tại."
        actions={
          <Badge tone="primary">
            <UserCheck className="mr-1 inline h-3.5 w-3.5" />
            {role.label}
          </Badge>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[330px_1fr]">
        {/* Left Profile Identity Card */}
        <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-primary-100 border-b-[5px] border-b-primary-600 bg-white p-6 text-center overview-wrapper-shadow">
          <BorderBeam size={200} duration={11} />
          <div>
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-700 to-primary-500 text-2xl font-black text-white shadow-md">
              {role.initials}
            </div>
            <h2 className="mt-4 text-[20px] font-black text-primary-950">
              {role.name}
            </h2>
            <p className="mt-1 text-[14px] font-bold text-primary-700">
              {role.label}
            </p>
            <p className="mt-1 inline-flex items-center gap-1.5 font-mono text-[12px] font-semibold text-text-secondary">
              <Mail className="h-3.5 w-3.5 text-primary-600" />
              {role.email}
            </p>

            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <Badge tone="primary">Demo role</Badge>
              <Badge tone="info">{role.shortLabel}</Badge>
            </div>

            <div className="mt-5 rounded-xl border border-primary-100 bg-primary-50/50 p-4 text-left">
              <p className="text-[11px] font-extrabold uppercase tracking-wider text-primary-800">
                Phạm vi chuyên môn & Quyền hạn
              </p>
              <p className="mt-1.5 text-[13px] font-medium leading-relaxed text-text-main">
                {role.description}
              </p>
            </div>
          </div>

          <div className="mt-5 border-t border-primary-100 pt-4 text-left text-[12px] font-semibold text-text-secondary">
            Cơ sở mặc định: <strong className="text-primary-950">BV Đa khoa Trung ương</strong>
          </div>
        </div>

        {/* Right Forms Column */}
        <div className="space-y-5">
          <Card>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-2 border-b border-primary-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-75 text-primary-700">
                  <UserCheck className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-[18px] font-extrabold text-primary-950">
                    Thông tin cá nhân
                  </h2>
                  <p className="text-[13px] font-medium text-text-secondary">
                    Hồ sơ hành nghề và thông tin liên hệ nội bộ
                  </p>
                </div>
              </div>
              {saved && (
                <Badge tone="success">
                  <CheckCircle2 className="mr-1 inline h-3.5 w-3.5" />
                  Đã lưu hồ sơ
                </Badge>
              )}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Input
                label="Họ tên"
                defaultValue={role.name.replace(
                  /^(BS\.|KTV\.|NV\.|TS\.|CN\.|Admin\.)\s*/,
                  ""
                )}
              />
              <Input label="Email" defaultValue={role.email} />
              <Input label="Điện thoại" defaultValue="0901 000 111" />
              <Input label="Chức danh" defaultValue={role.label} />
            </div>
            <Button className="mt-5" onClick={() => setSaved(true)}>
              <Save className="h-4 w-4" />
              Lưu thay đổi
            </Button>
          </Card>

          {(role.id === "cdha" || role.id === "admin") && (
            <Card>
              <div className="mb-5 flex items-center gap-3 border-b border-primary-100 pb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-ai">
                  <Sliders className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-[18px] font-extrabold text-primary-950">
                    Viewer Preferences
                  </h2>
                  <p className="text-[13px] font-medium text-text-secondary">
                    Cấu hình mặc định khi mở trạm đọc phim DICOM & XAI Workstation
                  </p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Select
                  label="Default Layout"
                  options={[
                    { value: "1x1", label: "1×1 (Đơn khung tiêu chuẩn)" },
                    { value: "1x2", label: "1×2 (So sánh Prior Side-by-Side)" },
                  ]}
                />
                <Select
                  label="Default Window / Level"
                  options={[
                    { value: "chest", label: "Chest (W: 1500 / L: -500)" },
                    { value: "bone", label: "Bone (W: 2500 / L: 480)" },
                  ]}
                />
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <label className="flex cursor-pointer items-center justify-between rounded-xl border border-primary-100 bg-primary-50/40 px-4 py-3 text-[14px] font-bold text-primary-950">
                  <span>Auto-show AI Result</span>
                  <input type="checkbox" className="h-4 w-4 accent-primary-600" />
                </label>
                <label className="flex cursor-pointer items-center justify-between rounded-xl border border-primary-100 bg-primary-50/40 px-4 py-3 text-[14px] font-bold text-primary-950">
                  <span>Auto-show Heatmap</span>
                  <input type="checkbox" className="h-4 w-4 accent-primary-600" />
                </label>
              </div>

              <p className="mt-3.5 rounded-xl border border-violet-200 bg-violet-50/60 px-4 py-2.5 text-[13px] font-semibold text-violet-900">
                Mặc định OFF — bác sĩ chủ động bật AI/XAI.
              </p>
            </Card>
          )}

          <Card>
            <div className="mb-4 flex items-center justify-between border-b border-primary-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-[18px] font-extrabold text-primary-950">
                    Bảo mật & phiên
                  </h2>
                  <p className="text-[13px] font-medium text-text-secondary">
                    Trạng thái xác thực 2 yếu tố (2FA) và thiết bị đang đăng nhập
                  </p>
                </div>
              </div>
              <Badge
                tone={
                  role.id === "ktv" || role.id === "tiepdon" ? "warning" : "success"
                }
              >
                2FA: {role.id === "ktv" || role.id === "tiepdon" ? "Khuyến nghị" : "Đang bật"}
              </Badge>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-primary-100 bg-primary-50/40 p-4">
              <div className="flex items-center gap-3">
                <Monitor className="h-5 w-5 text-primary-700" />
                <div>
                  <p className="text-[14px] font-extrabold text-primary-950">
                    2FA: {role.id === "ktv" || role.id === "tiepdon" ? "Khuyến nghị" : "Đang bật"} · Phiên hiện tại: Chrome / macOS
                  </p>
                  <p className="mt-0.5 text-[12px] font-medium text-text-secondary">
                    Đổi vai trò demo ở Topbar — không phải đăng nhập thật.
                  </p>
                </div>
              </div>
              <Button variant="outline">
                <KeyRound className="h-4 w-4" />
                Đổi mật khẩu
              </Button>
            </div>
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
