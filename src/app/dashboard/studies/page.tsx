"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock3,
  Cpu,
  RefreshCw,
  Sparkles,
  Upload,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { DataTable, Td, Tr } from "@/components/ui/DataTable";
import { FilterBar, FilterSelect } from "@/components/ui/FilterBar";
import { PageHeader } from "@/components/ui/PageHeader";
import { SegmentedTabsParticle } from "@/components/ui/particles/p-segmented-tabs";
import { getCaseThumbnail } from "@/lib/cxr-images";
import { aiInferences, studies } from "@/lib/demo-data";

const aiTone = {
  "Hoàn tất": "success" as const,
  "Đang xử lý": "warning" as const,
  "Chưa chạy": "neutral" as const,
  Lỗi: "critical" as const,
};

export default function StudiesPage() {
  const [aiTab, setAiTab] = useState("all");
  const [search, setSearch] = useState("");
  const [modalityFilter, setModalityFilter] = useState("");
  const [reportFilter, setReportFilter] = useState("");

  const doneCount = useMemo(
    () => studies.filter((s) => s.ai === "Hoàn tất").length,
    [],
  );
  const errorCount = useMemo(
    () => studies.filter((s) => s.ai === "Lỗi").length,
    [],
  );
  const processingCount = useMemo(
    () => studies.filter((s) => s.ai === "Đang xử lý").length,
    [],
  );

  const filtered = useMemo(() => {
    return studies.filter((s) => {
      if (aiTab !== "all" && s.ai !== aiTab) return false;
      if (modalityFilter && s.modality !== modalityFilter) return false;
      if (reportFilter && s.report !== reportFilter) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        const hit =
          s.patient.toLowerCase().includes(q) ||
          s.patientId.toLowerCase().includes(q) ||
          s.study.toLowerCase().includes(q) ||
          s.accession.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q);
        if (!hit) return false;
      }
      return true;
    });
  }, [aiTab, modalityFilter, reportFilter, search]);

  const kpis = [
    {
      label: "Studies (mẫu)",
      value: studies.length,
      sub: "Kho lưu trữ PACS DICOM",
      icon: Activity,
      tone: "bg-primary-50 text-primary-600",
    },
    {
      label: "AI hoàn tất",
      value: doneCount,
      sub: "Đã sinh bản đồ nhiệt XAI",
      icon: CheckCircle2,
      tone: "bg-emerald-50 text-emerald-700",
    },
    {
      label: "Đang xử lý",
      value: processingCount,
      sub: "Đang chạy trên hàng đợi GPU",
      icon: Clock3,
      tone: "bg-amber-50 text-amber-700",
    },
    {
      label: "AI lỗi",
      value: errorCount,
      sub: "Cần kích hoạt chạy lại",
      icon: AlertTriangle,
      tone: "bg-red-50 text-critical",
    },
  ];

  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        breadcrumb="CHẨN ĐOÁN HÌNH ẢNH · KHO CA CHỤP (STUDIES)"
        title="Studies"
        description="Quản lý Study DICOM, metadata và trạng thái AI (model version · threshold · latency)."
        actions={
          <Button href="/dashboard/studies/upload" size="sm">
            <Upload className="size-4" /> Upload DICOM
          </Button>
        }
      />

      {/* 4 KPI Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((b) => (
          <div
            key={b.label}
            className="flex items-center justify-between rounded-t-xl rounded-b-lg border border-primary-100 border-b-[5px] border-b-primary-600 bg-white p-5 overview-wrapper-shadow"
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.04em] text-text-secondary">
                {b.label}
              </p>
              <p className="mt-1.5 text-[28px] font-extrabold leading-none text-primary-900 tabular-nums">
                {b.value}
              </p>
              <p className="mt-1.5 text-xs font-medium text-primary-600">{b.sub}</p>
            </div>
            <span
              className={`flex size-12 shrink-0 items-center justify-center rounded-2xl ${b.tone}`}
            >
              <b.icon className="size-6" />
            </span>
          </div>
        ))}
      </div>

      {/* Unified Segmented Tabs & Search Filter Bar */}
      <div className="flex flex-col gap-3.5 rounded-2xl border border-primary-100 bg-white p-4 overview-wrapper-shadow">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-primary-100/80 pb-3.5">
          <SegmentedTabsParticle
            active={aiTab}
            onChange={setAiTab}
            items={[
              { id: "all", label: "Tất cả Studies", count: studies.length },
              { id: "Hoàn tất", label: "AI hoàn tất", count: doneCount },
              { id: "Đang xử lý", label: "Đang xử lý", count: processingCount },
              { id: "Lỗi", label: "AI lỗi", count: errorCount },
            ]}
          />
          <span className="text-xs font-semibold text-primary-700 tabular-nums">
            Hiển thị <strong>{filtered.length}</strong> / {studies.length} ca chụp
          </span>
        </div>

        <FilterBar
          searchPlaceholder="Tìm theo Patient ID, Study UID, Accession hoặc tên bệnh nhân..."
          searchValue={search}
          onSearchChange={setSearch}
        >
          <FilterSelect
            label="Modality"
            options={["CR", "DX"]}
            value={modalityFilter}
            onChange={setModalityFilter}
          />
          <FilterSelect
            label="Báo cáo"
            options={["Chờ đọc", "Chưa có", "FINAL", "Đang đọc"]}
            value={reportFilter}
            onChange={setReportFilter}
          />
        </FilterBar>
      </div>

      {/* Composite 7-Column Studies Table */}
      <DataTable
        headers={[
          "Ảnh & Accession / Study UID",
          "Bệnh nhân",
          "Kỹ thuật & Series",
          "Máy chụp & Thời gian",
          "Trạng thái AI & Latency",
          "Báo cáo",
          "Thao tác",
        ]}
        minWidth="980px"
      >
        {filtered.map((s) => {
          const inf = aiInferences.find((i) => i.caseId === s.caseId);
          return (
            <Tr key={s.study}>
              {/* 1. Thumbnail + Accession + Study UID */}
              <Td>
                <div className="flex items-center gap-3.5">
                  <Link
                    href={`/viewer/${s.caseId}`}
                    className="group relative size-13 shrink-0 overflow-hidden rounded-xl border border-primary-300 bg-viewer-bg shadow-2xs"
                  >
                    <Image
                      src={getCaseThumbnail(s.caseId)}
                      alt={`Study ${s.accession}`}
                      fill
                      className="object-cover object-center transition-transform duration-200 group-hover:scale-105"
                      sizes="52px"
                    />
                  </Link>
                  <div className="min-w-0">
                    <span className="inline-block rounded bg-primary-75 px-2 py-0.5 font-mono text-xs font-extrabold text-primary-700">
                      {s.accession}
                    </span>
                    <p
                      className="mt-1 max-w-[190px] truncate font-mono text-[11px] text-text-secondary"
                      title={s.study}
                    >
                      UID: {s.study}
                    </p>
                  </div>
                </div>
              </Td>

              {/* 2. Patient */}
              <Td>
                <Link
                  href={`/dashboard/benh-nhan/${s.patientId}`}
                  className="text-[15px] font-bold text-primary-900 hover:text-primary-600 hover:underline"
                >
                  {s.patient}
                </Link>
                <p className="mt-0.5 font-mono text-xs font-semibold text-primary-600">
                  {s.patientId}
                </p>
              </Td>

              {/* 3. Modality, Description & Series/Instances */}
              <Td>
                <div className="flex items-center gap-2">
                  <span className="rounded bg-primary-600 px-1.5 py-0.5 font-mono text-[11px] font-bold text-white">
                    {s.modality}
                  </span>
                  <span className="font-bold text-primary-900">{s.description}</span>
                </div>
                <p className="mt-1 text-xs text-text-secondary tabular-nums">
                  Series: <strong>{s.series}</strong> · Instances:{" "}
                  <strong>{s.instances}</strong>
                </p>
              </Td>

              {/* 4. Machine / KTV & Time */}
              <Td>
                <p className="flex items-center gap-1.5 font-semibold text-primary-900">
                  <Cpu className="size-3.5 text-primary-600" />
                  {s.machine} · <span className="text-text-secondary">{s.tech}</span>
                </p>
                <p className="mt-1 text-xs text-text-secondary tabular-nums">
                  Thu nhận: <strong>{s.time}</strong>
                </p>
              </Td>

              {/* 5. AI Status + Version + Latency */}
              <Td>
                <Badge tone={aiTone[s.ai as keyof typeof aiTone]}>{s.ai}</Badge>
                {inf && inf.status === "Hoàn tất" && (
                  <p className="mt-1.5 flex items-center gap-1 font-mono text-[11px] font-semibold text-primary-600 tabular-nums">
                    <Sparkles className="size-3" />
                    {inf.version} · {inf.latencyMs}ms
                  </p>
                )}
              </Td>

              {/* 6. Report Status */}
              <Td>
                <Badge
                  tone={
                    s.report === "FINAL"
                      ? "success"
                      : s.report === "Đang đọc"
                        ? "info"
                        : "neutral"
                  }
                >
                  {s.report}
                </Badge>
              </Td>

              {/* 7. Actions */}
              <Td>
                <div className="flex flex-wrap items-center gap-2">
                  <Button href={`/viewer/${s.caseId}`} size="sm" variant="primary">
                    Mở Viewer →
                  </Button>
                  {s.ai === "Lỗi" && (
                    <Button size="sm" variant="secondary">
                      <RefreshCw className="size-3.5" /> Chạy lại AI
                    </Button>
                  )}
                </div>
              </Td>
            </Tr>
          );
        })}
      </DataTable>
    </div>
  );
}
