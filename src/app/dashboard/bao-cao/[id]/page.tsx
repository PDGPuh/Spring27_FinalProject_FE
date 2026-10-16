import { Suspense } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Download,
  FileCheck2,
  FileText,
  History,
  ShieldCheck,
  Sparkles,
  Stethoscope,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { BorderBeam } from "@/components/magicui/BorderBeam";
import { reports } from "@/lib/demo-data";

export function generateStaticParams() {
  return reports.map((r) => ({ id: r.id }));
}

async function ReportDetail({ id }: { id: string }) {
  const report = reports.find((r) => r.id === id) ?? reports[0];
  const isFinal = report.status === "FINAL" || report.status === "AMENDED";

  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        breadcrumb={
          <span>
            Báo cáo / <span className="text-primary-900">{report.id}</span>
          </span>
        }
        title="Chi tiết báo cáo chẩn đoán hình ảnh"
        description={`Mã báo cáo: ${report.id} · Bệnh nhân: ${report.patient} (${report.patientId}) · Phiên bản ${report.version}`}
        actions={
          <>
            <Button href="/dashboard/bao-cao" variant="outline" size="sm">
              ← Danh sách
            </Button>
            <Button variant="secondary" size="sm">
              <Download className="size-4" /> Xuất PDF
            </Button>
            {isFinal ? (
              <Button size="sm">Tạo Amendment (v2)</Button>
            ) : (
              <Button size="sm">
                <CheckCircle2 className="size-4" /> Xác nhận & Ký báo cáo
              </Button>
            )}
          </>
        }
      />

      <div className="grid gap-5 lg:grid-cols-[1fr_340px]">
        {/* Formal Clinical Diagnostic Report Document */}
        <div className="relative overflow-hidden rounded-2xl border border-primary-100 border-b-[5px] border-b-primary-600 bg-white p-6 sm:p-8 overview-wrapper-shadow">
          <BorderBeam size={260} duration={12} colorFrom="#0096d1" colorTo="#0d71ba" />

          {/* Document Header Strip */}
          <div className="flex flex-wrap items-start justify-between gap-4 border-b-2 border-primary-100 pb-5">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.06em] text-primary-600">
                BV ĐA KHOA TRUNG ƯƠNG · KHOA CHẨN ĐOÁN HÌNH ẢNH
              </p>
              <h2 className="mt-1 text-xl font-extrabold text-primary-900">
                PHIẾU KẾT QUẢ CHẨN ĐOÁN HÌNH ẢNH X-QUANG
              </h2>
              <p className="mt-1 text-xs text-text-secondary">
                Mã phiếu: <strong className="font-mono text-primary-800">{report.id}</strong>{" "}
                · Ca chụp:{" "}
                <strong className="font-mono text-primary-800">{report.caseId}</strong>
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone={isFinal ? "success" : "warning"}>{report.status}</Badge>
              <Badge tone="primary">Phiên bản {report.version}</Badge>
            </div>
          </div>

          {isFinal && (
            <div className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50/70 px-4 py-2.5 text-xs font-semibold text-emerald-900">
              <ShieldCheck className="size-4 shrink-0 text-emerald-600" />
              <span>
                Báo cáo đã được ký số (Clinical Sign-off). Không chỉnh sửa trực tiếp — tạo
                Amendment nếu cần bổ sung nhận định.
              </span>
            </div>
          )}

          {/* Administrative Patient Box */}
          <dl className="mt-5 grid gap-4 rounded-xl border border-primary-100 bg-primary-50/45 p-4 text-sm sm:grid-cols-2 md:grid-cols-4">
            <div>
              <dt className="text-xs font-semibold text-text-secondary">Bệnh nhân</dt>
              <dd className="mt-0.5 font-extrabold text-primary-900">
                <Link
                  href={`/dashboard/benh-nhan/${report.patientId}`}
                  className="hover:text-primary-600 hover:underline"
                >
                  {report.patient}
                </Link>
              </dd>
              <dd className="font-mono text-xs text-primary-600">{report.patientId}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold text-text-secondary">Kỹ thuật chụp</dt>
              <dd className="mt-0.5 font-bold text-primary-900">{report.study}</dd>
              <dd className="text-xs text-text-secondary">DICOM DX / CR</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold text-text-secondary">Bác sĩ đọc phim</dt>
              <dd className="mt-0.5 font-bold text-primary-900">{report.doctor}</dd>
              <dd className="text-xs text-text-secondary">Bác sĩ CĐHA</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold text-text-secondary">Thời điểm ký số</dt>
              <dd className="mt-0.5 font-bold text-primary-900 tabular-nums">
                {report.date} · 11:23
              </dd>
              <dd className="text-xs text-emerald-700 font-semibold">Đã xác thực chữ ký</dd>
            </div>
          </dl>

          {/* Structured Clinical Report Sections */}
          <div className="mt-6 space-y-5">
            <section className="rounded-xl border border-primary-100 bg-white p-4">
              <h3 className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.04em] text-primary-700">
                <FileText className="size-4 text-primary-600" /> 1. Kỹ thuật thực hiện
                (Technique)
              </h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-primary-950">
                {report.study}, tư thế chuẩn, chất lượng tia và độ tương phản đạt yêu cầu
                chẩn đoán. Accession liên kết ca chụp{" "}
                <strong className="font-mono text-primary-700">{report.caseId}</strong>.
              </p>
            </section>

            <section className="rounded-xl border border-primary-100 bg-white p-4">
              <h3 className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.04em] text-primary-700">
                <Stethoscope className="size-4 text-primary-600" /> 2. Mô tả hình ảnh
                (Findings)
              </h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-primary-950">
                {report.findings}
              </p>
            </section>

            <section className="rounded-xl border-2 border-primary-200 bg-primary-50/50 p-5">
              <h3 className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.04em] text-primary-800">
                <FileCheck2 className="size-4 text-primary-600" /> 3. Kết luận chẩn đoán
                (Impression)
              </h3>
              <p className="mt-2 text-[15.5px] font-bold leading-relaxed text-primary-900">
                {report.impression}
              </p>
            </section>
          </div>

          {/* Digital Sign-off Footer */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-primary-100 pt-5 text-xs text-text-secondary">
            <div>
              <p className="font-bold text-primary-800">
                Chữ ký số chuyên khoa: {report.doctor}
              </p>
              <p className="mt-0.5">
                Hệ thống X-quang AI · Lưu vết kiểm toán (Audit Trail) toàn vẹn
              </p>
            </div>
            {report.caseId && (
              <Button href={`/viewer/${report.caseId}`} size="sm" variant="primary">
                Mở lại phim trên Radiology Viewer →
              </Button>
            )}
          </div>
        </div>

        {/* Right Sidebar: AI Internal Reference & Version History */}
        <div className="flex flex-col gap-5">
          <Card accent="bottom">
            <div className="mb-3 flex items-center gap-2">
              <Sparkles className="size-5 text-primary-600" />
              <h3 className="text-base font-extrabold text-primary-900">
                AI tham khảo (Nội bộ)
              </h3>
            </div>
            <div className="rounded-xl bg-primary-50/70 p-3.5 text-xs">
              <p className="font-bold text-primary-800">
                ChestXAI v2.1.0 · Hỗ trợ quyết định lâm sàng
              </p>
              <p className="mt-1.5 leading-relaxed text-text-secondary">
                Không xuất kết quả AI thô ra Cổng thông tin bệnh nhân (Patient Portal). Chỉ
                hiển thị nội dung bác sĩ chuyên khoa đã thẩm định và ký duyệt.
              </p>
            </div>
            {report.caseId && (
              <Button
                href={`/viewer/${report.caseId}`}
                size="sm"
                variant="secondary"
                className="mt-4 w-full"
              >
                Xem bản đồ nhiệt XAI trên Viewer
              </Button>
            )}
          </Card>

          <Card accent="bottom">
            <div className="mb-3.5 flex items-center gap-2">
              <History className="size-5 text-primary-600" />
              <h3 className="text-base font-extrabold text-primary-900">
                Lịch sử phiên bản (Versioning)
              </h3>
            </div>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center justify-between rounded-xl border border-primary-100 bg-primary-50/40 px-3.5 py-2.5">
                <div>
                  <p className="font-bold text-primary-900">Report v1</p>
                  <p className="text-xs text-text-secondary">{report.date} · 11:23</p>
                </div>
                <Badge tone={report.status === "DRAFT" ? "warning" : "success"}>
                  {report.status === "AMENDED" ? "FINAL (cũ)" : report.status}
                </Badge>
              </li>
              {report.status === "AMENDED" && (
                <li className="flex items-center justify-between rounded-xl border border-primary-200 bg-white px-3.5 py-2.5">
                  <div>
                    <p className="font-bold text-primary-900">Report v2 – Amendment</p>
                    <p className="text-xs text-text-secondary">Bổ sung đối chiếu lâm sàng</p>
                  </div>
                  <Badge tone="info">AMENDED</Badge>
                </li>
              )}
            </ul>
            {isFinal && (
              <p className="mt-3.5 text-xs leading-relaxed text-text-secondary">
                Báo cáo ở trạng thái <strong>FINAL</strong> được khóa chỉnh sửa trực tiếp để
                đảm bảo tính pháp lý của hồ sơ bệnh án điện tử.
              </p>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

export default async function ReportDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <Suspense fallback={<div className="text-sm text-text-secondary">Đang tải báo cáo...</div>}>
      <ReportDetail id={id} />
    </Suspense>
  );
}
