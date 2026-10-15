import { Suspense } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { reports } from "@/lib/demo-data";

export function generateStaticParams() {
  return reports.map((r) => ({ id: r.id }));
}

async function ReportDetail({ id }: { id: string }) {
  const report = reports.find((r) => r.id === id) ?? reports[0];
  const isFinal = report.status === "FINAL" || report.status === "AMENDED";

  return (
    <div>
      <PageHeader
        title="Chi tiết báo cáo"
        description={report.id}
        actions={
          <>
            <Button variant="secondary" size="sm">
              Xem PDF
            </Button>
            {isFinal ? (
              <Button size="sm">Tạo Amendment</Button>
            ) : (
              <Button size="sm">Xác nhận báo cáo</Button>
            )}
          </>
        }
      />
      <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
        <Card>
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <Badge tone={isFinal ? "success" : "warning"}>{report.status}</Badge>
            <Badge tone="neutral">{report.version}</Badge>
            {isFinal && (
              <span className="text-xs text-text-secondary">
                Không chỉnh sửa trực tiếp — tạo Amendment nếu cần.
              </span>
            )}
          </div>
          <dl className="mb-6 grid gap-3 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-text-secondary">Bệnh nhân</dt>
              <dd className="font-medium">{report.patient}</dd>
            </div>
            <div>
              <dt className="text-text-secondary">Study</dt>
              <dd className="font-medium">{report.study}</dd>
            </div>
            <div>
              <dt className="text-text-secondary">Bác sĩ</dt>
              <dd className="font-medium">{report.doctor}</dd>
            </div>
            <div>
              <dt className="text-text-secondary">Ngày ký</dt>
              <dd className="font-medium">{report.date} 11:23</dd>
            </div>
          </dl>
          <div className="space-y-4">
            <section>
              <h3 className="text-sm font-semibold">Kỹ thuật</h3>
              <p className="mt-1 text-sm text-text-secondary">
                {report.study}, kỹ thuật đạt yêu cầu. Accession liên kết ca {report.caseId}.
              </p>
            </section>
            <section>
              <h3 className="text-sm font-semibold">Findings</h3>
              <p className="mt-1 text-sm text-text-secondary">{report.findings}</p>
            </section>
            <section>
              <h3 className="text-sm font-semibold">Impression / Kết luận</h3>
              <p className="mt-1 text-sm text-text-secondary">{report.impression}</p>
            </section>
          </div>
        </Card>
        <div className="space-y-4">
          <Card>
            <h3 className="mb-2 text-sm font-semibold">AI tham khảo (nội bộ)</h3>
            <p className="text-xs text-ai">ChestXAI v2.1.0 · hỗ trợ — không thay bác sĩ</p>
            <p className="mt-2 text-[11px] text-text-secondary">
              Không xuất AI thô ra patient portal. Chỉ nội dung bác sĩ đã ký.
            </p>
            {report.caseId && (
              <Button href={`/viewer/${report.caseId}`} size="sm" variant="soft" className="mt-3">
                Mở Viewer
              </Button>
            )}
          </Card>
          <Card>
            <h3 className="mb-2 text-sm font-semibold">Phiên bản</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between">
                <span>Report v1</span>
                <Badge tone={report.status === "DRAFT" ? "warning" : "success"}>
                  {report.status === "AMENDED" ? "FINAL (cũ)" : report.status}
                </Badge>
              </li>
              {report.status === "AMENDED" && (
                <li className="flex justify-between">
                  <span>Report v2 – Amendment</span>
                  <Badge tone="info">AMENDED</Badge>
                </li>
              )}
            </ul>
            {isFinal && (
              <p className="mt-3 text-[11px] text-text-secondary">
                FINAL không sửa trực tiếp — dùng Tạo Amendment.
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
