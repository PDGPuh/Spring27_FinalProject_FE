"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  Brain,
  Building2,
  CalendarCheck,
  CheckCircle2,
  ClipboardList,
  Database,
  FileCheck,
  ImageIcon,
  Lock,
  Scan,
  Shield,
  Sparkles,
  Stethoscope,
} from "lucide-react";
import { Logo } from "@/components/branding/Logo";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { Marquee } from "@/components/magicui/Marquee";
import { BentoCard, BentoGrid } from "@/components/magicui/BentoGrid";
import { BorderBeam } from "@/components/magicui/BorderBeam";
import { SegmentedTabsParticle } from "@/components/ui/particles/p-segmented-tabs";
import { DEMO_CXR } from "@/lib/cxr-images";
import { worklistPreview } from "@/lib/demo-data";

const quickActions = [
  {
    icon: ImageIcon,
    title: "Worklist đọc phim",
    sub: "Phân tầng ưu tiên ca chụp",
    href: "/dashboard/worklist?role=cdha",
  },
  {
    icon: Stethoscope,
    title: "Chỉ định & Lịch chụp",
    sub: "Tạo chỉ định & xếp phòng",
    href: "/dashboard/chi-dinh?role=chidinh",
  },
  {
    icon: CalendarCheck,
    title: "Check-in & Hàng đợi",
    sub: "Điều phối phòng chụp",
    href: "/dashboard/hang-doi?role=ktv",
  },
  {
    icon: Brain,
    title: "DICOM & XAI Viewer",
    sub: "Đọc phim & Grad-CAM++",
    href: "/viewer/XR20261011-001",
  },
  {
    icon: Database,
    title: "Dataset & Nghiên cứu",
    sub: "De-identify & đánh giá AI",
    href: "/dashboard/dataset?role=researcher",
  },
  {
    icon: FileCheck,
    title: "Cổng bệnh nhân",
    sub: "Lịch hẹn & báo cáo đã ký",
    href: "/portal",
  },
];

const partnerStandards = [
  {
    code: "DICOM 3.0",
    name: "Chuẩn Hình ảnh Y khoa DICOM",
    desc: "Thu nhận, lưu trữ và hiển thị ảnh X-quang ngực độ phân giải cao",
  },
  {
    code: "RIS / PACS",
    name: "Quản lý Worklist & Ca chụp",
    desc: "Đồng bộ trạng thái từ chỉ định, chụp phim đến báo cáo hoàn tất",
  },
  {
    code: "EXPLAINABLE AI",
    name: "Grad-CAM++ Heatmap",
    desc: "Trực quan hóa vùng tổn thương nghi ngờ kèm điểm tin cậy",
  },
  {
    code: "HUMAN-IN-THE-LOOP",
    name: "Bác sĩ Xác nhận Kết quả",
    desc: "Quy trình Accept / Edit / Reject gợi ý AI trước khi ký báo cáo",
  },
  {
    code: "DE-IDENTIFICATION",
    name: "Chuẩn hóa Dữ liệu Nghiên cứu",
    desc: "Loại bỏ thông tin định danh phục vụ huấn luyện & kiểm định mô hình",
  },
  {
    code: "RBAC & AUDIT",
    name: "Phân quyền 8 Vai trò & Lưu vết",
    desc: "Kiểm soát truy cập theo cơ sở và ghi nhận toàn bộ lịch sử thao tác",
  },
];

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

const bentoFeatures = [
  {
    Icon: Brain,
    name: "AI & Explainable AI",
    description:
      "Prediction, confidence và bản đồ nhiệt Grad-CAM++ gắn kèm model version rõ ràng, hỗ trợ phân tầng ưu tiên ca chụp bất thường.",
    href: "/viewer/XR20261011-001",
    cta: "Mở Radiology Viewer",
    badge: "Model v2.1 · AUROC 0.942",
    beam: true,
    className: "md:col-span-2",
    background: (
      <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-primary-75/90 via-primary-50/30 to-transparent" />
    ),
  },
  {
    Icon: FileCheck,
    name: "Bác sĩ xác nhận",
    description:
      "Thực hiện Accept / Reject / Edit kết quả AI trước khi đưa ra kết luận chẩn đoán cuối cùng.",
    href: "/dashboard/worklist?role=cdha",
    cta: "Xem Worklist đọc phim",
    badge: "Human-in-the-Loop",
    className: "md:col-span-1",
  },
  {
    Icon: ImageIcon,
    name: "DICOM & Viewer",
    description:
      "Workspace đọc phim tối ưu cho X-quang ngực với đầy đủ công cụ Zoom, Pan, Window/Level, thước đo và so sánh phim cũ.",
    href: "/viewer/XR20261011-001",
    cta: "Trải nghiệm Viewer",
    badge: "Chuẩn RIS / PACS",
    className: "md:col-span-1",
  },
  {
    Icon: ClipboardList,
    name: "Chỉ định & Lịch chụp",
    description:
      "Tạo chỉ định lâm sàng, chọn máy/phòng chụp và xếp lịch thực hiện liền mạch trong một luồng thống nhất.",
    href: "/dashboard/chi-dinh?role=chidinh",
    cta: "Xem phân hệ Chỉ định",
    badge: "Quy trình khép kín",
    className: "md:col-span-1",
  },
  {
    Icon: Database,
    name: "Dataset & Nghiên cứu",
    description:
      "De-identify dữ liệu lâm sàng, đánh giá hiệu năng mô hình AI và kiểm định chất lượng bản đồ nhiệt XAI theo từng phiên bản.",
    href: "/dashboard/dataset?role=researcher",
    cta: "Mở phân hệ Nghiên cứu",
    badge: "12.480 ảnh De-identified",
    className: "md:col-span-1",
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
  const [worklistFilter, setWorklistFilter] = useState("all");

  const filteredPreview = worklistPreview.filter((row) => {
    if (worklistFilter === "all") return true;
    if (worklistFilter === "critical") return row.tone === "critical";
    if (worklistFilter === "warning") return row.tone === "warning";
    return row.tone === "success";
  });

  return (
    <div className="min-h-screen bg-white text-text">
      <LandingHeader />

      <main>
        {/* 1. Hero Banner (5/7 Split Layout with Original Project Content) */}
        <section id="trang-chu" className="bg-white py-8 sm:py-10">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
            <div className="grid items-stretch gap-6 lg:grid-cols-12">
              {/* Left 5 cols: Solid Medical Blue Identity Block */}
              <div className="flex flex-col justify-between rounded-[16px] bg-primary-600 p-8 text-white shadow-main-blue sm:p-9 lg:col-span-5">
                <div>
                  <span className="inline-block rounded-md bg-white/15 px-3 py-1 text-[12px] font-bold uppercase tracking-[0.05em] text-primary-100">
                    NỀN TẢNG HỖ TRỢ CHẨN ĐOÁN HÌNH ẢNH
                  </span>
                  <h1 className="mt-3 text-[28px] font-extrabold leading-[1.2] tracking-tight text-white sm:text-[34px]">
                    Quy trình X-quang thông minh, từ chỉ định đến báo cáo.
                  </h1>

                  <p className="mt-4 text-[15.5px] leading-relaxed text-primary-75">
                    Tập trung quản lý bệnh nhân, hình ảnh DICOM, AI hỗ trợ phân tích,
                    Explainable AI, worklist đọc phim và báo cáo chẩn đoán trong một
                    quy trình thống nhất.
                  </p>

                  <div className="mt-5 space-y-2.5 border-t border-white/15 pt-4 text-[14.5px] font-medium text-white">
                    <p className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 shrink-0 text-primary-200" />
                      <span>Quản lý xuyên suốt 8 bước từ tiếp đón đến nghiên cứu</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 shrink-0 text-primary-200" />
                      <span>Tích hợp bản đồ nhiệt Grad-CAM++ & phân tầng ưu tiên</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 shrink-0 text-primary-200" />
                      <span>AI hỗ trợ bác sĩ · Không thay thế quyết định chuyên môn</span>
                    </p>
                  </div>
                </div>

                {/* 2 Equal 50/50 White CTA Buttons */}
                <div className="mt-7 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                  <Link
                    href="/dang-nhap"
                    className="flex h-[48px] items-center justify-center rounded-[10px] bg-white px-4 text-[15.5px] font-bold text-primary-600 shadow-xs transition-colors hover:bg-primary-50"
                  >
                    Khám phá hệ thống
                  </Link>
                  <Link
                    href="#quy-trinh"
                    className="flex h-[48px] items-center justify-center rounded-[10px] border border-white/40 bg-primary-700/60 px-4 text-[15.5px] font-bold text-white transition-colors hover:bg-primary-700"
                  >
                    Xem quy trình
                  </Link>
                </div>
              </div>

              {/* Right 7 cols: Seamless Radiology & XAI Showcase Banner */}
              <div className="relative flex flex-col justify-between overflow-hidden rounded-[16px] bg-gradient-to-br from-[#073358] via-[#0a4b80] to-[#0d71ba] p-7 text-white shadow-lg sm:p-9 lg:col-span-7">
                <BorderBeam size={320} duration={12} colorFrom="#52c8f4" colorTo="#ffffff" />

                <div className="pointer-events-none absolute -right-20 -top-20 size-80 rounded-full bg-primary-400/20 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-24 left-1/3 size-80 rounded-full bg-primary-200/15 blur-3xl" />

                <div className="relative z-10 grid h-full items-center gap-7 md:grid-cols-12">
                  {/* Left 7 internal cols: Radiology Workflow & XAI Overview */}
                  <div className="flex flex-col justify-between md:col-span-7">
                    <div>
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/12 px-3.5 py-1.5 text-[13px] font-bold text-white">
                        <Sparkles className="size-4 text-primary-200" />
                        Radiology Viewer · Explainable AI
                      </span>

                      <h2 className="mt-4 text-[26px] font-extrabold leading-[1.22] tracking-tight text-white sm:text-[32px]">
                        AI phân tích có giải thích,
                        <span className="mt-1 block text-primary-100">
                          bác sĩ giữ quyền quyết định.
                        </span>
                      </h2>

                      <p className="mt-3.5 text-[15px] leading-relaxed text-white/90">
                        Mỗi dự đoán đi kèm bản đồ nhiệt Grad-CAM++, mức độ tự tin
                        (Confidence) và phiên bản mô hình. Bác sĩ thực hiện Accept,
                        Edit hoặc Reject trước khi ký số báo cáo.
                      </p>
                    </div>

                    {/* 3 Clean Glass Stat Pills (Original Project Metrics) */}
                    <div className="mt-6 grid grid-cols-3 gap-2.5 border-t border-white/15 pt-5">
                      <div className="rounded-xl bg-white/10 px-3 py-2.5 backdrop-blur-xs">
                        <p className="text-[18px] font-extrabold text-white tabular-nums">
                          0.942
                        </p>
                        <p className="text-[11.5px] font-medium text-primary-100">
                          AUROC Model v2.1
                        </p>
                      </div>
                      <div className="rounded-xl bg-white/10 px-3 py-2.5 backdrop-blur-xs">
                        <p className="text-[18px] font-extrabold text-primary-200 tabular-nums">
                          12.480
                        </p>
                        <p className="text-[11.5px] font-medium text-primary-100">
                          Ảnh De-identified
                        </p>
                      </div>
                      <div className="rounded-xl bg-white/10 px-3 py-2.5 backdrop-blur-xs">
                        <p className="text-[18px] font-extrabold text-emerald-300 tabular-nums">
                          0.71
                        </p>
                        <p className="text-[11.5px] font-medium text-primary-100">
                          Dice Grad-CAM++
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right 5 internal cols: Crisp Framed DICOM X-Ray + Grad-CAM++ Card */}
                  <div className="md:col-span-5">
                    <div className="overflow-hidden rounded-xl border border-white/25 bg-[#06101a] p-3 shadow-2xl">
                      <div className="mb-2 flex items-center justify-between text-[11.5px]">
                        <span className="font-mono font-bold text-primary-200">
                          XR20261011-001
                        </span>
                        <span className="rounded bg-red-600 px-2 py-0.5 text-[10.5px] font-bold text-white">
                          Khẩn cấp · 84%
                        </span>
                      </div>

                      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-white/10 bg-black">
                        <Image
                          src={DEMO_CXR.pneumonia}
                          alt="X-quang ngực PA kèm bản đồ nhiệt Grad-CAM++"
                          fill
                          className="object-contain p-1"
                          sizes="280px"
                          priority
                        />
                        <div className="pointer-events-none absolute left-[18%] top-[28%] h-[38%] w-[28%] rounded-full bg-[radial-gradient(circle,_rgba(239,68,68,0.75)_0%,_rgba(249,115,22,0.45)_38%,_rgba(234,179,8,0.22)_60%,_transparent_75%)] mix-blend-screen" />
                        <div className="pointer-events-none absolute left-[17%] top-[27%] h-[40%] w-[30%] rounded-md border border-dashed border-red-400" />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent px-2.5 py-1.5 text-[11px] font-semibold text-white">
                          Đông đặc thùy dưới P · Grad-CAM++
                        </div>
                      </div>

                      <Link
                        href="/viewer/XR20261011-001"
                        className="mt-2.5 flex h-[38px] w-full items-center justify-center gap-1.5 rounded-lg bg-primary-600 text-[13px] font-bold text-white transition-colors hover:bg-primary-500"
                      >
                        Mở Radiology Viewer <ArrowRight className="size-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Quick-Action Module Hub */}
        <section className="bg-linear-overview py-14 sm:py-16">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
            <h2 className="mb-8 text-center text-[28px] font-bold text-primary-600 sm:text-[36px]">
              Truy cập nhanh các phân hệ trong hệ thống
            </h2>

            <div className="rounded-[20px] border border-primary-100 border-b-[5px] border-b-primary-600 bg-white px-6 py-9 overview-wrapper-shadow sm:px-8 sm:py-10">
              <div className="grid grid-cols-2 gap-y-8 sm:grid-cols-3 lg:grid-cols-6 lg:divide-x lg:divide-primary-100/80">
                {quickActions.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="group flex flex-col items-center justify-center px-3 py-1 text-center transition-all duration-150"
                  >
                    <div className="mb-3.5 flex size-[80px] items-center justify-center rounded-full border border-primary-100 bg-primary-50 text-primary-600 transition-all duration-200 group-hover:scale-105 group-hover:border-primary-600 group-hover:bg-primary-600 group-hover:text-white group-hover:shadow-md">
                      <item.icon className="size-8" />
                    </div>
                    <span className="text-[16.5px] font-bold text-primary-900 transition-colors group-hover:text-primary-600">
                      {item.title}
                    </span>
                    <span className="mt-1 text-[13px] font-medium text-text-secondary">
                      {item.sub}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 3. Magic UI Marquee: Platform Capabilities & Standards */}
        <section className="border-y border-primary-100 bg-primary-50/50 py-9">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
            <p className="mb-5 text-center text-[14px] font-bold uppercase tracking-[0.05em] text-primary-700">
              Nền tảng Công nghệ & Tiêu chuẩn Vận hành Quy trình X-quang AI
            </p>
            <div className="relative flex w-full flex-col items-center justify-center overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
              <Marquee pauseOnHover className="[--duration:36s]">
                {partnerStandards.map((p) => (
                  <div
                    key={p.name}
                    className="flex w-96 shrink-0 items-start gap-4 rounded-2xl border border-primary-100 bg-white p-5 shadow-xs transition-colors hover:border-primary-400"
                  >
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                      <CheckCircle2 className="size-6" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="inline-block rounded-md bg-primary-50 px-2.5 py-0.5 text-[12px] font-bold text-primary-600">
                        {p.code}
                      </span>
                      <p className="mt-1.5 truncate text-[17px] font-bold text-primary-900">
                        {p.name}
                      </p>
                      <p className="mt-1 line-clamp-2 text-[14px] text-text-secondary">
                        {p.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </Marquee>
            </div>
          </div>
        </section>

        {/* 4. Original 8-Step Unified Workflow Section */}
        <section id="quy-trinh" className="border-b border-primary-100 bg-white py-18">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
            <h2 className="text-center text-[30px] font-bold text-primary-600 sm:text-[36px]">
              Một quy trình thống nhất cho chẩn đoán X-quang
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-[16px] text-text-secondary">
              Từ tiếp đón đến nghiên cứu — một luồng rõ ràng, ít thao tác thừa.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
              {workflow.map((step, i) => (
                <div
                  key={step}
                  className="group flex flex-col items-center justify-between rounded-2xl border border-primary-100 border-b-[5px] border-b-primary-600 bg-white p-5 text-center overview-wrapper-shadow transition-all duration-150 hover:-translate-y-0.5 hover:bg-primary-600 hover:text-white"
                >
                  <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-primary-50 text-[16px] font-extrabold text-primary-600 transition-colors group-hover:bg-white/20 group-hover:text-white tabular-nums">
                    0{i + 1}
                  </div>
                  <p className="text-[15px] font-bold text-primary-900 group-hover:text-white">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Magic UI Bento Grid Features Section (Original 6 Features) */}
        <section
          id="giai-phap"
          className="border-b border-primary-100 bg-linear-overview py-20"
        >
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-[14px] font-bold uppercase tracking-[0.05em] text-primary-600">
                  TÍNH NĂNG CỐT LÕI
                </p>
                <h2 className="mt-1 text-[30px] font-bold text-primary-800 sm:text-[36px]">
                  Hỗ trợ toàn bộ quy trình chẩn đoán hình ảnh
                </h2>
              </div>
              <Button href="/dashboard?role=cdha" variant="primary" size="lg">
                Mở Dashboard Hệ thống <ArrowRight className="size-4.5" />
              </Button>
            </div>

            <BentoGrid>
              {bentoFeatures.map((feature) => (
                <BentoCard key={feature.name} {...feature} />
              ))}
            </BentoGrid>
          </div>
        </section>

        {/* 6. Original AI & Explainable AI + Interactive Worklist Preview */}
        <section id="ai-xai" className="border-b border-primary-100 bg-white py-20">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
            {/* Radiology Viewer + XAI Explanation Split */}
            <div className="mb-16 grid items-center gap-10 rounded-2xl border border-primary-100 bg-primary-50/40 p-6 sm:p-10 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <div className="overflow-hidden rounded-[16px] border border-viewer-border bg-viewer-bg shadow-xl">
                  <div className="flex items-center justify-between border-b border-viewer-border bg-viewer-panel px-5 py-3.5">
                    <p className="text-[15px] font-bold text-viewer-text">
                      Radiology Viewer
                    </p>
                    <Badge tone="primary">Grad-CAM++</Badge>
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
                    <div className="absolute bottom-3 left-4 right-4 flex flex-wrap gap-2">
                      <span className="rounded-md border border-viewer-border bg-black/80 px-2.5 py-1 text-xs font-semibold text-white">
                        Confidence 84%
                      </span>
                      <span className="rounded-md border border-viewer-border bg-black/80 px-2.5 py-1 text-xs font-semibold text-primary-200">
                        Model v2.1
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6">
                <p className="text-[14px] font-bold uppercase tracking-[0.05em] text-primary-600">
                  AI & EXPLAINABLE AI
                </p>
                <h2 className="mt-1 text-[28px] font-bold text-primary-800 sm:text-[34px]">
                  Giải thích trực quan bằng Grad-CAM++, bác sĩ xác nhận trước khi kết
                  luận.
                </h2>
                <p className="mt-4 text-[16px] leading-relaxed text-text-secondary">
                  Mọi kết quả phân tích của mô hình đều hiển thị rõ vùng nghi ngờ tổn
                  thương, mức độ tự tin (Confidence) và phiên bản model để bác sĩ đối
                  chiếu lâm sàng.
                </p>
                <ul className="mt-5 space-y-3 text-[15.5px] text-text">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="size-5 shrink-0 text-primary-600" />
                    <span>Bật / tắt lớp phủ nhiệt Grad-CAM++ và điều chỉnh độ mờ</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="size-5 shrink-0 text-primary-600" />
                    <span>Thao tác Accept / Edit / Reject cho từng phát hiện AI</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="size-5 shrink-0 text-primary-600" />
                    <span>Tự động đẩy ca AI Critical lên đầu danh sách Worklist</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Worklist Preview with Coss UI SegmentedTabsParticle */}
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-[14px] font-bold uppercase tracking-[0.05em] text-primary-600">
                  WORKLIST ĐỌC PHIM
                </p>
                <h3 className="mt-1 text-[28px] font-bold text-primary-800 sm:text-[34px]">
                  Danh sách ca chụp ưu tiên theo mức độ khẩn cấp
                </h3>
                <p className="mt-1.5 text-[16px] text-text-secondary">
                  Hiển thị độc lập mức độ ưu tiên lâm sàng và phát hiện AI.
                </p>
              </div>

              <SegmentedTabsParticle
                active={worklistFilter}
                onChange={setWorklistFilter}
                items={[
                  { id: "all", label: "Tất cả ca", count: worklistPreview.length },
                  {
                    id: "critical",
                    label: "Khẩn cấp",
                    count: worklistPreview.filter((r) => r.tone === "critical").length,
                    tone: "critical",
                  },
                  {
                    id: "warning",
                    label: "Ưu tiên cao",
                    count: worklistPreview.filter((r) => r.tone === "warning").length,
                    tone: "warning",
                  },
                  {
                    id: "normal",
                    label: "Thường",
                    count: worklistPreview.filter((r) => r.tone === "success").length,
                  },
                ]}
              />
            </div>

            <div className="mt-7 overflow-hidden rounded-2xl border border-primary-100 bg-white overview-wrapper-shadow">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[880px] text-left text-[15px]">
                  <thead className="border-b border-primary-100 bg-primary-75 text-[13px] font-bold uppercase tracking-[0.03em] text-primary-700">
                    <tr>
                      {[
                        "Ưu tiên",
                        "Mã ca",
                        "Bệnh nhân",
                        "Cơ sở",
                        "Phát hiện AI",
                        "Thời gian chờ",
                        "Trạng thái",
                        "Thao tác",
                      ].map((h) => (
                        <th key={h} className="px-5 py-4">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-primary-50">
                    {filteredPreview.map((row) => (
                      <tr
                        key={row.code}
                        className={`transition-colors hover:bg-primary-50/70 ${
                          row.tone === "critical"
                            ? "bg-red-50/40"
                            : row.tone === "warning"
                              ? "bg-amber-50/35"
                              : "bg-white"
                        }`}
                      >
                        <td className="px-5 py-4">
                          <Badge tone={row.tone}>{row.priority}</Badge>
                        </td>
                        <td className="px-5 py-4 font-mono font-bold text-primary-700">
                          {row.code}
                        </td>
                        <td className="px-5 py-4 font-bold text-primary-900">
                          {row.patient}
                        </td>
                        <td className="px-5 py-4 text-text-secondary">
                          {row.facility}
                        </td>
                        <td className="px-5 py-4 font-bold text-primary-600 tabular-nums">
                          {row.ai}
                        </td>
                        <td className="px-5 py-4 font-medium tabular-nums">
                          {row.wait}
                        </td>
                        <td className="px-5 py-4">
                          <Badge tone="info">{row.status}</Badge>
                        </td>
                        <td className="px-5 py-4">
                          <Link
                            href={`/viewer/${row.code}`}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-primary-600 px-3.5 py-1.5 text-[14px] font-bold text-primary-600 transition-colors hover:bg-primary-600 hover:text-white"
                          >
                            Mở Viewer <ArrowRight className="size-4" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Original Research Metrics Section (Styled with UMC Rounded-Top Blue Container) */}
        <section id="nghien-cuu" className="bg-linear-overview pt-6">
          <div className="rounded-t-[36px] bg-primary-600 py-16 text-white sm:rounded-t-[48px] sm:py-20">
            <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
              <h2 className="text-center text-[30px] font-bold text-white sm:text-[38px]">
                Từ dữ liệu lâm sàng đến nghiên cứu AI
              </h2>

              {/* 4 Original Research Metric Blocks */}
              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {researchCards.map((card) => (
                  <div
                    key={card.title}
                    className="flex h-full flex-col justify-between rounded-t-[16px] border-b-[8px] border-primary-800 bg-primary-75 p-7 text-primary-900 shadow-lg sm:p-8"
                  >
                    <p className="text-[15px] font-bold text-text-secondary">
                      {card.title}
                    </p>
                    <p className="mt-3 text-[36px] font-extrabold leading-none text-primary-600 tabular-nums sm:text-[42px]">
                      {card.metric}
                    </p>
                    <p className="mt-3 text-[14px] font-semibold text-primary-800">
                      {card.note}
                    </p>
                  </div>
                ))}
              </div>

              {/* 3 Original Performance Bar Cards (Sensitivity, Specificity, IoU / Dice) */}
              <div className="mt-6 grid gap-6 lg:grid-cols-3">
                {[
                  { label: "Sensitivity", value: "0.91" },
                  { label: "Specificity", value: "0.94" },
                  { label: "IoU / Dice", value: "0.63 / 0.71" },
                ].map((m) => (
                  <div
                    key={m.label}
                    className="rounded-2xl bg-white p-6 text-text shadow-lg"
                  >
                    <p className="text-[14px] font-bold text-text-secondary">
                      {m.label}
                    </p>
                    <p className="mt-1 text-[26px] font-extrabold text-primary-700 tabular-nums">
                      {m.value}
                    </p>
                    <div className="mt-4 flex h-16 items-end gap-1.5">
                      {[40, 55, 48, 70, 62, 78, 85, 72, 90, 88].map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-sm bg-primary-600/85"
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 8. Original Security Section */}
        <section id="bao-mat" className="border-b border-primary-100 bg-white py-20">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
            <h2 className="text-[30px] font-bold text-primary-800 sm:text-[36px]">
              Bảo mật và quản trị dữ liệu ngay trong quy trình
            </h2>
            <p className="mt-2 max-w-2xl text-[16px] text-text-secondary">
              Kiểm soát truy cập và truy vết — không tuyên bố chứng nhận khi hệ thống chưa
              đạt.
            </p>

            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {securityItems.map((item) => (
                <article
                  key={item.title}
                  className="h-full rounded-2xl border border-primary-100 border-b-[5px] border-b-primary-600 bg-white p-6 overview-wrapper-shadow"
                >
                  <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-primary-50 text-primary-600">
                    <item.icon className="size-6" />
                  </div>
                  <h3 className="text-[18px] font-bold text-primary-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-text-secondary">
                    {item.desc}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 9. Original Bottom CTA Section */}
        <section id="lien-he" className="bg-linear-overview py-20">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
            <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-primary-700 via-primary-600 to-primary-800 px-8 py-14 text-center text-white shadow-main-blue md:px-16">
              <BorderBeam size={280} duration={14} colorFrom="#52c8f4" colorTo="#ffffff" />
              <h2 className="relative text-[28px] font-bold tracking-tight sm:text-[36px]">
                Xây dựng quy trình X-quang rõ ràng hơn với AI hỗ trợ.
              </h2>
              <p className="relative mx-auto mt-3 max-w-xl text-[16px] text-primary-100">
                AI hỗ trợ phân tích. Bác sĩ quyết định chẩn đoán.
              </p>
              <div className="relative mt-8 flex flex-wrap justify-center gap-4">
                <Link
                  href="/dang-nhap"
                  className="inline-flex h-[48px] items-center justify-center rounded-xl bg-white px-6 text-[16px] font-bold text-primary-600 shadow-xs transition-colors hover:bg-primary-50"
                >
                  Yêu cầu Demo
                </Link>
                <Link
                  href="/dang-nhap"
                  className="inline-flex h-[48px] items-center justify-center rounded-xl border border-white/40 bg-white/10 px-6 text-[16px] font-bold text-white transition-colors hover:bg-white/20"
                >
                  Đăng nhập hệ thống
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Original Footer Content Styled in Medical Blue */}
      <footer className="bg-primary-800 text-primary-100">
        <div className="mx-auto grid max-w-[1280px] gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo variant="onDark" href="/" />
            <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-primary-100/90">
              Nền tảng Radiology Workflow + AI/XAI Decision Support cho quy trình
              X-quang ngực — AI hỗ trợ, bác sĩ quyết định.
            </p>
          </div>
          <div>
            <p className="text-[15px] font-bold text-white">Sản phẩm</p>
            <ul className="mt-3 space-y-2.5 text-[15px]">
              <li>
                <a href="#giai-phap" className="hover:text-white">
                  Giải pháp
                </a>
              </li>
              <li>
                <a href="#quy-trinh" className="hover:text-white">
                  Tài liệu quy trình
                </a>
              </li>
              <li>
                <a href="#bao-mat" className="hover:text-white">
                  Bảo mật
                </a>
              </li>
              <li>
                <a href="#lien-he" className="hover:text-white">
                  Liên hệ
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-[15px] font-bold text-white">Pháp lý</p>
            <ul className="mt-3 space-y-2.5 text-[15px]">
              <li>Điều khoản sử dụng</li>
              <li>Chính sách bảo mật</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-3 px-4 py-5 text-[13.5px] text-primary-200 sm:px-6">
            <span>© 2026 Hệ thống X-quang AI</span>
            <span>Kết quả AI hỗ trợ – Bác sĩ quyết định kết luận cuối cùng</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
