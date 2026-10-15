import Link from "next/link";
import { Plus } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { DataTable, Td, Tr } from "@/components/ui/DataTable";
import { FilterBar, FilterSelect } from "@/components/ui/FilterBar";
import { PageHeader } from "@/components/ui/PageHeader";
import { patients } from "@/lib/demo-data";

export const metadata = { title: "Bệnh nhân" };

export default function PatientsPage() {
  const active = patients.filter((p) => p.status === "Hoạt động").length;

  return (
    <div>
      <PageHeader
        title="Bệnh nhân"
        description="Quản lý hồ sơ bệnh nhân và lịch sử chẩn đoán hình ảnh."
        actions={
          <>
            <Button href="/dashboard/chi-dinh" size="sm" variant="secondary">
              Tạo chỉ định
            </Button>
            <Button href="/dashboard/benh-nhan/them" size="sm">
              <Plus className="h-4 w-4" /> Thêm bệnh nhân
            </Button>
          </>
        }
      />

      <div className="mb-4 grid gap-3 sm:grid-cols-4">
        {[
          ["Tổng BN (mẫu)", String(patients.length)],
          ["Hoạt động", String(active)],
          ["Tạm ngưng", String(patients.length - active)],
          ["Có study hôm nay", "9"],
        ].map(([l, v]) => (
          <Card key={l} className="!p-4">
            <p className="text-xs text-text-secondary">{l}</p>
            <p className="mt-1 text-[28px] font-semibold">{v}</p>
          </Card>
        ))}
      </div>

      <FilterBar searchPlaceholder="Tìm theo mã bệnh nhân, họ tên hoặc số điện thoại">
        <FilterSelect label="Giới tính" options={["Nam", "Nữ"]} />
        <FilterSelect
          label="Cơ sở"
          options={["Bệnh viện Đa khoa Trung ương", "Cơ sở 1", "Cơ sở 2"]}
        />
        <FilterSelect label="Khoảng tuổi" options={["<18", "18–40", "41–65", ">65"]} />
        <FilterSelect label="Trạng thái" options={["Hoạt động", "Tạm ngưng"]} />
      </FilterBar>
      <DataTable
        headers={[
          "Mã BN",
          "Họ tên",
          "Ngày sinh",
          "Tuổi",
          "GT",
          "SĐT",
          "BHYT",
          "BS chỉ định",
          "Cơ sở",
          "Lần chụp gần nhất",
          "Số Study",
          "Trạng thái",
          "Thao tác",
        ]}
        minWidth="1200px"
      >
        {patients.map((p) => (
          <Tr key={p.id}>
            <Td className="font-medium text-primary">
              <Link href={`/dashboard/benh-nhan/${p.id}`}>{p.id}</Link>
            </Td>
            <Td className="font-medium">{p.name}</Td>
            <Td>{p.dob}</Td>
            <Td>{p.age}</Td>
            <Td>{p.gender}</Td>
            <Td>{p.phone}</Td>
            <Td className="font-mono text-[11px]">{p.bhyt.slice(0, 8)}…</Td>
            <Td className="text-xs">{p.referringDoctor}</Td>
            <Td className="max-w-[140px] truncate text-xs">{p.facility}</Td>
            <Td>{p.lastScan}</Td>
            <Td>{p.studies}</Td>
            <Td>
              <Badge tone={p.status === "Hoạt động" ? "success" : "neutral"}>
                {p.status}
              </Badge>
            </Td>
            <Td>
              <div className="flex gap-2 text-sm">
                <Link
                  href={`/dashboard/benh-nhan/${p.id}`}
                  className="font-medium text-primary"
                >
                  Xem
                </Link>
                <Link href="/dashboard/chi-dinh" className="text-text-secondary">
                  Chỉ định
                </Link>
              </div>
            </Td>
          </Tr>
        ))}
      </DataTable>
      <div className="mt-3 flex items-center justify-between text-xs text-text-secondary">
        <span>
          Hiển thị 1–{patients.length} / {patients.length} bệnh nhân
        </span>
        <div className="flex gap-1">
          <button className="rounded border border-border px-2 py-1" type="button">
            Trước
          </button>
          <button
            className="rounded border border-border bg-primary-soft px-2 py-1 text-primary"
            type="button"
          >
            1
          </button>
          <button className="rounded border border-border px-2 py-1" type="button">
            Sau
          </button>
        </div>
      </div>
    </div>
  );
}
