import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { Tabs } from "@/components/ui/Tabs";
import { notifications } from "@/lib/demo-data";

export const metadata = { title: "Thông báo" };

const typeLabel = {
  critical: "Critical",
  assignment: "Phân công",
  ai: "AI",
  report: "Báo cáo",
  system: "Hệ thống",
} as const;

export default function NotificationsPage() {
  const unread = notifications.filter((n) => n.unread).length;

  return (
    <div>
      <PageHeader
        title="Thông báo"
        description="Critical, phân công, AI và báo cáo — cấu hình kênh nhận theo vai trò."
        actions={
          <Button size="sm" variant="secondary">
            Đánh dấu đã đọc ({unread})
          </Button>
        }
      />
      <Tabs
        active="all"
        items={[
          { id: "all", label: "Tất cả", count: notifications.length },
          {
            id: "critical",
            label: "Critical",
            count: notifications.filter((n) => n.type === "critical").length,
          },
          {
            id: "assign",
            label: "Phân công",
            count: notifications.filter((n) => n.type === "assignment").length,
          },
          {
            id: "ai",
            label: "AI",
            count: notifications.filter((n) => n.type === "ai").length,
          },
          {
            id: "report",
            label: "Báo cáo",
            count: notifications.filter((n) => n.type === "report").length,
          },
          {
            id: "system",
            label: "Hệ thống",
            count: notifications.filter((n) => n.type === "system").length,
          },
        ]}
      />
      <div className="mt-4 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-3">
          {notifications.map((n) => (
            <Card
              key={n.title + n.time}
              className={`!p-4 ${n.unread ? "border-primary/30 bg-primary-soft/20" : ""}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge
                      tone={
                        n.type === "critical"
                          ? "critical"
                          : n.type === "ai"
                            ? "ai"
                            : n.type === "system"
                              ? "warning"
                              : "info"
                      }
                    >
                      {typeLabel[n.type]}
                    </Badge>
                    {n.unread && <Badge tone="primary">Mới</Badge>}
                    <p className="font-semibold">{n.title}</p>
                  </div>
                  <p className="mt-1 text-sm text-text-secondary">{n.body}</p>
                  <p className="mt-2 text-xs text-muted">{n.time}</p>
                </div>
                <Button href={n.action.href} size="sm" variant="soft">
                  {n.action.label}
                </Button>
              </div>
            </Card>
          ))}
        </div>
        <div className="space-y-4">
          <Card>
            <h2 className="mb-3 text-lg font-semibold">Cài đặt thông báo</h2>
            <p className="mb-3 text-xs text-text-secondary">Kênh</p>
            {["In-app", "Email", "Push"].map((c) => (
              <label key={c} className="mb-2 flex items-center justify-between text-sm">
                <span>{c}</span>
                <input type="checkbox" defaultChecked={c !== "Push"} className="accent-primary" />
              </label>
            ))}
            <p className="mb-3 mt-5 text-xs text-text-secondary">Sự kiện</p>
            {[
              "Critical AI / Clinical",
              "Assignment",
              "AI Error",
              "Report Complete",
              "Machine offline",
            ].map((c) => (
              <label key={c} className="mb-2 flex items-center justify-between text-sm">
                <span>{c}</span>
                <input type="checkbox" defaultChecked className="accent-primary" />
              </label>
            ))}
            <Button size="sm" className="mt-4">
              Lưu preferences
            </Button>
          </Card>
          <Card className="border-violet-100 bg-violet-50/50">
            <p className="text-xs font-medium text-ai">Gợi ý theo vai trò</p>
            <ul className="mt-2 space-y-1.5 text-xs text-text-secondary">
              <li>· CĐHA: Critical + Assignment bật mặc định</li>
              <li>· KTV: AI Error + Upload fail</li>
              <li>· Tiếp đón: Check-in reminder</li>
              <li>· Patient portal: không nhận AI thô</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
