import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { DataTable, Td, Tr } from "@/components/ui/DataTable";
import { PageHeader } from "@/components/ui/PageHeader";
import { facilityCards, facilityPerformance, machines } from "@/lib/demo-data";

export const metadata = { title: "Cơ sở" };

export default function FacilitiesPage() {
  const online = machines.filter((m) => m.status === "online").length;

  return (
    <div>
      <PageHeader
        title="Cơ sở"
        description="Quản lý đa cơ sở, máy X-quang, workload và nhân sự theo site."
      />

      <div className="mb-4 grid gap-3 sm:grid-cols-4">
        {[
          ["Số cơ sở", String(facilityCards.length)],
          ["Máy online", `${online}/${machines.length}`],
          ["Studies hôm nay", String(facilityCards.reduce((s, f) => s + f.studiesToday, 0))],
          ["Chờ đọc", String(facilityCards.reduce((s, f) => s + f.waiting, 0))],
        ].map(([l, v]) => (
          <Card key={l} className="!p-4">
            <p className="text-xs text-text-secondary">{l}</p>
            <p className="mt-1 text-[28px] font-semibold">{v}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {facilityCards.map((f) => (
          <Card key={f.name}>
            <div className="mb-3 flex items-start justify-between gap-2">
              <div>
                <h2 className="text-lg font-semibold leading-snug">{f.name}</h2>
                <p className="mt-1 text-xs text-text-secondary">{f.address}</p>
              </div>
              <Badge tone="success">{f.status}</Badge>
            </div>
            <dl className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="text-text-secondary">Máy X-quang</dt>
                <dd className="font-semibold">{f.machines}</dd>
              </div>
              <div>
                <dt className="text-text-secondary">Bác sĩ</dt>
                <dd className="font-semibold">{f.doctors}</dd>
              </div>
              <div>
                <dt className="text-text-secondary">KTV</dt>
                <dd className="font-semibold">{f.techs}</dd>
              </div>
              <div>
                <dt className="text-text-secondary">Studies hôm nay</dt>
                <dd className="font-semibold">{f.studiesToday}</dd>
              </div>
              <div>
                <dt className="text-text-secondary">Chờ đọc</dt>
                <dd className="font-semibold">{f.waiting}</dd>
              </div>
              <div>
                <dt className="text-text-secondary">AI Critical</dt>
                <dd className="font-semibold text-critical">{f.critical}</dd>
              </div>
            </dl>
            <Link
              href={`/dashboard/co-so/${encodeURIComponent(f.name)}`}
              className="mt-4 inline-block text-sm font-medium text-primary"
            >
              Xem chi tiết →
            </Link>
          </Card>
        ))}
      </div>

      <h2 className="mb-3 mt-8 text-lg font-semibold">Máy X-quang toàn hệ thống</h2>
      <DataTable
        headers={["Máy", "Cơ sở", "Phòng", "Model", "AE Title", "IP", "Studies/ngày", "Status"]}
        minWidth="1000px"
      >
        {machines.map((m) => (
          <Tr key={m.id}>
            <Td className="font-medium">{m.name}</Td>
            <Td>{m.facility}</Td>
            <Td>{m.room}</Td>
            <Td className="text-xs">{m.model}</Td>
            <Td className="font-mono text-xs">{m.aeTitle}</Td>
            <Td className="font-mono text-xs">{m.ip}</Td>
            <Td>{m.studiesToday}</Td>
            <Td>
              <Badge
                tone={
                  m.status === "online"
                    ? "success"
                    : m.status === "maintenance"
                      ? "warning"
                      : "critical"
                }
              >
                {m.status === "online"
                  ? "Online"
                  : m.status === "maintenance"
                    ? "Bảo trì"
                    : "Offline"}
              </Badge>
            </Td>
          </Tr>
        ))}
      </DataTable>

      <h2 className="mb-3 mt-8 text-lg font-semibold">Hiệu suất hôm nay</h2>
      <DataTable headers={["Cơ sở", "Số ca", "Chờ đọc", "Critical", "TAT TB"]}>
        {facilityPerformance.map((row) => (
          <Tr key={row.name}>
            <Td className="font-medium">{row.name}</Td>
            <Td>{row.cases}</Td>
            <Td>{row.waiting}</Td>
            <Td>
              <Badge tone="critical">{row.critical}</Badge>
            </Td>
            <Td>{row.tat}</Td>
          </Tr>
        ))}
      </DataTable>
    </div>
  );
}
