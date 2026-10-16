"use client";

import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Edit3, ShieldCheck, Sparkles, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { BorderBeam } from "@/components/magicui/BorderBeam";
import { DEMO_CXR } from "@/lib/cxr-images";

export function HeroMockup() {
  return (
    <div className="relative w-full">
      <div className="relative flex flex-col gap-3.5 overflow-hidden rounded-2xl border border-primary-200 bg-white p-4 sm:p-5 overview-wrapper-shadow">
        <BorderBeam size={280} duration={11} colorFrom="#0096d1" colorTo="#0d71ba" />

        {/* Top UMC Workstation Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-gradient-to-r from-primary-700 via-primary-600 to-primary-500 px-4 py-2.5 text-white shadow-xs">
          <div className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
            <p className="text-xs font-bold uppercase tracking-[0.03em]">
              TRẠM ĐỌC PHIM PACS · KHOA CHẨN ĐOÁN HÌNH ẢNH
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-red-500/90 px-2.5 py-0.5 text-[11px] font-bold text-white">
              AI Critical · 5 ca
            </span>
            <span className="hidden rounded-md bg-white/15 px-2 py-0.5 text-[11px] font-semibold text-white sm:inline-block">
              DICOM 3.0
            </span>
          </div>
        </div>

        {/* Main Diagnostic Split: Dark-Room Viewer + AI/Doctor Verification */}
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-12">
          {/* Left 7 cols: Dark-room Chest X-ray with Grad-CAM++ & High-Contrast HUD */}
          <div className=" flex flex-col overflow-hidden rounded-xl border border-viewer-border bg-viewer-bg shadow-md sm:col-span-7">
            <div className="flex items-center justify-between border-b border-viewer-border bg-viewer-panel px-3 py-2">
              <p className="flex items-center gap-1.5 text-[11px] font-semibold text-viewer-text">
                <Sparkles className="size-3.5 text-primary-200" />
                X-quang Ngực PA · Grad-CAM++
              </p>
              <span className="rounded bg-primary-600/40 px-2 py-0.5 text-[10px] font-semibold text-primary-100">
                ChestXAI v2.1
              </span>
            </div>

            <div className="relative aspect-[4/3] w-full bg-black">
              <Image
                src={DEMO_CXR.pneumonia}
                alt="X-quang ngực PA với bản đồ nhiệt Grad-CAM++"
                fill
                className="object-contain p-1.5"
                sizes="(max-width: 768px) 90vw, 360px"
                priority
              />

              {/* Thermal Grad-CAM++ Overlay + Target Bounding Box */}
              <div className="pointer-events-none absolute left-[18%] top-[28%] h-[38%] w-[28%] rounded-full bg-[radial-gradient(circle,_rgba(239,68,68,0.75)_0%,_rgba(249,115,22,0.45)_38%,_rgba(234,179,8,0.22)_60%,_transparent_75%)] mix-blend-screen" />
              <div className="pointer-events-none absolute left-[17%] top-[27%] h-[40%] w-[30%] rounded-lg border border-dashed border-red-400/90">
                <span className="absolute -top-5 left-0 whitespace-nowrap rounded bg-red-600/95 px-1.5 py-0.5 text-[9px] font-bold text-white shadow-xs">
                  Đông đặc thùy dưới P · 84%
                </span>
              </div>

              {/* High-Contrast Dark Scrim HUD Footer so text never blends into white X-ray */}
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/95 via-black/80 to-transparent px-3 pb-2 pt-5 font-mono text-[10px] text-white">
                <span className="font-semibold text-primary-100">
                  XR20261011-001 · Nam 68T
                </span>
                <span className="rounded bg-white/15 px-1.5 py-0.5 text-[9.5px] text-white/90">
                  W:1600 L:500
                </span>
              </div>
            </div>
          </div>

          {/* Right 5 cols: AI Findings & Doctor Human-in-the-Loop Decision */}
          <div className="flex flex-col justify-between rounded-xl border border-primary-100 border-b-[4px] border-b-primary-600 bg-primary-50/55 p-3.5 sm:col-span-5">
            <div>
              <div className="mb-2.5 flex items-center justify-between border-b border-primary-100 pb-2">
                <p className="text-xs font-bold text-primary-800">
                  Hội chẩn AI & Bác sĩ
                </p>
                <Badge tone="primary">XAI</Badge>
              </div>
              <div className="flex flex-col gap-2.5">
                {[
                  { label: "Đông đặc phổi P", conf: 84, tone: "bg-critical" },
                  { label: "Tràn dịch màng phổi", conf: 31, tone: "bg-amber-500" },
                  { label: "Nốt mờ phổi", conf: 12, tone: "bg-primary-600" },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="mb-1 flex items-center justify-between text-[11px]">
                      <span className="font-semibold text-primary-900">
                        {item.label}
                      </span>
                      <span className="font-mono font-bold text-primary-700 tabular-nums">
                        {item.conf}%
                      </span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-white shadow-2xs">
                      <div
                        className={`h-full rounded-full ${item.tone}`}
                        style={{ width: `${item.conf}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-3 border-t border-primary-100 pt-2.5">
              <div className="grid grid-cols-3 gap-1.5">
                <Link
                  href="/viewer/XR20261011-001"
                  className="inline-flex items-center justify-center gap-1 rounded-md bg-emerald-600 py-1.5 text-[10.5px] font-bold text-white transition-colors hover:bg-emerald-700"
                >
                  <CheckCircle2 className="size-3" /> Đồng ý
                </Link>
                <Link
                  href="/viewer/XR20261011-001"
                  className="inline-flex items-center justify-center gap-1 rounded-md border border-primary-600 bg-white py-1.5 text-[10.5px] font-bold text-primary-600 transition-colors hover:bg-primary-50"
                >
                  <Edit3 className="size-3" /> Sửa
                </Link>
                <Link
                  href="/viewer/XR20261011-001"
                  className="inline-flex items-center justify-center gap-1 rounded-md border border-red-200 bg-red-50 py-1.5 text-[10.5px] font-bold text-critical transition-colors hover:bg-red-100"
                >
                  <XCircle className="size-3" /> Bác bỏ
                </Link>
              </div>
              <div className="mt-2 flex items-center gap-1.5 rounded-lg border border-primary-100 bg-white px-2.5 py-1.5 text-[10.5px] font-semibold text-primary-800">
                <ShieldCheck className="size-3.5 shrink-0 text-primary-600" />
                <span className="truncate">Bác sĩ CĐHA ký số báo cáo</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Priority Worklist Strip */}
        <div className="flex flex-col gap-1.5 pt-0.5">
          {[
            {
              priority: "Khẩn cấp",
              name: "Nguyễn Văn Hùng · 68T",
              ai: "Đông đặc thùy dưới P · 84%",
              thumb: DEMO_CXR.pneumonia,
              href: "/viewer/XR20261011-001",
            },
            {
              priority: "Cao",
              name: "Trần Thị Mai · 54T",
              ai: "Tràn dịch màng phổi · 71%",
              thumb: DEMO_CXR.effusion,
              href: "/viewer/XR20261011-002",
            },
            {
              priority: "Thường",
              name: "Lê Văn Nam · 41T",
              ai: "Tim phổi bình thường · 91%",
              thumb: DEMO_CXR.normal,
              href: "/viewer/XR20261011-003",
            },
          ].map((row) => (
            <Link
              key={row.name}
              href={row.href}
              className={`flex items-center justify-between gap-2 rounded-xl border px-3 py-2 text-xs transition-all duration-150 hover:shadow-xs ${
                row.priority === "Khẩn cấp"
                  ? "border-l-4 border-l-critical border-red-200/80 bg-red-50/55"
                  : row.priority === "Cao"
                    ? "border-l-4 border-l-warning border-amber-200/80 bg-amber-50/45"
                    : "border-l-4 border-l-primary-600 border-primary-100 bg-primary-50/45"
              }`}
            >
              <div className="flex min-w-0 items-center gap-2.5">
                <div className="relative size-8 shrink-0 overflow-hidden rounded-lg border border-primary-400 bg-viewer-bg">
                  <Image
                    src={row.thumb}
                    alt=""
                    fill
                    className="object-cover object-center"
                    sizes="32px"
                  />
                </div>
                <span
                  className={`shrink-0 rounded-md px-2 py-0.5 text-[10.5px] font-bold ${
                    row.priority === "Khẩn cấp"
                      ? "bg-red-100 text-critical"
                      : row.priority === "Cao"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-emerald-100 text-emerald-700"
                  }`}
                >
                  {row.priority}
                </span>
                <span className="truncate font-semibold text-primary-900">
                  {row.name}
                </span>
              </div>
              <span className="shrink-0 font-semibold text-primary-600 tabular-nums">
                {row.ai}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
