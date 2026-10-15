"use client";

import Image from "next/image";
import {
  Activity,
  ArrowRight,
  Brain,
  ClipboardList,
  FileCheck,
  ImageIcon,
  Lock,
  Scan,
  Shield,
  Users,
} from "lucide-react";
import { Logo } from "@/components/branding/Logo";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { HeroMockup } from "@/components/landing/HeroMockup";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Tilt3D } from "@/components/motion/Tilt3D";
import { DEMO_CXR } from "@/lib/cxr-images";
import { worklistPreview } from "@/lib/demo-data";

const workflow = [
  "Bệnh nhân",
  "Chỉ định",
  "Đặt lịch",
  "Chụp X-quang",
  "AI phân tích",
  "Bác sĩ đọc phim",
  "Báo cáo",
  "Nghiên cứu",
];

const features = [
  {
    icon: Users,
    title: "Quản lý bệnh nhân",
    desc: "Hồ sơ, lịch sử chụp và liên kết Study DICOM theo từng cơ sở.",
  },
  {
    icon: ClipboardList,
    title: "Chỉ định & Lịch chụp",
    desc: "Tạo chỉ định, chọn máy/phòng và xếp lịch trong một luồng.",
  },
  {
    icon: ImageIcon,
    title: "DICOM & Viewer",
    desc: "Workspace đọc phim tối ưu cho X-quang ngực, công cụ chuẩn RIS.",
  },
  {
    icon: Brain,
    title: "AI & Explainable AI",
    desc: "Prediction, confidence và Grad-CAM gắn model version rõ ràng.",
  },
  {
    icon: FileCheck,
    title: "Bác sĩ xác nhận",
    desc: "Accept / Reject / Edit kết quả AI trước khi kết luận cuối.",
  },
  {
    icon: Activity,
    title: "Báo cáo & Audit",
    desc: "Quản lý báo cáo, version và lịch sử thao tác phục vụ kiểm tra.",
  },
];

const researchCards = [
  { title: "Research Dataset", metric: "12.480 ảnh", note: "Đã de-identify" },
  { title: "AI Evaluation", metric: "AUROC 0.942", note: "Model v2.1" },
  { title: "XAI Evaluation", metric: "Dice 0.71", note: "Grad-CAM++" },
  { title: "Model Comparison", metric: "F1 0.89", note: "v1.0 → v2.1" },
];

const securityItems = [
  {
    icon: Shield,
    title: "Phân quyền RBAC",
    desc: "Vai trò bác sĩ, kỹ thuật viên, tiếp đón, nghiên cứu, quản trị.",
  },
  {
    icon: Lock,
    title: "Phân quyền theo cơ sở",
    desc: "Dữ liệu và worklist được giới hạn theo facility được gán.",
  },
  {
    icon: Scan,
    title: "De-identification",
    desc: "Chuẩn bị dataset nghiên cứu với thông tin nhận dạng được loại bỏ.",
  },
  {
    icon: FileCheck,
    title: "Audit Log",
    desc: "Ghi nhận truy cập, quyết định AI và thao tác lâm sàng quan trọng.",
  },
];

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-text">
      <LandingHeader />

      <main>
        <section id="trang-chu" className="relative overflow-hidden border-b border-border">
          <div className="surface-grid pointer-events-none absolute inset-0" />
          <div className="surface-mesh pointer-events-none absolute inset-0 opacity-70" />
          <div className="relative mx-auto grid max-w-[1200px] items-center gap-12 px-6 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-24">
            <Reveal>
              <p className="mb-4 inline-flex items-center rounded-full border border-primary/15 bg-primary-soft/80 px-3 py-1 text-sm font-medium text-primary">
                Nền tảng hỗ trợ chẩn đoán hình ảnh
              </p>
              <h1 className="max-w-xl text-[34px] font-semibold leading-[1.12] tracking-tight text-text sm:text-[44px]">
                Quy trình X-quang thông minh,
                <span className="block text-primary-dark">từ chỉ định đến báo cáo.</span>
              </h1>
              <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-text-secondary">
                Tập trung quản lý bệnh nhân, hình ảnh DICOM, AI hỗ trợ phân tích,
                Explainable AI, worklist đọc phim và báo cáo chẩn đoán trong một
                quy trình thống nhất.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/dang-nhap" size="lg">
                  Khám phá hệ thống
                </Button>
                <Button href="#quy-trinh" variant="secondary" size="lg">
                  Xem quy trình
                </Button>
              </div>
              <p className="mt-5 text-sm text-text-secondary">
                AI hỗ trợ bác sĩ · Không thay thế quyết định chuyên môn
              </p>
            </Reveal>
            <Reveal delay={0.12} y={32}>
              <HeroMockup />
            </Reveal>
          </div>
        </section>

        <section id="quy-trinh" className="border-b border-border bg-background py-20">
          <div className="mx-auto max-w-[1200px] px-6">
            <Reveal>
              <h2 className="text-center text-[28px] font-semibold tracking-tight sm:text-[32px]">
                Một quy trình thống nhất cho chẩn đoán X-quang
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-text-secondary">
                Từ tiếp đón đến nghiên cứu — một luồng rõ ràng, ít thao tác thừa.
              </p>
            </Reveal>
            <Stagger className="mt-12 flex flex-wrap items-center justify-center gap-2" delay={0.1}>
              {workflow.map((step, i) => (
                <StaggerItem key={step} className="flex items-center gap-2">
                  <div className="card-lift rounded-[12px] border border-border bg-card px-3.5 py-3 text-center">
                    <div className="mx-auto mb-1.5 flex h-8 w-8 items-center justify-center rounded-lg bg-primary-soft text-primary">
                      <span className="text-xs font-semibold">{i + 1}</span>
                    </div>
                    <p className="whitespace-nowrap text-xs font-medium text-text">{step}</p>
                  </div>
                  {i < workflow.length - 1 && (
                    <ArrowRight className="hidden h-4 w-4 text-slate-300 sm:block" />
                  )}
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        <section id="giai-phap" className="border-b border-border py-20">
          <div className="mx-auto max-w-[1200px] px-6">
            <Reveal>
              <h2 className="max-w-2xl text-[28px] font-semibold tracking-tight sm:text-[32px]">
                Hỗ trợ toàn bộ quy trình chẩn đoán hình ảnh
              </h2>
            </Reveal>
            <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((f) => (
                <StaggerItem key={f.title}>
                  <article className="card-lift group h-full rounded-[14px] border border-border bg-card p-6">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-[10px] bg-primary-soft text-primary transition-transform duration-300 group-hover:scale-105">
                      <f.icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-semibold">{f.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary">{f.desc}</p>
                    <a
                      href="#ai-xai"
                      className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary transition-all hover:gap-1.5 hover:text-primary-dark"
                    >
                      Tìm hiểu thêm <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  </article>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        <section id="ai-xai" className="relative overflow-hidden border-b border-border bg-background py-20">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-[radial-gradient(ellipse_at_left,_rgba(8,145,178,0.08),_transparent_60%)]" />
          <div className="relative mx-auto grid max-w-[1200px] items-center gap-12 px-6 lg:grid-cols-2">
            <Reveal>
              <Tilt3D maxTilt={5}>
                <div className="overflow-hidden rounded-[16px] border border-viewer-border bg-viewer-bg shadow-[0_28px_60px_-32px_rgba(5,11,18,0.85)]">
                  <div className="flex items-center justify-between border-b border-viewer-border px-4 py-3">
                    <p className="text-sm font-medium text-viewer-text">Radiology Viewer</p>
                    <Badge tone="ai">Grad-CAM++</Badge>
                  </div>
                  <div className="relative aspect-[16/11] bg-black">
                    <Image
                      src={DEMO_CXR.influenza}
                      alt="Demo X-quang ngực với overlay Grad-CAM"
                      fill
                      className="object-contain p-3"
                      sizes="(max-width: 1024px) 100vw, 560px"
                    />
                    <div className="pointer-events-none absolute left-[42%] top-[26%] h-[40%] w-[28%] rounded-full bg-[radial-gradient(circle,_rgba(220,38,38,0.65)_0%,_rgba(249,115,22,0.35)_40%,_rgba(59,130,246,0.18)_65%,_transparent_75%)] mix-blend-screen" />
                    <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                      <span className="rounded-md border border-viewer-border bg-viewer-panel/90 px-2 py-1 text-[11px] text-viewer-text">
                        Confidence 84%
                      </span>
                      <span className="rounded-md border border-viewer-border bg-viewer-panel/90 px-2 py-1 text-[11px] text-viewer-muted">
                        Threshold 0.70
                      </span>
                      <span className="rounded-md border border-viewer-border bg-viewer-panel/90 px-2 py-1 text-[11px] text-viewer-muted">
                        ChestXAI v2.1.0
                      </span>
                    </div>
                  </div>
                </div>
              </Tilt3D>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-[28px] font-semibold leading-snug tracking-tight sm:text-[32px]">
                AI có thể hỗ trợ.
                <br />
                Quyết định vẫn thuộc về bác sĩ.
              </h2>
              <ul className="mt-6 space-y-3 text-sm text-text-secondary">
                {[
                  "Phân loại đa nhãn cho X-quang ngực",
                  "Confidence Score theo từng phát hiện",
                  "Threshold cấu hình theo bệnh lý",
                  "Grad-CAM / Grad-CAM++ giải thích vùng chú ý",
                  "Critical Case Detection hỗ trợ ưu tiên",
                  "Accept / Reject / Edit kết quả AI",
                ].map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-[12px] border border-primary/20 bg-primary-soft px-4 py-3 text-sm text-primary-dark">
                Mọi kết quả AI gắn với Model Version và được lưu phục vụ Audit.
              </div>
            </Reveal>
          </div>
        </section>

        <section className="border-b border-border py-20">
          <div className="mx-auto max-w-[1200px] px-6">
            <Reveal>
              <h2 className="text-[28px] font-semibold tracking-tight sm:text-[32px]">
                Ưu tiên ca cần được chú ý
              </h2>
              <p className="mt-2 text-sm text-text-secondary">
                AI Priority và Clinical Priority hiển thị riêng trên worklist.
              </p>
            </Reveal>
            <Reveal delay={0.08} className="mt-8 overflow-hidden rounded-[14px] border border-border bg-card shadow-[var(--shadow-soft)]">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] text-left text-[13px]">
                  <thead className="bg-slate-50 text-text-secondary">
                    <tr>
                      {[
                        "Ưu tiên",
                        "Mã ca",
                        "Bệnh nhân",
                        "Cơ sở",
                        "AI",
                        "Thời gian chờ",
                        "Trạng thái",
                      ].map((h) => (
                        <th key={h} className="px-4 py-3 font-medium">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {worklistPreview.map((row) => (
                      <tr
                        key={row.code}
                        className={`border-t border-border transition-colors hover:bg-primary-soft/30 ${
                          row.tone === "critical"
                            ? "bg-red-50/50"
                            : row.tone === "warning"
                              ? "bg-amber-50/40"
                              : "bg-white"
                        }`}
                      >
                        <td className="px-4 py-3">
                          <Badge tone={row.tone}>{row.priority}</Badge>
                        </td>
                        <td className="px-4 py-3 font-medium">{row.code}</td>
                        <td className="px-4 py-3">{row.patient}</td>
                        <td className="px-4 py-3 text-text-secondary">{row.facility}</td>
                        <td className="px-4 py-3 text-ai">{row.ai}</td>
                        <td className="px-4 py-3">{row.wait}</td>
                        <td className="px-4 py-3">
                          <Badge tone="neutral">{row.status}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="nghien-cuu" className="border-b border-border bg-background py-20">
          <div className="mx-auto max-w-[1200px] px-6">
            <Reveal>
              <h2 className="text-[28px] font-semibold tracking-tight sm:text-[32px]">
                Từ dữ liệu lâm sàng đến nghiên cứu AI
              </h2>
            </Reveal>
            <Stagger className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {researchCards.map((card) => (
                <StaggerItem key={card.title}>
                  <article className="card-lift h-full rounded-[14px] border border-border bg-card p-5">
                    <p className="text-sm text-text-secondary">{card.title}</p>
                    <p className="mt-2 text-[28px] font-semibold tracking-tight">{card.metric}</p>
                    <p className="mt-1 text-xs text-text-secondary">{card.note}</p>
                  </article>
                </StaggerItem>
              ))}
            </Stagger>
            <Stagger className="mt-4 grid gap-4 lg:grid-cols-3" delay={0.12}>
              {[
                { label: "Sensitivity", value: "0.91" },
                { label: "Specificity", value: "0.94" },
                { label: "IoU / Dice", value: "0.63 / 0.71" },
              ].map((m) => (
                <StaggerItem key={m.label}>
                  <div className="card-lift rounded-[14px] border border-border bg-card px-5 py-4">
                    <p className="text-xs text-text-secondary">{m.label}</p>
                    <p className="mt-1 text-xl font-semibold">{m.value}</p>
                    <div className="mt-3 flex h-16 items-end gap-1">
                      {[40, 55, 48, 70, 62, 78, 85, 72, 90, 88].map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-sm bg-primary/80 transition-all duration-500"
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        <section id="bao-mat" className="border-b border-border py-20">
          <div className="mx-auto max-w-[1200px] px-6">
            <Reveal>
              <h2 className="text-[28px] font-semibold tracking-tight sm:text-[32px]">
                Bảo mật và quản trị dữ liệu ngay trong quy trình
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-text-secondary">
                Kiểm soát truy cập và truy vết — không tuyên bố chứng nhận khi hệ thống chưa đạt.
              </p>
            </Reveal>
            <Stagger className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {securityItems.map((item) => (
                <StaggerItem key={item.title}>
                  <article className="card-lift h-full rounded-[14px] border border-border bg-card p-5">
                    <item.icon className="mb-3 h-5 w-5 text-primary" />
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm text-text-secondary">{item.desc}</p>
                  </article>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        <section id="lien-he" className="py-20">
          <div className="mx-auto max-w-[1200px] px-6">
            <Reveal>
              <div className="relative overflow-hidden rounded-[20px] bg-nav-dark px-8 py-14 text-center text-white md:px-16">
                <div className="pointer-events-none absolute -left-10 top-0 h-40 w-40 rounded-full bg-primary/30 blur-3xl" />
                <div className="pointer-events-none absolute -right-8 bottom-0 h-44 w-44 rounded-full bg-cyan-400/20 blur-3xl" />
                <h2 className="relative text-[28px] font-semibold tracking-tight sm:text-[32px]">
                  Xây dựng quy trình X-quang rõ ràng hơn với AI hỗ trợ.
                </h2>
                <p className="relative mx-auto mt-3 max-w-xl text-sm text-slate-300">
                  AI hỗ trợ phân tích. Bác sĩ quyết định chẩn đoán.
                </p>
                <div className="relative mt-8 flex flex-wrap justify-center gap-3">
                  <Button href="/dang-nhap" size="lg">
                    Yêu cầu Demo
                  </Button>
                  <Button
                    href="/dang-nhap"
                    variant="secondary"
                    size="lg"
                    className="border-white/20 bg-white/10 text-white hover:bg-white/15"
                  >
                    Đăng nhập hệ thống
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="bg-nav-dark text-slate-300">
        <div className="mx-auto grid max-w-[1200px] gap-10 px-6 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo variant="onDark" href="/" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
              Nền tảng Radiology Workflow + AI/XAI Decision Support cho quy trình
              X-quang ngực — AI hỗ trợ, bác sĩ quyết định.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Sản phẩm</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>Giải pháp</li>
              <li>Tài liệu</li>
              <li>Bảo mật</li>
              <li>Liên hệ</li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Pháp lý</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>Điều khoản sử dụng</li>
              <li>Chính sách bảo mật</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-3 px-6 py-4 text-xs text-slate-500">
            <span>© 2026 Hệ thống X-quang AI</span>
            <span>Kết quả AI hỗ trợ – Bác sĩ quyết định kết luận cuối cùng</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
