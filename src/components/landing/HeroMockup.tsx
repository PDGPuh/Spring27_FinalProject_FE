"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { Tilt3D } from "@/components/motion/Tilt3D";
import { DEMO_CXR } from "@/lib/cxr-images";

export function HeroMockup() {
  return (
    <div className="relative mx-auto w-full max-w-[560px]">
      <div className="hero-orb pointer-events-none absolute -left-8 -top-10 h-40 w-40 rounded-full bg-primary/25" />
      <div className="hero-orb pointer-events-none absolute -bottom-6 -right-4 h-36 w-36 rounded-full bg-cyan-400/15 [animation-delay:1.2s]" />

      <Tilt3D className="relative" maxTilt={7}>
        <motion.div
          className="animate-float-soft relative grid gap-3 [transform:translateZ(20px)]"
          initial={{ opacity: 0, scale: 0.96, rotateX: 8 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="rounded-[14px] border border-border/80 bg-card/95 p-3 shadow-[0_24px_60px_-28px_rgba(15,42,56,0.5)] backdrop-blur-sm">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs font-semibold text-text">Worklist đọc phim</p>
              <Badge tone="ai">AI Critical · 5</Badge>
            </div>
            <div className="space-y-1.5">
              {[
                ["Khẩn cấp", "Nguyễn Văn Hùng", "Viêm phổi 84%", DEMO_CXR.pneumonia],
                ["Cao", "Trần Thị Mai", "Tràn dịch 71%", DEMO_CXR.effusion],
                ["Thường", "Lê Văn Nam", "Bình thường 91%", DEMO_CXR.normal],
              ].map(([p, name, ai, thumb]) => (
                <div
                  key={String(name)}
                  className={`flex items-center justify-between gap-2 rounded-lg border px-2.5 py-2 text-[11px] transition-transform duration-300 hover:translate-x-0.5 ${
                    p === "Khẩn cấp"
                      ? "border-red-100 bg-red-50/70"
                      : p === "Cao"
                        ? "border-amber-100 bg-amber-50/60"
                        : "border-border bg-background"
                  }`}
                >
                  <div className="flex min-w-0 items-center gap-2">
                    <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded bg-viewer-bg ring-1 ring-black/5">
                      <Image
                        src={String(thumb)}
                        alt=""
                        fill
                        className="object-cover object-center"
                        sizes="32px"
                      />
                    </div>
                    <span
                      className={`rounded px-1.5 py-0.5 font-medium ${
                        p === "Khẩn cấp"
                          ? "bg-red-100 text-critical"
                          : p === "Cao"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-emerald-100 text-success"
                      }`}
                    >
                      {p}
                    </span>
                    <span className="truncate font-medium text-text">{name}</span>
                  </div>
                  <span className="shrink-0 text-ai">{ai}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-[1.2fr_0.9fr] gap-3">
            <div className="overflow-hidden rounded-[14px] border border-viewer-border bg-viewer-bg shadow-[0_28px_56px_-30px_rgba(5,11,18,0.9)]">
              <div className="flex items-center justify-between border-b border-viewer-border px-3 py-2">
                <p className="text-[11px] font-medium text-viewer-text">
                  DICOM Viewer · Grad-CAM++
                </p>
                <span className="text-[10px] text-viewer-muted">Model v2.1</span>
              </div>
              <div className="relative aspect-[4/3] bg-black">
                <Image
                  src={DEMO_CXR.pneumonia}
                  alt="Demo chest X-ray PA với overlay Grad-CAM (mẫu CC0)"
                  fill
                  className="object-contain p-2"
                  sizes="(max-width: 768px) 90vw, 320px"
                  priority
                />
                <motion.div
                  className="pointer-events-none absolute left-[20%] top-[30%] h-[36%] w-[26%] rounded-full bg-[radial-gradient(circle,_rgba(239,68,68,0.7)_0%,_rgba(249,115,22,0.4)_35%,_rgba(234,179,8,0.22)_55%,_transparent_72%)] blur-[0.5px] mix-blend-screen"
                  animate={{ opacity: [0.55, 0.9, 0.55], scale: [1, 1.04, 1] }}
                  transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
                />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] text-viewer-muted">
                  <span>XR20261011-001</span>
                  <span>W:1600 L:500</span>
                </div>
              </div>
            </div>

            <div className="rounded-[14px] border border-border bg-card/95 p-3 shadow-[0_16px_40px_-28px_rgba(15,42,56,0.4)] backdrop-blur-sm">
              <p className="mb-2 text-xs font-semibold text-text">Doctor Review</p>
              <div className="space-y-2">
                {[
                  ["Viêm phổi", 84],
                  ["Tràn dịch", 31],
                  ["U phổi", 12],
                ].map(([label, conf]) => (
                  <div key={String(label)}>
                    <div className="mb-1 flex justify-between text-[11px]">
                      <span className="text-text">{label}</span>
                      <span className="font-medium text-ai">{conf}%</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                      <motion.div
                        className="h-full rounded-full bg-ai"
                        initial={{ width: 0 }}
                        animate={{ width: `${conf}%` }}
                        transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3 grid grid-cols-3 gap-1.5">
                <span className="rounded-md bg-emerald-50 py-1.5 text-center text-[10px] font-medium text-success">
                  Đồng ý
                </span>
                <span className="rounded-md bg-red-50 py-1.5 text-center text-[10px] font-medium text-critical">
                  Bác bỏ
                </span>
                <span className="rounded-md bg-slate-100 py-1.5 text-center text-[10px] font-medium text-text-secondary">
                  Sửa
                </span>
              </div>
              <p className="mt-3 rounded-md border border-amber-200 bg-amber-50 px-2 py-1.5 text-[10px] leading-snug text-amber-800">
                Kết quả AI hỗ trợ – Bác sĩ quyết định kết luận cuối cùng
              </p>
            </div>
          </div>
        </motion.div>
      </Tilt3D>
    </div>
  );
}
