"use client";

import { useMemo, useState } from "react";
import {
  CheckCircle2,
  Database,
  FileSpreadsheet,
  FolderKanban,
  Layers,
  Plus,
  RefreshCw,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { BorderBeam } from "@/components/ui/BorderBeam";
import { Button } from "@/components/ui/Button";
import { DataTable, Td, Tr } from "@/components/ui/DataTable";
import { FilterBar, FilterSelect } from "@/components/ui/FilterBar";
import { PageHeader } from "@/components/ui/PageHeader";
import { SegmentedTabsParticle } from "@/components/ui/SegmentedTabsParticle";
import { datasetsCatalog, researchRows } from "@/lib/demo-data";

export default function DatasetPage() {
  const [activeTab, setActiveTab] = useState("rows");
  const [searchQuery, setSearchQuery] = useState("");
  const [datasetFilter, setDatasetFilter] = useState("");
  const [splitFilter, setSplitFilter] = useState("");
  const [annotationFilter, setAnnotationFilter] = useState("");

  const annotatedCount = researchRows.filter((r) => r.annotation === "Có").length;
  const pendingCount = researchRows.length - annotatedCount;

  const filteredRows = useMemo(() => {
    return researchRows.filter((r) => {
      if (activeTab === "ann" && r.annotation !== "Có") return false;
      if (activeTab === "pending" && r.annotation === "Có") return false;
      if (datasetFilter && r.dataset !== datasetFilter) return false;
      if (splitFilter && r.split !== splitFilter) return false;
      if (annotationFilter && r.annotation !== annotationFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match =
          r.id.toLowerCase().includes(q) ||
          r.dataset.toLowerCase().includes(q) ||
          r.label.toLowerCase().includes(q) ||
          r.model.toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    });
  }, [activeTab, searchQuery, datasetFilter, splitFilter, annotationFilter]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Bộ dữ liệu nghiên cứu"
        description="Dữ liệu đã de-identify. Không hiển thị tên, SĐT, địa chỉ hay Patient ID thật."
        actions={
          <>
            <Button variant="secondary">
              <RefreshCw className="h-4 w-4" />
              Đồng bộ Studies
            </Button>
            <Button>
              <Plus className="h-4 w-4" />
              + Tạo Dataset
            </Button>
          </>
        }
      />

      {/* De-identification Governance Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border-2 border-violet-200 bg-violet-50/90 px-6 py-4 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ai text-white shadow-sm">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[14px] font-extrabold text-violet-950">
              Cơ chế bảo vệ định danh lâm sàng (De-identification Standard)
            </p>
            <p className="mt-0.5 text-[13px] font-medium text-violet-800">
              Research Subject ID (<span className="font-mono font-bold">RS-*</span>) thay thế định danh lâm sàng. Export chỉ chứa cho vai trò Researcher / Admin có audit.
            </p>
          </div>
        </div>
        <Badge tone="ai">HIPAA / De-ID Ready</Badge>
      </div>

      {/* 4 KPI Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="relative overflow-hidden rounded-2xl border border-primary-100 border-b-[4px] border-b-primary-600 bg-white p-5 overview-wrapper-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[12px] font-extrabold uppercase tracking-wider text-text-secondary">
                Tổng Studies
              </p>
              <p className="mt-2 text-[30px] font-black leading-none text-primary-950">
                12,480
              </p>
              <p className="mt-2 text-[12px] font-semibold text-primary-700">
                Kho dữ liệu X-quang nghiên cứu
              </p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
              <Database className="h-5 w-5" />
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-emerald-200 border-b-[4px] border-b-emerald-600 bg-white p-5 overview-wrapper-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[12px] font-extrabold uppercase tracking-wider text-emerald-700">
                Đã ẩn danh
              </p>
              <p className="mt-2 text-[30px] font-black leading-none text-emerald-700">
                12,480
              </p>
              <p className="mt-2 text-[12px] font-semibold text-emerald-800">
                100% loại bỏ DICOM PII tags
              </p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <ShieldCheck className="h-5 w-5" />
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-violet-200 border-b-[4px] border-b-ai bg-white p-5 overview-wrapper-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[12px] font-extrabold uppercase tracking-wider text-violet-700">
                Có Expert Annotation
              </p>
              <p className="mt-2 text-[30px] font-black leading-none text-ai">
                4,213
              </p>
              <p className="mt-2 text-[12px] font-semibold text-violet-800">
                Đã gán nhãn bởi Bác sĩ CĐHA
              </p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-ai">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-primary-100 border-b-[4px] border-b-primary-800 bg-white p-5 overview-wrapper-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[12px] font-extrabold uppercase tracking-wider text-text-secondary">
                Dataset catalog
              </p>
              <p className="mt-2 text-[30px] font-black leading-none text-primary-950">
                {datasetsCatalog.length}
              </p>
              <p className="mt-2 text-[12px] font-semibold text-text-secondary">
                Bộ dữ liệu chuẩn hóa huấn luyện
              </p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-75 text-primary-800">
              <FolderKanban className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Catalog Dataset Cards */}
      <div>
        <div className="mb-3.5 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-[17px] font-extrabold text-primary-950">
            <Layers className="h-5 w-5 text-primary-700" />
            Catalog Dataset
          </h2>
          <span className="text-[13px] font-semibold text-text-secondary">
            Chọn thẻ dataset để lọc nhanh danh sách mẫu bên dưới
          </span>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {datasetsCatalog.map((d, idx) => {
            const pct = Math.round((d.annotated / d.studies) * 100);
            const isSelected = datasetFilter === d.name;
            return (
              <div
                key={d.name}
                onClick={() => setDatasetFilter(isSelected ? "" : d.name)}
                className={`group relative cursor-pointer overflow-hidden rounded-2xl border bg-white p-5 transition-all overview-wrapper-shadow ${
                  isSelected
                    ? "border-2 border-primary-600 ring-4 ring-primary-500/10"
                    : "border-primary-100 border-b-[4px] border-b-primary-600 hover:-translate-y-0.5 hover:border-primary-300"
                }`}
              >
                {idx === 0 && <BorderBeam size={180} duration={11} />}
                <div className="flex items-start justify-between gap-2">
                  <p className="text-[15px] font-extrabold leading-snug text-primary-950 group-hover:text-primary-700">
                    {d.name}
                  </p>
                  <Badge tone={d.status === "Ready" ? "success" : "warning"}>
                    {d.status}
                  </Badge>
                </div>

                <div className="mt-4">
                  <div className="flex items-center justify-between text-[12px] font-bold">
                    <span className="text-text-secondary">Tiến độ Annotation</span>
                    <span className="text-primary-800">{pct}%</span>
                  </div>
                  <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-primary-75">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary-600 to-ai"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>

                <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-primary-100/80 pt-3.5 text-[13px]">
                  <div>
                    <dt className="text-[11px] font-bold uppercase tracking-wider text-text-secondary">
                      Studies
                    </dt>
                    <dd className="mt-0.5 font-extrabold text-primary-950">
                      {d.studies.toLocaleString("vi-VN")}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[11px] font-bold uppercase tracking-wider text-text-secondary">
                      Annotated
                    </dt>
                    <dd className="mt-0.5 font-extrabold text-ai">
                      {d.annotated.toLocaleString("vi-VN")}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[11px] font-bold uppercase tracking-wider text-text-secondary">
                      Split
                    </dt>
                    <dd className="mt-0.5 font-mono text-[12px] font-bold text-primary-800">
                      {d.split}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[11px] font-bold uppercase tracking-wider text-text-secondary">
                      Cập nhật
                    </dt>
                    <dd className="mt-0.5 font-bold text-text-main">{d.updated}</dd>
                  </div>
                </dl>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Tabs + FilterBar */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <SegmentedTabsParticle
            activeId={activeTab}
            onChange={setActiveTab}
            tabs={[
              { id: "rows", label: "Research rows", count: researchRows.length },
              { id: "ann", label: "Có annotation", count: annotatedCount, tone: "success" },
              { id: "pending", label: "Chưa gán nhãn", count: pendingCount, tone: "warning" },
            ]}
          />
          {(searchQuery || datasetFilter || splitFilter || annotationFilter || activeTab !== "rows") && (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                setActiveTab("rows");
                setSearchQuery("");
                setDatasetFilter("");
                setSplitFilter("");
                setAnnotationFilter("");
              }}
            >
              Xóa bộ lọc ({filteredRows.length}/{researchRows.length})
            </Button>
          )}
        </div>

        <FilterBar
          searchPlaceholder="Tìm Research Subject ID (RS-*), Dataset, bệnh lý, mô hình..."
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
        >
          <FilterSelect
            label="Dataset"
            options={datasetsCatalog.map((d) => d.name)}
            value={datasetFilter}
            onChange={setDatasetFilter}
          />
          <FilterSelect
            label="Split"
            options={["train", "val", "test", "external"]}
            value={splitFilter}
            onChange={setSplitFilter}
          />
          <FilterSelect
            label="Annotation"
            options={["Có", "Chưa"]}
            value={annotationFilter}
            onChange={setAnnotationFilter}
          />
        </FilterBar>
      </div>

      {/* Composite Research Table */}
      <DataTable
        headers={[
          "Research Subject ID",
          "Dataset & Phân tập (Split)",
          "Modality",
          "Nhãn bệnh lý (Ground Truth)",
          "Expert Annotation",
          "Model kiểm thử & Ngày thêm",
        ]}
      >
        {filteredRows.map((r) => (
          <Tr key={r.id}>
            <Td>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 font-mono text-[12px] font-extrabold text-ai">
                  RS
                </div>
                <div>
                  <span className="rounded-md bg-primary-75 px-2.5 py-1 font-mono text-[13px] font-bold text-primary-900">
                    {r.id}
                  </span>
                  <p className="mt-1 text-[12px] font-medium text-text-secondary">
                    Đã ẩn danh chuẩn DICOM
                  </p>
                </div>
              </div>
            </Td>
            <Td>
              <p className="text-[14px] font-extrabold text-primary-950">{r.dataset}</p>
              <div className="mt-1">
                <Badge
                  tone={
                    r.split === "train"
                      ? "info"
                      : r.split === "test"
                        ? "ai"
                        : r.split === "external"
                          ? "warning"
                          : "neutral"
                  }
                >
                  Split: {r.split}
                </Badge>
              </div>
            </Td>
            <Td>
              <span className="inline-flex items-center rounded-lg border border-primary-200 bg-primary-50/70 px-2.5 py-1 font-mono text-[13px] font-bold text-primary-800">
                {r.modality}
              </span>
            </Td>
            <Td>
              <span className="text-[14px] font-bold text-primary-950">{r.label}</span>
            </Td>
            <Td>
              <Badge tone={r.annotation === "Có" ? "success" : "warning"}>
                {r.annotation === "Có" ? "✓ Có Annotation" : "Chưa gán nhãn"}
              </Badge>
            </Td>
            <Td>
              <div className="flex items-center gap-1.5 text-[13px] font-bold text-primary-900">
                <Sparkles className="h-3.5 w-3.5 text-ai" />
                {r.model}
              </div>
              <p className="mt-0.5 text-[12px] font-medium text-text-secondary">
                Ngày thêm: {r.date}
              </p>
            </Td>
          </Tr>
        ))}
      </DataTable>

      <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-primary-100 bg-white px-5 py-3.5 text-[13px] font-medium text-text-secondary shadow-xs">
        <span className="flex items-center gap-2">
          <FileSpreadsheet className="h-4 w-4 text-primary-700" />
          Hiển thị <strong className="font-bold text-primary-950">{filteredRows.length}</strong> /{" "}
          {researchRows.length} mẫu · Catalog đầy đủ trên object storage research.
        </span>
        <span className="font-mono text-[12px] font-bold text-primary-800">
          Object Storage: s3://cxr-research-deid-2026
        </span>
      </div>
    </div>
  );
}
