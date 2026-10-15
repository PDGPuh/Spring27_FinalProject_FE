import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { DataTable, Td, Tr } from "@/components/ui/DataTable";
import { FilterBar, FilterSelect } from "@/components/ui/FilterBar";
import { PageHeader } from "@/components/ui/PageHeader";
import { getCaseThumbnail } from "@/lib/cxr-images";
import { aiInferences, studies } from "@/lib/demo-data";

export const metadata = { title: "Studies" };

const aiTone = {
  "Hoàn tất": "success" as const,
  "Đang xử lý": "warning" as const,
  "Chưa chạy": "neutral" as const,
  Lỗi: "critical" as const,
};

export default function StudiesPage() {
  return (
    <div>
      <PageHeader
        title="Studies"
        description="Quản lý Study DICOM, metadata và trạng thái AI (model version · threshold · latency)."
        actions={
          <Button href="/dashboard/studies/upload" size="sm">
            Upload DICOM
          </Button>
        }
      />

      <div className="mb-4 grid gap-3 sm:grid-cols-4">
        {[
          ["Studies (mẫu)", String(studies.length)],
          ["AI hoàn tất", String(studies.filter((s) => s.ai === "Hoàn tất").length)],
          ["AI lỗi", String(studies.filter((s) => s.ai === "Lỗi").length)],
          ["Đang xử lý", String(studies.filter((s) => s.ai === "Đang xử lý").length)],
        ].map(([l, v]) => (
          <Card key={l} className="!p-4">
            <p className="text-xs text-text-secondary">{l}</p>
            <p className="mt-1 text-[28px] font-semibold">{v}</p>
          </Card>
        ))}
      </div>

      <FilterBar searchPlaceholder="Patient ID, Study UID, Accession, tên bệnh nhân">
        <FilterSelect label="Modality" options={["CR", "DX"]} />
        <FilterSelect label="AI Status" options={["Hoàn tất", "Đang xử lý", "Lỗi"]} />
        <FilterSelect label="Báo cáo" options={["Chờ đọc", "Chưa có", "FINAL", "Đang đọc"]} />
      </FilterBar>
      <DataTable
        headers={[
          "Ảnh",
          "Bệnh nhân",
          "Study / Accession",
          "Modality",
          "Mô tả",
          "Máy / KTV",
          "Series",
          "Thời gian",
          "AI",
          "Báo cáo",
          "Thao tác",
        ]}
        minWidth="1200px"
      >
        {studies.map((s) => {
          const inf = aiInferences.find((i) => i.caseId === s.caseId);
          return (
            <Tr key={s.study}>
              <Td>
                <Link
                  href={`/viewer/${s.caseId}`}
                  className="relative block h-12 w-10 overflow-hidden rounded border border-border bg-viewer-bg"
                >
                  <Image
                    src={getCaseThumbnail(s.caseId)}
                    alt={`Study ${s.accession}`}
                    fill
                    className="object-cover object-center"
                    sizes="40px"
                  />
                </Link>
              </Td>
              <Td>
                <p className="font-medium">{s.patient}</p>
                <p className="text-xs text-text-secondary">{s.patientId}</p>
              </Td>
              <Td>
                <p className="max-w-[180px] truncate font-mono text-[11px]">{s.study}</p>
                <p className="text-xs text-text-secondary">{s.accession}</p>
              </Td>
              <Td>{s.modality}</Td>
              <Td>{s.description}</Td>
              <Td>
                <p className="text-xs">{s.machine}</p>
                <p className="text-xs text-text-secondary">{s.tech}</p>
              </Td>
              <Td>
                {s.series}/{s.instances}
              </Td>
              <Td className="text-xs">{s.time}</Td>
              <Td>
                <Badge tone={aiTone[s.ai as keyof typeof aiTone]}>{s.ai}</Badge>
                {inf && inf.status === "Hoàn tất" && (
                  <p className="mt-1 text-[10px] text-ai">
                    {inf.version} · {inf.latencyMs}ms
                  </p>
                )}
              </Td>
              <Td>
                <Badge tone="neutral">{s.report}</Badge>
              </Td>
              <Td>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href={`/viewer/${s.caseId}`}
                    className="text-sm font-medium text-primary"
                  >
                    Mở Viewer
                  </Link>
                  {s.ai === "Lỗi" && (
                    <button type="button" className="text-sm font-medium text-warning">
                      Chạy lại AI
                    </button>
                  )}
                </div>
              </Td>
            </Tr>
          );
        })}
      </DataTable>
    </div>
  );
}
