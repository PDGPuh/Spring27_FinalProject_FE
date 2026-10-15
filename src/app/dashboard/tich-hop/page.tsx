import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { DataTable, Td, Tr } from "@/components/ui/DataTable";
import { Input } from "@/components/ui/Input";
import { PageHeader } from "@/components/ui/PageHeader";
import { integrations } from "@/lib/demo-data";

export const metadata = { title: "Tích hợp" };

const webhookEvents = [
  { time: "10:58:12", event: "study.received", target: "https://api…/hooks", status: "200" },
  { time: "10:55:40", event: "ai.inference.complete", target: "https://api…/hooks", status: "200" },
  { time: "10:33:08", event: "dicom.stored", target: "https://api…/hooks", status: "200" },
  { time: "09:12:01", event: "report.finalized", target: "https://partner…/xr", status: "503" },
];

export default function IntegrationsPage() {
  return (
    <div>
      <PageHeader
        title="Tích hợp"
        description="PACS, DICOMweb, HIS, FHIR và REST API — không hiển thị full secret."
      />

      <div className="mb-4 grid gap-3 sm:grid-cols-4">
        {[
          ["Kết nối OK", String(integrations.filter((i) => i.status === "Connected" || i.status === "Active").length)],
          ["Chưa cấu hình", String(integrations.filter((i) => i.status === "Not configured").length)],
          ["Webhook 24h", "142"],
          ["Lỗi gần nhất", "1"],
        ].map(([l, v]) => (
          <Card key={l} className="!p-4">
            <p className="text-xs text-text-secondary">{l}</p>
            <p className="mt-1 text-[28px] font-semibold">{v}</p>
          </Card>
        ))}
      </div>

      <div className="mb-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {integrations.map((i) => (
          <Card key={i.name}>
            <div className="flex items-start justify-between gap-2">
              <div>
                <h2 className="font-semibold">{i.name}</h2>
                <p className="mt-1 text-sm text-text-secondary">{i.detail}</p>
              </div>
              <Badge
                tone={
                  i.status === "Connected" || i.status === "Active"
                    ? "success"
                    : "warning"
                }
              >
                {i.status}
              </Badge>
            </div>
            <p className="mt-3 text-xs text-muted">Last sync: {i.lastSync}</p>
            <p className="mt-1 text-xs text-text-secondary">{i.notes}</p>
            <Button size="sm" variant="outline" className="mt-3">
              Cấu hình
            </Button>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <h3 className="mb-3 font-semibold">DICOM Configuration</h3>
          <div className="grid gap-3">
            <Input label="AE Title" defaultValue="XQUANGAI" />
            <Input label="Host" defaultValue="orthanc.internal" />
            <Input label="Port" defaultValue="4242" />
            <Input label="Calling AE" defaultValue="ORTHANC" />
          </div>
          <Button size="sm" className="mt-4">
            Lưu & kiểm tra C-ECHO
          </Button>
        </Card>
        <Card>
          <h3 className="mb-3 font-semibold">REST API</h3>
          <Input label="API Key" defaultValue="xq_live_••••••••••••9f2a" disabled />
          <p className="mt-2 text-xs text-text-secondary">
            Webhook endpoint: https://api.xquang-ai.vn/hooks/events
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Button size="sm" variant="secondary">
              Xoay key mới
            </Button>
            <Button size="sm" variant="outline">
              Xem tài liệu API
            </Button>
          </div>
        </Card>
      </div>

      <h2 className="mb-3 mt-8 text-lg font-semibold">Webhook delivery gần đây</h2>
      <DataTable headers={["Thời gian", "Event", "Target", "HTTP"]}>
        {webhookEvents.map((w) => (
          <Tr key={w.time + w.event}>
            <Td className="font-mono text-xs">{w.time}</Td>
            <Td className="font-mono text-xs">{w.event}</Td>
            <Td className="text-xs text-text-secondary">{w.target}</Td>
            <Td>
              <Badge tone={w.status === "200" ? "success" : "critical"}>{w.status}</Badge>
            </Td>
          </Tr>
        ))}
      </DataTable>
    </div>
  );
}
