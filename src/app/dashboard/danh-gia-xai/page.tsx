"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  Crosshair,
  Eye,
  Flame,
  FlaskConical,
  Layers,
  ScanSearch,
  Sparkles,
  Target,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { BorderBeam } from "@/components/ui/BorderBeam";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { DataTable, Td, Tr } from "@/components/ui/DataTable";
import { FilterBar, FilterSelect } from "@/components/ui/FilterBar";
import { PageHeader } from "@/components/ui/PageHeader";
import { SegmentedTabsParticle } from "@/components/ui/SegmentedTabsParticle";
import { getCaseThumbnail } from "@/lib/cxr-images";

interface XaiExperiment {
  id: string;
  model: string;
  method: string;
  dataset: string;
  threshold: string;
  iou: string;
  dice: string;
  pointingGame: string;
  date: string;
}

const experiments: XaiExperiment[] = [
  {
    id: "EXP-241",
    model: "v2.1.0",
    method: "Grad-CAM++",
    dataset: "ChestXR-XAI",
    threshold: "0.4",
    iou: "0.711",
    dice: "0.831",
    pointingGame: "0.834",
    date: "12/04/2026",
  },
  {
    id: "EXP-240",
    model: "v2.1.0",
    method: "Grad-CAM",
    dataset: "ChestXR-XAI",
    threshold: "0.4",
    iou: "0.682",
    dice: "0.802",
    pointingGame: "0.811",
    date: "11/04/2026",
  },
  {
    id: "EXP-238",
    model: "v2.1.0",
    method: "Grad-CAM++",
    dataset: "ChestXR-XAI",
    threshold: "0.3",
    iou: "0.695",
    dice: "0.818",
    pointingGame: "0.822",
    date: "10/04/2026",
  },
  {
    id: "EXP-235",
    model: "v2.0.0",
    method: "Grad-CAM++",
    dataset: "ChestXR-XAI",
    threshold: "0.5",
    iou: "0.664",
    dice: "0.791",
    pointingGame: "0.798",
    date: "02/04/2026",
  },
  {
    id: "EXP-230",
    model: "v2.0.0",
    method: "Grad-CAM",
    dataset: "ChestXR-XAI",
    threshold: "0.4",
    iou: "0.641",
    dice: "0.772",
    pointingGame: "0.780",
    date: "28/03/2026",
  },
  {
    id: "EXP-221",
    model: "v1.1.0",
    method: "Grad-CAM++",
    dataset: "ChestXR-XAI",
    threshold: "0.4",
    iou: "0.598",
    dice: "0.741",
    pointingGame: "0.755",
    date: "15/03/2026",
  },
];

export default function XaiEvalPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [datasetFilter, setDatasetFilter] = useState("");
  const [modelFilter, setModelFilter] = useState("");
  const [methodFilter, setMethodFilter] = useState("");
  const [labelFilter, setLabelFilter] = useState("");
  const [thresholdFilter, setThresholdFilter] = useState("");

  const filteredExperiments = useMemo(() => {
    return experiments.filter((exp) => {
      if (activeTab === "gradcampp" && exp.method !== "Grad-CAM++") return false;
      if (activeTab === "gradcam" && exp.method !== "Grad-CAM") return false;
      if (modelFilter) {
        const normalizedModel = modelFilter.replace("ChestXAI ", "");
        if (exp.model !== normalizedModel) return false;
      }
      if (methodFilter && exp.method !== methodFilter) return false;
      if (thresholdFilter && exp.threshold !== thresholdFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match =
          exp.id.toLowerCase().includes(q) ||
          exp.model.toLowerCase().includes(q) ||
          exp.method.toLowerCase().includes(q) ||
          exp.dataset.toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    });
  }, [activeTab, searchQuery, modelFilter, methodFilter, thresholdFilter]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Đánh giá XAI"
        description="Đánh giá mức độ khớp heatmap với Expert Annotation (IoU, Dice, Pointing Game). Heatmap clinical viewer mặc định OFF."
        actions={
          <Badge tone="ai">Explainable AI · Grad-CAM++ Benchmark</Badge>
        }
      />

      {/* 4 KPI Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="relative overflow-hidden rounded-2xl border border-violet-200 border-b-[4px] border-b-ai bg-white p-5 overview-wrapper-shadow">
          <BorderBeam size={160} duration={10} />
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[12px] font-extrabold uppercase tracking-wider text-violet-700">
                IoU (best)
              </p>
              <p className="mt-2 font-mono text-[30px] font-black leading-none text-ai">
                0.711
              </p>
              <p className="mt-2 text-[12px] font-semibold text-violet-800">
                Intersection over Union (EXP-241)
              </p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-ai">
              <Layers className="h-5 w-5" />
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-primary-100 border-b-[4px] border-b-primary-600 bg-white p-5 overview-wrapper-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[12px] font-extrabold uppercase tracking-wider text-text-secondary">
                Dice (best)
              </p>
              <p className="mt-2 font-mono text-[30px] font-black leading-none text-primary-950">
                0.831
              </p>
              <p className="mt-2 text-[12px] font-semibold text-primary-700">
                Độ tương đồng vùng tổn thương
              </p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
              <Target className="h-5 w-5" />
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-emerald-200 border-b-[4px] border-b-emerald-600 bg-white p-5 overview-wrapper-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[12px] font-extrabold uppercase tracking-wider text-emerald-700">
                Pointing Game
              </p>
              <p className="mt-2 font-mono text-[30px] font-black leading-none text-emerald-700">
                0.834
              </p>
              <p className="mt-2 text-[12px] font-semibold text-emerald-800">
                Tâm nhiệt nằm trong vùng GT
              </p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <Crosshair className="h-5 w-5" />
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-primary-100 border-b-[4px] border-b-primary-800 bg-white p-5 overview-wrapper-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[12px] font-extrabold uppercase tracking-wider text-text-secondary">
                Experiments
              </p>
              <p className="mt-2 font-mono text-[30px] font-black leading-none text-primary-950">
                {experiments.length}
              </p>
              <p className="mt-2 text-[12px] font-semibold text-text-secondary">
                Chuỗi thực nghiệm XAI đã lưu
              </p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-75 text-primary-800">
              <FlaskConical className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>

      {/* 3 Analytical Cards: IoU theo Model, Dice theo XAI Method, Pointing Game theo Label */}
      <div className="grid gap-5 lg:grid-cols-3">
        <Card>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-[16px] font-extrabold text-primary-950">
                IoU theo Model
              </h3>
              <p className="text-[12px] font-medium text-text-secondary">
                Mức độ chồng lấp vùng nhiệt qua các phiên bản
              </p>
            </div>
            <Badge tone="ai">+0.10 IoU</Badge>
          </div>
          <div className="grid grid-cols-4 items-end gap-3 rounded-xl border border-violet-100 bg-violet-50/40 px-4 pt-6 pb-3">
            {[
              { ver: "v1.1", val: 0.61 },
              { ver: "v2.0 (GC)", val: 0.66 },
              { ver: "v2.1 (T.3)", val: 0.69 },
              { ver: "v2.1 (T.4)", val: 0.71 },
            ].map((item, i) => (
              <div key={item.ver} className="flex flex-col items-center">
                <span className="mb-1.5 font-mono text-[12px] font-extrabold text-violet-950">
                  {item.val}
                </span>
                <div className="flex h-28 w-full items-end rounded-lg bg-white/80 p-1 shadow-inner">
                  <div
                    className={`w-full rounded-md ${
                      i === 3
                        ? "bg-gradient-to-t from-ai to-primary-500"
                        : "bg-violet-400"
                    }`}
                    style={{ height: `${item.val * 100}%` }}
                  />
                </div>
                <span className="mt-2 text-[11px] font-bold text-text-secondary">
                  {item.ver}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-[16px] font-extrabold text-primary-950">
                Dice theo XAI Method
              </h3>
              <p className="text-[12px] font-medium text-text-secondary">
                So sánh thuật toán giải thích Grad-CAM vs Grad-CAM++
              </p>
            </div>
            <Badge tone="info">Threshold 0.4</Badge>
          </div>
          <div className="space-y-5 rounded-xl border border-primary-100 bg-primary-50/30 p-4">
            <div>
              <div className="flex items-center justify-between text-[14px]">
                <span className="font-bold text-primary-900">Grad-CAM</span>
                <span className="font-mono font-extrabold text-primary-800">0.802</span>
              </div>
              <div className="mt-2 h-3 overflow-hidden rounded-full bg-white shadow-inner">
                <div className="h-full w-[80.2%] rounded-full bg-primary-600" />
              </div>
              <p className="mt-1 text-[12px] font-medium text-text-secondary">
                Trọng số đạo hàm bậc 1 toàn cục
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between text-[14px]">
                <span className="flex items-center gap-1.5 font-extrabold text-violet-950">
                  <Sparkles className="h-4 w-4 text-ai" />
                  Grad-CAM++
                </span>
                <span className="font-mono font-extrabold text-ai">0.831</span>
              </div>
              <div className="mt-2 h-3 overflow-hidden rounded-full bg-white shadow-inner">
                <div className="h-full w-[83.1%] rounded-full bg-gradient-to-r from-primary-600 to-ai" />
              </div>
              <p className="mt-1 text-[12px] font-medium text-violet-800">
                Đạo hàm bậc cao · Định vị đa ổ tổn thương chính xác hơn (+2.9%)
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-[16px] font-extrabold text-primary-950">
                Pointing Game theo Label
              </h3>
              <p className="text-[12px] font-medium text-text-secondary">
                Tỷ lệ điểm cực đại heatmap trúng vùng bác sĩ khoanh
              </p>
            </div>
            <Badge tone="success">Đạt chuẩn lâm sàng</Badge>
          </div>
          <ul className="space-y-3.5">
            {[
              { label: "Viêm phổi", val: "0.86", pct: 86, desc: "Đông đặc thùy phổi rõ ràng" },
              { label: "Tràn dịch", val: "0.81", pct: 81, desc: "Góc sườn hoành tù hai bên" },
              { label: "Tim to", val: "0.78", pct: 78, desc: "Chỉ số tim ngực CTR > 0.50" },
            ].map((item) => (
              <li
                key={item.label}
                className="rounded-xl border border-primary-100 bg-primary-50/40 px-4 py-3"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[14px] font-extrabold text-primary-950">
                      {item.label}
                    </span>
                    <span className="ml-2 text-[12px] font-medium text-text-secondary">
                      · {item.desc}
                    </span>
                  </div>
                  <span className="font-mono text-[15px] font-black text-primary-900">
                    {item.val}
                  </span>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white">
                  <div
                    className="h-full rounded-full bg-emerald-600"
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* 4-Panel Visual XAI Comparison */}
      <Card>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="flex items-center gap-2 text-[17px] font-extrabold text-primary-950">
              <Eye className="h-5 w-5 text-ai" />
              So sánh hình ảnh (mẫu de-identify)
            </h3>
            <p className="text-[13px] font-medium text-text-secondary">
              Đối chiếu trực quan giữa ảnh X-quang gốc, bản đồ nhiệt Grad-CAM++, vùng ngưỡng hóa và nhãn chuyên gia
            </p>
          </div>
          <Badge tone="neutral">Subject: RS-001024 · EXP-241 (IoU 0.711)</Badge>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Original X-ray",
              subtitle: "Ảnh gốc DICOM đã khử định danh",
              src: getCaseThumbnail("XR20261011-001"),
              mode: "raw",
            },
            {
              title: "AI Heatmap (overlay demo)",
              subtitle: "Bản đồ nhiệt Grad-CAM++ (Opacity 55%)",
              src: getCaseThumbnail("XR20261011-001"),
              mode: "heatmap",
            },
            {
              title: "Thresholded Region",
              subtitle: "Vùng kích hoạt vượt ngưỡng T = 0.40",
              src: getCaseThumbnail("XR20261011-004"),
              mode: "threshold",
            },
            {
              title: "Expert Annotation ref",
              subtitle: "Ground Truth bởi Bác sĩ CĐHA",
              src: getCaseThumbnail("XR20261011-009"),
              mode: "expert",
            },
          ].map((panel) => (
            <div
              key={panel.title}
              className="group overflow-hidden rounded-2xl border border-primary-200 bg-white p-3 shadow-xs transition-all hover:border-primary-400"
            >
              <div className="relative aspect-square overflow-hidden rounded-xl border border-slate-800 bg-[#050B12]">
                <Image
                  src={panel.src}
                  alt={panel.title}
                  fill
                  className="object-cover object-center opacity-90 transition-transform duration-300 group-hover:scale-105"
                  sizes="260px"
                />

                {/* Visual Overlays to differentiate the 4 scientific stages */}
                {panel.mode === "heatmap" && (
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(circle at 38% 58%, rgba(239,68,68,0.68) 0%, rgba(245,158,11,0.52) 18%, rgba(16,185,129,0.28) 34%, transparent 55%)",
                    }}
                  />
                )}

                {panel.mode === "threshold" && (
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <div className="h-[36%] w-[34%] -translate-x-4 translate-y-3 rounded-full border-2 border-dashed border-amber-400 bg-amber-400/25 shadow-[0_0_20px_rgba(245,158,11,0.45)]" />
                  </div>
                )}

                {panel.mode === "expert" && (
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <div className="relative h-[38%] w-[36%] -translate-x-3 translate-y-2 rounded-lg border-2 border-emerald-400 bg-emerald-500/15">
                      <span className="absolute -top-5 left-0 rounded bg-emerald-600 px-1.5 py-0.5 font-mono text-[10px] font-bold text-white">
                        GT · Viêm phổi
                      </span>
                    </div>
                  </div>
                )}

                <div className="absolute bottom-2 left-2 rounded-md bg-slate-950/80 px-2 py-0.5 font-mono text-[10px] font-bold text-slate-200 backdrop-blur-xs">
                  {panel.mode === "raw" && "PA · 120kVp"}
                  {panel.mode === "heatmap" && "Grad-CAM++"}
                  {panel.mode === "threshold" && "Mask T ≥ 0.40"}
                  {panel.mode === "expert" && "IoU: 0.711"}
                </div>
              </div>
              <p className="mt-3 text-center text-[14px] font-extrabold text-primary-950">
                {panel.title}
              </p>
              <p className="mt-0.5 text-center text-[12px] font-medium text-text-secondary">
                {panel.subtitle}
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* Interactive Filter & Experiments Table */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <SegmentedTabsParticle
            activeId={activeTab}
            onChange={setActiveTab}
            tabs={[
              { id: "all", label: "Tất cả thực nghiệm", count: experiments.length },
              {
                id: "gradcampp",
                label: "Grad-CAM++",
                count: experiments.filter((e) => e.method === "Grad-CAM++").length,
                tone: "primary",
              },
              {
                id: "gradcam",
                label: "Grad-CAM",
                count: experiments.filter((e) => e.method === "Grad-CAM").length,
              },
            ]}
          />
          {(searchQuery || modelFilter || methodFilter || thresholdFilter || activeTab !== "all") && (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                setActiveTab("all");
                setSearchQuery("");
                setModelFilter("");
                setMethodFilter("");
                setThresholdFilter("");
              }}
            >
              Đặt lại bộ lọc ({filteredExperiments.length}/{experiments.length})
            </Button>
          )}
        </div>

        <FilterBar
          searchPlaceholder="Tìm mã Experiment (EXP-241), phiên bản model, phương pháp XAI..."
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
        >
          <FilterSelect
            label="Dataset"
            options={["ChestXR-XAI-2026"]}
            value={datasetFilter}
            onChange={setDatasetFilter}
          />
          <FilterSelect
            label="Model"
            options={["ChestXAI v2.1.0", "v2.0.0", "v1.1.0"]}
            value={modelFilter}
            onChange={setModelFilter}
          />
          <FilterSelect
            label="XAI Method"
            options={["Grad-CAM", "Grad-CAM++"]}
            value={methodFilter}
            onChange={setMethodFilter}
          />
          <FilterSelect
            label="Label"
            options={["Viêm phổi", "Tràn khí", "Tràn dịch"]}
            value={labelFilter}
            onChange={setLabelFilter}
          />
          <FilterSelect
            label="Threshold"
            options={["0.3", "0.4", "0.5"]}
            value={thresholdFilter}
            onChange={setThresholdFilter}
          />
        </FilterBar>
      </div>

      <DataTable
        headers={[
          "Experiment ID & Ngày",
          "Model & Dataset",
          "Phương pháp XAI & Threshold",
          "Chỉ số IoU",
          "Chỉ số Dice",
          "Pointing Game",
        ]}
      >
        {filteredExperiments.map((exp, idx) => (
          <Tr key={exp.id}>
            <Td>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-ai">
                  <ScanSearch className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-md bg-primary-75 px-2.5 py-0.5 font-mono text-[13px] font-bold text-primary-900">
                      {exp.id}
                    </span>
                    {idx === 0 && <Badge tone="success">Best Run</Badge>}
                  </div>
                  <p className="mt-1 text-[12px] font-medium text-text-secondary">
                    Ngày chạy: {exp.date}
                  </p>
                </div>
              </div>
            </Td>
            <Td>
              <p className="text-[14px] font-extrabold text-primary-950">
                ChestXAI {exp.model}
              </p>
              <p className="mt-0.5 text-[12px] font-semibold text-text-secondary">
                Dataset: {exp.dataset}
              </p>
            </Td>
            <Td>
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone={exp.method === "Grad-CAM++" ? "ai" : "info"}>
                  <Flame className="mr-1 inline h-3.5 w-3.5" />
                  {exp.method}
                </Badge>
                <span className="rounded-lg border border-primary-200 bg-primary-50/70 px-2.5 py-0.5 font-mono text-[12px] font-bold text-primary-900">
                  T = {exp.threshold}
                </span>
              </div>
            </Td>
            <Td>
              <div className="w-32">
                <span className="font-mono text-[14px] font-extrabold text-primary-950">
                  {exp.iou}
                </span>
                <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-primary-75">
                  <div
                    className="h-full rounded-full bg-ai"
                    style={{ width: `${Number(exp.iou) * 100}%` }}
                  />
                </div>
              </div>
            </Td>
            <Td>
              <div className="w-32">
                <span className="font-mono text-[14px] font-extrabold text-primary-950">
                  {exp.dice}
                </span>
                <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-primary-75">
                  <div
                    className="h-full rounded-full bg-primary-600"
                    style={{ width: `${Number(exp.dice) * 100}%` }}
                  />
                </div>
              </div>
            </Td>
            <Td>
              <div className="w-32">
                <span className="font-mono text-[14px] font-extrabold text-emerald-700">
                  {exp.pointingGame}
                </span>
                <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-emerald-100">
                  <div
                    className="h-full rounded-full bg-emerald-600"
                    style={{ width: `${Number(exp.pointingGame) * 100}%` }}
                  />
                </div>
              </div>
            </Td>
          </Tr>
        ))}
      </DataTable>
    </div>
  );
}
