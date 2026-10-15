"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Clock3,
  Layers3,
  RefreshCw,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useDemoRole } from "@/components/app-shell/useDemoRole";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import {
  DonutChart,
  FacilityUtilization,
  HorizontalBars,
  HourlyStackedChart,
  QueueFunnel,
  Sparkline,
  TatTrendChart,
  WeeklyVolumeChart,
} from "@/components/dashboard/charts";
import { getCaseThumbnail } from "@/lib/cxr-images";
import {
  aiDoctorAgreement,
  facilityBars,
  hourlyCasesChart,
  kpiSparks,
  machineUtilization,
  pathologyMix,
  queueFlow,
  researchMetricsSpark,
  tatTrend,
  weeklyVolume,
  worklistStatusMix,
} from "@/lib/dashboard-charts";
import {
  attentionCases,
  imagingOrders,
  kpis,
  queueItems,
  recentActivity,
  roleKpis,
  worklistCases,
  worklistPreview,
} from "@/lib/demo-data";

const iconMap = {
  cases: Layers3,
  wait: Clock3,
  priority: AlertTriangle,
  done: CheckCircle2,
  time: Clock3,
};

const sparkColor: Record<string, string> = {
  wait: "#F59E0B",
  priority: "#DC2626",
  cases: "#0891B2",
  done: "#16A34A",
  time: "#0E7490",
};

export function DashboardView() {
  const { role } = useDemoRole();
  const cards = roleKpis[role.id] ?? kpis;
  const criticalCount = worklistCases.filter((c) => c.aiPriority === "Critical").length;
  const waitingCount = worklistCases.filter((c) => c.status === "Chờ đọc").length;

  const quickLinks =
    role.id === "cdha"
      ? [
          { href: "/dashboard/worklist", label: "Mở Worklist" },
          { href: "/viewer/XR20261011-001", label: "Ca Critical" },
          { href: "/dashboard/bao-cao", label: "Báo cáo" },
        ]
      : role.id === "chidinh"
        ? [
            { href: "/dashboard/benh-nhan", label: "Bệnh nhân" },
            { href: "/dashboard/chi-dinh", label: "Tạo chỉ định" },
            { href: "/dashboard/bao-cao", label: "Báo cáo đã ký" },
          ]
        : role.id === "ktv"
          ? [
              { href: "/dashboard/hang-doi", label: "Hàng đợi" },
              { href: "/dashboard/studies/upload", label: "Upload DICOM" },
              { href: "/dashboard/studies", label: "Studies" },
            ]
          : role.id === "tiepdon"
            ? [
                { href: "/dashboard/benh-nhan/them", label: "Thêm BN" },
                { href: "/dashboard/dat-lich", label: "Đặt lịch" },
                { href: "/dashboard/hang-doi", label: "Check-in" },
              ]
            : role.id === "researcher"
              ? [
                  { href: "/dashboard/dataset", label: "Dataset" },
                  { href: "/dashboard/danh-gia-ai", label: "Đánh giá AI" },
                  { href: "/dashboard/mo-hinh", label: "Models" },
                ]
              : role.id === "facility"
                ? [
                    { href: "/dashboard/co-so", label: "Cơ sở" },
                    { href: "/dashboard/nguoi-dung", label: "Nhân sự" },
                    { href: "/dashboard/nhat-ky", label: "Audit" },
                  ]
                : [
                    { href: "/dashboard/nguoi-dung", label: "RBAC" },
                    { href: "/dashboard/cai-dat", label: "Cài đặt" },
                    { href: "/dashboard/tich-hop", label: "Tích hợp" },
                  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="mb-1 flex flex-wrap items-center gap-2">
            <Badge tone="primary">{role.label}</Badge>
            <span className="text-xs text-text-secondary">
              Cập nhật realtime demo · 16/04/2026
            </span>
          </div>
          <h1 className="text-[28px] font-semibold tracking-tight">
            Tổng quan · {role.name}
          </h1>
          <p className="mt-1 max-w-2xl text-sm text-text-secondary">{role.description}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {quickLinks.map((l) => (
            <Button key={l.href} href={l.href} size="sm" variant="secondary">
              {l.label}
            </Button>
          ))}
          <select className="h-9 rounded-[8px] border border-border bg-card px-3 text-sm outline-none">
            <option>Hôm nay</option>
            <option>7 ngày qua</option>
            <option>30 ngày qua</option>
          </select>
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-[8px] border border-border text-text-secondary hover:bg-card"
            aria-label="Làm mới"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Alert strip */}
      {(role.id === "cdha" || role.id === "admin" || role.id === "facility") && (
        <div className="grid gap-3 md:grid-cols-3">
          <Link
            href="/dashboard/worklist"
            className="card-lift flex items-center gap-3 rounded-[12px] border border-red-100 bg-red-50/70 px-4 py-3"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-critical/10 text-critical">
              <AlertTriangle className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-critical">AI Critical cần đọc ngay</p>
              <p className="text-xl font-semibold tabular-nums">{criticalCount} ca</p>
            </div>
            <ArrowRight className="h-4 w-4 text-critical/70" />
          </Link>
          <Link
            href="/dashboard/worklist"
            className="card-lift flex items-center gap-3 rounded-[12px] border border-amber-100 bg-amber-50/60 px-4 py-3"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-warning/15 text-amber-700">
              <Clock3 className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-amber-800">Chờ đọc</p>
              <p className="text-xl font-semibold tabular-nums">{waitingCount} ca</p>
            </div>
            <ArrowRight className="h-4 w-4 text-amber-700/70" />
          </Link>
          <div className="flex items-center gap-3 rounded-[12px] border border-primary/20 bg-primary-soft/60 px-4 py-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-primary/15 text-primary">
              <Activity className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs text-primary-dark">AI–Bác sĩ đồng thuận</p>
              <p className="text-xl font-semibold tabular-nums">92%</p>
            </div>
          </div>
        </div>
      )}

      {/* KPI cards with sparklines */}
      <Stagger className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {cards.map((kpi) => {
          const Icon = iconMap[kpi.icon];
          const Trend = kpi.up ? TrendingUp : TrendingDown;
          const spark = kpiSparks[kpi.icon] ?? kpiSparks.cases;
          return (
            <StaggerItem key={kpi.label}>
              <article className="card-lift rounded-[14px] border border-border bg-card p-4">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-[12px] leading-snug text-text-secondary">{kpi.label}</p>
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] bg-primary-soft text-primary">
                    <Icon className="h-4 w-4" />
                  </span>
                </div>
                <p className="mt-2 text-[30px] font-semibold leading-none tracking-tight tabular-nums">
                  {kpi.value}
                </p>
                <div className="mt-2">
                  <Sparkline data={spark} color={sparkColor[kpi.icon] ?? "#0891B2"} />
                </div>
                {kpi.trend ? (
                  <p
                    className={`mt-1 inline-flex items-center gap-1 text-xs font-medium ${
                      kpi.up ? "text-success" : "text-text-secondary"
                    }`}
                  >
                    <Trend className="h-3.5 w-3.5" />
                    {kpi.trend} so với hôm qua
                  </p>
                ) : (
                  <p className="mt-1 text-xs text-muted">Không đổi</p>
                )}
              </article>
            </StaggerItem>
          );
        })}
      </Stagger>

      {/* Main charts row */}
      <div className="grid gap-4 xl:grid-cols-[1.45fr_1fr]">
        <section className="rounded-[14px] border border-border bg-card p-5 shadow-[var(--shadow-soft)]">
          <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="text-lg font-semibold">Khối lượng ca theo giờ</h2>
              <p className="text-xs text-text-secondary">Phân tầng Normal / High / Critical</p>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-text-secondary">
              <span className="inline-flex items-center gap-1.5">
                <i className="h-2 w-2 rounded-sm bg-primary" /> Normal
              </span>
              <span className="inline-flex items-center gap-1.5">
                <i className="h-2 w-2 rounded-sm bg-warning" /> High
              </span>
              <span className="inline-flex items-center gap-1.5">
                <i className="h-2 w-2 rounded-sm bg-critical" /> Critical
              </span>
            </div>
          </div>
          <HourlyStackedChart data={hourlyCasesChart} />
        </section>

        <section className="rounded-[14px] border border-border bg-card p-5 shadow-[var(--shadow-soft)]">
          <h2 className="text-lg font-semibold">Tỷ lệ AI – Bác sĩ</h2>
          <p className="text-xs text-text-secondary">Kết quả AI chỉ hỗ trợ — bác sĩ quyết định</p>
          <DonutChart
            data={aiDoctorAgreement}
            centerValue="92%"
            centerLabel="Đồng thuận"
          />
          <ul className="mt-1 space-y-2 text-sm">
            {aiDoctorAgreement.map((item) => (
              <li key={item.name} className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 text-text-secondary">
                  <i className="h-2.5 w-2.5 rounded-full" style={{ background: item.color }} />
                  {item.name}
                </span>
                <span className="font-semibold tabular-nums">{item.value}%</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Role-specific visual blocks */}
      {(role.id === "cdha" || role.id === "admin") && (
        <section className="rounded-[14px] border border-border bg-card shadow-[var(--shadow-soft)]">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <div>
              <h2 className="text-lg font-semibold">Worklist ưu tiên — trực quan</h2>
              <p className="text-xs text-text-secondary">
                Thumbnail CXR · AI confidence · mở Viewer 1 click
              </p>
            </div>
            <Button href="/dashboard/worklist" size="sm" variant="soft">
              Xem tất cả
            </Button>
          </div>
          <div className="grid gap-3 p-4 sm:grid-cols-2 xl:grid-cols-3">
            {worklistPreview.map((c) => (
              <Link
                key={c.code}
                href={`/viewer/${c.code}`}
                className={`card-lift group overflow-hidden rounded-[12px] border ${
                  c.tone === "critical"
                    ? "border-red-100 bg-red-50/40"
                    : c.tone === "warning"
                      ? "border-amber-100 bg-amber-50/30"
                      : "border-border bg-background"
                }`}
              >
                <div className="relative aspect-[16/10] bg-viewer-bg">
                  <Image
                    src={getCaseThumbnail(c.code)}
                    alt=""
                    fill
                    className="object-contain p-2 transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="280px"
                  />
                  <div className="absolute left-2 top-2">
                    <Badge tone={c.tone}>{c.priority}</Badge>
                  </div>
                </div>
                <div className="space-y-1 p-3">
                  <p className="text-sm font-semibold">{c.patient}</p>
                  <p className="text-xs text-text-secondary">
                    {c.code} · {c.facility}
                  </p>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs font-medium text-ai">{c.ai}</span>
                    <span className="text-xs text-text-secondary">{c.wait}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {(role.id === "tiepdon" || role.id === "ktv") && (
        <div className="grid gap-4 lg:grid-cols-2">
          <section className="rounded-[14px] border border-border bg-card p-5 shadow-[var(--shadow-soft)]">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">Luồng hàng đợi</h2>
                <p className="text-xs text-text-secondary">Funnel vận hành trong ngày</p>
              </div>
              <Button href="/dashboard/hang-doi" size="sm" variant="soft">
                Chi tiết
              </Button>
            </div>
            <QueueFunnel data={queueFlow} />
          </section>
          <section className="rounded-[14px] border border-border bg-card p-5 shadow-[var(--shadow-soft)]">
            <h2 className="mb-4 text-lg font-semibold">Danh sách đang chờ</h2>
            <ul className="divide-y divide-border">
              {queueItems.slice(0, 6).map((q) => (
                <li key={q.stt} className="flex items-center justify-between gap-3 py-3 text-sm">
                  <div>
                    <p className="font-medium">
                      #{q.stt} · {q.patient}
                    </p>
                    <p className="text-xs text-text-secondary">
                      {q.time} · {q.exam} · {q.room}
                    </p>
                  </div>
                  <Badge
                    tone={
                      q.clinicalPriority === "Cấp cứu"
                        ? "critical"
                        : q.clinicalPriority === "Ưu tiên"
                          ? "warning"
                          : "neutral"
                    }
                  >
                    {q.status}
                  </Badge>
                </li>
              ))}
            </ul>
          </section>
        </div>
      )}

      {role.id === "chidinh" && (
        <section className="rounded-[14px] border border-border bg-card p-5 shadow-[var(--shadow-soft)]">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Chỉ định gần đây</h2>
            <Button href="/dashboard/chi-dinh" size="sm">
              + Tạo chỉ định
            </Button>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {imagingOrders.slice(0, 6).map((o) => (
              <div
                key={o.id}
                className="rounded-[12px] border border-border bg-background p-4"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold">{o.patient}</p>
                    <p className="text-xs text-text-secondary">
                      {o.id} · {o.exam}
                    </p>
                  </div>
                  <Badge tone="primary">{o.status}</Badge>
                </div>
                <p className="mt-2 line-clamp-2 text-xs text-text-secondary">{o.reason}</p>
                <p className="mt-2 text-[11px] text-muted">{o.createdAt}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {role.id === "researcher" && (
        <div className="grid gap-4 lg:grid-cols-3">
          {researchMetricsSpark.map((m) => (
            <section
              key={m.label}
              className="rounded-[14px] border border-border bg-card p-5 shadow-[var(--shadow-soft)]"
            >
              <p className="text-xs text-text-secondary">{m.label}</p>
              <p className="mt-1 text-[32px] font-semibold tabular-nums">{m.value}</p>
              <div className="mt-3">
                <Sparkline
                  data={m.series.map((v) => Math.round(v * 1000))}
                  color="#7C3AED"
                />
              </div>
              <p className="mt-2 text-xs text-text-secondary">Xu hướng theo phiên bản model</p>
            </section>
          ))}
        </div>
      )}

      {/* Secondary analytics */}
      <div className="grid gap-4 xl:grid-cols-3">
        <section className="rounded-[14px] border border-border bg-card p-5 shadow-[var(--shadow-soft)] xl:col-span-2">
          <div className="mb-2">
            <h2 className="text-lg font-semibold">Xu hướng 7 ngày</h2>
            <p className="text-xs text-text-secondary">Tổng ca · Hoàn tất · Chờ đọc</p>
          </div>
          <WeeklyVolumeChart data={weeklyVolume} />
        </section>
        <section className="rounded-[14px] border border-border bg-card p-5 shadow-[var(--shadow-soft)]">
          <h2 className="text-lg font-semibold">Trạng thái Worklist</h2>
          <p className="mb-2 text-xs text-text-secondary">Phân bổ ca hôm nay</p>
          <DonutChart
            data={worklistStatusMix}
            centerValue={String(worklistCases.length)}
            centerLabel="Tổng ca demo"
          />
          <ul className="space-y-1.5 text-sm">
            {worklistStatusMix.map((s) => (
              <li key={s.name} className="flex justify-between">
                <span className="inline-flex items-center gap-2 text-text-secondary">
                  <i className="h-2 w-2 rounded-full" style={{ background: s.color }} />
                  {s.name}
                </span>
                <span className="font-semibold tabular-nums">{s.value}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <section className="rounded-[14px] border border-border bg-card p-5 shadow-[var(--shadow-soft)]">
          <h2 className="mb-1 text-lg font-semibold">TAT trung bình</h2>
          <p className="mb-2 text-xs text-text-secondary">Phút / ca · 7 ngày gần nhất</p>
          <TatTrendChart data={tatTrend} />
        </section>
        <section className="rounded-[14px] border border-border bg-card p-5 shadow-[var(--shadow-soft)]">
          <h2 className="mb-1 text-lg font-semibold">Phân bố AI finding</h2>
          <p className="mb-4 text-xs text-text-secondary">Tỷ lệ theo nhóm (demo)</p>
          <HorizontalBars data={pathologyMix} color="#7C3AED" />
        </section>
        <section className="rounded-[14px] border border-border bg-card p-5 shadow-[var(--shadow-soft)]">
          <h2 className="mb-1 text-lg font-semibold">Công suất máy</h2>
          <p className="mb-4 text-xs text-text-secondary">Load trong ngày</p>
          <div className="space-y-4">
            {machineUtilization.map((m) => (
              <div key={m.name}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="font-medium">{m.name}</span>
                  <Badge tone={m.status === "Online" ? "success" : "warning"}>{m.status}</Badge>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full ${m.status === "Online" ? "bg-primary" : "bg-warning"}`}
                    style={{ width: `${m.load}%` }}
                  />
                </div>
                <p className="mt-1 text-xs text-text-secondary tabular-nums">{m.load}% load</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Attention + activity */}
      <div className="grid gap-4 xl:grid-cols-2">
        <section className="rounded-[14px] border border-border bg-card p-5 shadow-[var(--shadow-soft)]">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Các ca cần chú ý</h2>
            <Badge tone="critical">{attentionCases.length} ca</Badge>
          </div>
          <ul className="space-y-3">
            {attentionCases.map((c) => (
              <li key={c.code}>
                <Link
                  href={`/viewer/${c.code}`}
                  className="flex gap-3 rounded-[12px] border border-border bg-background p-3 transition-colors hover:border-primary/30 hover:bg-primary-soft/20"
                >
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-viewer-bg">
                    <Image
                      src={getCaseThumbnail(c.code)}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`h-2 w-2 rounded-full ${
                          c.priority === "critical" ? "bg-critical" : "bg-warning"
                        }`}
                      />
                      <p className="truncate text-sm font-semibold">{c.patient}</p>
                    </div>
                    <p className="mt-0.5 text-xs text-text-secondary">
                      {c.meta} · {c.code}
                    </p>
                    <div className="mt-1.5 flex items-center justify-between gap-2">
                      <p className="truncate text-xs text-ai">
                        {c.finding} · {c.confidence}%
                      </p>
                      <span className="shrink-0 text-xs font-medium text-text-secondary">
                        {c.wait}
                      </span>
                    </div>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-ai"
                        style={{ width: `${c.confidence}%` }}
                      />
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-[14px] border border-border bg-card p-5 shadow-[var(--shadow-soft)]">
          <h2 className="mb-4 text-lg font-semibold">Hoạt động gần đây</h2>
          <ol className="relative space-y-0 border-l border-border pl-4">
            {recentActivity.map((a, i) => (
              <li key={a.title + a.time} className="relative pb-4 last:pb-0">
                <span className="absolute -left-[21px] top-1 flex h-2.5 w-2.5 rounded-full border-2 border-card bg-primary" />
                <div className="rounded-[10px] border border-border bg-background px-3 py-2.5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium">{a.title}</p>
                      <p className="mt-0.5 text-xs text-text-secondary">{a.detail}</p>
                    </div>
                    <span className="shrink-0 text-[11px] text-muted">{a.time}</span>
                  </div>
                </div>
                {i < recentActivity.length - 1 && null}
              </li>
            ))}
          </ol>
        </section>
      </div>

      {/* Facility performance visual */}
      <section className="rounded-[14px] border border-border bg-card p-5 shadow-[var(--shadow-soft)]">
        <div className="mb-2 flex flex-wrap items-end justify-between gap-2">
          <div>
            <h2 className="text-lg font-semibold">Hiệu suất theo cơ sở</h2>
            <p className="text-xs text-text-secondary">
              Công suất vận hành (%) · kèm số liệu vận hành
            </p>
          </div>
          <Button href="/dashboard/co-so" size="sm" variant="outline">
            Quản lý cơ sở
          </Button>
        </div>
        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <FacilityUtilization data={facilityBars} />
          <div className="overflow-x-auto">
            <table className="w-full min-w-[420px] text-left text-[13px]">
              <thead className="text-text-secondary">
                <tr>
                  {["Cơ sở", "Ca", "Chờ", "Critical", "TAT"].map((h) => (
                    <th key={h} className="pb-2 font-medium">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {facilityBars.map((row) => (
                  <tr key={row.name} className="border-t border-border">
                    <td className="py-3 font-medium">{row.name}</td>
                    <td className="py-3 tabular-nums">{row.cases}</td>
                    <td className="py-3 tabular-nums">{row.waiting}</td>
                    <td className="py-3">
                      <Badge tone="critical">{row.critical}</Badge>
                    </td>
                    <td className="py-3 tabular-nums">{row.tat} phút</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <p className="rounded-[10px] border border-border bg-card px-4 py-3 text-xs text-text-secondary">
        Dashboard demo · {worklistCases.length} ca worklist · Đổi vai trò trên Topbar để xem góc nhìn
        Bác sĩ CĐHA / KTV / Tiếp đón / Researcher / Admin.{" "}
        <span className="text-ai">
          AI hỗ trợ phân tích — Bác sĩ quyết định kết luận cuối cùng.
        </span>
      </p>
    </div>
  );
}
