import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { machines } from "@/lib/demo-data";

export const metadata = { title: "Đặt lịch chụp" };

const slots = ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30"];

export default function BookingPage() {
  return (
    <div>
      <PageHeader
        title="Đặt lịch chụp"
        description="Bước 2/3 — Chọn ngày, khung giờ và máy X-quang."
      />
      <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
        <Card>
          <p className="text-xs text-text-secondary">Tóm tắt chỉ định</p>
          <p className="mt-2 text-base font-semibold">Nguyễn Văn Hùng</p>
          <p className="text-sm text-text-secondary">BN0001287</p>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-text-secondary">Loại</dt>
              <dd>X-quang ngực PA</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-text-secondary">Ưu tiên</dt>
              <dd>
                <Badge tone="neutral">Thường</Badge>
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-text-secondary">Cơ sở</dt>
              <dd>BV Đa khoa TW</dd>
            </div>
          </dl>
        </Card>

        <div className="space-y-4">
          <Card>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Tháng 4, 2026</h2>
              <p className="text-sm text-primary font-medium">Đã chọn: 16/04/2026</p>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs">
              {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((d) => (
                <div key={d} className="py-2 text-text-secondary">
                  {d}
                </div>
              ))}
              {Array.from({ length: 30 }, (_, i) => i + 1).map((d) => (
                <button
                  key={d}
                  type="button"
                  className={`rounded-[8px] py-2 ${
                    d === 16
                      ? "bg-primary text-white"
                      : "hover:bg-primary-soft text-text"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </Card>

          <Card>
            <h2 className="mb-3 text-lg font-semibold">Khung giờ trống</h2>
            <div className="flex flex-wrap gap-2">
              {slots.map((s) => (
                <button
                  key={s}
                  type="button"
                  className={`rounded-[8px] border px-3 py-2 text-sm ${
                    s === "10:30"
                      ? "border-primary bg-primary-soft text-primary-dark"
                      : "border-border hover:border-primary/40"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </Card>

          <Card>
            <h2 className="mb-3 text-lg font-semibold">Chọn máy</h2>
            <div className="grid gap-3 md:grid-cols-3">
              {machines.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  disabled={m.status === "maintenance"}
                  className={`rounded-[10px] border p-4 text-left ${
                    m.id === "XQ-01"
                      ? "border-primary bg-primary-soft"
                      : m.status === "maintenance"
                        ? "opacity-50"
                        : "border-border"
                  }`}
                >
                  <p className="font-semibold">{m.name}</p>
                  <p className="text-xs text-text-secondary">{m.room}</p>
                  <p className="mt-2 text-xs">
                    {m.status === "maintenance" ? "Đang bảo trì" : "Có sẵn"}
                  </p>
                </button>
              ))}
            </div>
          </Card>

          <Card>
            <h2 className="mb-3 text-lg font-semibold">Xác nhận lịch</h2>
            <dl className="grid gap-2 text-sm sm:grid-cols-3">
              {[
                ["Ngày", "16/04/2026"],
                ["Giờ", "10:30"],
                ["Máy", "Máy XQ-01"],
                ["Phòng", "Phòng 101"],
                ["Cơ sở", "BV Đa khoa TW"],
                ["Thời lượng", "15 phút"],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-text-secondary">{k}</dt>
                  <dd className="font-medium">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-5 flex justify-end gap-2">
              <Button href="/dashboard/chi-dinh" variant="secondary">
                Quay lại
              </Button>
              <Button href="/dashboard/hang-doi">Đặt lịch chụp</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
