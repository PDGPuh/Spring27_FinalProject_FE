"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  Building2,
  Clock,
  Cpu,
  MapPin,
  Radio,
  Server,
  ShieldAlert,
  Stethoscope,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { BorderBeam } from "@/components/ui/BorderBeam";
import { DataTable, Td, Tr } from "@/components/ui/DataTable";
import { FilterBar, FilterSelect } from "@/components/ui/FilterBar";
import { PageHeader } from "@/components/ui/PageHeader";
import { SegmentedTabsParticle } from "@/components/ui/SegmentedTabsParticle";
import { facilityCards, facilityPerformance, machines } from "@/lib/demo-data";

export default function FacilitiesPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [facilityFilter, setFacilityFilter] = useState("");

  const onlineCount = machines.filter((m) => m.status === "online").length;
  const totalStudiesToday = facilityCards.reduce((s, f) => s + f.studiesToday, 0);
  const totalWaiting = facilityCards.reduce((s, f) => s + f.waiting, 0);

  const filteredMachines = useMemo(() => {
    return machines.filter((m) => {
      if (activeTab === "online" && m.status !== "online") return false;
      if (activeTab === "issue" && m.status === "online") return false;
      if (facilityFilter && m.facility !== facilityFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match =
          m.name.toLowerCase().includes(q) ||
          m.facility.toLowerCase().includes(q) ||
          m.room.toLowerCase().includes(q) ||
          m.model.toLowerCase().includes(q) ||
          m.aeTitle.toLowerCase().includes(q) ||
          m.ip.toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    });
  }, [activeTab, searchQuery, facilityFilter]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Cơ sở"
        description="Quản lý đa cơ sở, máy X-quang, workload và nhân sự theo site."
        actions={
          <Badge tone="success">
            {onlineCount}/{machines.length} Máy X-quang Online
          </Badge>
        }
      />

      {/* 4 KPI Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="relative overflow-hidden rounded-2xl border border-primary-100 border-b-[4px] border-b-primary-600 bg-white p-5 overview-wrapper-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[12px] font-extrabold uppercase tracking-wider text-text-secondary">
                Số cơ sở
              </p>
              <p className="mt-2 font-mono text-[30px] font-black leading-none text-primary-950">
                {facilityCards.length}
              </p>
              <p className="mt-2 text-[12px] font-semibold text-primary-700">
                Bệnh viện & Phòng khám kết nối
              </p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
              <Building2 className="h-5 w-5" />
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-emerald-200 border-b-[4px] border-b-emerald-600 bg-white p-5 overview-wrapper-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[12px] font-extrabold uppercase tracking-wider text-emerald-700">
                Máy online
              </p>
              <p className="mt-2 font-mono text-[30px] font-black leading-none text-emerald-700">
                {onlineCount}/{machines.length}
              </p>
              <p className="mt-2 text-[12px] font-semibold text-emerald-800">
                Sẵn sàng nhận ca chụp DICOM
              </p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <Radio className="h-5 w-5" />
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-violet-200 border-b-[4px] border-b-ai bg-white p-5 overview-wrapper-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[12px] font-extrabold uppercase tracking-wider text-violet-700">
                Studies hôm nay
              </p>
              <p className="mt-2 font-mono text-[30px] font-black leading-none text-ai">
                {totalStudiesToday}
              </p>
              <p className="mt-2 text-[12px] font-semibold text-violet-800">
                Tổng lưu lượng chụp toàn mạng lưới
              </p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-ai">
              <Activity className="h-5 w-5" />
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-amber-200 border-b-[4px] border-b-amber-500 bg-white p-5 overview-wrapper-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[12px] font-extrabold uppercase tracking-wider text-amber-800">
                Chờ đọc
              </p>
              <p className="mt-2 font-mono text-[30px] font-black leading-none text-amber-700">
                {totalWaiting}
              </p>
              <p className="mt-2 text-[12px] font-semibold text-amber-800">
                Ca đang chờ Bác sĩ CĐHA kết luận
              </p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <Clock className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>

      {/* 3 Elevated Facility Cards */}
      <div className="grid gap-5 md:grid-cols-3">
        {facilityCards.map((f, idx) => (
          <div
            key={f.name}
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-primary-100 border-b-[5px] border-b-primary-600 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-primary-300 overview-wrapper-shadow"
          >
            {idx === 0 && <BorderBeam size={200} duration={12} />}
            <div>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-75 text-primary-700">
                    <Building2 className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-[18px] font-extrabold leading-snug text-primary-950">
                      {f.name}
                    </h2>
                    <p className="mt-1 flex items-center gap-1.5 text-[13px] font-medium text-text-secondary">
                      <MapPin className="h-3.5 w-3.5 shrink-0 text-primary-600" />
                      {f.address}
                    </p>
                  </div>
                </div>
                <Badge tone="success">{f.status}</Badge>
              </div>

              <dl className="mt-5 grid grid-cols-3 gap-3 rounded-xl border border-primary-100/80 bg-primary-50/40 p-3.5 text-center">
                <div>
                  <dt className="text-[11px] font-bold uppercase tracking-wider text-text-secondary">
                    Máy X-quang
                  </dt>
                  <dd className="mt-1 font-mono text-[18px] font-black text-primary-950">
                    {f.machines}
                  </dd>
                </div>
                <div className="border-x border-primary-100">
                  <dt className="text-[11px] font-bold uppercase tracking-wider text-text-secondary">
                    Bác sĩ
                  </dt>
                  <dd className="mt-1 font-mono text-[18px] font-black text-primary-950">
                    {f.doctors}
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] font-bold uppercase tracking-wider text-text-secondary">
                    KTV
                  </dt>
                  <dd className="mt-1 font-mono text-[18px] font-black text-primary-950">
                    {f.techs}
                  </dd>
                </div>
              </dl>

              <div className="mt-4 grid grid-cols-3 gap-2.5 text-[13px]">
                <div className="rounded-xl border border-primary-100 bg-white px-3 py-2.5">
                  <span className="block text-[11px] font-bold text-text-secondary">
                    Studies hôm nay
                  </span>
                  <span className="mt-0.5 block font-mono text-[16px] font-extrabold text-primary-900">
                    {f.studiesToday}
                  </span>
                </div>
                <div className="rounded-xl border border-amber-200/80 bg-amber-50/40 px-3 py-2.5">
                  <span className="block text-[11px] font-bold text-amber-800">
                    Chờ đọc
                  </span>
                  <span className="mt-0.5 block font-mono text-[16px] font-extrabold text-amber-700">
                    {f.waiting}
                  </span>
                </div>
                <div className="rounded-xl border border-red-200/80 bg-red-50/40 px-3 py-2.5">
                  <span className="block text-[11px] font-bold text-red-800">
                    AI Critical
                  </span>
                  <span className="mt-0.5 block font-mono text-[16px] font-extrabold text-critical">
                    {f.critical}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-5 border-t border-primary-100 pt-4">
              <Link
                href={`/dashboard/co-so/${encodeURIComponent(f.name)}`}
                className="inline-flex w-full items-center justify-between rounded-xl bg-primary-75/70 px-4 py-2.5 text-[14px] font-extrabold text-primary-800 transition-colors hover:bg-primary-600 hover:text-white"
              >
                <span>Xem chi tiết cơ sở & thiết bị</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Máy X-quang toàn hệ thống */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="flex items-center gap-2 text-[18px] font-extrabold text-primary-950">
              <Cpu className="h-5 w-5 text-primary-700" />
              Máy X-quang toàn hệ thống
            </h2>
            <p className="text-[13px] font-medium text-text-secondary">
               Trạng thái kết nối DICOM AE Title, địa chỉ IP và công suất chụp trong ngày
            </p>
          </div>
          <SegmentedTabsParticle
            activeId={activeTab}
            onChange={setActiveTab}
            tabs={[
              { id: "all", label: "Tất cả máy", count: machines.length },
              { id: "online", label: "Online", count: onlineCount, tone: "success" },
              {
                id: "issue",
                label: "Bảo trì / Offline",
                count: machines.length - onlineCount,
                tone: "warning",
              },
            ]}
          />
        </div>

        <FilterBar
          searchPlaceholder="Tìm tên máy (DR-01), phòng chụp, model thiết bị, AE Title, IP..."
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
        >
          <FilterSelect
            label="Cơ sở"
            options={Array.from(new Set(machines.map((m) => m.facility)))}
            value={facilityFilter}
            onChange={setFacilityFilter}
          />
        </FilterBar>

        <DataTable
          headers={[
            "Thiết bị & Model",
            "Cơ sở & Phòng chụp",
            "Cấu hình DICOM (AE Title / IP)",
            "Công suất hôm nay",
            "Trạng thái kết nối",
          ]}
        >
          {filteredMachines.map((m) => (
            <Tr key={m.id}>
              <Td>
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-mono text-[12px] font-extrabold ${
                      m.status === "online"
                        ? "bg-emerald-100 text-emerald-800"
                        : m.status === "maintenance"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
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
                <p className="text-[14px] font-bold text-primary-950">{m.facility}</p>
                <p className="mt-0.5 text-[12px] font-semibold text-primary-700">
                  {m.room}
                </p>
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
                </span>
                <span className="ml-1.5 text-[12px] font-medium text-text-secondary">
                  studies/ngày
                </span>
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
                      ? "Bảo trì"
                      : "Offline"}
                </Badge>
              </Td>
            </Tr>
          ))}
        </DataTable>
      </div>

      {/* Hiệu suất hôm nay */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-[18px] font-extrabold text-primary-950">
            <Server className="h-5 w-5 text-primary-700" />
            Hiệu suất hôm nay
          </h2>
          <span className="text-[13px] font-semibold text-text-secondary">
            Theo dõi SLA thời gian trả kết quả trung bình (TAT)
          </span>
        </div>
        <DataTable
          headers={[
            "Cơ sở y tế",
            "Tổng số ca chụp",
            "Đang chờ đọc",
            "Ca AI Critical",
            "Thời gian đọc TB (TAT)",
          ]}
        >
          {facilityPerformance.map((row) => (
            <Tr key={row.name}>
              <Td>
                <div className="flex items-center gap-2.5">
                  <Stethoscope className="h-4 w-4 text-primary-700" />
                  <span className="text-[15px] font-extrabold text-primary-950">
                    {row.name}
                  </span>
                </div>
              </Td>
              <Td>
                <span className="font-mono text-[15px] font-black text-primary-950">
                  {row.cases}
                </span>{" "}
                <span className="text-[12px] text-text-secondary">ca</span>
              </Td>
              <Td>
                <Badge tone="warning">{row.waiting} chờ đọc</Badge>
              </Td>
              <Td>
                <Badge tone="critical">
                  <ShieldAlert className="mr-1 inline h-3.5 w-3.5" />
                  {row.critical} Critical
                </Badge>
              </Td>
              <Td>
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-1 font-mono text-[13px] font-extrabold text-emerald-800">
                  <Users className="h-3.5 w-3.5 text-emerald-600" />
                  {row.tat}
                </span>
              </Td>
            </Tr>
          ))}
        </DataTable>
      </div>
    </div>
  );
}
