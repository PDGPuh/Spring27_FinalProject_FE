import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { DataTable, Td, Tr } from "@/components/ui/DataTable";
import { FilterBar, FilterSelect } from "@/components/ui/FilterBar";
import { PageHeader } from "@/components/ui/PageHeader";
import { auditLogs } from "@/lib/demo-data";

export const metadata = { title: "Nhật ký hệ thống" };

export default function AuditPage() {
  const failed = auditLogs.filter((a) => a.result !== "Success").length;

  return (
    <div>
      <PageHeader
        title="Nhật ký hệ thống"
        description="Audit log chỉ đọc. Không thể chỉnh sửa bản ghi. Mọi thao tác lâm sàng và cấu hình đều được ghi nhận."
      />

      <div className="mb-4 grid gap-3 sm:grid-cols-4">
        {[
          ["Sự kiện (mẫu)", String(auditLogs.length)],
          ["Thành công", String(auditLogs.length - failed)],
          ["Thất bại / Denied", String(failed)],
          ["Hôm nay (ước tính)", "186"],
        ].map(([l, v]) => (
          <Card key={l} className="!p-4">
            <p className="text-xs text-text-secondary">{l}</p>
            <p className="mt-1 text-[28px] font-semibold">{v}</p>
          </Card>
        ))}
      </div>

      <FilterBar searchPlaceholder="User, Action, Object...">
        <FilterSelect
          label="Role"
          options={[
            "Bác sĩ CĐHA",
            "Bác sĩ chỉ định",
            "KTV",
            "Tiếp đón",
            "Researcher",
            "Admin",
            "AI Worker",
          ]}
        />
        <FilterSelect
          label="Action"
          options={[
            "FINALIZE_REPORT",
            "REJECT_AI_RESULT",
            "UPLOAD_DICOM",
            "CHECK_IN",
            "CREATE_ORDER",
            "AI_INFERENCE_COMPLETE",
            "AI_INFERENCE_FAILED",
            "EXPORT_DATASET",
          ]}
        />
        <FilterSelect label="Result" options={["Success", "Failed", "Denied"]} />
      </FilterBar>

      <DataTable
        headers={[
          "Timestamp",
          "User",
          "Role",
          "Action",
          "Object",
          "Chi tiết",
          "Facility",
          "IP",
          "Result",
        ]}
        minWidth="1200px"
      >
        {auditLogs.map((a) => (
          <Tr key={a.time + a.action + a.object}>
            <Td className="whitespace-nowrap font-mono text-xs">{a.time}</Td>
            <Td className="font-medium">{a.user}</Td>
            <Td>{a.role}</Td>
            <Td className="font-mono text-xs">{a.action}</Td>
            <Td className="font-mono text-xs">{a.object}</Td>
            <Td className="max-w-[220px] text-xs text-text-secondary">{a.detail}</Td>
            <Td>{a.facility}</Td>
            <Td className="font-mono text-xs">{a.ip}</Td>
            <Td>
              <Badge tone={a.result === "Success" ? "success" : "critical"}>
                {a.result}
              </Badge>
            </Td>
          </Tr>
        ))}
      </DataTable>
      <p className="mt-3 text-xs text-text-secondary">
        Drawer chi tiết (demo): Ai · Làm gì · Đối tượng · Khi nào · Old/New Value · Reason — bản
        ghi bất biến.
      </p>
    </div>
  );
}
