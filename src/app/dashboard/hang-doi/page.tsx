import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { DataTable, Td, Tr } from "@/components/ui/DataTable";
import { FilterBar, FilterSelect } from "@/components/ui/FilterBar";
import { PageHeader } from "@/components/ui/PageHeader";
import { Tabs } from "@/components/ui/Tabs";
import { machines, queueItems } from "@/lib/demo-data";

export const metadata = { title: "Check-in & Hàng đợi" };

const priorityTone = {
  Thường: "neutral" as const,
  "Ưu tiên": "warning" as const,
  "Cấp cứu": "critical" as const,
};

export default function QueuePage() {
  const counts = {
    cho: queueItems.filter((q) => q.status === "Đang chờ đến").length,
    checkin: queueItems.filter((q) => q.status === "Đã Check-in").length,
    chup: queueItems.filter((q) => q.status === "Đang chụp").length,
    xong: queueItems.filter((q) => q.status === "Hoàn thành").length,
  };

  return (
    <div>
      <PageHeader
        title="Check-in & Hàng đợi"
        description="Quản lý bệnh nhân đến chụp. Clinical Priority xử lý riêng với AI Priority."
        actions={
          <>
            <Button href="/dashboard/lich-chup" size="sm" variant="outline">
              Xem lịch máy
            </Button>
            <Button href="/dashboard/studies/upload" size="sm" variant="secondary">
              Upload DICOM
            </Button>
          </>
        }
      />

      <div className="mb-4 grid gap-3 sm:grid-cols-4">
        {[
          ["Đang chờ đến", counts.cho],
          ["Đã Check-in", counts.checkin],
          ["Đang chụp", counts.chup],
          ["Hoàn thành hôm nay", counts.xong],
        ].map(([l, v]) => (
          <Card key={l as string} className="!p-4">
            <p className="text-xs text-text-secondary">{l}</p>
            <p className="mt-1 text-[28px] font-semibold">{v}</p>
          </Card>
        ))}
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {machines
          .filter((m) => m.status !== "maintenance")
          .map((m) => (
            <div
              key={m.id}
              className="rounded-[8px] border border-border bg-card px-3 py-2 text-xs"
            >
              <span className="font-medium">{m.name}</span>
              <span className="mx-1.5 text-text-secondary">·</span>
              <span className="text-text-secondary">{m.room}</span>
              <span className="mx-1.5 text-text-secondary">·</span>
              <Badge tone="success">Online</Badge>
            </div>
          ))}
        <div className="rounded-[8px] border border-border bg-card px-3 py-2 text-xs">
          <span className="font-medium">Máy XQ-03</span>
          <span className="mx-1.5 text-text-secondary">·</span>
          <Badge tone="warning">Bảo trì</Badge>
        </div>
      </div>

      <Tabs
        active="checkin"
        items={[
          { id: "cho", label: "Đang chờ đến", count: counts.cho },
          { id: "checkin", label: "Đã Check-in", count: counts.checkin },
          { id: "chup", label: "Đang chụp", count: counts.chup },
          { id: "xong", label: "Hoàn thành", count: counts.xong },
        ]}
      />
      <div className="mt-4">
        <FilterBar searchPlaceholder="Tìm bệnh nhân trong hàng đợi">
          <FilterSelect label="Phòng" options={["Phòng 101", "Phòng 102", "Phòng 202", "Phòng 301"]} />
          <FilterSelect label="Clinical Priority" options={["Thường", "Ưu tiên", "Cấp cứu"]} />
        </FilterBar>
      </div>
      <DataTable
        headers={[
          "STT",
          "Bệnh nhân",
          "Giờ hẹn",
          "Loại chụp",
          "Clinical Priority",
          "Thời gian chờ",
          "Phòng / Máy",
          "Trạng thái",
          "Thao tác",
        ]}
        minWidth="1100px"
      >
        {queueItems.map((q) => (
          <Tr
            key={q.stt}
            className={
              q.clinicalPriority === "Cấp cứu" ? "bg-red-50/40" : undefined
            }
          >
            <Td className="font-semibold">{q.stt}</Td>
            <Td>
              <p className="font-medium">{q.patient}</p>
              <p className="text-xs text-text-secondary">{q.patientId}</p>
            </Td>
            <Td>{q.time}</Td>
            <Td>{q.exam}</Td>
            <Td>
              <Badge tone={priorityTone[q.clinicalPriority as keyof typeof priorityTone]}>
                {q.clinicalPriority}
              </Badge>
            </Td>
            <Td>{q.wait}</Td>
            <Td>
              <p>{q.room}</p>
              <p className="text-xs text-text-secondary">{q.machine}</p>
            </Td>
            <Td>
              <Badge tone="primary">{q.status}</Badge>
            </Td>
            <Td>
              <div className="flex flex-wrap gap-2">
                {q.status === "Đang chờ đến" && (
                  <Button size="sm">Check-in</Button>
                )}
                {q.status === "Đã Check-in" && (
                  <Button size="sm">Bắt đầu chụp</Button>
                )}
                {q.status === "Đang chụp" && (
                  <>
                    <Button size="sm" variant="secondary">
                      Hoàn thành
                    </Button>
                    <Button href="/dashboard/studies/upload" size="sm" variant="outline">
                      Upload DICOM
                    </Button>
                  </>
                )}
                {q.status === "Hoàn thành" && (
                  <Button href="/dashboard/studies" size="sm" variant="soft">
                    Xem Study
                  </Button>
                )}
              </div>
            </Td>
          </Tr>
        ))}
      </DataTable>
    </div>
  );
}
