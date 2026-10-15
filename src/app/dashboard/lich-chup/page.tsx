import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { FilterBar, FilterSelect } from "@/components/ui/FilterBar";
import { PageHeader } from "@/components/ui/PageHeader";
import { Tabs } from "@/components/ui/Tabs";
import { appointments, machines } from "@/lib/demo-data";

export const metadata = { title: "Lịch chụp" };

const statusTone = {
  "Đã đặt": "info" as const,
  "Đã Check-in": "primary" as const,
  "Đang chụp": "warning" as const,
  "Hoàn thành": "success" as const,
  "Đã hủy": "neutral" as const,
};

export default function CalendarPage() {
  return (
    <div>
      <PageHeader
        title="Lịch chụp"
        description="Resource calendar theo máy X-quang và phòng chụp — Thứ Năm, 16/04/2026."
        actions={
          <>
            <Button href="/dashboard/hang-doi" size="sm" variant="secondary">
              Hàng đợi
            </Button>
            <Button href="/dashboard/dat-lich" size="sm">
              + Đặt lịch
            </Button>
          </>
        }
      />

      <div className="mb-4 grid gap-3 sm:grid-cols-4">
        {[
          ["Lịch hôm nay", String(appointments.length)],
          ["Đã hoàn thành", String(appointments.filter((a) => a.status === "Hoàn thành").length)],
          ["Đang chụp / check-in", String(appointments.filter((a) => a.status === "Đang chụp" || a.status === "Đã Check-in").length)],
          ["Còn trống (ước)", "12"],
        ].map(([l, v]) => (
          <Card key={l} className="!p-4">
            <p className="text-xs text-text-secondary">{l}</p>
            <p className="mt-1 text-[28px] font-semibold">{v}</p>
          </Card>
        ))}
      </div>

      <Tabs
        active="ngay"
        items={[
          { id: "ngay", label: "Ngày" },
          { id: "tuan", label: "Tuần" },
          { id: "thang", label: "Tháng" },
        ]}
      />
      <div className="mt-4">
        <FilterBar searchPlaceholder="Tìm bệnh nhân hoặc mã lịch">
          <FilterSelect
            label="Cơ sở"
            options={["Bệnh viện Đa khoa Trung ương", "Cơ sở 1", "Cơ sở 2"]}
          />
          <FilterSelect
            label="Phòng"
            options={["Phòng 101", "Phòng 102", "Phòng 103", "Phòng 202", "Phòng 301"]}
          />
          <FilterSelect label="Máy" options={machines.map((m) => m.name)} />
        </FilterBar>
      </div>

      <div className="mb-3 text-sm font-medium">Thứ Năm, 16/04/2026</div>
      <div className="grid gap-3 lg:grid-cols-3">
        {machines.map((m) => (
          <Card key={m.id} className="min-h-[420px]">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="font-semibold">{m.name}</p>
                <p className="text-xs text-text-secondary">
                  {m.room} · {m.facility}
                </p>
              </div>
              <Badge tone={m.status === "online" ? "success" : "warning"}>
                {m.status === "online" ? "Online" : "Bảo trì"}
              </Badge>
            </div>
            <div className="space-y-2">
              {appointments
                .filter((a) => a.machine === m.name)
                .map((a) => (
                  <div
                    key={a.id}
                    className="rounded-[8px] border border-border bg-background p-3"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold">{a.time}</p>
                      <Badge tone={statusTone[a.status as keyof typeof statusTone] ?? "neutral"}>
                        {a.status}
                      </Badge>
                    </div>
                    <p className="mt-1 text-sm">{a.patient}</p>
                    <p className="text-xs text-text-secondary">
                      {a.exam} · {a.duration}
                    </p>
                    <p className="mt-1 font-mono text-[10px] text-muted">{a.id}</p>
                  </div>
                ))}
              {appointments.filter((a) => a.machine === m.name).length === 0 && (
                <p className="py-8 text-center text-sm text-text-secondary">
                  {m.status === "maintenance"
                    ? "Máy đang bảo trì — không nhận lịch."
                    : "Không có lịch trên máy này."}
                </p>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
