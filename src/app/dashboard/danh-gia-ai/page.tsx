"use client";

import { useState } from "react";
import {
  Activity,
  Award,
  BarChart3,
  CheckCircle2,
  Cpu,
  Download,
  GitCompare,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { BorderBeam } from "@/components/ui/BorderBeam";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { DataTable, Td, Tr } from "@/components/ui/DataTable";
import { FilterSelect } from "@/components/ui/FilterBar";
import { PageHeader } from "@/components/ui/PageHeader";

const metrics = [
  { label: "Sensitivity", value: "0.884", pct: 88.4, desc: "Độ nhạy phát hiện ca dương tính" },
  { label: "Specificity", value: "0.901", pct: 90.1, desc: "Độ đặc hiệu loại trừ ca âm tính" },
  { label: "Precision", value: "0.892", pct: 89.2, desc: "Giá trị tiên đoán dương (PPV)" },
  { label: "Recall", value: "0.876", pct: 87.6, desc: "Tỷ lệ thu hồi tổn thương" },
  { label: "F1-score", value: "0.879", pct: 87.9, desc: "Trung bình điều hòa P & R" },
  { label: "AUROC", value: "0.942", pct: 94.2, desc: "Diện tích dưới đường cong ROC", highlight: true },
  { label: "AUPRC", value: "0.918", pct: 91.8, desc: "Diện tích dưới đường cong PR" },
];

const byLabel = [
  {
    label: "Viêm phổi",
    tp: 420,
    fp: 38,
    tn: 890,
    fn: 52,
    sens: 0.89,
    spec: 0.96,
    prec: 0.92,
    f1: 0.9,
    auroc: 0.95,
  },
  {
    label: "Tràn dịch",
    tp: 180,
    fp: 22,
    tn: 1100,
    fn: 40,
    sens: 0.82,
    spec: 0.98,
    prec: 0.89,
    f1: 0.85,
    auroc: 0.93,
  },
  {
    label: "Tim to",
    tp: 95,
    fp: 30,
    tn: 1180,
    fn: 28,
    sens: 0.77,
    spec: 0.97,
    prec: 0.76,
    f1: 0.76,
    auroc: 0.9,
  },
];

export default function AiEvalPage() {
  const [datasetFilter, setDatasetFilter] = useState("ChestXR-Test-2026Q1");
  const [modelFilter, setModelFilter] = useState("ChestXAI");
  const [versionFilter, setVersionFilter] = useState("v2.1.0");
  const [labelFilter, setLabelFilter] = useState("");

  const filteredLabels = byLabel.filter((row) => {
    if (!labelFilter || labelFilter === "Tất cả") return true;
    return row.label === labelFilter;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Đánh giá AI"
        description="Dashboard khoa học cho hiệu năng mô hình trên dataset nghiên cứu."
        actions={
          <Button variant="secondary">
            <Download className="h-4 w-4" />
            Xuất báo cáo kiểm định (CSV/PDF)
          </Button>
        }
      />

      {/* Scientific Filter Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-primary-100 bg-white p-4 overview-wrapper-shadow">
        <div className="flex flex-wrap items-center gap-3">
          <FilterSelect
            label="Dataset"
            options={["ChestXR-Test-2026Q1"]}
            value={datasetFilter}
            onChange={setDatasetFilter}
          />
          <FilterSelect
            label="Model"
            options={["ChestXAI"]}
            value={modelFilter}
            onChange={setModelFilter}
          />
          <FilterSelect
            label="Version"
            options={["v2.1.0", "v2.0.0", "v1.1.0"]}
            value={versionFilter}
            onChange={setVersionFilter}
          />
          <FilterSelect
            label="Label"
            options={["Tất cả", "Viêm phổi", "Tràn dịch", "Tim to"]}
            value={labelFilter}
            onChange={setLabelFilter}
          />
        </div>
        <div className="flex items-center gap-2">
          <Badge tone="ai">
            {modelFilter} {versionFilter || "v2.1.0"}
          </Badge>
          <Badge tone="info">N = 4,075 mẫu kiểm định</Badge>
        </div>
      </div>

      {/* 7 Scientific Metric Cards */}
      <div className="grid gap-3.5 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-7">
        {metrics.map((m) => (
          <div
            key={m.label}
            className={`relative overflow-hidden rounded-2xl border bg-white p-4 overview-wrapper-shadow ${
              m.highlight
                ? "border-violet-300 border-b-[4px] border-b-ai bg-violet-50/30"
                : "border-primary-100 border-b-[4px] border-b-primary-600"
            }`}
          >
            {m.highlight && <BorderBeam size={140} duration={9} />}
            <div className="flex items-center justify-between">
              <p className="text-[12px] font-extrabold uppercase tracking-wider text-text-secondary">
                {m.label}
              </p>
              {m.highlight ? (
                <Award className="h-4 w-4 text-ai" />
              ) : (
                <Target className="h-4 w-4 text-primary-600" />
              )}
            </div>
            <p
              className={`mt-2 font-mono text-[26px] font-black leading-none ${
                m.highlight ? "text-ai" : "text-primary-950"
              }`}
            >
              {m.value}
            </p>
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-primary-75">
              <div
                className={`h-full rounded-full ${
                  m.highlight ? "bg-ai" : "bg-primary-600"
                }`}
                style={{ width: `${m.pct}%` }}
              />
            </div>
            <p className="mt-2 text-[11px] font-medium leading-tight text-text-secondary">
              {m.desc}
            </p>
          </div>
        ))}
      </div>

      {/* 3 Scientific Charts Row: ROC Curve, Precision-Recall, Confusion Matrix */}
      <div className="grid gap-5 lg:grid-cols-3">
        {/* ROC Curve */}
        <Card>
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h3 className="flex items-center gap-2 text-[16px] font-extrabold text-primary-950">
                <TrendingUp className="h-4 w-4 text-primary-700" />
                ROC Curve
              </h3>
              <p className="text-[12px] font-medium text-text-secondary">
                True Positive Rate vs. False Positive Rate
              </p>
            </div>
            <Badge tone="info">AUROC = 0.942</Badge>
          </div>
          <div className="relative h-52 rounded-xl border border-primary-100 bg-primary-50/40 p-3">
            <svg viewBox="0 0 120 105" className="h-full w-full">
              <defs>
                <linearGradient id="rocArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0891B2" stopOpacity="0.28" />
                  <stop offset="100%" stopColor="#0891B2" stopOpacity="0.02" />
                </linearGradient>
              </defs>
              {/* Grid lines */}
              {[25, 45, 65, 85].map((y) => (
                <line
                  key={y}
                  x1="16"
                  y1={y}
                  x2="108"
                  y2={y}
                  stroke="#D8E6F3"
                  strokeDasharray="2 2"
                  strokeWidth="0.7"
                />
              ))}
              {/* Axes */}
              <line x1="16" y1="88" x2="108" y2="88" stroke="#94A3B8" strokeWidth="1.2" />
              <line x1="16" y1="88" x2="16" y2="10" stroke="#94A3B8" strokeWidth="1.2" />
              {/* Diagonal Random Guess Line */}
              <line
                x1="16"
                y1="88"
                x2="108"
                y2="10"
                stroke="#CBD5E1"
                strokeDasharray="3 3"
                strokeWidth="1"
              />
              {/* Area under ROC */}
              <polygon
                fill="url(#rocArea)"
                points="16,88 26,66 42,36 60,24 78,17 94,12 108,10 108,88"
              />
              {/* ROC Polyline */}
              <polyline
                fill="none"
                stroke="#0891B2"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points="16,88 26,66 42,36 60,24 78,17 94,12 108,10"
              />
              {/* Operating point */}
              <circle cx="42" cy="36" r="3" fill="#0891B2" stroke="#FFFFFF" strokeWidth="1.2" />
              <text x="47" y="38" fontSize="6" fontWeight="bold" fill="#0F2A38">
                Sens 0.884 / Spec 0.901
              </text>
              <text x="52" y="99" fontSize="6" fontWeight="bold" fill="#52657A">
                False Positive Rate (1 - Specificity)
              </text>
              <text x="3" y="52" fontSize="6" fontWeight="bold" fill="#52657A" transform="rotate(-90 6,52)">
                TPR (Sensitivity)
              </text>
            </svg>
          </div>
        </Card>

        {/* Precision-Recall Curve */}
        <Card>
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h3 className="flex items-center gap-2 text-[16px] font-extrabold text-primary-950">
                <Sparkles className="h-4 w-4 text-ai" />
                Precision-Recall
              </h3>
              <p className="text-[12px] font-medium text-text-secondary">
                Độ chính xác theo độ phủ phát hiện bệnh lý
              </p>
            </div>
            <Badge tone="ai">AUPRC = 0.918</Badge>
          </div>
          <div className="relative h-52 rounded-xl border border-violet-100 bg-violet-50/30 p-3">
            <svg viewBox="0 0 120 105" className="h-full w-full">
              <defs>
                <linearGradient id="prArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.26" />
                  <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.02" />
                </linearGradient>
              </defs>
              {[25, 45, 65, 85].map((y) => (
                <line
                  key={y}
                  x1="16"
                  y1={y}
                  x2="108"
                  y2={y}
                  stroke="#E9D5FF"
                  strokeDasharray="2 2"
                  strokeWidth="0.7"
                />
              ))}
              <line x1="16" y1="88" x2="108" y2="88" stroke="#94A3B8" strokeWidth="1.2" />
              <line x1="16" y1="88" x2="16" y2="10" stroke="#94A3B8" strokeWidth="1.2" />
              <polygon
                fill="url(#prArea)"
                points="16,18 38,22 60,30 82,48 98,68 108,84 108,88 16,88"
              />
              <polyline
                fill="none"
                stroke="#7C3AED"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points="16,18 38,22 60,30 82,48 98,68 108,84"
              />
              <circle cx="82" cy="48" r="3" fill="#7C3AED" stroke="#FFFFFF" strokeWidth="1.2" />
              <text x="52" y="44" fontSize="6" fontWeight="bold" fill="#4C1D95">
                F1 = 0.879 @ Thresh 0.40
              </text>
              <text x="56" y="99" fontSize="6" fontWeight="bold" fill="#52657A">
                Recall (Sensitivity)
              </text>
              <text x="3" y="52" fontSize="6" fontWeight="bold" fill="#52657A" transform="rotate(-90 6,52)">
                Precision (PPV)
              </text>
            </svg>
          </div>
        </Card>

        {/* Confusion Matrix */}
        <Card>
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h3 className="flex items-center gap-2 text-[16px] font-extrabold text-primary-950">
                <Activity className="h-4 w-4 text-emerald-600" />
                Confusion Matrix
              </h3>
              <p className="text-[12px] font-medium text-text-secondary">
                Ma trận nhầm lẫn trên 4,075 ca kiểm định
              </p>
            </div>
            <Badge tone="success">Acc: 94.8%</Badge>
          </div>
          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/80 p-4">
              <div className="flex items-center justify-between text-[11px] font-extrabold uppercase tracking-wider text-emerald-800">
                <span>TP (Dương thật)</span>
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
              </div>
              <p className="mt-1.5 font-mono text-[26px] font-black text-emerald-700">
                695
              </p>
              <p className="mt-0.5 text-[11px] font-semibold text-emerald-800">
                17.1% tổng mẫu
              </p>
            </div>

            <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-4">
              <div className="flex items-center justify-between text-[11px] font-extrabold uppercase tracking-wider text-amber-800">
                <span>FP (Dương giả)</span>
                <span className="rounded bg-amber-200/70 px-1.5 py-0.5 text-[10px]">Type I</span>
              </div>
              <p className="mt-1.5 font-mono text-[26px] font-black text-amber-700">
                90
              </p>
              <p className="mt-0.5 text-[11px] font-semibold text-amber-800">
                2.2% tổng mẫu
              </p>
            </div>

            <div className="rounded-xl border border-red-200 bg-red-50/80 p-4">
              <div className="flex items-center justify-between text-[11px] font-extrabold uppercase tracking-wider text-red-800">
                <span>FN (Âm giả)</span>
                <span className="rounded bg-red-200/70 px-1.5 py-0.5 text-[10px]">Type II</span>
              </div>
              <p className="mt-1.5 font-mono text-[26px] font-black text-critical">
                120
              </p>
              <p className="mt-0.5 text-[11px] font-semibold text-red-800">
                2.9% tổng mẫu
              </p>
            </div>

            <div className="rounded-xl border border-primary-200 bg-primary-50/70 p-4">
              <div className="flex items-center justify-between text-[11px] font-extrabold uppercase tracking-wider text-primary-900">
                <span>TN (Âm thật)</span>
                <CheckCircle2 className="h-3.5 w-3.5 text-primary-700" />
              </div>
              <p className="mt-1.5 font-mono text-[26px] font-black text-primary-950">
                3170
              </p>
              <p className="mt-0.5 text-[11px] font-semibold text-primary-800">
                77.8% tổng mẫu
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Performance theo bệnh lý */}
      <Card padding={false}>
        <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-primary-100 bg-primary-75/60 px-6 py-4">
          <div className="flex items-center gap-2.5">
            <Cpu className="h-5 w-5 text-primary-700" />
            <h3 className="text-[17px] font-extrabold text-primary-950">
              Performance theo bệnh lý
            </h3>
          </div>
          <span className="text-[13px] font-semibold text-text-secondary">
            Dataset: <strong className="text-primary-900">{datasetFilter}</strong> · Model:{" "}
            <strong className="text-primary-900">
              {modelFilter} {versionFilter}
            </strong>
          </span>
        </div>
        <DataTable
          headers={[
            "Nhãn bệnh lý (Label)",
            "Confusion Counts (TP / FP / TN / FN)",
            "Sensitivity & Specificity",
            "Precision & F1-score",
            "Chỉ số AUROC",
          ]}
        >
          {filteredLabels.map((row) => (
            <Tr key={row.label}>
              <Td>
                <p className="text-[15px] font-extrabold text-primary-950">{row.label}</p>
                <p className="mt-0.5 text-[12px] font-medium text-text-secondary">
                  Tổng ca: {(row.tp + row.fp + row.tn + row.fn).toLocaleString("vi-VN")}
                </p>
              </Td>
              <Td>
                <div className="flex flex-wrap items-center gap-1.5 font-mono text-[12px] font-bold">
                  <span className="rounded-md bg-emerald-50 px-2 py-1 text-emerald-700">
                    TP: {row.tp}
                  </span>
                  <span className="rounded-md bg-amber-50 px-2 py-1 text-amber-700">
                    FP: {row.fp}
                  </span>
                  <span className="rounded-md bg-primary-50 px-2 py-1 text-primary-800">
                    TN: {row.tn}
                  </span>
                  <span className="rounded-md bg-red-50 px-2 py-1 text-critical">
                    FN: {row.fn}
                  </span>
                </div>
              </Td>
              <Td>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[13px]">
                    <span className="font-semibold text-text-secondary">Sens:</span>
                    <span className="font-mono font-extrabold text-primary-950">{row.sens}</span>
                  </div>
                  <div className="flex items-center justify-between text-[13px]">
                    <span className="font-semibold text-text-secondary">Spec:</span>
                    <span className="font-mono font-extrabold text-emerald-700">{row.spec}</span>
                  </div>
                </div>
              </Td>
              <Td>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[13px]">
                    <span className="font-semibold text-text-secondary">Prec:</span>
                    <span className="font-mono font-extrabold text-primary-950">{row.prec}</span>
                  </div>
                  <div className="flex items-center justify-between text-[13px]">
                    <span className="font-semibold text-text-secondary">F1:</span>
                    <span className="font-mono font-extrabold text-ai">{row.f1}</span>
                  </div>
                </div>
              </Td>
              <Td>
                <div className="w-40">
                  <div className="flex items-center justify-between">
                    <Badge tone="ai">AUROC {row.auroc}</Badge>
                    <span className="font-mono text-[12px] font-bold text-primary-800">
                      {Math.round(row.auroc * 100)}%
                    </span>
                  </div>
                  <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-primary-75">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary-600 to-ai"
                      style={{ width: `${row.auroc * 100}%` }}
                    />
                  </div>
                </div>
              </Td>
            </Tr>
          ))}
        </DataTable>
      </Card>

      {/* So sánh model qua các phiên bản */}
      <Card>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="flex items-center gap-2 text-[17px] font-extrabold text-primary-950">
              <GitCompare className="h-5 w-5 text-primary-700" />
              So sánh model
            </h3>
            <p className="text-[13px] font-medium text-text-secondary">
              Tiến trình cải thiện chỉ số AUROC (%) qua các thế hệ ChestXAI
            </p>
          </div>
          <Badge tone="success">v2.1 đạt đỉnh 94.2% (+16.2% so với v1.0)</Badge>
        </div>

        <div className="grid grid-cols-4 items-end gap-5 rounded-2xl border border-primary-100 bg-primary-50/40 px-6 pt-8 pb-5">
          {[
            { ver: "v1.0", score: 78, auroc: "0.780", status: "Archived" },
            { ver: "v1.1", score: 84, auroc: "0.840", status: "Inactive" },
            { ver: "v2.0", score: 90, auroc: "0.901", status: "Baseline" },
            { ver: "v2.1", score: 94, auroc: "0.942", status: "Active Production" },
          ].map((item) => {
            const isCurrent = versionFilter.startsWith(item.ver);
            return (
              <div key={item.ver} className="flex flex-col items-center">
                <span className="mb-2 font-mono text-[14px] font-black text-primary-950">
                  {item.auroc}
                </span>
                <div className="flex h-36 w-full max-w-[120px] items-end rounded-xl bg-white/80 p-1.5 shadow-inner">
                  <div
                    className={`w-full rounded-lg transition-all ${
                      item.ver === "v2.1" || isCurrent
                        ? "bg-gradient-to-t from-primary-700 via-primary-500 to-ai shadow-md"
                        : "bg-primary-300"
                    }`}
                    style={{ height: `${item.score}%` }}
                  />
                </div>
                <p className="mt-3 text-[14px] font-extrabold text-primary-950">
                  {item.ver}
                </p>
                <span className="text-[11px] font-semibold text-text-secondary">
                  {item.status}
                </span>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
