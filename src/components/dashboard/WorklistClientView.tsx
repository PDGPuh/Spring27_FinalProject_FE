"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Clock3,
  Eye,
  Layers3,
  RotateCcw,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { DataTable, Td, Tr } from "@/components/ui/DataTable";
import { FilterBar, FilterSelect } from "@/components/ui/FilterBar";
import { PageHeader } from "@/components/ui/PageHeader";
import { BorderBeam } from "@/components/magicui/BorderBeam";
import { SegmentedTabsParticle } from "@/components/ui/particles/p-segmented-tabs";
import { getCaseThumbnail } from "@/lib/cxr-images";
import { worklistCases } from "@/lib/demo-data";

const aiPTone = {
  Critical: "critical" as const,
  High: "warning" as const,
  Normal: "success" as const,
};

const clinicalTone = {
  Thường: "neutral" as const,
  "Ưu tiên": "warning" as const,
  "Cấp cứu": "critical" as const,
};

export function WorklistClientView() {
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [facility, setFacility] = useState("");
  const [clinicalPriority, setClinicalPriority] = useState("");
  const [aiPriority, setAiPriority] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  const counts = useMemo(
    () => ({
      all: worklistCases.length,
      high: worklistCases.filter(
        (c) => c.aiPriority === "High" || c.clinicalPriority === "Ưu tiên"
      ).length,
      ai: worklistCases.filter((c) => c.aiPriority === "Critical").length,
      wait: worklistCases.filter((c) => c.status === "Chờ đọc").length,
      reading: worklistCases.filter((c) => c.status === "Đang đọc").length,
      done: worklistCases.filter((c) => c.status === "Đã hoàn tất").length,
    }),
    []
  );

  const filteredCases = useMemo(() => {
    return worklistCases.filter((c) => {
      if (activeTab === "ai" && c.aiPriority !== "Critical") return false;
      if (
        activeTab === "high" &&
        c.aiPriority !== "High" &&
        c.clinicalPriority !== "Ưu tiên"
      ) {
        return false;
      }
      if (activeTab === "wait" && c.status !== "Chờ đọc") return false;
      if (activeTab === "reading" && c.status !== "Đang đọc") return false;
      if (activeTab === "done" && c.status !== "Đã hoàn tất") return false;

      if (facility && c.facility !== facility) return false;
      if (clinicalPriority && c.clinicalPriority !== clinicalPriority) return false;
      if (aiPriority && c.aiPriority !== aiPriority) return false;
      if (assignedTo && c.assignedTo !== assignedTo) return false;

      if (search.trim()) {
        const q = search.trim().toLowerCase();
        const hay = `${c.id} ${c.patient} ${c.patientId} ${c.aiFinding} ${c.exam} ${c.facility}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [activeTab, search, facility, clinicalPriority, aiPriority, assignedTo]);

  const hasFilters = Boolean(
    search || facility || clinicalPriority || aiPriority || assignedTo || activeTab !== "all"
  );

  const resetFilters = () => {
    setActiveTab("all");
    setSearch("");
    setFacility("");
    setClinicalPriority("");
    setAiPriority("");
    setAssignedTo("");
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        breadcrumb="KHOA CHẨN ĐOÁN HÌNH ẢNH · TRẠM ĐỌC PHIM PACS"
        title="Worklist Đọc phim X-quang"
        description="Danh sách các ca chụp X-quang chờ Bác sĩ Chẩn đoán Hình ảnh đọc phim, thẩm định gợi ý AI và ký duyệt báo cáo (Clinical Sign-off)."
        actions={
          <>
            <Button href="/viewer/XR20261011-009" variant="danger">
              <AlertTriangle className="size-4" /> Mở ca Critical mới nhất
            </Button>
            <Button href="/dashboard/bao-cao" variant="secondary">
              Danh sách Báo cáo
            </Button>
          </>
        }
      />

      {/* 4 KPI Stat Blocks */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-primary-100 border-b-[5px] border-b-primary-600 bg-white p-5 overview-wrapper-shadow">
          <div className="flex items-center justify-between">
            <p className="text-[13.5px] font-extrabold uppercase tracking-wider text-primary-800">
              Ca Chờ đọc
            </p>
            <span className="flex size-11 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
              <Clock3 className="size-5" />
            </span>
          </div>
          <p className="mt-2.5 text-[32px] font-black leading-none text-primary-950 tabular-nums">
            {counts.wait}
          </p>
          <p className="mt-2 text-[13.5px] font-semibold text-text-secondary">
            Đang chờ bác sĩ CĐHA nhận ca
          </p>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-red-200 border-b-[5px] border-b-critical bg-white p-5 overview-wrapper-shadow">
          <BorderBeam size={180} duration={9} colorFrom="#dc2626" colorTo="#0d71ba" />
          <div className="flex items-center justify-between">
            <p className="text-[13.5px] font-extrabold uppercase tracking-wider text-critical">
              AI Critical
            </p>
            <span className="flex size-11 items-center justify-center rounded-xl bg-red-50 text-critical">
              <AlertTriangle className="size-5" />
            </span>
          </div>
          <p className="mt-2.5 text-[32px] font-black leading-none text-critical tabular-nums">
            {counts.ai}
          </p>
          <p className="mt-2 text-[13.5px] font-semibold text-red-700">
            Cần ưu tiên đọc ngay (SLA &lt; 15 phút)
          </p>
        </div>

        <div className="rounded-2xl border border-primary-100 border-b-[5px] border-b-primary-400 bg-white p-5 overview-wrapper-shadow">
          <div className="flex items-center justify-between">
            <p className="text-[13.5px] font-extrabold uppercase tracking-wider text-primary-700">
              Đang đọc
            </p>
            <span className="flex size-11 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
              <Layers3 className="size-5" />
            </span>
          </div>
          <p className="mt-2.5 text-[32px] font-black leading-none text-primary-950 tabular-nums">
            {counts.reading}
          </p>
          <p className="mt-2 text-[13.5px] font-semibold text-text-secondary">
            Đang mở trên trạm DICOM Viewer
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-200 border-b-[5px] border-b-emerald-600 bg-white p-5 overview-wrapper-shadow">
          <div className="flex items-center justify-between">
            <p className="text-[13.5px] font-extrabold uppercase tracking-wider text-emerald-700">
              Đã Hoàn tất
            </p>
            <span className="flex size-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
              <CheckCircle2 className="size-5" />
            </span>
          </div>
          <p className="mt-2.5 text-[32px] font-black leading-none text-emerald-700 tabular-nums">
            {counts.done}
          </p>
          <p className="mt-2 text-[13.5px] font-semibold text-emerald-800">
            Đã ký số Clinical Sign-off
          </p>
        </div>
      </div>

      {/* Segmented Pill Tabs + Filter Status */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <SegmentedTabsParticle
          active={activeTab}
          onChange={setActiveTab}
          items={[
            { id: "all", label: "Tất cả ca", count: counts.all },
            { id: "ai", label: "AI Critical", count: counts.ai, tone: "critical" },
            { id: "high", label: "Ưu tiên cao", count: counts.high, tone: "warning" },
            { id: "wait", label: "Chờ đọc", count: counts.wait },
            { id: "reading", label: "Đang đọc", count: counts.reading },
            { id: "done", label: "Đã hoàn tất", count: counts.done },
          ]}
        />

        <div className="flex items-center gap-3 text-[14px] font-semibold text-text-secondary">
          <span>
            Hiển thị <strong className="font-extrabold text-primary-800 tabular-nums">{filteredCases.length}</strong> /{" "}
            {worklistCases.length} ca chụp
          </span>
          {hasFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-1.5 rounded-xl border border-primary-200 bg-white px-3.5 py-2 text-[13.5px] font-bold text-primary-700 hover:bg-primary-50"
            >
              <RotateCcw className="size-4" /> Xoá bộ lọc
            </button>
          )}
        </div>
      </div>

      {/* Search & Filter Bar */}
      <FilterBar
        searchPlaceholder="Tìm theo mã ca (XR2026...), tên người bệnh, mã BN, gợi ý AI..."
        searchValue={search}
        onSearchChange={setSearch}
      >
        <FilterSelect
          label="Cơ sở"
          value={facility}
          onChange={setFacility}
          options={["BV Đa khoa TW", "Cơ sở 1", "Cơ sở 2"]}
        />
        <FilterSelect
          label="Clinical Priority"
          value={clinicalPriority}
          onChange={setClinicalPriority}
          options={["Thường", "Ưu tiên", "Cấp cứu"]}
        />
        <FilterSelect
          label="AI Priority"
          value={aiPriority}
          onChange={setAiPriority}
          options={["Normal", "High", "Critical"]}
        />
        <FilterSelect
          label="Bác sĩ đọc phim"
          value={assignedTo}
          onChange={setAssignedTo}
          options={["BS. Nguyễn Văn A", "BS. Trần Minh", "Chưa gán"]}
        />
      </FilterBar>

      {/* High-Ergonomics Composite Data Table */}
      <DataTable
        minWidth="1080px"
        headers={[
          "Ảnh X-quang & Mã ca",
          "Người bệnh",
          "Kỹ thuật & Cơ sở",
          "Phân tầng Ưu tiên",
          "Phát hiện AI & Độ tin cậy",
          "Bác sĩ & Thời gian chờ",
          "Trạng thái",
          "Thao tác",
        ]}
      >
        {filteredCases.length > 0 ? (
          filteredCases.map((c) => (
            <Tr
              key={c.id}
              className={
                c.aiPriority === "Critical"
                  ? "bg-red-50/35"
                  : c.aiPriority === "High"
                    ? "bg-amber-50/25"
                    : undefined
              }
            >
              {/* Col 1: Thumbnail + Case Code */}
              <Td>
                <div className="flex items-center gap-3.5">
                  <Link
                    href={`/viewer/${c.id}`}
                    className="group relative inline-block size-14 shrink-0 overflow-hidden rounded-xl border border-primary-400 bg-viewer-bg shadow-xs"
                  >
                    <Image
                      src={getCaseThumbnail(c.id)}
                      alt={`CXR ${c.id}`}
                      fill
                      className="object-cover object-center transition-transform duration-200 group-hover:scale-110"
                      sizes="56px"
                    />
                  </Link>
                  <div>
                    <Link
                      href={`/viewer/${c.id}`}
                      className="font-mono text-[14.5px] font-extrabold text-primary-800 hover:text-primary-600 hover:underline"
                    >
                      {c.id}
                    </Link>
                    <p className="mt-0.5 text-[13px] font-medium text-text-secondary">
                      DICOM PA · 1 Series
                    </p>
                  </div>
                </div>
              </Td>

              {/* Col 2: Patient Info */}
              <Td>
                <Link
                  href={`/dashboard/benh-nhan/${c.patientId}`}
                  className="text-[16px] font-extrabold text-primary-950 hover:text-primary-600 hover:underline"
                >
                  {c.patient}
                </Link>
                <p className="mt-1 text-[13.5px] font-medium text-text-secondary tabular-nums">
                  {c.patientId} · {c.age} tuổi · {c.gender}
                </p>
              </Td>

              {/* Col 3: Exam & Facility */}
              <Td>
                <p className="text-[15px] font-bold text-primary-950">{c.exam}</p>
                <p className="mt-1 text-[13.5px] font-semibold text-primary-700">
                  {c.facility}
                </p>
              </Td>

              {/* Col 4: Dual Priority Badges (Clinical + AI) */}
              <Td>
                <div className="flex flex-col items-start gap-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11.5px] font-extrabold uppercase text-text-secondary">
                      LS:
                    </span>
                    <Badge tone={clinicalTone[c.clinicalPriority]}>
                      {c.clinicalPriority}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11.5px] font-extrabold uppercase text-text-secondary">
                      AI:
                    </span>
                    <Badge tone={aiPTone[c.aiPriority]}>
                      {c.aiPriority === "Critical"
                        ? "Khẩn cấp (Critical)"
                        : c.aiPriority === "High"
                          ? "Ưu tiên (High)"
                          : "Thường (Normal)"}
                    </Badge>
                  </div>
                </div>
              </Td>

              {/* Col 5: AI Finding + Confidence Progress Bar + Model Version */}
              <Td>
                <div className="w-52">
                  <div className="flex items-center justify-between text-[14px]">
                    <span className="truncate font-extrabold text-primary-950">
                      {c.aiFinding}
                    </span>
                    <span className="font-mono font-extrabold text-primary-700 tabular-nums">
                      {c.aiConfidence}%
                    </span>
                  </div>
                  <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-primary-75">
                    <div
                      className={`h-full rounded-full ${
                        c.aiPriority === "Critical"
                          ? "bg-critical"
                          : c.aiPriority === "High"
                            ? "bg-warning"
                            : "bg-primary-600"
                      }`}
                      style={{ width: `${c.aiConfidence}%` }}
                    />
                  </div>
                  <p className="mt-1.5 text-[12.5px] font-medium text-text-secondary">
                    Model: <span className="font-mono font-bold">{c.modelVersion}</span>
                  </p>
                </div>
              </Td>

              {/* Col 6: Assigned Doctor & Wait Time */}
              <Td>
                <p className="text-[15px] font-bold text-primary-950">{c.assignedTo}</p>
                <p className="mt-1 text-[13.5px] font-medium text-text-secondary tabular-nums">
                  Chờ: <strong className="font-extrabold text-primary-800">{c.wait}</strong>
                </p>
              </Td>

              {/* Col 7: Status */}
              <Td>
                <Badge
                  tone={
                    c.status === "Đã hoàn tất"
                      ? "success"
                      : c.status === "Đang đọc"
                        ? "info"
                        : "warning"
                  }
                >
                  {c.status}
                </Badge>
              </Td>

              {/* Col 8: Action */}
              <Td>
                <Link
                  href={`/viewer/${c.id}`}
                  className="inline-flex h-10.5 items-center gap-2 rounded-xl bg-primary-600 px-4 text-[14px] font-extrabold text-white shadow-2xs transition-colors hover:bg-primary-700"
                >
                  <Eye className="size-4" /> Mở Viewer <ArrowRight className="size-3.5" />
                </Link>
              </Td>
            </Tr>
          ))
        ) : (
          <Tr>
            <Td colSpan={8} className="py-14 text-center">
              <p className="text-[16px] font-extrabold text-primary-900">
                Không tìm thấy ca chụp phù hợp với bộ lọc hiện tại.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="mt-3 inline-flex items-center gap-2 rounded-xl border border-primary-600 px-4 py-2 text-[14px] font-bold text-primary-700 hover:bg-primary-50"
              >
                <RotateCcw className="size-4" /> Đặt lại toàn bộ bộ lọc
              </button>
            </Td>
          </Tr>
        )}
      </DataTable>
    </div>
  );
}
