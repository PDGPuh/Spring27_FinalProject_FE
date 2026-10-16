import { Suspense } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowLeft,
  Building2,
  Cpu,
  MapPin,
  Radio,
  ShieldAlert,
  Stethoscope,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { BorderBeam } from "@/components/ui/BorderBeam";
import { Button } from "@/components/ui/Button";
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
    <div className="space-y-6">
      <PageHeader
        title={card.name}
        description={card.address}
        breadcrumb={
          <span className="inline-flex items-center gap-1.5">
            <Link href="/dashboard/co-so" className="hover:underline">
              Cơ sở
            </Link>{" "}
            / <span className="text-primary-950">{card.name}</span>
          </span>
        }
        actions={
          <>
            <Button href="/dashboard/co-so" variant="secondary">
              <ArrowLeft className="h-4 w-4" />
              Danh sách cơ sở
            </Button>
            <Badge tone="success">{card.status}</Badge>
          </>
        }
      />

      {/* 5 KPI Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <div className="relative overflow-hidden rounded-2xl border border-primary-100 border-b-[4px] border-b-primary-600 bg-white p-5 overview-wrapper-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[12px] font-extrabold uppercase tracking-wider text-text-secondary">
                Máy
              </p>
              <p className="mt-2 font-mono text-[28px] font-black leading-none text-primary-950">
                {card.machines}
              </p>
              <p className="mt-2 text-[12px] font-semibold text-primary-700">
                Hệ thống X-quang DR/CR
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
              <Cpu className="h-5 w-5" />
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-primary-100 border-b-[4px] border-b-primary-700 bg-white p-5 overview-wrapper-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[12px] font-extrabold uppercase tracking-wider text-text-secondary">
                Bác sĩ
              </p>
              <p className="mt-2 font-mono text-[28px] font-black leading-none text-primary-950">
                {card.doctors}
              </p>
              <p className="mt-2 text-[12px] font-semibold text-text-secondary">
                Bác sĩ CĐHA & Lâm sàng
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-75 text-primary-800">
              <Stethoscope className="h-5 w-5" />
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-primary-100 border-b-[4px] border-b-primary-800 bg-white p-5 overview-wrapper-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[12px] font-extrabold uppercase tracking-wider text-text-secondary">
                KTV
              </p>
              <p className="mt-2 font-mono text-[28px] font-black leading-none text-primary-950">
                {card.techs}
              </p>
              <p className="mt-2 text-[12px] font-semibold text-text-secondary">
                Kỹ thuật viên hình ảnh
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-75 text-primary-800">
              <Users className="h-5 w-5" />
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-emerald-200 border-b-[4px] border-b-emerald-600 bg-white p-5 overview-wrapper-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[12px] font-extrabold uppercase tracking-wider text-emerald-700">
                Studies hôm nay
              </p>
              <p className="mt-2 font-mono text-[28px] font-black leading-none text-emerald-700">
                {card.studiesToday}
              </p>
              <p className="mt-2 text-[12px] font-semibold text-emerald-800">
                Đang chờ đọc: {card.waiting} ca
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <Activity className="h-5 w-5" />
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-red-200 border-b-[4px] border-b-critical bg-white p-5 overview-wrapper-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[12px] font-extrabold uppercase tracking-wider text-critical">
                AI Critical
              </p>
              <p className="mt-2 font-mono text-[28px] font-black leading-none text-critical">
                {critical || card.critical}
              </p>
              <p className="mt-2 text-[12px] font-semibold text-red-700">
                Cần ưu tiên đọc ngay
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-critical">
              <ShieldAlert className="h-5 w-5" />
            </div>
          </div>
        </div>
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

      {/* Danh sách máy X-quang tại cơ sở */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-[17px] font-extrabold text-primary-950">
            <Radio className="h-5 w-5 text-primary-700" />
            Danh sách máy X-quang tại {card.name}
          </h2>
          <span className="text-[13px] font-semibold text-text-secondary">
            Kết nối PACS / DICOM Gateway trực tiếp
          </span>
        </div>

        <DataTable
          headers={[
            "Thiết bị & Model",
            "Phòng chụp",
            "Cấu hình DICOM (AE Title / IP)",
            "Studies/ngày",
            "Trạng thái",
          ]}
        >
          {list.map((m) => (
            <Tr key={m.id}>
              <Td>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-75 font-mono text-[12px] font-extrabold text-primary-800">
                    DR
                  </div>
                  <div>
                    <p className="text-[15px] font-extrabold text-primary-950">{m.name}</p>
                    <p className="mt-0.5 text-[12px] font-medium text-text-secondary">
                      {m.model}
                    </p>
                  </div>
                </div>
              </Td>
              <Td>
                <span className="text-[14px] font-bold text-primary-900">{m.room}</span>
              </Td>
              <Td>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-md bg-primary-75 px-2.5 py-1 font-mono text-[12px] font-bold text-primary-900">
                    AE: {m.aeTitle}
                  </span>
                  <span className="rounded-md border border-primary-200 bg-white px-2.5 py-1 font-mono text-[12px] font-semibold text-text-secondary">
                    IP: {m.ip}
                  </span>
                </div>
              </Td>
              <Td>
                <span className="font-mono text-[15px] font-black text-primary-950">
                  {m.studiesToday}
                </span>{" "}
                <span className="text-[12px] text-text-secondary">ca</span>
              </Td>
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

      {/* Nhân sự ca sáng & Workload */}
      <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-3">
          <h2 className="flex items-center gap-2 text-[17px] font-extrabold text-primary-950">
            <Users className="h-5 w-5 text-primary-700" />
            Nhân sự ca sáng
          </h2>
          <DataTable headers={["Họ tên nhân sự", "Vai trò chuyên môn", "Cơ sở", "Ca trực"]}>
            {(staff.length ? staff : facilityStaff.slice(0, 4)).map((s) => (
              <Tr key={s.name + s.facility}>
                <Td>
                  <p className="text-[14px] font-extrabold text-primary-950">{s.name}</p>
                </Td>
                <Td>
                  <Badge tone="info">{s.role}</Badge>
                </Td>
                <Td>
                  <span className="text-[13px] font-semibold text-text-main">{s.facility}</span>
                </Td>
                <Td>
                  <span className="rounded-lg bg-emerald-50 px-2.5 py-1 text-[12px] font-bold text-emerald-800">
                    {s.shift}
                  </span>
                </Td>
              </Tr>
            ))}
          </DataTable>
        </div>

        <div className="space-y-4">
          <h2 className="flex items-center gap-2 text-[17px] font-extrabold text-primary-950">
            <Building2 className="h-5 w-5 text-primary-700" />
            Tổng hợp vận hành cơ sở
          </h2>
          <Card className="relative overflow-hidden">
            <BorderBeam size={180} duration={11} />
            <div className="flex items-center justify-between">
              <h3 className="text-[16px] font-extrabold text-primary-950">
                Workload hôm nay
              </h3>
              <Badge tone="success">{card.status}</Badge>
            </div>
            <p className="mt-2 flex items-center gap-1.5 text-[13px] font-medium text-text-secondary">
              <MapPin className="h-4 w-4 text-primary-600" />
              {card.address}
            </p>
            <p className="mt-3 rounded-xl border border-primary-100 bg-primary-50/50 p-3.5 text-[14px] font-semibold text-primary-950">
              {card.studiesToday} studies · {card.waiting} chờ đọc · {card.critical} AI Critical · Trạng thái: {card.status}
            </p>
            <div className="mt-4 flex flex-wrap gap-2.5">
              <Button href="/dashboard/worklist" size="sm">
                Mở Worklist cơ sở
              </Button>
              <Button href="/dashboard/hang-doi" size="sm" variant="secondary">
                Xem Hàng đợi chụp
              </Button>
            </div>
          </Card>
        </div>
      </div>
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
