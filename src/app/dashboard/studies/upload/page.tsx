import { Upload } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { DataTable, Td, Tr } from "@/components/ui/DataTable";
import { PageHeader } from "@/components/ui/PageHeader";
import { studies } from "@/lib/demo-data";

export const metadata = { title: "Upload DICOM" };

export default function DicomUploadPage() {
  return (
    <div>
      <PageHeader
        title="Upload DICOM"
        description="Tải Study/Series/Instance vào hệ thống. Hỗ trợ nhiều file · AI queue sau khi validate."
        actions={
          <Button href="/dashboard/hang-doi" size="sm" variant="secondary">
            Quay lại hàng đợi
          </Button>
        }
      />
      <Card className="mb-4 border-dashed">
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-[12px] bg-primary-soft text-primary">
            <Upload className="h-6 w-6" />
          </div>
          <p className="text-lg font-semibold">Kéo thả file DICOM vào đây</p>
          <p className="mt-1 text-sm text-text-secondary">
            hoặc chọn file từ máy tính (.dcm)
          </p>
          <Button className="mt-5" size="sm">
            Chọn file
          </Button>
        </div>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <h2 className="mb-3 text-lg font-semibold">Tiến trình upload</h2>
          <div className="space-y-3">
            {[
              ["IMG0001.dcm", 100],
              ["IMG0002.dcm", 72],
              ["IMG0003.dcm", 28],
            ].map(([name, pct]) => (
              <div key={String(name)}>
                <div className="mb-1 flex justify-between text-sm">
                  <span>{name}</span>
                  <span className="text-text-secondary">{pct}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <h2 className="mb-3 text-lg font-semibold">Validation</h2>
          <ul className="space-y-2 text-sm">
            {[
              ["StudyInstanceUID", true],
              ["SeriesInstanceUID", true],
              ["SOPInstanceUID", true],
              ["Modality", true],
            ].map(([k, ok]) => (
              <li key={String(k)} className="flex items-center justify-between">
                <span>{k}</span>
                <Badge tone={ok ? "success" : "critical"}>{ok ? "✓ Hợp lệ" : "Lỗi"}</Badge>
              </li>
            ))}
          </ul>
          <div className="mt-4 rounded-[8px] border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
            Cảnh báo: phát hiện 1 SOP Instance có thể trùng (đã bỏ qua).
          </div>
          <div className="mt-4 rounded-[8px] border border-border bg-background p-3 text-sm">
            <p>
              Study detected · Series: <strong>1</strong> · Instances: <strong>1</strong>
            </p>
          </div>
          <div className="mt-4 flex gap-2">
            <Button href="/viewer/XR20261011-001" variant="secondary">
              Mở Study
            </Button>
            <Button href="/dashboard/worklist">Đưa vào AI Queue</Button>
          </div>
        </Card>
      </div>

      <h2 className="mb-3 mt-8 text-lg font-semibold">Upload gần đây (hôm nay)</h2>
      <DataTable
        headers={["Accession", "Bệnh nhân", "Máy / KTV", "Thời gian", "AI", "Thao tác"]}
      >
        {studies.slice(0, 6).map((s) => (
          <Tr key={s.accession}>
            <Td className="font-mono text-xs">{s.accession}</Td>
            <Td>
              <p className="font-medium">{s.patient}</p>
              <p className="text-xs text-text-secondary">{s.patientId}</p>
            </Td>
            <Td className="text-xs">
              {s.machine} · {s.tech}
            </Td>
            <Td className="text-xs">{s.time}</Td>
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
                {s.ai}
              </Badge>
            </Td>
            <Td>
              <Button href={`/viewer/${s.caseId}`} size="sm" variant="soft">
                Viewer
              </Button>
            </Td>
          </Tr>
        ))}
      </DataTable>
    </div>
  );
}
