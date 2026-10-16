"use client";

import { useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Cpu,
  Database,
  FileText,
  Lock,
  Save,
  ShieldAlert,
  Sliders,
  Trash2,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { BorderBeam } from "@/components/ui/BorderBeam";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { PageHeader } from "@/components/ui/PageHeader";
import { SegmentedTabsParticle } from "@/components/ui/SegmentedTabsParticle";
import { Select } from "@/components/ui/Select";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [savedBanner, setSavedBanner] = useState(false);
  const [thresholds, setThresholds] = useState<Record<string, number>>({
    "Viêm phổi": 70,
    "Tràn khí màng phổi": 65,
    "Tràn dịch": 70,
    Cardiomegaly: 75,
  });

  const showSection = (section: string) =>
    activeTab === "all" || activeTab === section;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Cài đặt hệ thống"
        description="Cấu hình chung, AI thresholds, worklist, bảo mật và lưu trữ."
        actions={
          <Button onClick={() => setSavedBanner(true)}>
            <Save className="h-4 w-4" />
            Lưu toàn bộ cấu hình
          </Button>
        }
      />

      {savedBanner && (
        <div className="flex items-center justify-between rounded-2xl border-2 border-emerald-200 bg-emerald-50/90 px-5 py-3.5 text-[14px] font-bold text-emerald-900">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            Đã lưu cấu hình hệ thống & ghi nhận vào Audit Log.
          </span>
          <Badge tone="success">Config v2026.10</Badge>
        </div>
      )}

      <SegmentedTabsParticle
        activeId={activeTab}
        onChange={setActiveTab}
        tabs={[
          { id: "all", label: "Tất cả cấu hình" },
          { id: "ai", label: "AI & Thresholds", tone: "primary" },
          { id: "bao-mat", label: "Bảo mật & 2FA" },
          { id: "bao-cao", label: "Báo cáo PDF" },
          { id: "luu-tru", label: "Lưu trữ & Danger Zone", tone: "warning" },
        ]}
      />

      <div className="space-y-5">
        {showSection("ai") && (
          <Card className="relative overflow-hidden">
            <BorderBeam size={220} duration={12} />
            <div className="mb-5 flex flex-wrap items-center justify-between gap-2 border-b border-primary-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-ai">
                  <Cpu className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-[18px] font-extrabold text-primary-950">
                    AI Settings
                  </h2>
                  <p className="text-[13px] font-medium text-text-secondary">
                    Quản lý mô hình suy luận đang hoạt động và ngưỡng cảnh báo theo bệnh lý
                  </p>
                </div>
              </div>
              <Badge tone="ai">Dynamic Thresholding</Badge>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Select
                label="Active Model"
                options={[
                  { value: "v21", label: "ChestXAI v2.1.0" },
                  { value: "v20", label: "ChestXAI v2.0.0" },
                ]}
              />
              <Input label="Critical Confidence Rule" defaultValue="≥ 80%" />
            </div>

            <div className="mt-6">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-[15px] font-extrabold text-primary-950">
                  <Sliders className="h-4 w-4 text-primary-700" />
                  Threshold theo label
                </h3>
                <span className="text-[12px] font-semibold text-text-secondary">
                  Kéo thanh trượt hoặc nhập giá trị ngưỡng (%)
                </span>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {Object.entries(thresholds).map(([label, val]) => (
                  <div
                    key={label}
                    className="rounded-xl border border-primary-100 bg-primary-50/40 p-4"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-[14px] font-extrabold text-primary-950">
                        {label} (%)
                      </span>
                      <span className="rounded-lg bg-white px-2.5 py-0.5 font-mono text-[14px] font-black text-ai shadow-2xs">
                        {val}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min={30}
                      max={95}
                      value={val}
                      onChange={(e) =>
                        setThresholds((prev) => ({
                          ...prev,
                          [label]: Number(e.target.value),
                        }))
                      }
                      className="w-full accent-ai"
                    />
                    <div className="mt-2">
                      <Input
                        label={`${label} (%)`}
                        value={String(val)}
                        onChange={(e) =>
                          setThresholds((prev) => ({
                            ...prev,
                            [label]: Number(e.target.value) || 0,
                          }))
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-4 rounded-xl border border-violet-200 bg-violet-50/60 px-4 py-2.5 text-[13px] font-semibold text-violet-900">
              Threshold phải configurable — không hard-code trong ứng dụng.
            </p>
            <Button className="mt-4" onClick={() => setSavedBanner(true)}>
              <Save className="h-4 w-4" />
              Lưu cấu hình AI
            </Button>
          </Card>
        )}

        {showSection("bao-mat") && (
          <Card>
            <div className="mb-5 flex items-center gap-3 border-b border-primary-100 pb-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-75 text-primary-700">
                <Lock className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-[18px] font-extrabold text-primary-950">
                  Bảo mật
                </h2>
                <p className="text-[13px] font-medium text-text-secondary">
                  Chính sách phiên đăng nhập, xác thực 2 lớp (2FA) và khóa tài khoản
                </p>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Input label="Session timeout (phút)" defaultValue="30" />
              <Select
                label="Bắt buộc 2FA"
                options={[
                  { value: "all", label: "Tất cả người dùng" },
                  { value: "clinical", label: "Chỉ vai trò lâm sàng" },
                ]}
              />
              <Input label="Độ dài mật khẩu tối thiểu" defaultValue="10" />
              <Input label="Khóa sau N lần sai" defaultValue="5" />
            </div>
          </Card>
        )}

        {showSection("bao-cao") && (
          <Card>
            <div className="mb-5 flex items-center gap-3 border-b border-primary-100 pb-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-75 text-primary-700">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-[18px] font-extrabold text-primary-950">
                  Báo cáo PDF
                </h2>
                <p className="text-[13px] font-medium text-text-secondary">
                  Tiêu đề bệnh viện và ghi chú pháp lý mặc định khi xuất phiếu kết quả
                </p>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Input
                label="Hospital Header"
                defaultValue="Bệnh viện Đa khoa Trung ương"
              />
              <Input
                label="Footer"
                defaultValue="AI hỗ trợ — Bác sĩ quyết định kết luận"
              />
            </div>
          </Card>
        )}

        {showSection("luu-tru") && (
          <>
            <Card>
              <div className="mb-5 flex items-center gap-3 border-b border-primary-100 pb-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-75 text-primary-700">
                  <Database className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-[18px] font-extrabold text-primary-950">
                    Lưu trữ
                  </h2>
                  <p className="text-[13px] font-medium text-text-secondary">
                    Cấu hình Object Storage cho ảnh DICOM gốc và bộ dữ liệu nghiên cứu
                  </p>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <Input label="DICOM Storage" defaultValue="s3://xquang-dicom" />
                <Input
                  label="Research Storage"
                  defaultValue="s3://xquang-research"
                />
                <Input label="Retention (tháng)" defaultValue="84" />
              </div>
            </Card>

            <div className="rounded-2xl border-2 border-red-200 bg-red-50/60 p-6 shadow-xs">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-critical text-white">
                    <ShieldAlert className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-[18px] font-extrabold text-critical">
                      Danger Zone
                    </h2>
                    <p className="mt-1 text-[14px] font-medium text-red-950">
                      Các thao tác không thể hoàn tác. Admin không được thay đổi kết luận chuyên môn của bác sĩ.
                    </p>
                  </div>
                </div>
                <Badge tone="critical">
                  <AlertTriangle className="mr-1 inline h-3.5 w-3.5" />
                  Restricted Action
                </Badge>
              </div>
              <div className="mt-4">
                <Button variant="danger">
                  <Trash2 className="h-4 w-4" />
                  Purge cache inference (không xóa lịch sử)
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
