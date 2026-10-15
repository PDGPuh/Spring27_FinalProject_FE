import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { DataTable, Td, Tr } from "@/components/ui/DataTable";
import { FilterBar, FilterSelect } from "@/components/ui/FilterBar";
import { PageHeader } from "@/components/ui/PageHeader";
import { reports } from "@/lib/demo-data";

export const metadata = { title: "Báo cáo" };

const statusTone = {
  DRAFT: "warning" as const,
  FINAL: "success" as const,
  AMENDED: "info" as const,
};

export default function ReportsPage() {
  const draft = reports.filter((r) => r.status === "DRAFT").length;
  const final = reports.filter((r) => r.status === "FINAL").length;
  const amended = reports.filter((r) => r.status === "AMENDED").length;

  return (
    <div>
      <PageHeader
        title="Báo cáo"
        description="Quản lý báo cáo chẩn đoán, phiên bản và Clinical Sign-off. Báo cáo FINAL không sửa trực tiếp — tạo Amendment."
      />
      <div className="mb-4 grid gap-3 sm:grid-cols-4">
        {[
          ["Nháp (mẫu)", String(draft)],
          ["FINAL (mẫu)", String(final)],
          ["Amended", String(amended)],
          ["Đã hoàn tất hôm nay", "113"],
        ].map(([l, v]) => (
          <Card key={l} className="!p-4">
            <p className="text-xs text-text-secondary">{l}</p>
            <p className="mt-1 text-[28px] font-semibold">{v}</p>
          </Card>
        ))}
      </div>
      <FilterBar searchPlaceholder="Mã báo cáo, bệnh nhân...">
        <FilterSelect label="Status" options={["DRAFT", "FINAL", "AMENDED"]} />
        <FilterSelect
          label="Bác sĩ"
          options={["BS. Nguyễn Văn A", "BS. Lê Thu Hà", "BS. Trần Minh"]}
        />
        <FilterSelect label="Cơ sở" options={["BV Đa khoa TW", "Cơ sở 1", "Cơ sở 2"]} />
      </FilterBar>
      <DataTable
        headers={[
          "Mã báo cáo",
          "Bệnh nhân",
          "Study",
          "Impression (tóm tắt)",
          "Bác sĩ",
          "Ngày",
          "Version",
          "Status",
          "Thao tác",
        ]}
        minWidth="1100px"
      >
        {reports.map((r) => (
          <Tr key={r.id}>
            <Td className="font-medium">
              <Link href={`/dashboard/bao-cao/${r.id}`} className="text-primary">
                {r.id}
              </Link>
            </Td>
            <Td>
              <p>{r.patient}</p>
              <p className="text-xs text-text-secondary">{r.patientId}</p>
            </Td>
            <Td>
              <p>{r.study}</p>
              {r.caseId && (
                <Link href={`/viewer/${r.caseId}`} className="text-xs text-primary">
                  {r.caseId}
                </Link>
              )}
            </Td>
            <Td className="max-w-[220px] text-xs text-text-secondary line-clamp-2">
              {r.impression}
            </Td>
            <Td>{r.doctor}</Td>
            <Td>{r.date}</Td>
            <Td>{r.version}</Td>
            <Td>
              <Badge tone={statusTone[r.status as keyof typeof statusTone]}>{r.status}</Badge>
            </Td>
            <Td>
              <div className="flex gap-3 text-sm">
                <Link href={`/dashboard/bao-cao/${r.id}`} className="font-medium text-primary">
                  Xem
                </Link>
                <button type="button" className="text-text-secondary">
                  PDF
                </button>
                {(r.status === "FINAL" || r.status === "AMENDED") && (
                  <button type="button" className="text-warning">
                    Amend
                  </button>
                )}
              </div>
            </Td>
          </Tr>
        ))}
      </DataTable>
      <p className="mt-3 text-xs text-text-secondary">
        Patient portal chỉ nhận báo cáo FINAL/AMENDED đã Clinical Sign-off — không có AI thô.
      </p>
    </div>
  );
}
