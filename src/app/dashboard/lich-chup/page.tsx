"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Activity,
  CalendarCheck,
  CalendarClock,
  CalendarDays,
  Clock3,
  Cpu,
  Plus,
  Wrench,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { FilterBar, FilterSelect } from "@/components/ui/FilterBar";
import { PageHeader } from "@/components/ui/PageHeader";
import { Tabs } from "@/components/ui/Tabs";
import { appointments, machines } from "@/lib/demo-data";

const statusTone = {
  "Đã đặt": "info" as const,
  "Đã Check-in": "primary" as const,
  "Đang chụp": "warning" as const,
  "Hoàn thành": "success" as const,
  "Đã hủy": "neutral" as const,
};

export default function CalendarPage() {
  const [viewMode, setViewMode] = useState("ngay");
  const [search, setSearch] = useState("");
  const [facilityFilter, setFacilityFilter] = useState("");
  const [roomFilter, setRoomFilter] = useState("");
  const [machineFilter, setMachineFilter] = useState("");

  const doneCount = useMemo(
    () => appointments.filter((a) => a.status === "Hoàn thành").length,
    [],
  );
  const activeCount = useMemo(
    () =>
      appointments.filter(
        (a) => a.status === "Đang chụp" || a.status === "Đã Check-in",
      ).length,
    [],
  );

  const visibleMachines = useMemo(() => {
    return machines.filter((m) => {
      if (facilityFilter && m.facility !== facilityFilter) return false;
      if (roomFilter && m.room !== roomFilter) return false;
      if (machineFilter && m.name !== machineFilter) return false;
      return true;
    });
  }, [facilityFilter, roomFilter, machineFilter]);

  const kpis = [
    {
      label: "Lịch hôm nay",
      value: appointments.length,
      sub: "Thứ Năm, 16/04/2026",
      icon: CalendarDays,
      tone: "bg-primary-50 text-primary-600",
    },
    {
      label: "Đã hoàn thành",
      value: doneCount,
      sub: "Đã chuyển sang PACS",
      icon: CalendarCheck,
      tone: "bg-emerald-50 text-emerald-700",
    },
    {
      label: "Đang chụp / check-in",
      value: activeCount,
      sub: "Đang xử lý tại phòng máy",
      icon: Activity,
      tone: "bg-amber-50 text-amber-700",
    },
    {
      label: "Còn trống (ước)",
      value: 12,
      sub: "Khung giờ 15 phút khả dụng",
      icon: CalendarClock,
      tone: "bg-primary-75 text-primary-700",
    },
  ];

  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        breadcrumb="LÂM SÀNG & TIẾP NHẬN · LỊCH CHỤP X-QUANG"
        title="Lịch chụp"
        description="Resource calendar theo máy X-quang và phòng chụp — Thứ Năm, 16/04/2026."
        actions={
          <>
            <Button href="/dashboard/hang-doi" size="sm" variant="secondary">
              Hàng đợi
            </Button>
            <Button href="/dashboard/dat-lich" size="sm">
              <Plus className="size-4" /> Đặt lịch
            </Button>
          </>
        }
      />

      {/* 4 KPI Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((b) => (
          <div
            key={b.label}
            className="flex items-center justify-between rounded-t-xl rounded-b-lg border border-primary-100 border-b-[5px] border-b-primary-600 bg-white p-5 overview-wrapper-shadow"
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.04em] text-text-secondary">
                {b.label}
              </p>
              <p className="mt-1.5 text-[28px] font-extrabold leading-none text-primary-900 tabular-nums">
                {b.value}
              </p>
              <p className="mt-1.5 text-xs font-medium text-primary-600">{b.sub}</p>
            </div>
            <span
              className={`flex size-12 shrink-0 items-center justify-center rounded-2xl ${b.tone}`}
            >
              <b.icon className="size-6" />
            </span>
          </div>
        ))}
      </div>

      {/* Unified View Switcher & Resource Filter Bar */}
      <div className="flex flex-col gap-3.5 rounded-2xl border border-primary-100 bg-white p-4 overview-wrapper-shadow">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-primary-100/80 pb-3.5">
          <Tabs
            active={viewMode}
            onChange={setViewMode}
            items={[
              { id: "ngay", label: "Ngày (16/04)" },
              { id: "tuan", label: "Tuần (13/04 – 19/04)" },
              { id: "thang", label: "Tháng 04/2026" },
            ]}
          />
          <span className="inline-flex items-center gap-2 rounded-xl bg-primary-50 px-3.5 py-2 text-xs font-bold text-primary-800">
            <CalendarDays className="size-4 text-primary-600" />
            Thứ Năm, 16/04/2026 · {visibleMachines.length} máy hiển thị
          </span>
        </div>

        <FilterBar
          searchPlaceholder="Tìm bệnh nhân hoặc mã lịch (LC2026...)..."
          searchValue={search}
          onSearchChange={setSearch}
        >
          <FilterSelect
            label="Cơ sở"
            options={[
              "BV Đa khoa Trung ương",
              "Phòng khám Đa khoa số 3",
              "Bệnh viện Quận 7",
            ]}
            value={facilityFilter}
            onChange={setFacilityFilter}
          />
          <FilterSelect
            label="Phòng"
            options={["Phòng 101", "Phòng 102", "Phòng 103", "Phòng 202", "Phòng 301"]}
            value={roomFilter}
            onChange={setRoomFilter}
          />
          <FilterSelect
            label="Máy"
            options={machines.map((m) => m.name)}
            value={machineFilter}
            onChange={setMachineFilter}
          />
        </FilterBar>
      </div>

      {/* Resource Calendar Columns by Modality Machine */}
      <div className="grid gap-5 lg:grid-cols-3">
        {visibleMachines.map((m) => {
          const machineAppointments = appointments.filter((a) => {
            if (a.machine !== m.name) return false;
            if (search.trim()) {
              const q = search.toLowerCase();
              return (
                a.patient.toLowerCase().includes(q) ||
                a.id.toLowerCase().includes(q) ||
                a.exam.toLowerCase().includes(q)
              );
            }
            return true;
          });

          return (
            <Card
              key={m.id}
              accent="bottom"
              className="flex min-h-[440px] flex-col justify-between"
            >
              <div>
                {/* Machine Column Header */}
                <div className="mb-4 flex items-start justify-between gap-3 rounded-xl border border-primary-100 bg-primary-50/60 p-4">
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${
                        m.status === "online"
                          ? "bg-primary-600 text-white"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {m.status === "online" ? (
                        <Cpu className="size-5" />
                      ) : (
                        <Wrench className="size-5" />
                      )}
                    </span>
                    <div>
                      <p className="text-base font-extrabold text-primary-900">
                        {m.name}
                      </p>
                      <p className="text-xs font-medium text-text-secondary">
                        {m.room} · {m.facility}
                      </p>
                    </div>
                  </div>
                  <Badge tone={m.status === "online" ? "success" : "warning"}>
                    {m.status === "online" ? "Online" : "Bảo trì"}
                  </Badge>
                </div>

                {/* Slot Cards */}
                <div className="space-y-3">
                  {machineAppointments.map((a) => (
                    <div
                      key={a.id}
                      className={`rounded-xl border p-4 transition-all hover:shadow-xs ${
                        a.status === "Đang chụp"
                          ? "border-l-4 border-l-amber-500 border-amber-200 bg-amber-50/40"
                          : a.status === "Hoàn thành"
                            ? "border-l-4 border-l-emerald-600 border-emerald-200/80 bg-emerald-50/30"
                            : "border-l-4 border-l-primary-600 border-primary-100 bg-white"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-md bg-primary-75 px-2.5 py-1 text-xs font-extrabold text-primary-800 tabular-nums">
                          <Clock3 className="size-3.5 text-primary-600" />
                          {a.time}
                        </span>
                        <Badge
                          tone={
                            statusTone[a.status as keyof typeof statusTone] ?? "neutral"
                          }
                        >
                          {a.status}
                        </Badge>
                      </div>
                      <p className="mt-2.5 text-[15px] font-bold text-primary-900">
                        {a.patient}
                      </p>
                      <p className="mt-0.5 text-xs font-medium text-text-secondary">
                        {a.exam} · Thời lượng: <strong>{a.duration}</strong>
                      </p>
                      <div className="mt-3 flex items-center justify-between border-t border-primary-100/70 pt-2.5 text-xs">
                        <span className="font-mono font-bold text-primary-600">
                          {a.id}
                        </span>
                        <Link
                          href="/dashboard/hang-doi"
                          className="font-bold text-primary-600 hover:underline"
                        >
                          Mở hàng đợi →
                        </Link>
                      </div>
                    </div>
                  ))}

                  {machineAppointments.length === 0 && (
                    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-primary-200 bg-primary-50/30 px-4 py-12 text-center">
                      <p className="text-sm font-bold text-primary-800">
                        {m.status === "maintenance"
                          ? "Máy đang bảo trì kỹ thuật"
                          : "Chưa có lịch hẹn trên máy này"}
                      </p>
                      <p className="mt-1 text-xs text-text-secondary">
                        {m.status === "maintenance"
                          ? "Tạm ngưng phân bổ lịch chụp mới."
                          : "Nhấn + Đặt lịch để phân bổ ca chụp vào khung giờ trống."}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-primary-100 pt-3 text-xs text-text-secondary">
                <span>Tổng ca trong ngày:</span>
                <strong className="font-extrabold text-primary-800 tabular-nums">
                  {machineAppointments.length} ca chụp
                </strong>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
