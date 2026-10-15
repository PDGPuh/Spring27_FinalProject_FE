import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { Tabs } from "@/components/ui/Tabs";
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

  return (
    <div>
      <PageHeader
        title={p.name}
        description={p.id}
        breadcrumb={
          <span>
            Bệnh nhân / <span className="text-text">{p.name}</span>
          </span>
        }
        actions={
          <>
            <Button href="/dashboard/chi-dinh" size="sm">
              Tạo chỉ định
            </Button>
            <Button href="/dashboard/dat-lich" variant="secondary" size="sm">
              Đặt lịch
            </Button>
            <Button href="/dashboard/benh-nhan/them" variant="outline" size="sm">
              Chỉnh sửa
            </Button>
          </>
        }
      />
      <div className="mb-4 flex flex-wrap gap-2">
        <Badge tone="neutral">{p.gender}</Badge>
        <Badge tone="neutral">{p.age} tuổi</Badge>
        <Badge tone="primary">{p.facility}</Badge>
        <Badge tone={p.status === "Hoạt động" ? "success" : "neutral"}>{p.status}</Badge>
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

      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_1.2fr]">
        <Card>
          <h2 className="mb-4 text-lg font-semibold">Thông tin bệnh nhân</h2>
          <dl className="space-y-3 text-sm">
            {[
              ["Ngày sinh", p.dob],
              ["Điện thoại", p.phone],
              ["Email", p.email],
              ["Địa chỉ", p.address],
              ["BHYT", p.bhyt],
              ["Dị ứng", p.allergies],
              ["BS chỉ định", p.referringDoctor],
              ["Cơ sở", p.facility],
              ["Số Study", String(p.studies)],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 border-b border-border pb-2">
                <dt className="text-text-secondary">{k}</dt>
                <dd className="text-right font-medium">{v}</dd>
              </div>
            ))}
          </dl>
          {orders.length > 0 && (
            <div className="mt-5">
              <h3 className="mb-2 text-sm font-semibold">Chỉ định gần đây</h3>
              <ul className="space-y-2">
                {orders.map((o) => (
                  <li
                    key={o.id}
                    className="rounded-[8px] border border-border bg-background px-3 py-2 text-xs"
                  >
                    <div className="flex justify-between gap-2">
                      <span className="font-mono font-medium">{o.id}</span>
                      <Badge tone="primary">{o.status}</Badge>
                    </div>
                    <p className="mt-1 text-text-secondary">
                      {o.exam} · {o.clinicalPriority} · {o.createdAt}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Card>

        <Card>
          <h2 className="mb-4 text-lg font-semibold">Lịch sử chụp</h2>
          <ol className="space-y-4">
            <li className="relative border-l-2 border-primary pl-4">
              <div className="flex gap-3">
                <Link
                  href={viewerHref}
                  className="relative h-16 w-12 shrink-0 overflow-hidden rounded border border-border bg-viewer-bg"
                >
                  <Image
                    src={currentThumb}
                    alt="Study hiện tại"
                    fill
                    className="object-cover object-center"
                    sizes="48px"
                  />
                </Link>
                <div className="min-w-0">
                  <p className="text-xs text-text-secondary">
                    {patientCase?.studyDate ?? p.lastScan}
                  </p>
                  <p className="mt-1 text-sm font-semibold">X-quang ngực PA</p>
                  <p className="mt-1 text-xs text-ai">
                    AI: {patientCase
                      ? `${patientCase.aiFinding} ${patientCase.aiConfidence}%`
                      : "—"}{" "}
                    · Model v2.1.0
                  </p>
                  <p className="mt-1 text-xs">
                    Báo cáo: <Badge tone="warning">Chờ xác nhận</Badge>
                  </p>
                  <div className="mt-2 flex gap-2">
                    <Button href={viewerHref} size="sm" variant="soft">
                      Xem ảnh
                    </Button>
                    <Button href="/dashboard/bao-cao" size="sm" variant="outline">
                      Xem báo cáo
                    </Button>
                  </div>
                </div>
              </div>
            </li>
            <li className="relative border-l-2 border-border pl-4">
              <div className="flex gap-3">
                <div className="relative h-16 w-12 shrink-0 overflow-hidden rounded border border-border bg-viewer-bg">
                  <Image
                    src={priorThumb}
                    alt="Study trước"
                    fill
                    className="object-cover object-center"
                    sizes="48px"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-text-secondary">10/03/2026</p>
                  <p className="mt-1 text-sm font-semibold">X-quang ngực PA</p>
                  <p className="mt-1 text-xs">
                    Kết luận: <Badge tone="success">Bình thường</Badge>
                  </p>
                  <div className="mt-2 flex gap-2">
                    <Link href="/dashboard/bao-cao" className="text-sm font-medium text-primary">
                      Xem báo cáo
                    </Link>
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
