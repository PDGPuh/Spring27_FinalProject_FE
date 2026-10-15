"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  BoxSelect,
  Contrast,
  FlipHorizontal2,
  Hand,
  Maximize2,
  Move,
  Ruler,
  RotateCw,
  Scan,
  ZoomIn,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ChestXrayFrame } from "@/components/viewer/ChestXrayFrame";
import { getCaseImaging } from "@/lib/cxr-images";
import { aiPredictions, getCase, getPatient } from "@/lib/demo-data";

const tools = [
  { id: "zoom", label: "Zoom (Z)", icon: ZoomIn },
  { id: "pan", label: "Pan (P)", icon: Hand },
  { id: "wl", label: "Window/Level (W)", icon: Contrast },
  { id: "invert", label: "Invert (I)", icon: FlipHorizontal2 },
  { id: "rotate", label: "Rotate (R)", icon: RotateCw },
  { id: "length", label: "Length (L)", icon: Ruler },
  { id: "bbox", label: "Bounding Box (B)", icon: BoxSelect },
  { id: "meta", label: "Metadata (M)", icon: Scan },
] as const;

type Tab = "ai" | "xai" | "nhan-dinh" | "bao-cao";

export function RadiologyViewer({ caseId }: { caseId: string }) {
  const caseItem = useMemo(() => getCase(caseId), [caseId]);
  const patient = useMemo(() => getPatient(caseItem.patientId), [caseItem.patientId]);
  const imaging = useMemo(() => getCaseImaging(caseId), [caseId]);
  const [tab, setTab] = useState<Tab>("ai");
  const [activeTool, setActiveTool] = useState("wl");
  const [activeSeriesId, setActiveSeriesId] = useState(imaging.series[0]?.id ?? "pa");
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [opacity, setOpacity] = useState(55);
  const [xaiMethod, setXaiMethod] = useState("Grad-CAM++");
  const [decisions, setDecisions] = useState<Record<string, "accept" | "reject" | "edit" | null>>(
    {},
  );
  const [reason, setReason] = useState("");
  const [leftCollapsed, setLeftCollapsed] = useState(false);

  useEffect(() => {
    setActiveSeriesId(imaging.series[0]?.id ?? "pa");
    setShowHeatmap(false);
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
      <header className="flex h-14 shrink-0 items-center justify-between gap-4 border-b border-viewer-border bg-viewer-panel px-4">
        <div className="flex min-w-0 items-center gap-3">
          <Link
            href="/dashboard/worklist"
            className="inline-flex items-center gap-1.5 rounded-[8px] px-2 py-1.5 text-sm text-viewer-muted hover:bg-white/5 hover:text-viewer-text"
          >
            <ArrowLeft className="h-4 w-4" /> Worklist
          </Link>
          <div className="h-5 w-px bg-viewer-border" />
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="truncate text-sm font-semibold">{patient.name}</p>
              <span className="text-xs text-viewer-muted">{patient.id}</span>
              <Badge tone="neutral" className="bg-white/10 text-viewer-text">
                {caseItem.exam}
              </Badge>
              <span className="text-xs text-viewer-muted">{caseItem.studyDate}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge tone="neutral" className="bg-white/10 text-viewer-text">
            Clinical: {caseItem.clinicalPriority}
          </Badge>
          <Badge
            tone={caseItem.aiPriority === "Critical" ? "critical" : caseItem.aiPriority === "High" ? "warning" : "success"}
          >
            AI Priority: {caseItem.aiPriority}
          </Badge>
          <button
            type="button"
            className="inline-flex h-8 w-8 items-center justify-center rounded-[8px] border border-viewer-border text-viewer-muted hover:text-viewer-text"
            title="Fullscreen"
          >
            <Maximize2 className="h-4 w-4" />
          </button>
          <div className="ml-1 hidden items-center gap-2 rounded-[8px] border border-viewer-border px-2 py-1 sm:flex">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-[10px] font-semibold text-primary">
              NA
            </div>
            <span className="text-xs">BS. Nguyễn Văn A</span>
          </div>
        </div>
      </header>

      <div className="flex h-11 shrink-0 items-center gap-1 border-b border-viewer-border bg-[#08131c] px-3">
        {tools.map((tool) => (
          <button
            key={tool.id}
            type="button"
            title={tool.label}
            onClick={() => setActiveTool(tool.id)}
            className={`inline-flex h-8 w-8 items-center justify-center rounded-[8px] ${
              activeTool === tool.id
                ? "bg-primary/20 text-primary"
                : "text-viewer-muted hover:bg-white/5 hover:text-viewer-text"
            }`}
          >
            <tool.icon className="h-4 w-4" />
          </button>
        ))}
        <div className="mx-2 h-5 w-px bg-viewer-border" />
        <button
          type="button"
          className="rounded-[8px] px-2.5 py-1.5 text-xs text-viewer-muted hover:bg-white/5 hover:text-viewer-text"
        >
          Layout
        </button>
        <button
          type="button"
          className="rounded-[8px] px-2.5 py-1.5 text-xs text-viewer-muted hover:bg-white/5 hover:text-viewer-text"
        >
          Compare
        </button>
        <button
          type="button"
          className="rounded-[8px] px-2.5 py-1.5 text-xs text-viewer-muted hover:bg-white/5 hover:text-viewer-text"
        >
          Reset
        </button>
      </div>

      <div className="flex min-h-0 flex-1">
        <aside
          className={`shrink-0 border-r border-viewer-border bg-viewer-panel transition-all ${
            leftCollapsed ? "w-10" : "w-[220px]"
          }`}
        >
          <div className="flex items-center justify-between border-b border-viewer-border px-3 py-2">
            {!leftCollapsed && (
              <p className="text-xs font-semibold uppercase tracking-wide text-viewer-muted">
                Study / Series
              </p>
            )}
            <button
              type="button"
              onClick={() => setLeftCollapsed((v) => !v)}
              className="text-xs text-viewer-muted hover:text-viewer-text"
            >
              {leftCollapsed ? "»" : "«"}
            </button>
          </div>
          {!leftCollapsed && (
            <div className="space-y-3 p-3">
              <div>
                <p className="mb-2 text-[11px] text-viewer-muted">Current Study</p>
                {imaging.series.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setActiveSeriesId(s.id)}
                    className={`mb-2 w-full rounded-[8px] border bg-[#0f2230] p-2 text-left ${
                      activeSeriesId === s.id
                        ? "border-2 border-primary"
                        : "border border-viewer-border"
                    }`}
                  >
                    <div className="relative mb-2 aspect-[4/3] overflow-hidden rounded bg-black">
                      <Image
                        src={s.src}
                        alt={s.label}
                        fill
                        className="object-contain"
                        sizes="180px"
                      />
                    </div>
                    <p className="text-xs font-medium">{s.label}</p>
                    <p className="text-[11px] text-viewer-muted">1 image · {s.orientation}</p>
                  </button>
                ))}
              </div>
              {imaging.prior && (
                <div>
                  <p className="mb-2 text-[11px] text-viewer-muted">Previous Study</p>
                  <button
                    type="button"
                    onClick={() => setActiveSeriesId("prior")}
                    className={`w-full rounded-[8px] border bg-[#0f2230] p-2 text-left ${
                      activeSeriesId === "prior"
                        ? "border-2 border-primary"
                        : "border border-viewer-border"
                    }`}
                  >
                    <div className="relative mb-2 aspect-[4/3] overflow-hidden rounded bg-black opacity-90">
                      <Image
                        src={imaging.prior}
                        alt="Previous study"
                        fill
                        className="object-contain"
                        sizes="180px"
                      />
                    </div>
                    <p className="text-xs font-medium">10/03/2026</p>
                    <p className="text-[11px] text-viewer-muted">Ngực PA · Bình thường</p>
                  </button>
                </div>
              )}
            </div>
          )}
        </aside>

        <section className="relative min-w-0 flex-1 bg-black">
          <div className="pointer-events-none absolute left-4 top-4 z-10 space-y-1 text-[11px] text-viewer-muted drop-shadow">
            <p>{patient.name}</p>
            <p>{viewingPrior ? "10/03/2026" : caseItem.studyDate}</p>
            <p>Series: {viewportLabel}</p>
            <p>Demo CXR · open license</p>
          </div>
          <div className="pointer-events-none absolute right-4 top-4 z-10 text-sm font-semibold text-viewer-muted">
            R
          </div>
          <div className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-sm font-semibold text-viewer-muted">
            L
          </div>

          <div className="absolute inset-0 flex items-center justify-center p-6">
            <ChestXrayFrame
              src={viewportSrc}
              alt={`X-quang ngực — ${patient.name} (demo mẫu công khai)`}
              showHeatmap={showHeatmap && !viewingPrior}
              opacity={opacity}
              heatmap={imaging.heatmap}
              className="h-full w-full max-w-[860px]"
              sizes="(max-width: 1200px) 60vw, 860px"
              priority
            />
          </div>

          <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex items-end justify-between text-[11px] text-viewer-muted">
            <div>
              <p>W: 1600</p>
              <p>L: 500</p>
              <p>Zoom: 100%</p>
            </div>
            <div className="text-right">
              <p>Tool: {tools.find((t) => t.id === activeTool)?.label}</p>
              <p className="inline-flex items-center gap-1">
                <Move className="h-3 w-3" /> Viewport chính
              </p>
            </div>
          </div>
        </section>

        <aside className="flex w-[360px] shrink-0 flex-col border-l border-viewer-border bg-viewer-panel">
          <div className="flex border-b border-viewer-border">
            {(
              [
                ["ai", "AI"],
                ["xai", "XAI"],
                ["nhan-dinh", "Nhận định"],
                ["bao-cao", "Báo cáo"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setTab(id)}
                className={`flex-1 py-2.5 text-xs font-medium ${
                  tab === id
                    ? "border-b-2 border-primary text-primary"
                    : "text-viewer-muted hover:text-viewer-text"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {tab === "ai" && (
              <div className="space-y-4">
                <div>
                  <h2 className="text-sm font-semibold">Kết quả AI</h2>
                  <p className="mt-1 text-xs text-viewer-muted">
                    ChestXAI v2.1.0 · Inference 1.8s · 16/04/2026 10:33
                  </p>
                </div>
                <div className="space-y-3">
                  {aiPredictions.map((p) => (
                    <div
                      key={p.label}
                      className="rounded-[8px] border border-viewer-border bg-[#101f2c] p-3"
                    >
                      <div className="mb-1.5 flex items-center justify-between text-sm">
                        <span>{p.label}</span>
                        <span className="font-semibold text-ai">{p.confidence}%</span>
                      </div>
                      <div className="mb-1 h-1.5 overflow-hidden rounded-full bg-black/40">
                        <div
                          className="h-full rounded-full bg-ai"
                          style={{ width: `${p.confidence}%` }}
                        />
                      </div>
                      <p className="mb-2 text-[11px] text-viewer-muted">
                        Threshold: {p.threshold}%
                      </p>
                      <div className="grid grid-cols-3 gap-1.5">
                        {(
                          [
                            ["accept", "Đồng ý", "bg-emerald-500/15 text-emerald-300"],
                            ["reject", "Bác bỏ", "bg-red-500/15 text-red-300"],
                            ["edit", "Sửa", "bg-white/5 text-viewer-muted"],
                          ] as const
                        ).map(([key, label, cls]) => (
                          <button
                            key={key}
                            type="button"
                            onClick={() =>
                              setDecisions((d) => ({ ...d, [p.label]: key }))
                            }
                            className={`rounded-[6px] py-1.5 text-[11px] font-medium ${cls} ${
                              decisions[p.label] === key ? "ring-1 ring-primary" : ""
                            }`}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                {(Object.values(decisions).some((d) => d === "reject" || d === "edit") ||
                  reason) && (
                  <label className="block">
                    <span className="mb-1.5 block text-xs text-viewer-muted">
                      Lý do (bắt buộc khi Bác bỏ / Chỉnh sửa)
                    </span>
                    <textarea
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      className="min-h-[72px] w-full rounded-[8px] border border-viewer-border bg-[#101f2c] px-3 py-2 text-sm text-viewer-text outline-none focus:border-primary"
                      placeholder="Nhập lý do lâm sàng..."
                    />
                  </label>
                )}
                <p className="rounded-[8px] border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-[11px] leading-relaxed text-amber-200">
                  Kết quả AI chỉ mang tính hỗ trợ. Bác sĩ quyết định kết luận cuối cùng.
                  Kết quả AI gốc được giữ lại phục vụ Audit.
                </p>
              </div>
            )}

            {tab === "xai" && (
              <div className="space-y-4">
                <div>
                  <h2 className="text-sm font-semibold">Giải thích AI</h2>
                  <p className="mt-1 text-xs text-viewer-muted">
                    Viêm phổi — 84% · Target label
                  </p>
                </div>
                <label className="block text-xs">
                  <span className="mb-1.5 block text-viewer-muted">XAI Method</span>
                  <select
                    value={xaiMethod}
                    onChange={(e) => setXaiMethod(e.target.value)}
                    className="h-9 w-full rounded-[8px] border border-viewer-border bg-[#101f2c] px-3 text-sm"
                  >
                    <option>Grad-CAM</option>
                    <option>Grad-CAM++</option>
                  </select>
                </label>
                <label className="flex items-center justify-between text-sm">
                  <span>Hiển thị Heatmap</span>
                  <input
                    type="checkbox"
                    checked={showHeatmap}
                    onChange={(e) => setShowHeatmap(e.target.checked)}
                    className="h-4 w-4 accent-primary"
                  />
                </label>
                <label className="block text-xs">
                  <span className="mb-1.5 block text-viewer-muted">
                    Opacity: {opacity}%
                  </span>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={opacity}
                    onChange={(e) => setOpacity(Number(e.target.value))}
                    className="w-full accent-primary"
                    disabled={!showHeatmap}
                  />
                </label>
                <div className="grid grid-cols-3 gap-1.5 text-[11px]">
                  {["Original", "Overlay", "Side-by-side"].map((m) => (
                    <button
                      key={m}
                      type="button"
                      className="rounded-[6px] border border-viewer-border bg-[#101f2c] py-2 text-viewer-muted hover:text-viewer-text"
                    >
                      {m}
                    </button>
                  ))}
                </div>
                <div className="rounded-[8px] border border-viewer-border bg-[#101f2c] p-3 text-[11px] text-viewer-muted space-y-1">
                  <p>Model: ChestXAI</p>
                  <p>Version: v2.1.0</p>
                  <p>XAI Method: {xaiMethod}</p>
                  <p>Confidence: 84% · Threshold: 70%</p>
                </div>
                <p className="rounded-[8px] border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-[11px] leading-relaxed text-amber-200">
                  Heatmap thể hiện vùng ảnh ảnh hưởng đến dự đoán của mô hình và không
                  phải vùng tổn thương đã được xác nhận.
                </p>
              </div>
            )}

            {tab === "nhan-dinh" && (
              <div className="space-y-4">
                <h2 className="text-sm font-semibold">Annotation</h2>
                <div className="flex flex-wrap gap-1.5">
                  {["Bounding Box", "Point", "Freehand", "Length"].map((t) => (
                    <button
                      key={t}
                      type="button"
                      className="rounded-[6px] border border-viewer-border px-2.5 py-1.5 text-[11px] text-viewer-muted hover:text-viewer-text"
                    >
                      {t}
                    </button>
                  ))}
                </div>
                <div className="rounded-[8px] border border-viewer-border bg-[#101f2c] p-3 space-y-2">
                  <p className="text-xs font-medium">Annotation #01</p>
                  <p className="text-sm">Viêm phổi</p>
                  <p className="text-[11px] text-viewer-muted">
                    Expert Reference · BS. Nguyễn Văn A · 11:04
                  </p>
                  <div className="flex gap-2 pt-1">
                    <button type="button" className="text-[11px] text-primary">
                      Sửa
                    </button>
                    <button type="button" className="text-[11px] text-critical">
                      Xóa
                    </button>
                  </div>
                </div>
                <p className="text-[11px] text-viewer-muted">
                  Reference Annotation đã dùng cho Research Dataset không được ghi đè trực tiếp.
                </p>
              </div>
            )}

            {tab === "bao-cao" && (
              <div className="space-y-4">
                <h2 className="text-sm font-semibold">Báo cáo chẩn đoán</h2>
                <p className="text-[11px] text-viewer-muted">
                  AI Result chỉ để tham khảo — không tự điền vào kết luận.
                </p>
                <label className="block text-xs">
                  <span className="mb-1 block text-viewer-muted">Kỹ thuật</span>
                  <textarea
                    defaultValue="X-quang ngực thẳng (PA), kỹ thuật đạt yêu cầu."
                    className="min-h-[56px] w-full rounded-[8px] border border-viewer-border bg-[#101f2c] px-3 py-2 text-sm"
                  />
                </label>
                <label className="block text-xs">
                  <span className="mb-1 block text-viewer-muted">Findings</span>
                  <textarea
                    defaultValue="Thâm nhiễm thùy dưới phổi trái. Không thấy tràn khí màng phổi rõ."
                    className="min-h-[80px] w-full rounded-[8px] border border-viewer-border bg-[#101f2c] px-3 py-2 text-sm"
                  />
                </label>
                <label className="block text-xs">
                  <span className="mb-1 block text-viewer-muted">Impression / Kết luận</span>
                  <textarea
                    defaultValue="Gợi ý viêm phổi thùy dưới trái. Đề nghị đối chiếu lâm sàng."
                    className="min-h-[80px] w-full rounded-[8px] border border-viewer-border bg-[#101f2c] px-3 py-2 text-sm"
                  />
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <Button size="sm" variant="secondary" className="bg-transparent text-viewer-text border-viewer-border">
                    Lưu nháp
                  </Button>
                  <Button size="sm" variant="secondary" className="bg-transparent text-viewer-text border-viewer-border">
                    PDF
                  </Button>
                  <Button size="sm">Xác nhận</Button>
                </div>
                <p className="text-[11px] text-viewer-muted">
                  Status: DRAFT · Report v1 · BS. Nguyễn Văn A
                </p>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
