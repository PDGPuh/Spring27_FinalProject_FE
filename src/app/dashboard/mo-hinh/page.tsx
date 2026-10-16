"use client";

import { useMemo, useState } from "react";
import {
  Activity,
  Award,
  CheckCircle2,
  Cpu,
  GitBranch,
  History,
  Plus,
  RotateCcw,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { BorderBeam } from "@/components/ui/BorderBeam";
import { Button } from "@/components/ui/Button";
import { DataTable, Td, Tr } from "@/components/ui/DataTable";
import { FilterBar } from "@/components/ui/FilterBar";
import { PageHeader } from "@/components/ui/PageHeader";
import { SegmentedTabsParticle } from "@/components/ui/SegmentedTabsParticle";
import { models } from "@/lib/demo-data";

const statusTone = {
  Active: "success" as const,
  Testing: "warning" as const,
  Inactive: "neutral" as const,
  Archived: "neutral" as const,
};

export default function ModelsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedModelVer, setSelectedModelVer] = useState<string | null>(null);

  const active = models.find((m) => m.status === "Active")!;

  const filteredModels = useMemo(() => {
    return models.filter((m) => {
      if (activeTab === "active" && m.status !== "Active") return false;
      if (activeTab === "testing" && m.status !== "Testing") return false;
      if (
        activeTab === "inactive" &&
        m.status !== "Inactive" &&
        m.status !== "Archived"
      )
        return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match =
          m.name.toLowerCase().includes(q) ||
          m.version.toLowerCase().includes(q) ||
          m.changelog.toLowerCase().includes(q) ||
          m.status.toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    });
  }, [activeTab, searchQuery]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Mô hình AI"
        description="Model Registry. Thay đổi Active Model không chỉnh sửa inference lịch sử. Threshold cấu hình ở Cài đặt AI."
        actions={
          <Button>
            <Plus className="h-4 w-4" />
            + Thêm Model
          </Button>
        }
      />

      {/* 4 KPI Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="relative overflow-hidden rounded-2xl border border-primary-100 border-b-[4px] border-b-primary-600 bg-white p-5 overview-wrapper-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[12px] font-extrabold uppercase tracking-wider text-text-secondary">
                Versions
              </p>
              <p className="mt-2 font-mono text-[30px] font-black leading-none text-primary-950">
                {models.length}
              </p>
              <p className="mt-2 text-[12px] font-semibold text-primary-700">
                Phiên bản trong Model Registry
              </p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
              <GitBranch className="h-5 w-5" />
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-emerald-200 border-b-[4px] border-b-emerald-600 bg-white p-5 overview-wrapper-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[12px] font-extrabold uppercase tracking-wider text-emerald-700">
                Active
              </p>
              <p className="mt-2 font-mono text-[30px] font-black leading-none text-emerald-700">
                {active.version}
              </p>
              <p className="mt-2 text-[12px] font-semibold text-emerald-800">
                Đang phục vụ suy luận lâm sàng
              </p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-violet-200 border-b-[4px] border-b-ai bg-white p-5 overview-wrapper-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[12px] font-extrabold uppercase tracking-wider text-violet-700">
                Inference (active)
              </p>
              <p className="mt-2 font-mono text-[30px] font-black leading-none text-ai">
                {active.inferences.toLocaleString("vi-VN")}
              </p>
              <p className="mt-2 text-[12px] font-semibold text-violet-800">
                Ca chụp đã xử lý bởi {active.version}
              </p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-ai">
              <Activity className="h-5 w-5" />
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-primary-100 border-b-[4px] border-b-primary-800 bg-white p-5 overview-wrapper-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[12px] font-extrabold uppercase tracking-wider text-text-secondary">
                AUROC
              </p>
              <p className="mt-2 font-mono text-[30px] font-black leading-none text-primary-950">
                {active.auroc}
              </p>
              <p className="mt-2 text-[12px] font-semibold text-text-secondary">
                AUPRC đạt {active.auprc} trên tập kiểm định
              </p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-75 text-primary-800">
              <Award className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Active Production Model Spotlight Card */}
      <div className="relative overflow-hidden rounded-2xl border-2 border-primary-200 bg-gradient-to-br from-white via-primary-50/50 to-violet-50/40 p-6 overview-wrapper-shadow">
        <BorderBeam size={240} duration={12} />
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-700 to-ai text-white shadow-md">
              <Cpu className="h-7 w-7" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="rounded-lg bg-primary-100 px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wider text-primary-900">
                  Active Model
                </span>
                <Badge tone="success">Đang hoạt động</Badge>
                <span className="font-mono text-[12px] font-bold text-text-secondary">
                  Triển khai: {active.deployed}
                </span>
              </div>
              <h2 className="mt-2 text-[22px] font-black text-primary-950">
                {active.name}{" "}
                <span className="font-mono text-primary-700">{active.version}</span>
              </h2>
              <p className="mt-1 text-[14px] font-semibold text-text-main">
                Triển khai {active.deployed} ·{" "}
                <strong>{active.inferences.toLocaleString("vi-VN")}</strong> inference · AUROC{" "}
                <strong className="font-mono text-ai">{active.auroc}</strong> · AUPRC{" "}
                <strong className="font-mono text-primary-800">{active.auprc}</strong>
              </p>
              <p className="mt-2 inline-flex items-center gap-2 rounded-xl border border-primary-200/80 bg-white/80 px-3.5 py-2 text-[13px] font-medium text-text-secondary">
                <Sparkles className="h-4 w-4 shrink-0 text-ai" />
                <span>Changelog: {active.changelog}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2 rounded-xl border border-primary-200/70 bg-white/90 px-4 py-3 text-right shadow-xs">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-text-secondary">
              Số lượng bệnh lý hỗ trợ
            </span>
            <span className="font-mono text-[22px] font-black text-primary-950">
              {active.labels} Labels
            </span>
            <span className="text-[12px] font-semibold text-emerald-700">
              Grad-CAM++ XAI Ready
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Tabs & Search */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <SegmentedTabsParticle
            activeId={activeTab}
            onChange={setActiveTab}
            tabs={[
              { id: "all", label: "Tất cả phiên bản", count: models.length },
              {
                id: "active",
                label: "Active",
                count: models.filter((m) => m.status === "Active").length,
                tone: "success",
              },
              {
                id: "testing",
                label: "Testing",
                count: models.filter((m) => m.status === "Testing").length,
                tone: "warning",
              },
              {
                id: "inactive",
                label: "Inactive / Archived",
                count: models.filter(
                  (m) => m.status === "Inactive" || m.status === "Archived"
                ).length,
              },
            ]}
          />
          {selectedModelVer && (
            <Badge tone="info">Đang xem chi tiết: {selectedModelVer}</Badge>
          )}
        </div>

        <FilterBar
          searchPlaceholder="Tìm theo tên mô hình (ChestXAI), phiên bản (v2.1.0), nội dung changelog..."
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
        />
      </div>

      {/* Composite Model Registry Table */}
      <DataTable
        headers={[
          "Mô hình & Phiên bản",
          "Số nhãn & Ngày triển khai",
          "Khối lượng Inference",
          "Chỉ số AUROC / AUPRC",
          "Changelog & Trạng thái",
          "Thao tác",
        ]}
      >
        {filteredModels.map((m) => (
          <Tr key={m.name + m.version}>
            <Td>
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-mono text-[12px] font-extrabold ${
                    m.status === "Active"
                      ? "bg-emerald-100 text-emerald-800"
                      : m.status === "Testing"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-primary-75 text-primary-800"
                  }`}
                >
                  AI
                </div>
                <div>
                  <p className="text-[15px] font-extrabold text-primary-950">{m.name}</p>
                  <span className="mt-0.5 inline-block rounded-md bg-primary-75 px-2 py-0.5 font-mono text-[12px] font-bold text-primary-900">
                    {m.version}
                  </span>
                </div>
              </div>
            </Td>
            <Td>
              <p className="text-[14px] font-bold text-primary-950">
                {m.labels} nhãn bệnh lý
              </p>
              <p className="mt-0.5 text-[12px] font-medium text-text-secondary">
                Ngày triển khai: {m.deployed}
              </p>
            </Td>
            <Td>
              <span className="font-mono text-[15px] font-black text-primary-950">
                {m.inferences.toLocaleString("vi-VN")}
              </span>
              <p className="mt-0.5 text-[12px] font-medium text-text-secondary">
                ca đã suy luận
              </p>
            </Td>
            <Td>
              <div className="w-40 space-y-1.5">
                <div className="flex items-center justify-between text-[13px]">
                  <span className="font-semibold text-text-secondary">AUROC:</span>
                  <span className="font-mono font-extrabold text-ai">{m.auroc}</span>
                </div>
                <div className="flex items-center justify-between text-[13px]">
                  <span className="font-semibold text-text-secondary">AUPRC:</span>
                  <span className="font-mono font-extrabold text-primary-900">{m.auprc}</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-primary-75">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary-600 to-ai"
                    style={{ width: `${m.auroc * 100}%` }}
                  />
                </div>
              </div>
            </Td>
            <Td>
              <div className="max-w-[280px] space-y-1.5">
                <Badge tone={statusTone[m.status as keyof typeof statusTone]}>
                  {m.status}
                </Badge>
                <p className="text-[13px] font-medium leading-snug text-text-secondary">
                  {m.changelog}
                </p>
              </div>
            </Td>
            <Td>
              <div className="flex flex-wrap items-center gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => setSelectedModelVer(`${m.name} ${m.version}`)}
                >
                  Chi tiết
                </Button>
                {m.status !== "Active" && m.status !== "Archived" && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setSelectedModelVer(`Activate ${m.version}`)}
                  >
                    Activate
                  </Button>
                )}
                {m.status === "Inactive" && (
                  <button
                    type="button"
                    onClick={() => setSelectedModelVer(`Rollback ${m.version}`)}
                    className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-amber-200 bg-amber-50 px-3 text-[13px] font-bold text-amber-800 transition-colors hover:bg-amber-100"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    Rollback
                  </button>
                )}
              </div>
            </Td>
          </Tr>
        ))}
      </DataTable>

      <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-amber-200 bg-amber-50/70 px-5 py-3.5 text-[13px] font-medium text-amber-900">
        <span className="flex items-center gap-2">
          <ShieldAlert className="h-4 w-4 text-amber-700" />
          Rollback yêu cầu confirmation modal. Không fake certification / CE / FDA trên UI.
        </span>
        <span className="flex items-center gap-1.5 font-mono text-[12px] font-bold text-amber-800">
          <History className="h-3.5 w-3.5" />
          Immutable Audit Log Enabled
        </span>
      </div>
    </div>
  );
}
