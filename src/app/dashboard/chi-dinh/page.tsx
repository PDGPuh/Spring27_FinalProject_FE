import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { DataTable, Td, Tr } from "@/components/ui/DataTable";
import { FilterBar, FilterSelect } from "@/components/ui/FilterBar";
import { Input } from "@/components/ui/Input";
import { PageHeader } from "@/components/ui/PageHeader";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { imagingOrders } from "@/lib/demo-data";

export const metadata = { title: "Chỉ định chụp" };

const priorityTone = {
  Thường: "neutral" as const,
  "Ưu tiên": "warning" as const,
  "Cấp cứu": "critical" as const,
};

const steps = ["Thông tin chỉ định", "Đặt lịch", "Xác nhận"];

export default function ImagingOrderPage() {
  return (
    <div>
      <PageHeader
        title="Chỉ định chụp X-quang"
        description="Danh sách chỉ định và form tạo mới. Clinical Priority do bác sĩ chỉ định — độc lập với AI Priority."
        actions={
          <Button href="#tao-moi" size="sm">
            + Tạo chỉ định
          </Button>
        }
      />

      <div className="mb-4 grid gap-3 sm:grid-cols-4">
        {[
          ["Tổng chỉ định", String(imagingOrders.length)],
          ["Cấp cứu", String(imagingOrders.filter((o) => o.clinicalPriority === "Cấp cứu").length)],
          ["Chờ check-in", String(imagingOrders.filter((o) => o.status === "Chờ check-in").length)],
          ["Hoàn tất báo cáo", String(imagingOrders.filter((o) => o.status === "Hoàn tất báo cáo").length)],
        ].map(([l, v]) => (
          <Card key={l} className="!p-4">
            <p className="text-xs text-text-secondary">{l}</p>
            <p className="mt-1 text-[28px] font-semibold">{v}</p>
          </Card>
        ))}
      </div>

      <FilterBar searchPlaceholder="Mã chỉ định, bệnh nhân...">
        <FilterSelect label="Clinical Priority" options={["Thường", "Ưu tiên", "Cấp cứu"]} />
        <FilterSelect
          label="Trạng thái"
          options={["Đã đặt lịch", "Chờ check-in", "Đang chụp", "Chờ đọc", "Hoàn tất báo cáo"]}
        />
        <FilterSelect label="Bác sĩ" options={["BS. Lê Thu Hà", "BS. Phạm Quang", "BS. Trần Minh"]} />
      </FilterBar>

      <DataTable
        headers={[
          "Mã CD",
          "Bệnh nhân",
          "Loại chụp",
          "Clinical Priority",
          "Bác sĩ",
          "Cơ sở",
          "Tạo lúc",
          "Trạng thái",
          "Thao tác",
        ]}
        minWidth="1100px"
      >
        {imagingOrders.map((o) => (
          <Tr
            key={o.id}
            className={o.clinicalPriority === "Cấp cứu" ? "bg-red-50/40" : undefined}
          >
            <Td className="font-mono text-xs font-medium">{o.id}</Td>
            <Td>
              <Link href={`/dashboard/benh-nhan/${o.patientId}`} className="font-medium text-primary">
                {o.patient}
              </Link>
              <p className="text-xs text-text-secondary">{o.patientId}</p>
            </Td>
            <Td>{o.exam}</Td>
            <Td>
              <Badge tone={priorityTone[o.clinicalPriority]}>{o.clinicalPriority}</Badge>
            </Td>
            <Td>{o.doctor}</Td>
            <Td className="text-xs">{o.facility}</Td>
            <Td className="text-xs">{o.createdAt}</Td>
            <Td>
              <Badge tone="primary">{o.status}</Badge>
            </Td>
            <Td>
              <div className="flex gap-2 text-sm">
                {o.status === "Đã đặt lịch" || o.status === "Chờ check-in" ? (
                  <Link href="/dashboard/hang-doi" className="font-medium text-primary">
                    Check-in
                  </Link>
                ) : (
                  <Link href="/dashboard/lich-chup" className="font-medium text-primary">
                    Xem lịch
                  </Link>
                )}
              </div>
            </Td>
          </Tr>
        ))}
      </DataTable>

      <div id="tao-moi" className="mt-10 scroll-mt-6">
        <h2 className="mb-2 text-lg font-semibold">Tạo chỉ định mới</h2>
        <p className="mb-4 text-sm text-text-secondary">Bước 1/3 — Nhập thông tin chỉ định lâm sàng.</p>
        <div className="mb-6 flex flex-wrap items-center gap-2">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`flex h-8 items-center gap-2 rounded-full px-3 text-xs font-medium ${
                  i === 0 ? "bg-primary text-white" : "bg-slate-100 text-text-secondary"
                }`}
              >
                <span>{i + 1}</span> {s}
              </div>
              {i < steps.length - 1 && <span className="text-slate-300">→</span>}
            </div>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
          <Card>
            <p className="text-xs text-text-secondary">Bệnh nhân</p>
            <p className="mt-1 text-base font-semibold">Nguyễn Văn Hùng</p>
            <p className="mt-1 text-sm text-text-secondary">BN0001287 · 68 tuổi · Nam</p>
            <p className="mt-3 text-xs text-text-secondary">
              Cơ sở: Bệnh viện Đa khoa Trung ương
            </p>
            <Button
              href="/dashboard/benh-nhan/BN0001287"
              variant="outline"
              size="sm"
              className="mt-4 w-full"
            >
              Đổi bệnh nhân
            </Button>
          </Card>

          <Card>
            <h3 className="mb-4 text-lg font-semibold">Thông tin chỉ định</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <Select
                label="Loại chụp"
                required
                options={[{ value: "xq", label: "X-quang" }]}
              />
              <Select
                label="Vùng chụp"
                required
                options={[{ value: "nguc", label: "Ngực" }]}
              />
              <Select
                label="Tư thế"
                required
                options={[
                  { value: "pa", label: "PA" },
                  { value: "lat", label: "Lateral" },
                  { value: "pa-lat", label: "PA + Lateral" },
                ]}
              />
              <Select
                label="Clinical Priority"
                required
                options={[
                  { value: "thuong", label: "Thường" },
                  { value: "uu-tien", label: "Ưu tiên" },
                  { value: "cap-cuu", label: "Cấp cứu" },
                ]}
              />
              <Select
                label="Cơ sở thực hiện"
                required
                options={[
                  { value: "tw", label: "Bệnh viện Đa khoa Trung ương" },
                  { value: "cs1", label: "Cơ sở 1" },
                  { value: "cs2", label: "Cơ sở 2" },
                ]}
              />
              <Input label="Bác sĩ chỉ định" defaultValue="BS. Lê Thu Hà" required />
              <div className="md:col-span-2">
                <Textarea
                  label="Lý do / Chỉ định lâm sàng"
                  required
                  defaultValue="Ho kéo dài 5 ngày, sốt nhẹ. Đánh giá viêm phổi."
                />
              </div>
              <div className="md:col-span-2">
                <Textarea label="Ghi chú" placeholder="Ghi chú thêm cho KTV..." />
              </div>
            </div>
            <div className="sticky bottom-0 mt-6 flex justify-end gap-2 border-t border-border bg-card pt-4">
              <Button variant="secondary">Lưu nháp</Button>
              <Button href="/dashboard/dat-lich">Tiếp tục đặt lịch</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
