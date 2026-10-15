import { Suspense } from "react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { DataTable, Td, Tr } from "@/components/ui/DataTable";
import { PageHeader } from "@/components/ui/PageHeader";
import { Tabs } from "@/components/ui/Tabs";
import {
  facilityCards,
  facilityStaff,
  machines,
  worklistCases,
} from "@/lib/demo-data";

export function generateStaticParams() {
  return facilityCards.map((f) => ({ id: f.name }));
}

async function FacilityDetail({ id }: { id: string }) {
  const name = decodeURIComponent(id);
  const card = facilityCards.find((f) => f.name === name) ?? facilityCards[0];
  const siteMachines = machines.filter(
    (m) => m.facility === card.name || m.facility.includes(card.name.slice(0, 8)),
  );
  const list =
    siteMachines.length > 0
      ? siteMachines
      : machines.filter((m) =>
          card.name.includes("Trung ương")
            ? m.facility.includes("Trung ương")
            : m.facility === card.name,
        );
  const staff = facilityStaff.filter(
    (s) =>
      s.facility.includes("TW") && card.name.includes("Trung ương")
        ? true
        : s.facility === card.name ||
          (card.name === "Cơ sở 1" && s.facility === "Cơ sở 1") ||
          (card.name === "Cơ sở 2" && s.facility === "Cơ sở 2"),
  );
  const critical = worklistCases.filter(
    (c) =>
      c.aiPriority === "Critical" &&
      (card.name.includes("Trung ương")
        ? c.facility.includes("TW")
        : c.facility === card.name),
  ).length;

  return (
    <div>
      <PageHeader
        title={card.name}
        description={card.address}
        breadcrumb={
          <span>
            Cơ sở / <span className="text-text">{card.name}</span>
          </span>
        }
      />

      <div className="mb-4 grid gap-3 sm:grid-cols-5">
        {[
          ["Máy", String(card.machines)],
          ["Bác sĩ", String(card.doctors)],
          ["KTV", String(card.techs)],
          ["Studies hôm nay", String(card.studiesToday)],
          ["AI Critical", String(critical || card.critical)],
        ].map(([l, v]) => (
          <Card key={l} className="!p-4">
            <p className="text-xs text-text-secondary">{l}</p>
            <p className="mt-1 text-[28px] font-semibold">{v}</p>
          </Card>
        ))}
      </div>

      <Tabs
        active="may"
        items={[
          { id: "overview", label: "Tổng quan" },
          { id: "may", label: "Máy X-quang", count: list.length },
          { id: "nhansu", label: "Nhân sự", count: staff.length },
          { id: "workload", label: "Workload" },
          { id: "config", label: "Cấu hình" },
        ]}
      />
      <div className="mt-4">
        <DataTable
          headers={["Máy", "Phòng", "Model", "AE Title", "IP", "Studies/ngày", "Status"]}
          minWidth="900px"
        >
          {list.map((m) => (
            <Tr key={m.id}>
              <Td className="font-medium">{m.name}</Td>
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
                      ? "Maintenance"
                      : "Offline"}
                </Badge>
              </Td>
            </Tr>
          ))}
        </DataTable>
      </div>

      <h2 className="mb-3 mt-8 text-lg font-semibold">Nhân sự ca sáng</h2>
      <DataTable headers={["Họ tên", "Vai trò", "Cơ sở", "Ca"]}>
        {(staff.length ? staff : facilityStaff.slice(0, 4)).map((s) => (
          <Tr key={s.name + s.facility}>
            <Td className="font-medium">{s.name}</Td>
            <Td>{s.role}</Td>
            <Td>{s.facility}</Td>
            <Td>{s.shift}</Td>
          </Tr>
        ))}
      </DataTable>

      <Card className="mt-4">
        <h3 className="mb-2 font-semibold">Workload hôm nay</h3>
        <p className="text-sm text-text-secondary">
          {card.studiesToday} studies · {card.waiting} chờ đọc · {card.critical} AI Critical ·
          Trạng thái: {card.status}
        </p>
      </Card>
    </div>
  );
}

export default async function FacilityDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <Suspense fallback={<div className="text-sm text-text-secondary">Đang tải cơ sở...</div>}>
      <FacilityDetail id={id} />
    </Suspense>
  );
}
