import Link from "next/link";
import {
  AlertTriangle,
  CheckCircle2,
  FileCode2,
  ShieldCheck,
  Sparkles,
  Upload,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { DataTable, Td, Tr } from "@/components/ui/DataTable";
import { PageHeader } from "@/components/ui/PageHeader";
import { BorderBeam } from "@/components/magicui/BorderBeam";
import { studies } from "@/lib/demo-data";

export const metadata = { title: "Upload DICOM | Hệ thống X-quang AI" };

export default function DicomUploadPage() {
  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        breadcrumb="LÂM SÀNG & TIẾP NHẬN · THU NHẬN & UPLOAD DICOM"
        title="Upload DICOM"
        description="Tải Study/Series/Instance vào hệ thống. Hỗ trợ nhiều file · AI queue sau khi validate."
        actions={
          <Button href="/dashboard/hang-doi" size="sm" variant="secondary">
            ← Quay lại hàng đợi
          </Button>
        }
      />

      {/* DICOM Dropzone with BorderBeam */}
      <div className="relative overflow-hidden rounded-2xl border-2 border-dashed border-primary-300 bg-gradient-to-b from-white to-primary-50/50 p-10 text-center overview-wrapper-shadow">
        <BorderBeam size={280} duration={12} colorFrom="#0096d1" colorTo="#0d71ba" />
        <div className="mx-auto flex max-w-lg flex-col items-center justify-center">
          <div className="mb-4 flex size-16 items-center justify-center rounded-2xl border border-primary-200 bg-primary-50 text-primary-600 shadow-xs">
            <Upload className="size-7" />
          </div>
          <p className="text-xl font-extrabold text-primary-900">
            Kéo thả file DICOM vào đây
          </p>
          <p className="mt-1.5 text-sm text-text-secondary">
            hoặc chọn file từ máy tính (<code className="font-mono text-primary-700">.dcm</code>,{" "}
            <code className="font-mono text-primary-700">DICOMDIR</code>) · Chuẩn DICOM 3.0
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Button size="md">
              <Upload className="size-4" /> Chọn file từ máy trạm
            </Button>
            <Button href="/dashboard/studies" variant="secondary" size="md">
              Kho Studies PACS
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {/* Left: Upload Progress */}
        <Card accent="bottom">
          <div className="mb-5 flex items-center justify-between border-b border-primary-100 pb-3.5">
            <div className="flex items-center gap-2.5">
              <FileCode2 className="size-5 text-primary-600" />
              <h2 className="text-lg font-extrabold text-primary-900">
                Tiến trình upload (3 instances)
              </h2>
            </div>
            <Badge tone="primary">Đang truyền PACS</Badge>
          </div>
          <div className="space-y-4">
            {[
              { name: "IMG0001.dcm", sub: "Chest PA · 14-bit Grayscale · 8.4 MB", pct: 100 },
              { name: "IMG0002.dcm", sub: "Chest Lateral · 14-bit Grayscale · 7.9 MB", pct: 72 },
              { name: "IMG0003.dcm", sub: "Metadata & Presentation State · 1.2 MB", pct: 28 },
            ].map((item) => (
              <div
                key={item.name}
                className="rounded-xl border border-primary-100 bg-primary-50/40 p-3.5"
              >
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <div>
                    <span className="font-mono font-bold text-primary-900">
                      {item.name}
                    </span>
                    <span className="ml-2 text-xs text-text-secondary">{item.sub}</span>
                  </div>
                  <span className="font-mono text-xs font-extrabold text-primary-700 tabular-nums">
                    {item.pct}%
                  </span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-white shadow-2xs">
                  <div
                    className={`h-full rounded-full ${
                      item.pct === 100 ? "bg-emerald-600" : "bg-primary-600"
                    }`}
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Right: DICOM Header Validation */}
        <Card accent="bottom">
          <div className="mb-5 flex items-center justify-between border-b border-primary-100 pb-3.5">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="size-5 text-primary-600" />
              <h2 className="text-lg font-extrabold text-primary-900">
                Validation DICOM Tags
              </h2>
            </div>
            <Badge tone="success">Đạt chuẩn PACS</Badge>
          </div>

          <ul className="space-y-2.5 text-sm">
            {[
              ["StudyInstanceUID", "1.2.840.113619.2.55.3.20261011.001", true],
              ["SeriesInstanceUID", "1.2.840.113619.2.55.3.20261011.001.1", true],
              ["SOPInstanceUID", "1.2.840.113619.2.55.3.20261011.001.1.1", true],
              ["Modality", "DX (Digital Radiography — Chest PA)", true],
            ].map(([k, val, ok]) => (
              <li
                key={String(k)}
                className="flex items-center justify-between gap-3 rounded-xl border border-primary-100/80 bg-white px-3.5 py-2.5"
              >
                <div className="min-w-0">
                  <p className="font-bold text-primary-900">{k}</p>
                  <p className="truncate font-mono text-xs text-text-secondary">
                    {val}
                  </p>
                </div>
                <Badge tone={ok ? "success" : "critical"}>
                  {ok ? "✓ Hợp lệ" : "Lỗi"}
                </Badge>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3.5 py-2.5 text-xs font-semibold text-amber-800">
            <AlertTriangle className="size-4 shrink-0 text-amber-600" />
            <span>Cảnh báo: phát hiện 1 SOP Instance có thể trùng (đã bỏ qua).</span>
          </div>

          <div className="mt-3 flex items-center justify-between rounded-xl border border-primary-100 bg-primary-75/60 px-4 py-3 text-sm font-medium text-primary-900">
            <span>
              Study detected · Series: <strong>1</strong> · Instances: <strong>1</strong>
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-primary-600">
              <Sparkles className="size-3.5" /> Sẵn sàng chạy AI
            </span>
          </div>

          <div className="mt-5 flex flex-wrap gap-2.5">
            <Button href="/viewer/XR20261011-001" variant="secondary">
              Mở Study trên Viewer
            </Button>
            <Button href="/dashboard/worklist">Đưa vào AI Queue →</Button>
          </div>
        </Card>
      </div>

      {/* Recent Uploads Table */}
      <div className="mt-2">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-primary-900">
            Upload gần đây (hôm nay)
          </h2>
          <span className="text-xs font-semibold text-primary-600">
            6 ca mới nhất
          </span>
        </div>
        <DataTable
          headers={[
            "Accession Number",
            "Bệnh nhân",
            "Máy chụp & Kỹ thuật viên",
            "Thời gian thu nhận",
            "Trạng thái AI",
            "Thao tác",
          ]}
        >
          {studies.slice(0, 6).map((s) => (
            <Tr key={s.accession}>
              <Td>
                <span className="rounded-md bg-primary-75 px-2 py-0.5 font-mono text-xs font-extrabold text-primary-700">
                  {s.accession}
                </span>
              </Td>
              <Td>
                <Link
                  href={`/dashboard/benh-nhan/${s.patientId}`}
                  className="text-[15px] font-bold text-primary-900 hover:text-primary-600 hover:underline"
                >
                  {s.patient}
                </Link>
                <p className="mt-0.5 font-mono text-xs font-semibold text-primary-600">
                  {s.patientId}
                </p>
              </Td>
              <Td>
                <p className="font-bold text-primary-900">{s.machine}</p>
                <p className="mt-0.5 text-xs text-text-secondary">KTV: {s.tech}</p>
              </Td>
              <Td className="text-xs font-semibold text-text-secondary tabular-nums">
                {s.time}
              </Td>
              <Td>
                <Badge
                  tone={
                    s.ai === "Hoàn tất"
                      ? "success"
                      : s.ai === "Lỗi"
                        ? "critical"
                        : "warning"
                  }
                >
                  {s.ai === "Hoàn tất" ? (
                    <CheckCircle2 className="size-3.5" />
                  ) : null}
                  {s.ai}
                </Badge>
              </Td>
              <Td>
                <Button href={`/viewer/${s.caseId}`} size="sm" variant="primary">
                  Mở Viewer →
                </Button>
              </Td>
            </Tr>
          ))}
        </DataTable>
      </div>
    </div>
  );
}
