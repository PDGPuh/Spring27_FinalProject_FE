"use client";

import { useState } from "react";
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
  ShieldCheck,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useDemoRole } from "@/components/app-shell/useDemoRole";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { BorderBeam } from "@/components/magicui/BorderBeam";
import { SegmentedTabsParticle } from "@/components/ui/particles/p-segmented-tabs";
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
  wait: "#d97706",
  priority: "#dc2626",
  cases: "#0d71ba",
  done: "#16a34a",
  time: "#0096d1",
};

export function DashboardView() {
  const { role } = useDemoRole();
  const [period, setPeriod] = useState("today");
  const cards = roleKpis[role.id] ?? kpis;
  const criticalCount = worklistCases.filter((c) => c.aiPriority === "Critical").length;
  const waitingCount = worklistCases.filter((c) => c.status === "Chờ đọc").length;

  const quickLinks =
    role.id === "cdha"
      ? [
          { href: "/dashboard/worklist", label: "Mở Worklist đọc phim" },
          { href: "/viewer/XR20261011-001", label: "Đọc ca Critical" },
          { href: "/dashboard/bao-cao", label: "Báo cáo chờ ký" },
        ]
      : role.id === "chidinh"
        ? [
            { href: "/dashboard/benh-nhan", label: "Hồ sơ Bệnh nhân" },
            { href: "/dashboard/chi-dinh", label: "Tạo chỉ định chụp" },
            { href: "/dashboard/bao-cao", label: "Báo cáo đã ký" },
          ]
        : role.id === "ktv"
          ? [
               { href: "/dashboard/hang-doi", label: "Hàng đợi phòng chụp" },
               { href: "/dashboard/studies/upload", label: "Upload DICOM" },
               { href: "/dashboard/studies", label: "Kho Studies" },
            ]
          : role.id === "tiepdon"
            ? [
                { href: "/dashboard/benh-nhan/them", label: "Tiếp nhận BN mới" },
                { href: "/dashboard/dat-lich", label: "Đặt lịch chụp" },
                { href: "/dashboard/hang-doi", label: "Check-in" },
              ]
            : role.id === "researcher"
              ? [
                  { href: "/dashboard/dataset", label: "Dataset De-identified" },
                  { href: "/dashboard/danh-gia-ai", label: "Đánh giá AI" },
                  { href: "/dashboard/mo-hinh", label: "Phiên bản Models" },
                ]
              : role.id === "facility"
                ? [
                    { href: "/dashboard/co-so", label: "Quản lý Cơ sở" },
                    { href: "/dashboard/nguoi-dung", label: "Nhân sự" },
                    { href: "/dashboard/nhat-ky", label: "Audit Log" },
                  ]
                : [
                    { href: "/dashboard/nguoi-dung", label: "Phân quyền RBAC" },
                    { href: "/dashboard/cai-dat", label: "Cấu hình" },
                    { href: "/dashboard/tich-hop", label: "Liên thông PACS/HIS" },
                  ];

  return (
    <div className="flex flex-col gap-6">
      {/* 1. UMC Split Department Header Banner (Modeled after Khoa CĐHA bvdaihoc.com.vn) */}
      <div className="grid gap-4 rounded-2xl border border-primary-100 bg-white p-4 overview-wrapper-shadow lg:grid-cols-12 sm:p-5">
        <div className="flex flex-col justify-between rounded-xl bg-primary-600 p-5 text-white shadow-main-blue lg:col-span-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.04em]">
              <ShieldCheck className="size-3.5 text-primary-200" />
              {role.label} · KHOA CHẨN ĐOÁN HÌNH ẢNH
            </span>
            <span className="text-xs text-primary-100 tabular-nums">
              Ca trực: 16/04/2026
            </span>
          </div>
          <div className="mt-3">
            <h1 className="text-[24px] font-bold leading-tight tracking-tight text-white sm:text-[26px]">
              Trung tâm Điều hành · {role.name}
            </h1>
            <p className="mt-1.5 text-xs leading-relaxed text-primary-75">
              {role.description}
            </p>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2 pt-2 border-t border-white/15">
            {quickLinks.map((l, idx) => (
              <Link
                key={l.href}
                href={l.href}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-bold transition-colors ${
                  idx === 0
                    ? "bg-white text-primary-600 hover:bg-primary-50"
                    : "border border-white/35 bg-primary-700/60 text-white hover:bg-primary-700"
                }`}
              >
                {l.label}
                {idx === 0 && <ArrowRight className="size-3.5" />}
              </Link>
            ))}
          </div>
        </div>

        {/* Right 6 cols: Time Filter (Coss UI Segmented Tabs) + Triage Summary Strip */}
        <div className="flex flex-col justify-between gap-3 rounded-xl bg-primary-75/50 p-4 lg:col-span-6 border border-primary-100">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.04em] text-primary-700">
                CHẾ ĐỘ THEO DÕI VẬN HÀNH
              </p>
              <p className="text-xs text-text-secondary">
                Đồng bộ dữ liệu PACS & hàng đợi theo thời gian thực
              </p>
            </div>
            <div className="flex items-center gap-2">
              <SegmentedTabsParticle
                size="sm"
                active={period}
                onChange={setPeriod}
                items={[
                  { id: "today", label: "Hôm nay" },
                  { id: "7d", label: "7 ngày" },
                  { id: "30d", label: "30 ngày" },
                ]}
              />
              <button
                type="button"
                className="inline-flex size-8.5 items-center justify-center rounded-lg border border-primary-200 bg-white text-primary-600 transition-colors hover:bg-primary-600 hover:text-white"
                aria-label="Làm mới"
              >
                <RefreshCw className="size-3.5" />
              </button>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <Link
              href="/dashboard/worklist"
              className="relative flex items-center gap-3 overflow-hidden rounded-xl border border-red-200 bg-white p-3.5 shadow-2xs transition-transform hover:-translate-y-0.5"
            >
              <BorderBeam size={140} duration={9} colorFrom="#dc2626" colorTo="#0d71ba" />
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-red-50 text-critical">
                <AlertTriangle className="size-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-bold uppercase text-critical">
                  AI Critical
                </p>
                <p className="text-xl font-bold text-primary-900 tabular-nums">
                  {criticalCount} ca
                </p>
              </div>
            </Link>

            <Link
              href="/dashboard/worklist"
              className="flex items-center gap-3 rounded-xl border border-amber-200 bg-white p-3.5 shadow-2xs transition-transform hover:-translate-y-0.5"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-amber-50 text-amber-700">
                <Clock3 className="size-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-bold uppercase text-amber-800">
                  Ca Chờ đọc
                </p>
                <p className="text-xl font-bold text-primary-900 tabular-nums">
                  {waitingCount} ca
                </p>
              </div>
            </Link>

            <div className="flex items-center gap-3 rounded-xl border border-primary-200 bg-white p-3.5 shadow-2xs">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-600">
                <Activity className="size-5" />
              </span>
              <div>
                <p className="text-[11px] font-bold uppercase text-primary-700">
                  Đồng thuận AI–BS
                </p>
                <p className="text-xl font-bold text-primary-600 tabular-nums">92%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. UMC KPI Stat Cards (rounded-t-xl border-b-[5px] border-primary-600) */}
      <Stagger className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {cards.map((kpi) => {
          const Icon = iconMap[kpi.icon];
          const Trend = kpi.up ? TrendingUp : TrendingDown;
          const spark = kpiSparks[kpi.icon] ?? kpiSparks.cases;
          return (
            <StaggerItem key={kpi.label}>
              <article className="card-lift flex h-full flex-col justify-between rounded-t-xl rounded-b-lg border border-primary-100 border-b-[5px] border-b-primary-600 bg-white p-4">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-xs font-semibold leading-snug text-text-secondary">
                    {kpi.label}
                  </p>
                  <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-600">
                    <Icon className="size-4" />
                  </span>
                </div>
                <p className="mt-2 text-[30px] font-bold leading-none tracking-tight text-primary-800 tabular-nums">
                  {kpi.value}
                </p>
                <div className="mt-2">
                  <Sparkline data={spark} color={sparkColor[kpi.icon] ?? "#0d71ba"} />
                </div>
                {kpi.trend ? (
                  <p
                    className={`mt-1 inline-flex items-center gap-1 text-xs font-semibold ${
                      kpi.up ? "text-emerald-700" : "text-primary-600"
                    }`}
                  >
                    <Trend className="size-3.5" />
                    {kpi.trend} so với hôm qua
                  </p>
                ) : (
                  <p className="mt-1 text-xs text-muted">Ổn định trong ca trực</p>
                )}
              </article>
            </StaggerItem>
          );
        })}
      </Stagger>

      {/* 3. Main Charts Row */}
      <div className="grid gap-4 xl:grid-cols-[1.45fr_1fr]">
        <section className="rounded-xl border border-primary-100 bg-white p-5 overview-wrapper-shadow">
          <div className="mb-2 flex flex-wrap items-center justify-between gap-2 border-b border-primary-50 pb-3">
            <div>
              <h2 className="heading-2 text-primary-800">
                Lưu lượng Ca chụp X-quang theo Giờ
              </h2>
              <p className="text-xs text-text-secondary">
                Phân tầng tự động Normal / High / Critical từ hệ thống PACS
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs font-medium text-text-secondary">
              <span className="inline-flex items-center gap-1.5">
                <i className="size-2.5 rounded-xs bg-primary-600" /> Normal
              </span>
              <span className="inline-flex items-center gap-1.5">
                <i className="size-2.5 rounded-xs bg-warning" /> High
              </span>
              <span className="inline-flex items-center gap-1.5">
                <i className="size-2.5 rounded-xs bg-critical" /> Critical
              </span>
            </div>
          </div>
          <HourlyStackedChart data={hourlyCasesChart} />
        </section>

        <section className="rounded-xl border border-primary-100 bg-white p-5 overview-wrapper-shadow">
          <div className="border-b border-primary-50 pb-3">
            <h2 className="heading-2 text-primary-800">
              Tỷ lệ Đồng thuận Bác sĩ CĐHA & AI
            </h2>
            <p className="text-xs text-text-secondary">
              Thống kê từ các quyết định Accept / Edit / Reject khi ký báo cáo
            </p>
          </div>
          <DonutChart
            data={aiDoctorAgreement}
            centerValue="92%"
            centerLabel="Đồng thuận"
          />
          <ul className="mt-2 flex flex-col gap-2 text-sm">
            {aiDoctorAgreement.map((item) => (
              <li
                key={item.name}
                className="flex items-center justify-between rounded-lg bg-primary-50/40 px-3 py-1.5"
              >
                <span className="inline-flex items-center gap-2 font-medium text-text-secondary">
                  <i className="size-2.5 rounded-full" style={{ background: item.color }} />
                  {item.name}
                </span>
                <span className="font-bold text-primary-800 tabular-nums">
                  {item.value}%
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* 4. Role-Specific Visual Blocks */}
      {(role.id === "cdha" || role.id === "admin") && (
        <section className="rounded-xl border border-primary-100 bg-white overview-wrapper-shadow">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-primary-100 bg-primary-75/50 px-5 py-4">
            <div>
              <h2 className="heading-2 text-primary-800">
                Worklist Ưu tiên — Trực quan Hóa Hình ảnh X-quang
              </h2>
              <p className="text-xs text-text-secondary">
                Xem nhanh ảnh X-quang ngực PA, gợi ý AI và mở Trạm đọc PACS chỉ với 1
                click
              </p>
            </div>
            <Button href="/dashboard/worklist" size="sm" variant="primary">
              Mở toàn bộ Worklist <ArrowRight className="size-3.5" />
            </Button>
          </div>
          <div className="grid gap-4 p-5 sm:grid-cols-2 xl:grid-cols-3">
            {worklistPreview.map((c) => (
              <Link
                key={c.code}
                href={`/viewer/${c.code}`}
                className={`card-lift group overflow-hidden rounded-xl border ${
                  c.tone === "critical"
                    ? "border-l-4 border-l-critical border-red-200 bg-red-50/25"
                    : c.tone === "warning"
                      ? "border-l-4 border-l-warning border-amber-200 bg-amber-50/25"
                      : "border-l-4 border-l-primary-600 border-primary-100 bg-white"
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
                  <div className="absolute left-2.5 top-2.5">
                    <Badge tone={c.tone}>{c.priority}</Badge>
                  </div>
                  <span className="absolute bottom-2 right-2.5 rounded bg-primary-600/90 px-2 py-0.5 text-[10px] font-bold text-white opacity-0 transition-opacity group-hover:opacity-100">
                    Mở DICOM Viewer →
                  </span>
                </div>
                <div className="flex flex-col gap-1 p-3.5">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-primary-900">{c.patient}</p>
                    <span className="font-mono text-xs font-semibold text-primary-600">
                      {c.code}
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary">{c.facility}</p>
                  <div className="mt-1 flex items-center justify-between border-t border-primary-50 pt-2">
                    <span className="text-xs font-bold text-primary-600 tabular-nums">
                      {c.ai}
                    </span>
                    <span className="text-xs font-medium text-text-secondary tabular-nums">
                      Chờ: {c.wait}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {(role.id === "tiepdon" || role.id === "ktv") && (
        <div className="grid gap-4 lg:grid-cols-2">
          <section className="rounded-xl border border-primary-100 bg-white p-5 overview-wrapper-shadow">
            <div className="mb-4 flex items-center justify-between border-b border-primary-50 pb-3">
              <div>
                <h2 className="heading-2 text-primary-800">Luồng Hàng đợi Chụp X-quang</h2>
                <p className="text-xs text-text-secondary">
                  Theo dõi tiến độ từ tiếp nhận đến hoàn tất thu nhận DICOM
                </p>
              </div>
              <Button href="/dashboard/hang-doi" size="sm" variant="secondary">
                Chi tiết hàng đợi
              </Button>
            </div>
            <QueueFunnel data={queueFlow} />
          </section>
          <section className="rounded-xl border border-primary-100 bg-white p-5 overview-wrapper-shadow">
            <h2 className="heading-2 mb-4 border-b border-primary-50 pb-3 text-primary-800">
              Danh sách Người bệnh Đang chờ
            </h2>
            <ul className="divide-y divide-primary-50">
              {queueItems.slice(0, 6).map((q) => (
                <li
                  key={q.stt}
                  className="flex items-center justify-between gap-3 py-3 text-sm"
                >
                  <div>
                    <p className="font-bold text-primary-900">
                      #{q.stt} · {q.patient}
                    </p>
                    <p className="text-xs text-text-secondary tabular-nums">
                      {q.time} · {q.exam} · {q.room}
                    </p>
                  </div>
                  <Badge
                    tone={
                      q.clinicalPriority === "Cấp cứu"
                        ? "critical"
                        : q.clinicalPriority === "Ưu tiên"
                          ? "warning"
                          : "info"
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
        <section className="rounded-xl border border-primary-100 bg-white p-5 overview-wrapper-shadow">
          <div className="mb-4 flex items-center justify-between border-b border-primary-50 pb-3">
            <h2 className="heading-2 text-primary-800">Chỉ định Chụp Gần đây</h2>
            <Button href="/dashboard/chi-dinh" size="sm">
              + Tạo chỉ định mới
            </Button>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {imagingOrders.slice(0, 6).map((o) => (
              <div
                key={o.id}
                className="rounded-xl border border-primary-100 border-l-4 border-l-primary-600 bg-primary-50/30 p-4"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-bold text-primary-900">{o.patient}</p>
                    <p className="text-xs font-medium text-primary-600">
                      {o.id} · {o.exam}
                    </p>
                  </div>
                  <Badge tone="primary">{o.status}</Badge>
                </div>
                <p className="mt-2 line-clamp-2 text-xs text-text-secondary">
                  {o.reason}
                </p>
                <p className="mt-2 text-[11px] text-muted tabular-nums">{o.createdAt}</p>
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
              className="rounded-t-xl border border-primary-100 border-b-[5px] border-b-primary-600 bg-white p-5 overview-wrapper-shadow"
            >
              <p className="text-xs font-bold uppercase text-primary-600">{m.label}</p>
              <p className="mt-1 text-[32px] font-bold text-primary-800 tabular-nums">
                {m.value}
              </p>
              <div className="mt-3">
                <Sparkline
                  data={m.series.map((v) => Math.round(v * 1000))}
                  color="#0d71ba"
                />
              </div>
              <p className="mt-2 text-xs text-text-secondary">
                Xu hướng cải thiện qua các phiên bản mô hình
              </p>
            </section>
          ))}
        </div>
      )}

      {/* 5. Secondary Analytics Row */}
      <div className="grid gap-4 xl:grid-cols-3">
        <section className="rounded-xl border border-primary-100 bg-white p-5 overview-wrapper-shadow xl:col-span-2">
          <div className="mb-2 border-b border-primary-50 pb-3">
            <h2 className="heading-2 text-primary-800">
              Xu hướng Hoạt động Chẩn đoán Hình ảnh 7 Ngày
            </h2>
            <p className="text-xs text-text-secondary">
              Tổng số ca chụp · Đã ký báo cáo · Đang chờ đọc
            </p>
          </div>
          <WeeklyVolumeChart data={weeklyVolume} />
        </section>

        <section className="rounded-xl border border-primary-100 bg-white p-5 overview-wrapper-shadow">
          <div className="border-b border-primary-50 pb-3">
            <h2 className="heading-2 text-primary-800">Tỷ trọng Trạng thái Worklist</h2>
            <p className="text-xs text-text-secondary">Phân bổ ca chụp trong ngày</p>
          </div>
          <DonutChart
            data={worklistStatusMix}
            centerValue={String(worklistCases.length)}
            centerLabel="Tổng ca"
          />
          <ul className="flex flex-col gap-1.5 text-sm">
            {worklistStatusMix.map((s) => (
              <li
                key={s.name}
                className="flex justify-between rounded-lg bg-primary-50/40 px-3 py-1"
              >
                <span className="inline-flex items-center gap-2 text-text-secondary">
                  <i className="size-2 rounded-full" style={{ background: s.color }} />
                  {s.name}
                </span>
                <span className="font-bold text-primary-800 tabular-nums">{s.value}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* 6. TAT, Pathology Mix & Modality Utilization */}
      <div className="grid gap-4 xl:grid-cols-3">
        <section className="rounded-xl border border-primary-100 bg-white p-5 overview-wrapper-shadow">
          <h2 className="heading-2 mb-1 text-primary-800">
            Thời gian Trả Kết quả Trung bình (TAT)
          </h2>
          <p className="mb-2 text-xs text-text-secondary">
            Số phút / ca · 7 ngày gần nhất
          </p>
          <TatTrendChart data={tatTrend} />
        </section>

        <section className="rounded-xl border border-primary-100 bg-white p-5 overview-wrapper-shadow">
          <h2 className="heading-2 mb-1 text-primary-800">
            Phân bố Nhóm Tổn thương Phát hiện bởi AI
          </h2>
          <p className="mb-4 text-xs text-text-secondary">
            Tỷ lệ theo nhóm bệnh lý lồng ngực
          </p>
          <HorizontalBars data={pathologyMix} color="#0d71ba" />
        </section>

        <section className="rounded-xl border border-primary-100 bg-white p-5 overview-wrapper-shadow">
          <h2 className="heading-2 mb-1 text-primary-800">
            Tải Hoạt động Hệ thống Máy X-quang
          </h2>
          <p className="mb-4 text-xs text-text-secondary">
            Công suất vận hành thiết bị trong ngày
          </p>
          <div className="flex flex-col gap-4">
            {machineUtilization.map((m) => (
              <div key={m.name}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="font-bold text-primary-900">{m.name}</span>
                  <Badge tone={m.status === "Online" ? "success" : "warning"}>
                    {m.status}
                  </Badge>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-primary-50">
                  <div
                    className={`h-full rounded-full ${
                      m.status === "Online" ? "bg-primary-600" : "bg-warning"
                    }`}
                    style={{ width: `${m.load}%` }}
                  />
                </div>
                <p className="mt-1 text-xs font-medium text-text-secondary tabular-nums">
                  {m.load}% công suất
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* 7. Attention Cases + Activity Timeline */}
      <div className="grid gap-4 xl:grid-cols-2">
        <section className="rounded-xl border border-primary-100 bg-white p-5 overview-wrapper-shadow">
          <div className="mb-4 flex items-center justify-between border-b border-primary-50 pb-3">
            <h2 className="heading-2 text-primary-800">
              Các Ca Lâm sàng Cần Chú ý Đặc biệt
            </h2>
            <Badge tone="critical">{attentionCases.length} ca khẩn</Badge>
          </div>
          <ul className="flex flex-col gap-3">
            {attentionCases.map((c) => (
              <li key={c.code}>
                <Link
                  href={`/viewer/${c.code}`}
                  className="flex gap-3.5 rounded-xl border border-primary-100 border-l-4 border-l-primary-600 bg-primary-50/30 p-3.5 transition-all hover:border-primary-600 hover:bg-primary-50"
                >
                  <div className="relative size-14 shrink-0 overflow-hidden rounded-lg border border-primary-400 bg-viewer-bg">
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
                        className={`size-2 rounded-full ${
                          c.priority === "critical" ? "bg-critical" : "bg-warning"
                        }`}
                      />
                      <p className="truncate text-sm font-bold text-primary-900">
                        {c.patient}
                      </p>
                    </div>
                    <p className="mt-0.5 text-xs text-text-secondary">
                      {c.meta} · <span className="font-mono">{c.code}</span>
                    </p>
                    <div className="mt-1.5 flex items-center justify-between gap-2">
                      <p className="truncate text-xs font-bold text-primary-600 tabular-nums">
                        {c.finding} · {c.confidence}%
                      </p>
                      <span className="shrink-0 text-xs font-semibold text-text-secondary tabular-nums">
                        {c.wait}
                      </span>
                    </div>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white">
                      <div
                        className="h-full rounded-full bg-primary-600"
                        style={{ width: `${c.confidence}%` }}
                      />
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-xl border border-primary-100 bg-white p-5 overview-wrapper-shadow">
          <h2 className="heading-2 mb-4 border-b border-primary-50 pb-3 text-primary-800">
            Nhật ký Hoạt động Chuyên môn Gần đây
          </h2>
          <ol className="relative flex flex-col border-l-2 border-primary-200 pl-4">
            {recentActivity.map((a) => (
              <li key={a.title + a.time} className="relative pb-4 last:pb-0">
                <span className="absolute -left-[21px] top-1.5 flex size-2.5 rounded-full border-2 border-white bg-primary-600" />
                <div className="rounded-xl border border-primary-100 bg-primary-50/35 px-3.5 py-2.5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-bold text-primary-900">{a.title}</p>
                      <p className="mt-0.5 text-xs text-text-secondary">{a.detail}</p>
                    </div>
                    <span className="shrink-0 text-[11px] font-medium text-primary-600 tabular-nums">
                      {a.time}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </div>

      {/* 8. Multi-Campus Performance Section */}
      <section className="rounded-xl border border-primary-100 bg-white p-5 overview-wrapper-shadow">
        <div className="mb-3 flex flex-wrap items-end justify-between gap-2 border-b border-primary-50 pb-3">
          <div>
            <h2 className="heading-2 text-primary-800">
              Hiệu suất Vận hành theo Cơ sở Khám chữa bệnh
            </h2>
            <p className="text-xs text-text-secondary">
              So sánh lưu lượng ca chụp, ca chờ đọc và TAT giữa các cơ sở
            </p>
          </div>
          <Button href="/dashboard/co-so" size="sm" variant="secondary">
            Quản lý Cơ sở & Thiết bị
          </Button>
        </div>
        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <FacilityUtilization data={facilityBars} />
          <div className="overflow-x-auto">
            <table className="w-full min-w-[420px] text-left text-[13px]">
              <thead className="border-b border-primary-100 bg-primary-75 text-xs font-bold uppercase text-primary-700">
                <tr>
                  {["Cơ sở", "Tổng ca", "Chờ đọc", "Critical", "TAT TB"].map((h) => (
                    <th key={h} className="px-3 py-2.5">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-primary-50">
                {facilityBars.map((row) => (
                  <tr key={row.name} className="hover:bg-primary-50/50">
                    <td className="px-3 py-3 font-bold text-primary-900">{row.name}</td>
                    <td className="px-3 py-3 font-semibold tabular-nums">{row.cases}</td>
                    <td className="px-3 py-3 tabular-nums">{row.waiting}</td>
                    <td className="px-3 py-3">
                      <Badge tone="critical">{row.critical}</Badge>
                    </td>
                    <td className="px-3 py-3 font-semibold text-primary-700 tabular-nums">
                      {row.tat} phút
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
