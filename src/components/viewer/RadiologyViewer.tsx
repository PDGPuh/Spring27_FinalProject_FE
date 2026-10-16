"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  BoxSelect,
  CheckCircle2,
  Columns2,
  Contrast,
  Edit3,
  Flame,
  FlipHorizontal2,
  Hand,
  Maximize2,
  Move,
  RotateCcw,
  RotateCw,
  Ruler,
  Scan,
  ShieldCheck,
  Sparkles,
  XCircle,
  ZoomIn,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ChestXrayFrame } from "@/components/viewer/ChestXrayFrame";
import { getCaseImaging } from "@/lib/cxr-images";
import { aiPredictions, getCase, getPatient } from "@/lib/demo-data";

const tools = [
  { id: "zoom", short: "Zoom", key: "Z", icon: ZoomIn },
  { id: "pan", short: "Pan", key: "P", icon: Hand },
  { id: "wl", short: "W/L", key: "W", icon: Contrast },
  { id: "invert", short: "Invert", key: "I", icon: FlipHorizontal2 },
  { id: "rotate", short: "Rotate", key: "R", icon: RotateCw },
  { id: "length", short: "Ruler", key: "L", icon: Ruler },
  { id: "bbox", short: "BBox", key: "B", icon: BoxSelect },
  { id: "meta", short: "DICOM", key: "M", icon: Scan },
] as const;

type Tab = "ai" | "xai" | "nhan-dinh" | "bao-cao";

export function RadiologyViewer({ caseId }: { caseId: string }) {
  const caseItem = useMemo(() => getCase(caseId), [caseId]);
  const patient = useMemo(() => getPatient(caseItem.patientId), [caseItem.patientId]);
  const imaging = useMemo(() => getCaseImaging(caseId), [caseId]);
  const [tab, setTab] = useState<Tab>("ai");
  const [activeTool, setActiveTool] = useState("wl");
  const [activeSeriesId, setActiveSeriesId] = useState(imaging.series[0]?.id ?? "pa");
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [opacity, setOpacity] = useState(55);
  const [xaiMethod, setXaiMethod] = useState("Grad-CAM++");
  const [comparePrior, setComparePrior] = useState(false);
  const [decisions, setDecisions] = useState<Record<string, "accept" | "reject" | "edit" | null>>(
    { "Viêm phổi": "accept" },
  );
  const [reason, setReason] = useState("");
  const [leftCollapsed, setLeftCollapsed] = useState(false);

  useEffect(() => {
    setActiveSeriesId(imaging.series[0]?.id ?? "pa");
    setShowHeatmap(true);
    setComparePrior(false);
  }, [caseId, imaging.series]);

  const activeSeries =
    imaging.series.find((s) => s.id === activeSeriesId) ?? imaging.series[0];
  const viewingPrior = activeSeriesId === "prior" && Boolean(imaging.prior);
  const viewportSrc = viewingPrior
    ? (imaging.prior as string)
    : (activeSeries?.src ?? imaging.primary);
  const viewportLabel = viewingPrior
    ? "Previous · Ngực PA"
    : (activeSeries?.label ?? "Chest PA");

  return (
    <div className="flex h-screen flex-col bg-viewer-bg text-viewer-text">
      {/* Top Patient & Study Diagnostic Bar */}
      <header className="flex h-15 shrink-0 items-center justify-between gap-4 border-b border-viewer-border bg-viewer-panel px-4">
        <div className="flex min-w-0 items-center gap-3">
          <Link
            href="/dashboard/worklist"
            className="inline-flex items-center gap-1.5 rounded-lg border border-viewer-border bg-[#10202e] px-3 py-1.5 text-xs font-bold text-viewer-text transition-colors hover:border-primary-400 hover:bg-primary-600/20"
          >
            <ArrowLeft className="size-4" /> Worklist
          </Link>
          <div className="h-5 w-px bg-viewer-border" />
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="truncate text-[15px] font-extrabold text-white">
                {patient.name}
              </p>
              <span className="rounded bg-white/10 px-2 py-0.5 font-mono text-xs font-bold text-primary-200">
                {patient.id}
              </span>
              <span className="text-xs text-viewer-muted">
                {patient.age}T · {patient.gender}
              </span>
              <Badge tone="neutral" className="bg-primary-600/30 text-primary-100">
                {caseItem.exam}
              </Badge>
              <span className="font-mono text-xs text-viewer-muted tabular-nums">
                {caseItem.studyDate}
              </span>
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2.5">
          <Badge tone="neutral" className="bg-white/10 text-viewer-text">
            Clinical: {caseItem.clinicalPriority}
          </Badge>
          <Badge
            tone={
              caseItem.aiPriority === "Critical"
                ? "critical"
                : caseItem.aiPriority === "High"
                  ? "warning"
                  : "success"
            }
          >
            AI Priority: {caseItem.aiPriority}
          </Badge>
          <button
            type="button"
            className="inline-flex size-9 items-center justify-center rounded-lg border border-viewer-border bg-[#10202e] text-viewer-muted transition-colors hover:border-primary-400 hover:text-white"
            title="Toàn màn hình"
          >
            <Maximize2 className="size-4" />
          </button>
          <div className="ml-1 hidden items-center gap-2 rounded-lg border border-viewer-border bg-[#10202e] px-3 py-1.5 sm:flex">
            <div className="flex size-6 items-center justify-center rounded-full bg-primary-600 text-[10px] font-extrabold text-white">
              NA
            </div>
            <span className="text-xs font-bold text-white">BS. Nguyễn Văn A</span>
          </div>
        </div>
      </header>

      {/* Precision DICOM & XAI Toolbar */}
      <div className="flex h-12 shrink-0 items-center justify-between gap-2 overflow-x-auto border-b border-viewer-border bg-[#07111a] px-4">
        <div className="flex items-center gap-1.5">
          {tools.map((tool) => (
            <button
              key={tool.id}
              type="button"
              title={`${tool.short} (${tool.key})`}
              onClick={() => setActiveTool(tool.id)}
              className={`inline-flex h-8.5 items-center gap-1.5 rounded-lg px-2.5 text-xs font-semibold transition-all ${
                activeTool === tool.id
                  ? "border border-primary-400/60 bg-primary-600 text-white shadow-xs"
                  : "border border-transparent text-viewer-muted hover:bg-white/8 hover:text-white"
              }`}
            >
              <tool.icon className="size-3.5" />
              <span>{tool.short}</span>
              <span className="font-mono text-[10px] opacity-70">{tool.key}</span>
            </button>
          ))}

          <div className="mx-1.5 h-5 w-px bg-viewer-border" />

          {imaging.prior && (
            <button
              type="button"
              onClick={() => setComparePrior((v) => !v)}
              className={`inline-flex h-8.5 items-center gap-1.5 rounded-lg border px-3 text-xs font-bold transition-colors ${
                comparePrior
                  ? "border-primary-400 bg-primary-600/30 text-primary-100"
                  : "border-viewer-border bg-[#10202e] text-viewer-muted hover:text-white"
              }`}
            >
              <Columns2 className="size-3.5" />
              So sánh phim cũ (Prior)
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              setActiveTool("wl");
              setComparePrior(false);
              setOpacity(55);
            }}
            className="inline-flex h-8.5 items-center gap-1 rounded-lg px-2.5 text-xs font-medium text-viewer-muted hover:bg-white/8 hover:text-white"
          >
            <RotateCcw className="size-3.5" /> Reset
          </button>
        </div>

        {/* Quick XAI Heatmap Pill */}
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => setShowHeatmap((v) => !v)}
            className={`inline-flex h-8.5 items-center gap-2 rounded-lg border px-3 text-xs font-bold transition-all ${
              showHeatmap
                ? "border-red-400/50 bg-gradient-to-r from-red-600/30 via-amber-500/25 to-primary-600/30 text-white"
                : "border-viewer-border bg-[#10202e] text-viewer-muted hover:text-white"
            }`}
          >
            <Flame className={`size-3.5 ${showHeatmap ? "text-amber-400" : ""}`} />
            <span>
              XAI Heatmap: {showHeatmap ? `ON (${opacity}%)` : "OFF"} · {xaiMethod}
            </span>
          </button>
        </div>
      </div>

      {/* Main 3-Pane Workstation */}
      <div className="flex min-h-0 flex-1">
        {/* Left Series & Prior Rail */}
        <aside
          className={`shrink-0 border-r border-viewer-border bg-viewer-panel transition-all ${
            leftCollapsed ? "w-11" : "w-[228px]"
          }`}
        >
          <div className="flex items-center justify-between border-b border-viewer-border px-3 py-2.5">
            {!leftCollapsed && (
              <p className="text-xs font-extrabold uppercase tracking-[0.05em] text-primary-200">
                Study / Series
              </p>
            )}
            <button
              type="button"
              onClick={() => setLeftCollapsed((v) => !v)}
              className="rounded px-1.5 py-0.5 text-xs font-bold text-viewer-muted hover:bg-white/10 hover:text-white"
            >
              {leftCollapsed ? "»" : "«"}
            </button>
          </div>
          {!leftCollapsed && (
            <div className="space-y-4 overflow-y-auto p-3">
              <div>
                <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.04em] text-viewer-muted">
                  Current Study ({caseItem.studyDate.split(" ")[0]})
                </p>
                {imaging.series.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => {
                      setActiveSeriesId(s.id);
                      setComparePrior(false);
                    }}
                    className={`mb-2.5 w-full rounded-xl border bg-[#0d1d2a] p-2.5 text-left transition-all ${
                      activeSeriesId === s.id && !comparePrior
                        ? "border-2 border-primary-400 shadow-sm"
                        : "border border-viewer-border hover:border-primary-500/50"
                    }`}
                  >
                    <div className="relative mb-2 aspect-[4/3] overflow-hidden rounded-lg bg-black">
                      <Image
                        src={s.src}
                        alt={s.label}
                        fill
                        className="object-contain"
                        sizes="180px"
                      />
                    </div>
                    <p className="text-xs font-bold text-white">{s.label}</p>
                    <p className="text-[11px] text-viewer-muted">
                      1 instance · {s.orientation}
                    </p>
                  </button>
                ))}
              </div>

              {imaging.prior && (
                <div>
                  <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.04em] text-viewer-muted">
                    Phim cũ đối chiếu (Prior)
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveSeriesId("prior")}
                    className={`w-full rounded-xl border bg-[#0d1d2a] p-2.5 text-left transition-all ${
                      activeSeriesId === "prior"
                        ? "border-2 border-primary-400 shadow-sm"
                        : "border border-viewer-border hover:border-primary-500/50"
                    }`}
                  >
                    <div className="relative mb-2 aspect-[4/3] overflow-hidden rounded-lg bg-black opacity-90">
                      <Image
                        src={imaging.prior}
                        alt="Previous study"
                        fill
                        className="object-contain"
                        sizes="180px"
                      />
                    </div>
                    <p className="text-xs font-bold text-white">10/03/2026</p>
                    <p className="text-[11px] text-emerald-400">
                      Ngực PA · Đã ký: Bình thường
                    </p>
                  </button>
                </div>
              )}
            </div>
          )}
        </aside>

        {/* Center Diagnostic Viewport (Supports Single or Side-by-Side Prior Compare) */}
        <section className="relative min-w-0 flex-1 bg-black">
          {/* High-Contrast Top-Left DICOM HUD Pill */}
          <div className="pointer-events-none absolute left-4 top-4 z-10 rounded-xl border border-white/12 bg-black/75 px-3.5 py-2.5 font-mono text-[11.5px] leading-relaxed text-white backdrop-blur-xs">
            <p className="font-bold text-primary-200">
              {patient.name} · {patient.id}
            </p>
            <p className="text-white/85">
              Study: {viewingPrior ? "10/03/2026" : caseItem.studyDate}
            </p>
            <p className="text-white/85">Series: {viewportLabel}</p>
            <p className="text-[10.5px] text-emerald-300">
              AI: {caseItem.aiFinding} ({caseItem.aiConfidence}%)
            </p>
          </div>

          {/* Orientation Markers */}
          <div className="pointer-events-none absolute right-4 top-4 z-10 flex size-8 items-center justify-center rounded-lg border border-white/15 bg-black/70 font-mono text-sm font-extrabold text-primary-200">
            R
          </div>
          <div className="pointer-events-none absolute left-4 top-1/2 z-10 flex size-8 -translate-y-1/2 items-center justify-center rounded-lg border border-white/15 bg-black/70 font-mono text-sm font-extrabold text-primary-200">
            L
          </div>

          {comparePrior && imaging.prior ? (
            <div className="grid h-full w-full grid-cols-2 divide-x divide-viewer-border p-6">
              <div className="relative flex flex-col items-center justify-center pr-3">
                <span className="mb-2 rounded-md bg-primary-600/80 px-2.5 py-1 text-xs font-bold text-white">
                  HIỆN TẠI · {caseItem.studyDate}
                </span>
                <ChestXrayFrame
                  src={imaging.primary}
                  alt={`X-quang hiện tại — ${patient.name}`}
                  showHeatmap={showHeatmap}
                  opacity={opacity}
                  heatmap={imaging.heatmap}
                  className="h-full w-full"
                  sizes="45vw"
                  priority
                />
              </div>
              <div className="relative flex flex-col items-center justify-center pl-3">
                <span className="mb-2 rounded-md bg-white/15 px-2.5 py-1 text-xs font-bold text-white">
                  PHIM CŨ (PRIOR) · 10/03/2026
                </span>
                <ChestXrayFrame
                  src={imaging.prior}
                  alt={`X-quang cũ — ${patient.name}`}
                  showHeatmap={false}
                  className="h-full w-full"
                  sizes="45vw"
                />
              </div>
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center p-6">
              <ChestXrayFrame
                src={viewportSrc}
                alt={`X-quang ngực — ${patient.name}`}
                showHeatmap={showHeatmap && !viewingPrior}
                opacity={opacity}
                heatmap={imaging.heatmap}
                className="h-full w-full max-w-[860px]"
                sizes="(max-width: 1200px) 60vw, 860px"
                priority
              />
            </div>
          )}

          {/* High-Contrast Bottom DICOM HUD Strip */}
          <div className="pointer-events-none absolute bottom-4 left-4 right-4 z-10 flex items-end justify-between">
            <div className="rounded-xl border border-white/12 bg-black/75 px-3.5 py-2 font-mono text-[11px] text-white/90 backdrop-blur-xs">
              <p>WW: 1600 · WL: 500</p>
              <p>Zoom: 100% · 14-bit DX</p>
            </div>
            <div className="rounded-xl border border-white/12 bg-black/75 px-3.5 py-2 text-right font-mono text-[11px] text-white/90 backdrop-blur-xs">
              <p className="text-primary-200 font-bold">
                 Công cụ: {tools.find((t) => t.id === activeTool)?.short}
              </p>
              <p className="inline-flex items-center gap-1 text-white/75">
                <Move className="size-3" /> Trạm đọc phim PACS
              </p>
            </div>
          </div>
        </section>

        {/* Right Clinical Decision & Reporting Panel */}
        <aside className="flex w-[380px] shrink-0 flex-col border-l border-viewer-border bg-viewer-panel">
          <div className="grid grid-cols-4 border-b border-viewer-border bg-[#07111a] p-1.5 gap-1">
            {(
              [
                ["ai", "AI Findings"],
                ["xai", "XAI"],
                ["nhan-dinh", "Nhận định"],
                ["bao-cao", "Báo cáo"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setTab(id)}
                className={`rounded-lg py-2 text-xs font-bold transition-all ${
                  tab === id
                    ? "bg-primary-600 text-white shadow-xs"
                    : "text-viewer-muted hover:bg-white/8 hover:text-white"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {tab === "ai" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-viewer-border pb-3">
                  <div>
                    <h2 className="flex items-center gap-1.5 text-sm font-extrabold text-white">
                      <Sparkles className="size-4 text-primary-300" /> Kết quả phân tích AI
                    </h2>
                    <p className="mt-0.5 text-xs text-viewer-muted">
                      ChestXAI v2.1.0 · Inference 1.8s · 16/04/2026
                    </p>
                  </div>
                  <Badge tone="primary">Human-in-the-Loop</Badge>
                </div>

                <div className="space-y-3">
                  {aiPredictions.map((p) => {
                    const currentDecision = decisions[p.label];
                    return (
                      <div
                        key={p.label}
                        className="rounded-xl border border-viewer-border bg-[#10202e] p-3.5"
                      >
                        <div className="mb-1.5 flex items-center justify-between text-sm">
                          <span className="font-bold text-white">{p.label}</span>
                          <span className="font-mono font-extrabold text-primary-200 tabular-nums">
                            {p.confidence}%
                          </span>
                        </div>
                        <div className="mb-2 h-2 overflow-hidden rounded-full bg-black/50">
                          <div
                            className={`h-full rounded-full ${
                              p.confidence >= 70
                                ? "bg-red-500"
                                : p.confidence >= 40
                                  ? "bg-amber-500"
                                  : "bg-primary-400"
                            }`}
                            style={{ width: `${p.confidence}%` }}
                          />
                        </div>
                        <p className="mb-2.5 text-[11px] text-viewer-muted">
                          Ngưỡng cảnh báo (Threshold): {p.threshold}%
                        </p>
                        <div className="grid grid-cols-3 gap-1.5">
                          <button
                            type="button"
                            onClick={() =>
                              setDecisions((d) => ({ ...d, [p.label]: "accept" }))
                            }
                            className={`inline-flex items-center justify-center gap-1 rounded-lg py-1.5 text-xs font-bold transition-all ${
                              currentDecision === "accept"
                                ? "bg-emerald-600 text-white ring-2 ring-emerald-400"
                                : "bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25"
                            }`}
                          >
                            <CheckCircle2 className="size-3.5" /> Đồng ý
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setDecisions((d) => ({ ...d, [p.label]: "edit" }))
                            }
                            className={`inline-flex items-center justify-center gap-1 rounded-lg py-1.5 text-xs font-bold transition-all ${
                              currentDecision === "edit"
                                ? "bg-primary-600 text-white ring-2 ring-primary-300"
                                : "bg-white/8 text-viewer-text hover:bg-white/15"
                            }`}
                          >
                            <Edit3 className="size-3.5" /> Sửa
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setDecisions((d) => ({ ...d, [p.label]: "reject" }))
                            }
                            className={`inline-flex items-center justify-center gap-1 rounded-lg py-1.5 text-xs font-bold transition-all ${
                              currentDecision === "reject"
                                ? "bg-red-600 text-white ring-2 ring-red-400"
                                : "bg-red-500/15 text-red-300 hover:bg-red-500/25"
                            }`}
                          >
                            <XCircle className="size-3.5" /> Bác bỏ
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {(Object.values(decisions).some((d) => d === "reject" || d === "edit") ||
                  reason) && (
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-bold text-amber-300">
                      Lý do chuyên môn (bắt buộc khi Bác bỏ / Chỉnh sửa)
                    </span>
                    <textarea
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      className="min-h-[76px] w-full rounded-xl border border-viewer-border bg-[#10202e] px-3 py-2 text-sm text-white outline-none focus:border-primary-400"
                      placeholder="Nhập lý do lâm sàng để lưu Audit Trail..."
                    />
                  </label>
                )}

                <p className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-3.5 py-2.5 text-xs leading-relaxed text-amber-200">
                  Kết quả AI chỉ mang tính hỗ trợ. Bác sĩ quyết định kết luận cuối cùng.
                  Kết quả AI gốc được giữ lại phục vụ Audit.
                </p>
              </div>
            )}

            {tab === "xai" && (
              <div className="space-y-4">
                <div className="border-b border-viewer-border pb-3">
                  <h2 className="text-sm font-extrabold text-white">
                    Giải thích AI (Explainable AI)
                  </h2>
                  <p className="mt-0.5 text-xs text-primary-200">
                    Target: {caseItem.aiFinding} — {caseItem.aiConfidence}%
                  </p>
                </div>

                <label className="block text-xs">
                  <span className="mb-1.5 block font-bold text-viewer-text">
                    Phương pháp XAI (Method)
                  </span>
                  <select
                    value={xaiMethod}
                    onChange={(e) => setXaiMethod(e.target.value)}
                    className="h-10 w-full rounded-xl border border-viewer-border bg-[#10202e] px-3 text-sm font-semibold text-white outline-none focus:border-primary-400"
                  >
                    <option>Grad-CAM++</option>
                    <option>Grad-CAM</option>
                    <option>Eigen-CAM</option>
                    <option>Attention Rollout</option>
                  </select>
                </label>

                <label className="flex cursor-pointer items-center justify-between rounded-xl border border-viewer-border bg-[#10202e] px-3.5 py-3 text-sm font-semibold text-white">
                  <span>Hiển thị bản đồ nhiệt (Heatmap)</span>
                  <input
                    type="checkbox"
                    checked={showHeatmap}
                    onChange={(e) => setShowHeatmap(e.target.checked)}
                    className="size-4 accent-primary-500"
                  />
                </label>

                <label className="block rounded-xl border border-viewer-border bg-[#10202e] p-3.5 text-xs">
                  <div className="mb-2 flex justify-between font-bold text-white">
                    <span>Độ đậm vùng nhiệt (Opacity)</span>
                    <span className="font-mono text-primary-200">{opacity}%</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={opacity}
                    onChange={(e) => setOpacity(Number(e.target.value))}
                    className="w-full accent-primary-500"
                    disabled={!showHeatmap}
                  />
                </label>

                <div className="grid grid-cols-3 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      setShowHeatmap(false);
                      setComparePrior(false);
                    }}
                    className={`rounded-xl border py-2.5 font-bold ${
                      !showHeatmap && !comparePrior
                        ? "border-primary-400 bg-primary-600 text-white"
                        : "border-viewer-border bg-[#10202e] text-viewer-muted hover:text-white"
                    }`}
                  >
                    Original
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowHeatmap(true);
                      setComparePrior(false);
                    }}
                    className={`rounded-xl border py-2.5 font-bold ${
                      showHeatmap && !comparePrior
                        ? "border-primary-400 bg-primary-600 text-white"
                        : "border-viewer-border bg-[#10202e] text-viewer-muted hover:text-white"
                    }`}
                  >
                    Overlay
                  </button>
                  <button
                    type="button"
                    onClick={() => setComparePrior((v) => !v)}
                    className={`rounded-xl border py-2.5 font-bold ${
                      comparePrior
                        ? "border-primary-400 bg-primary-600 text-white"
                        : "border-viewer-border bg-[#10202e] text-viewer-muted hover:text-white"
                    }`}
                  >
                    Side-by-side
                  </button>
                </div>

                <div className="space-y-1.5 rounded-xl border border-viewer-border bg-[#10202e] p-3.5 text-xs text-viewer-muted">
                  <p>
                    Model: <strong className="text-white">ChestXAI v2.1.0</strong>
                  </p>
                  <p>
                    XAI Method: <strong className="text-primary-200">{xaiMethod}</strong>
                  </p>
                  <p>
                    Confidence: <strong className="text-white">{caseItem.aiConfidence}%</strong> ·
                    Threshold: 70%
                  </p>
                </div>

                <p className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-3.5 py-2.5 text-xs leading-relaxed text-amber-200">
                  Heatmap thể hiện vùng ảnh ảnh hưởng đến dự đoán của mô hình và không
                  phải vùng tổn thương đã được xác nhận.
                </p>
              </div>
            )}

            {tab === "nhan-dinh" && (
              <div className="space-y-4">
                <h2 className="text-sm font-extrabold text-white">
                  Khoanh vùng & Nhận định (Annotation)
                </h2>
                <div className="grid grid-cols-2 gap-2">
                  {["Bounding Box", "Point", "Freehand", "Length"].map((t) => (
                    <button
                      key={t}
                      type="button"
                      className="rounded-xl border border-viewer-border bg-[#10202e] px-3 py-2 text-xs font-semibold text-viewer-text hover:border-primary-400 hover:text-white"
                    >
                      {t}
                    </button>
                  ))}
                </div>
                <div className="space-y-2 rounded-xl border border-viewer-border bg-[#10202e] p-4">
                  <div className="flex items-center justify-between">
                    <p className="font-mono text-xs font-bold text-primary-200">
                      Annotation #01
                    </p>
                    <Badge tone="primary">Expert ROI</Badge>
                  </div>
                  <p className="text-sm font-bold text-white">{caseItem.aiFinding}</p>
                  <p className="text-xs text-viewer-muted">
                    Expert Reference · BS. Nguyễn Văn A · 11:04
                  </p>
                  <div className="flex gap-3 pt-2 text-xs font-bold">
                    <button type="button" className="text-primary-300 hover:underline">
                      Chỉnh sửa ROI
                    </button>
                    <button type="button" className="text-red-400 hover:underline">
                      Xóa
                    </button>
                  </div>
                </div>
                <p className="text-xs leading-relaxed text-viewer-muted">
                  Reference Annotation đã dùng cho Research Dataset không được ghi đè trực tiếp.
                </p>
              </div>
            )}

            {tab === "bao-cao" && (
              <div className="space-y-4">
                <div>
                  <h2 className="text-sm font-extrabold text-white">
                    Báo cáo chẩn đoán & Ký số
                  </h2>
                  <p className="mt-0.5 text-xs text-viewer-muted">
                    AI Result chỉ để tham khảo — không tự điền vào kết luận.
                  </p>
                </div>
                <label className="block text-xs">
                  <span className="mb-1.5 block font-bold text-viewer-text">
                    Kỹ thuật (Technique)
                  </span>
                  <textarea
                    defaultValue="X-quang ngực thẳng (PA), kỹ thuật đạt yêu cầu."
                    className="min-h-[60px] w-full rounded-xl border border-viewer-border bg-[#10202e] px-3 py-2 text-sm text-white outline-none focus:border-primary-400"
                  />
                </label>
                <label className="block text-xs">
                  <span className="mb-1.5 block font-bold text-viewer-text">
                    Mô tả tổn thương (Findings)
                  </span>
                  <textarea
                    defaultValue="Thâm nhiễm thùy dưới phổi trái. Không thấy tràn khí màng phổi rõ."
                    className="min-h-[88px] w-full rounded-xl border border-viewer-border bg-[#10202e] px-3 py-2 text-sm text-white outline-none focus:border-primary-400"
                  />
                </label>
                <label className="block text-xs">
                  <span className="mb-1.5 block font-bold text-viewer-text">
                    Impression / Kết luận
                  </span>
                  <textarea
                    defaultValue="Gợi ý viêm phổi thùy dưới trái. Đề nghị đối chiếu lâm sàng."
                    className="min-h-[84px] w-full rounded-xl border border-viewer-border bg-[#10202e] px-3 py-2 text-sm font-semibold text-white outline-none focus:border-primary-400"
                  />
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="border-viewer-border bg-[#10202e] text-white hover:bg-white/10"
                  >
                    Lưu nháp
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="border-viewer-border bg-[#10202e] text-white hover:bg-white/10"
                  >
                    Xuất PDF
                  </Button>
                  <Button href="/dashboard/bao-cao" size="sm">
                    <ShieldCheck className="size-3.5" /> Ký số
                  </Button>
                </div>
                <p className="text-xs text-viewer-muted">
                  Status: <strong className="text-amber-300">DRAFT</strong> · Report v1 ·
                  BS. Nguyễn Văn A
                </p>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
