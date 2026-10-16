import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  AlertCircle,
  Building2,
  CalendarDays,
  ClipboardList,
  CreditCard,
  FileText,
  Sparkles,
  Stethoscope,
  UserRound,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { Tabs } from "@/components/ui/Tabs";
import { BorderBeam } from "@/components/magicui/BorderBeam";
import { DEMO_CXR, getCaseThumbnail } from "@/lib/cxr-images";
import {
  getOrdersForPatient,
  getPatient,
  getStudiesForPatient,
  patients,
  reports,
  worklistCases,
} from "@/lib/demo-data";

export function generateStaticParams() {
  return patients.map((p) => ({ id: p.id }));
}

async function PatientDetail({ id }: { id: string }) {
  const p = getPatient(id);
  const patientCase = worklistCases.find((c) => c.patientId === id);
  const orders = getOrdersForPatient(id);
  const patientStudies = getStudiesForPatient(id);
  const patientReports = reports.filter((r) => r.patientId === id);
  const currentThumb = patientCase
    ? getCaseThumbnail(patientCase.id)
    : DEMO_CXR.normal;
  const priorThumb = DEMO_CXR.normalAlt;
  const viewerHref = patientCase
    ? `/viewer/${patientCase.id}`
    : "/dashboard/worklist";

  const initials = p.name
    .split(" ")
    .slice(-2)
    .map((w) => w[0])
    .join("");

  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        title={p.name}
        description={`Mã hồ sơ: ${p.id} · ${p.gender} · ${p.age} tuổi (${p.dob}) · ${p.facility}`}
        breadcrumb={
          <span>
            Bệnh nhân / <span className="text-primary-900">{p.name}</span>
          </span>
        }
        actions={
          <>
            <Button href="/dashboard/chi-dinh" size="sm">
              + Tạo chỉ định
            </Button>
            <Button href="/dashboard/dat-lich" variant="secondary" size="sm">
              Đặt lịch chụp
            </Button>
            <Button href="/dashboard/benh-nhan/them" variant="outline" size="sm">
              Chỉnh sửa
            </Button>
          </>
        }
      />

      {/* Clinical Summary Strip */}
      <div className="grid gap-4 rounded-2xl border border-primary-100 bg-white p-5 overview-wrapper-shadow lg:grid-cols-12">
        <div className="flex items-center gap-4 lg:col-span-5">
          <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl border-2 border-primary-200 bg-primary-50 text-lg font-extrabold text-primary-700">
            {initials}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-md bg-primary-75 px-2.5 py-0.5 font-mono text-xs font-extrabold text-primary-700">
                {p.id}
              </span>
              <Badge tone={p.status === "Hoạt động" ? "success" : "neutral"}>
                {p.status}
              </Badge>
              <Badge tone="primary">{p.facility}</Badge>
            </div>
            <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-primary-900">
              <Stethoscope className="size-4 text-primary-600" />
              BS chỉ định: {p.referringDoctor}
            </p>
            <p className="mt-1 flex items-center gap-2 text-xs text-text-secondary">
              <CreditCard className="size-3.5 text-primary-500" />
              BHYT: <span className="font-mono font-bold text-primary-800">{p.bhyt}</span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:col-span-7">
          <div className="rounded-xl border border-primary-100 bg-primary-50/50 p-3.5">
            <p className="text-[11px] font-bold uppercase text-text-secondary">Số Study</p>
            <p className="mt-1 text-2xl font-extrabold text-primary-900 tabular-nums">
              {p.studies}
            </p>
            <p className="mt-0.5 text-xs text-primary-600">Lưu trữ PACS</p>
          </div>
          <div className="rounded-xl border border-primary-100 bg-primary-50/50 p-3.5">
            <p className="text-[11px] font-bold uppercase text-text-secondary">Chỉ định</p>
            <p className="mt-1 text-2xl font-extrabold text-primary-900 tabular-nums">
              {orders.length || 1}
            </p>
            <p className="mt-0.5 text-xs text-primary-600">Phiếu chụp X-quang</p>
          </div>
          <div className="rounded-xl border border-primary-100 bg-primary-50/50 p-3.5">
            <p className="text-[11px] font-bold uppercase text-text-secondary">Chụp gần nhất</p>
            <p className="mt-1 text-base font-extrabold text-primary-900 tabular-nums">
              {p.lastScan}
            </p>
            <p className="mt-0.5 text-xs text-primary-600">X-quang ngực PA</p>
          </div>
          <div
            className={`rounded-xl border p-3.5 ${
              p.allergies !== "Không"
                ? "border-amber-200 bg-amber-50/70"
                : "border-emerald-200 bg-emerald-50/60"
            }`}
          >
            <p className="flex items-center gap-1 text-[11px] font-bold uppercase text-text-secondary">
              <AlertCircle className="size-3.5 text-amber-600" /> Dị ứng
            </p>
            <p className="mt-1 text-sm font-extrabold text-primary-900">{p.allergies}</p>
            <p className="mt-0.5 text-xs text-text-secondary">Cảnh báo lâm sàng</p>
          </div>
        </div>
      </div>

      <Tabs
        active="tong-quan"
        items={[
          { id: "tong-quan", label: "Tổng quan" },
          { id: "lich-su", label: "Lịch sử chụp", count: patientStudies.length || p.studies },
          { id: "chi-dinh", label: "Chỉ định", count: orders.length },
          { id: "bao-cao", label: "Báo cáo", count: patientReports.length },
          { id: "hoat-dong", label: "Hoạt động" },
        ]}
      />

      <div className="grid gap-5 lg:grid-cols-[1fr_1.3fr]">
        {/* Left: Administrative & Clinical Details */}
        <div className="flex flex-col gap-5">
          <Card accent="bottom">
            <div className="mb-4 flex items-center gap-2.5 border-b border-primary-100 pb-3">
              <UserRound className="size-5 text-primary-600" />
              <h2 className="text-lg font-extrabold text-primary-900">Thông tin bệnh nhân</h2>
            </div>
            <dl className="space-y-3 text-[14px]">
              {[
                ["Ngày sinh", `${p.dob} (${p.age} tuổi)`],
                ["Giới tính", p.gender],
                ["Điện thoại", p.phone],
                ["Email", p.email],
                ["Địa chỉ", p.address],
                ["Mã thẻ BHYT", p.bhyt],
                ["Tiền sử dị ứng", p.allergies],
                ["BS chỉ định", p.referringDoctor],
                ["Cơ sở quản lý", p.facility],
                ["Tổng số Study", `${p.studies} ca chụp`],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="flex justify-between gap-4 border-b border-primary-100/70 pb-2.5 last:border-b-0 last:pb-0"
                >
                  <dt className="font-medium text-text-secondary">{k}</dt>
                  <dd className="text-right font-bold text-primary-900">{v}</dd>
                </div>
              ))}
            </dl>
          </Card>

          {orders.length > 0 && (
            <Card accent="left">
              <div className="mb-3.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ClipboardList className="size-5 text-primary-600" />
                  <h3 className="text-base font-extrabold text-primary-900">
                    Chỉ định gần đây
                  </h3>
                </div>
                <Badge tone="primary">{orders.length} phiếu</Badge>
              </div>
              <ul className="space-y-2.5">
                {orders.map((o) => (
                  <li
                    key={o.id}
                    className="rounded-xl border border-primary-100 bg-primary-50/45 p-3.5 text-sm"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="rounded bg-white px-2 py-0.5 font-mono text-xs font-extrabold text-primary-700 shadow-2xs">
                        {o.id}
                      </span>
                      <Badge tone="primary">{o.status}</Badge>
                    </div>
                    <p className="mt-2 font-bold text-primary-900">{o.exam}</p>
                    <p className="mt-1 text-xs text-text-secondary">
                      Ưu tiên lâm sàng: <strong>{o.clinicalPriority}</strong> · Tạo lúc:{" "}
                      <span className="tabular-nums">{o.createdAt}</span>
                    </p>
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </div>

        {/* Right: Imaging Timeline & Studies */}
        <Card accent="bottom">
          <div className="mb-5 flex items-center justify-between border-b border-primary-100 pb-3.5">
            <div className="flex items-center gap-2.5">
              <Activity className="size-5 text-primary-600" />
              <div>
                <h2 className="text-lg font-extrabold text-primary-900">
                  Lịch sử chụp X-quang (Timeline)
                </h2>
                <p className="text-xs text-text-secondary">
                  Đối chiếu phim hiện tại và phim cũ (Prior Study Comparison)
                </p>
              </div>
            </div>
            <Button href={viewerHref} size="sm">
              Mở Radiology Viewer →
            </Button>
          </div>

          <ol className="space-y-5">
            {/* Active Current Study */}
            <li className="relative overflow-hidden rounded-2xl border border-primary-200 bg-primary-50/40 p-4 sm:p-5">
              <BorderBeam size={220} duration={11} colorFrom="#0096d1" colorTo="#0d71ba" />
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  href={viewerHref}
                  className="group relative h-28 w-24 shrink-0 overflow-hidden rounded-xl border-2 border-primary-500 bg-viewer-bg shadow-sm"
                >
                  <Image
                    src={currentThumb}
                    alt="Study hiện tại"
                    fill
                    className="object-cover object-center transition-transform duration-200 group-hover:scale-105"
                    sizes="96px"
                  />
                  <span className="absolute bottom-1 left-1 right-1 rounded bg-black/80 px-1 py-0.5 text-center font-mono text-[9.5px] font-bold text-white">
                    PA · HIỆN TẠI
                  </span>
                </Link>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-700 tabular-nums">
                      <CalendarDays className="size-3.5" />
                      {patientCase?.studyDate ?? p.lastScan}
                    </span>
                    <Badge tone="warning">Chờ bác sĩ xác nhận</Badge>
                  </div>

                  <p className="mt-1.5 text-base font-extrabold text-primary-900">
                    X-quang ngực thẳng (Chest PA)
                  </p>

                  <div className="mt-2.5 rounded-xl border border-primary-100 bg-white p-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="inline-flex items-center gap-1.5 font-bold text-primary-800">
                        <Sparkles className="size-3.5 text-primary-600" />
                        Gợi ý AI:{" "}
                        {patientCase
                          ? `${patientCase.aiFinding} (${patientCase.aiConfidence}%)`
                          : "Đông đặc thùy dưới phổi P (84%)"}
                      </span>
                      <span className="font-mono text-[11px] font-semibold text-primary-600">
                        ChestXAI v2.1.0
                      </span>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-primary-50">
                      <div
                        className="h-full rounded-full bg-primary-600"
                        style={{ width: `${patientCase?.aiConfidence ?? 84}%` }}
                      />
                    </div>
                  </div>

                  <div className="mt-3.5 flex flex-wrap gap-2">
                    <Button href={viewerHref} size="sm">
                      Xem ảnh & Bản đồ nhiệt XAI
                    </Button>
                    <Button href="/dashboard/bao-cao" size="sm" variant="secondary">
                      <FileText className="size-3.5" /> Xem báo cáo
                    </Button>
                  </div>
                </div>
              </div>
            </li>

            {/* Prior Study */}
            <li className="rounded-2xl border border-primary-100 bg-white p-4 sm:p-5">
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="relative h-28 w-24 shrink-0 overflow-hidden rounded-xl border border-primary-200 bg-viewer-bg">
                  <Image
                    src={priorThumb}
                    alt="Study trước"
                    fill
                    className="object-cover object-center"
                    sizes="96px"
                  />
                  <span className="absolute bottom-1 left-1 right-1 rounded bg-black/75 px-1 py-0.5 text-center font-mono text-[9.5px] font-semibold text-white/90">
                    PRIOR · CŨ
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-secondary tabular-nums">
                      <CalendarDays className="size-3.5 text-primary-600" />
                      10/03/2026 · 09:20
                    </span>
                    <Badge tone="success">Đã ký số · Bình thường</Badge>
                  </div>

                  <p className="mt-1.5 text-base font-extrabold text-primary-900">
                    X-quang ngực thẳng (Chest PA — Phim cũ đối chiếu)
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">
                    Trường phổi hai bên sáng đều, bóng tim không to, góc sườn hoành hai bên
                    nhọn. Dùng làm phim cơ sở (Baseline Prior) để so sánh tiến triển.
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <Button href="/dashboard/bao-cao" size="sm" variant="secondary">
                      <FileText className="size-3.5" /> Xem báo cáo đã ký
                    </Button>
                    <Button href={viewerHref} size="sm" variant="ghost">
                      So sánh Side-by-Side →
                    </Button>
                  </div>
                </div>
              </div>
            </li>
          </ol>
        </Card>
      </div>
    </div>
  );
}

export default async function PatientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <Suspense fallback={<div className="text-sm text-text-secondary">Đang tải hồ sơ...</div>}>
      <PatientDetail id={id} />
    </Suspense>
  );
}
