import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { DataTable, Td, Tr } from "@/components/ui/DataTable";
import { FilterBar, FilterSelect } from "@/components/ui/FilterBar";
import { PageHeader } from "@/components/ui/PageHeader";
import { Tabs } from "@/components/ui/Tabs";
import { users } from "@/lib/demo-data";

export const metadata = { title: "Người dùng & Phân quyền" };

const roleMatrix = [
  {
    role: "Bác sĩ CĐHA",
    perms: "Worklist · Viewer · Draft/Finalize/Amend · View AI · Reject AI",
  },
  {
    role: "Bác sĩ chỉ định",
    perms: "Patient · Order · View FINAL reports · Không finalize CĐHA",
  },
  {
    role: "KTV",
    perms: "Queue · Upload DICOM · View Studies · Re-run AI (nếu lỗi)",
  },
  {
    role: "Tiếp đón",
    perms: "Patient create · Appointment · Check-in · Không xem AI thô",
  },
  {
    role: "Researcher",
    perms: "De-ID dataset · Eval AI/XAI · Export (audited) · Không PHI",
  },
  {
    role: "Facility Manager",
    perms: "Facilities · Machines · Staff roster · Audit read",
  },
  {
    role: "Admin",
    perms: "RBAC · Settings · Integrations · Model activate — không sửa kết luận BS",
  },
];

const permissions = [
  ["Patient", "View", "Create", "Edit", "Delete"],
  ["Study", "View", "Upload", "Delete", "—"],
  ["AI", "View Results", "Run", "Manage Models", "—"],
  ["Report", "Draft", "Finalize", "Amend", "—"],
  ["Research", "View Dataset", "Export", "—", "—"],
  ["Audit", "View", "—", "—", "—"],
  ["Model", "Activate", "Rollback", "—", "—"],
];

export default function UsersPage() {
  const active = users.filter((u) => u.status === "Hoạt động").length;
  const tfaOn = users.filter((u) => u.tfa).length;

  return (
    <div>
      <PageHeader
        title="Người dùng & Phân quyền"
        description="RBAC theo vai trò và cơ sở. Một user có thể thuộc nhiều facility. Admin không thay kết luận chuyên môn."
        actions={<Button size="sm">+ Thêm người dùng</Button>}
      />

      <div className="mb-4 grid gap-3 sm:grid-cols-4">
        {[
          ["Users", String(users.length)],
          ["Hoạt động", String(active)],
          ["2FA bật", `${tfaOn}/${users.length}`],
          ["Tạm khóa", String(users.length - active)],
        ].map(([l, v]) => (
          <Card key={l} className="!p-4">
            <p className="text-xs text-text-secondary">{l}</p>
            <p className="mt-1 text-[28px] font-semibold">{v}</p>
          </Card>
        ))}
      </div>

      <Tabs
        active="users"
        items={[
          { id: "users", label: "Người dùng", count: users.length },
          { id: "roles", label: "Vai trò", count: roleMatrix.length },
          { id: "matrix", label: "Ma trận quyền" },
        ]}
      />
      <div className="mt-4">
        <FilterBar searchPlaceholder="Tên, email, role...">
          <FilterSelect
            label="Role"
            options={[
              "Bác sĩ CĐHA",
              "Bác sĩ chỉ định",
              "KTV",
              "Tiếp đón",
              "Researcher",
              "Facility Manager",
              "Admin",
            ]}
          />
          <FilterSelect label="2FA" options={["Bật", "Tắt"]} />
          <FilterSelect label="Status" options={["Hoạt động", "Tạm khóa"]} />
        </FilterBar>
      </div>
      <DataTable
        headers={[
          "Tên",
          "Email",
          "Role",
          "Facility",
          "2FA",
          "Status",
          "Last Login",
        ]}
        minWidth="1000px"
      >
        {users.map((u) => (
          <Tr key={u.email}>
            <Td className="font-medium">{u.name}</Td>
            <Td>{u.email}</Td>
            <Td>{u.role}</Td>
            <Td className="max-w-[200px] text-xs">{u.facility}</Td>
            <Td>
              <Badge tone={u.tfa ? "success" : "warning"}>
                {u.tfa ? "Bật" : "Tắt"}
              </Badge>
            </Td>
            <Td>
              <Badge tone={u.status === "Hoạt động" ? "success" : "neutral"}>
                {u.status}
              </Badge>
            </Td>
            <Td className="text-text-secondary">{u.lastLogin}</Td>
          </Tr>
        ))}
      </DataTable>

      <h2 className="mb-3 mt-8 text-lg font-semibold">Tóm tắt quyền theo vai trò</h2>
      <div className="mb-6 grid gap-3 md:grid-cols-2">
        {roleMatrix.map((r) => (
          <Card key={r.role} className="!p-4">
            <p className="font-semibold">{r.role}</p>
            <p className="mt-1 text-xs text-text-secondary">{r.perms}</p>
          </Card>
        ))}
      </div>

      <Card padding={false}>
        <div className="border-b border-border px-5 py-3">
          <h2 className="font-semibold">Ma trận quyền (tóm tắt module)</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead className="bg-slate-50 text-text-secondary">
              <tr>
                {["Module", "Quyền 1", "Quyền 2", "Quyền 3", "Quyền 4"].map((h) => (
                  <th key={h} className="px-4 py-3 font-medium">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {permissions.map((row) => (
                <tr key={row[0]}>
                  {row.map((c, i) => (
                    <td key={i} className={`px-4 py-3 ${i === 0 ? "font-medium" : ""}`}>
                      {c}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
