"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Activity,
  CheckCircle2,
  Clock3,
  Cpu,
  ListChecks,
  Upload,
  UserCheck,
  Wrench,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { DataTable, Td, Tr } from "@/components/ui/DataTable";
import { FilterBar, FilterSelect } from "@/components/ui/FilterBar";
import { PageHeader } from "@/components/ui/PageHeader";
import { Tabs } from "@/components/ui/Tabs";
import { machines, queueItems } from "@/lib/demo-data";

const priorityTone = {
  Thường: "neutral" as const,
  "Ưu tiên": "warning" as const,
  "Cấp cứu": "critical" as const,
};

const tabStatusMap: Record<string, string> = {
  cho: "Đang chờ đến",
  checkin: "Đã Check-in",
  chup: "Đang chụp",
  xong: "Hoàn thành",
};

export default function QueuePage() {
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [roomFilter, setRoomFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");

  const counts = useMemo(
    () => ({
      cho: queueItems.filter((q) => q.status === "Đang chờ đến").length,
      checkin: queueItems.filter((q) => q.status === "Đã Check-in").length,
      chup: queueItems.filter((q) => q.status === "Đang chụp").length,
      xong: queueItems.filter((q) => q.status === "Hoàn thành").length,
    }),
    [],
  );

  const filtered = useMemo(() => {
    return queueItems.filter((q) => {
      if (activeTab !== "all" && q.status !== tabStatusMap[activeTab]) return false;
      if (roomFilter && q.room !== roomFilter) return false;
      if (priorityFilter && q.clinicalPriority !== priorityFilter) return false;
      if (search.trim()) {
        const s = search.toLowerCase();
        const hit =
          q.patient.toLowerCase().includes(s) ||
          q.patientId.toLowerCase().includes(s) ||
          String(q.stt).toLowerCase().includes(s) ||
          q.exam.toLowerCase().includes(s);
        if (!hit) return false;
      }
      return true;
    });
  }, [activeTab, roomFilter, priorityFilter, search]);

  const kpis = [
    {
      label: "Đang chờ đến",
      value: counts.cho,
      sub: "Chưa check-in tại quầy",
      icon: Clock3,
      tone: "bg-primary-50 text-primary-600",
    },
    {
      label: "Đã Check-in",
      value: counts.checkin,
      sub: "Sẵn sàng gọi vào phòng chụp",
      icon: UserCheck,
      tone: "bg-primary-75 text-primary-700",
    },
    {
      label: "Đang chụp",
      value: counts.chup,
      sub: "KTV đang thực hiện kỹ thuật",
      icon: Activity,
      tone: "bg-amber-50 text-amber-700",
    },
    {
      label: "Hoàn thành hôm nay",
      value: counts.xong,
      sub: "Đã đẩy ảnh lên PACS",
      icon: CheckCircle2,
      tone: "bg-emerald-50 text-emerald-700",
    },
  ];

  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        breadcrumb="LÂM SÀNG & TIẾP NHẬN · CHECK-IN & HÀNG ĐỢI"
        title="Check-in & Hàng đợi"
        description="Quản lý bệnh nhân đến chụp. Clinical Priority xử lý riêng với AI Priority."
        actions={
          <>
            <Button href="/dashboard/lich-chup" size="sm" variant="secondary">
              Xem lịch máy
            </Button>
            <Button href="/dashboard/studies/upload" size="sm">
              <Upload className="size-4" /> Upload DICOM
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

      {/* Live Modality Room Status Strip */}
      <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-primary-100 bg-white p-4 overview-wrapper-shadow">
        <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-[0.04em] text-primary-800">
          <ListChecks className="size-4 text-primary-600" /> Trạng thái phòng máy:
        </span>
        {machines.map((m) => (
          <div
            key={m.id}
            className="inline-flex items-center gap-2 rounded-xl border border-primary-100 bg-primary-50/50 px-3.5 py-2 text-xs"
          >
            {m.status === "online" ? (
              <Cpu className="size-3.5 text-primary-600" />
            ) : (
              <Wrench className="size-3.5 text-amber-600" />
            )}
            <span className="font-bold text-primary-900">{m.name}</span>
            <span className="text-text-secondary">· {m.room}</span>
            <Badge tone={m.status === "online" ? "success" : "warning"}>
              {m.status === "online" ? "Online" : "Bảo trì"}
            </Badge>
          </div>
        ))}
      </div>

      {/* Unified Tabs + Filter Bar */}
      <div className="flex flex-col gap-3.5 rounded-2xl border border-primary-100 bg-white p-4 overview-wrapper-shadow">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-primary-100/80 pb-3.5">
          <Tabs
            active={activeTab}
            onChange={setActiveTab}
            items={[
              { id: "all", label: "Tất cả hàng đợi", count: queueItems.length },
              { id: "cho", label: "Đang chờ đến", count: counts.cho },
              { id: "checkin", label: "Đã Check-in", count: counts.checkin },
              { id: "chup", label: "Đang chụp", count: counts.chup },
              { id: "xong", label: "Hoàn thành", count: counts.xong },
            ]}
          />
          <span className="text-xs font-semibold text-primary-700 tabular-nums">
            Hiển thị <strong>{filtered.length}</strong> / {queueItems.length} lượt chụp
          </span>
        </div>

        <FilterBar
          searchPlaceholder="Tìm bệnh nhân, mã BN hoặc số thứ tự trong hàng đợi..."
          searchValue={search}
          onSearchChange={setSearch}
        >
          <FilterSelect
            label="Phòng"
            options={["Phòng 101", "Phòng 102", "Phòng 202", "Phòng 301"]}
            value={roomFilter}
            onChange={setRoomFilter}
          />
          <FilterSelect
            label="Clinical Priority"
            options={["Thường", "Ưu tiên", "Cấp cứu"]}
            value={priorityFilter}
            onChange={setPriorityFilter}
          />
        </FilterBar>
      </div>

      {/* Composite Queue Table */}
      <DataTable
        headers={[
          "STT & Giờ hẹn",
          "Bệnh nhân",
          "Kỹ thuật chụp X-quang",
          "Clinical Priority",
          "Phòng / Máy & Thời gian chờ",
          "Trạng thái",
          "Thao tác",
        ]}
        minWidth="940px"
      >
        {filtered.map((q) => (
          <Tr
            key={q.stt}
            className={
              q.clinicalPriority === "Cấp cứu"
                ? "border-l-4 border-l-critical bg-red-50/35"
                : q.clinicalPriority === "Ưu tiên"
                  ? "border-l-4 border-l-warning bg-amber-50/25"
                  : undefined
            }
          >
            <Td>
              <div className="flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-600 font-mono text-sm font-extrabold text-white shadow-2xs">
                  {q.stt}
                </span>
                <div>
                  <p className="text-xs font-semibold text-text-secondary">Giờ hẹn</p>
                  <p className="font-mono text-sm font-extrabold text-primary-900 tabular-nums">
                    {q.time}
                  </p>
                </div>
              </div>
            </Td>
            <Td>
              <Link
                href={`/dashboard/benh-nhan/${q.patientId}`}
                className="text-[15px] font-bold text-primary-900 hover:text-primary-600 hover:underline"
              >
                {q.patient}
              </Link>
              <p className="mt-0.5 font-mono text-xs font-semibold text-primary-600">
                {q.patientId}
              </p>
            </Td>
            <Td>
              <p className="font-bold text-primary-900">{q.exam}</p>
              <p className="mt-0.5 text-xs text-text-secondary">Kỹ thuật số DR</p>
            </Td>
            <Td>
              <Badge
                tone={priorityTone[q.clinicalPriority as keyof typeof priorityTone]}
              >
                {q.clinicalPriority}
              </Badge>
            </Td>
            <Td>
              <p className="font-bold text-primary-900">
                {q.room} · <span className="text-primary-600">{q.machine}</span>
              </p>
              <p className="mt-0.5 text-xs text-text-secondary tabular-nums">
                Thời gian chờ: <strong className="text-primary-800">{q.wait}</strong>
              </p>
            </Td>
            <Td>
              <Badge
                tone={
                  q.status === "Hoàn thành"
                    ? "success"
                    : q.status === "Đang chụp"
                      ? "warning"
                      : "primary"
                }
              >
                {q.status}
              </Badge>
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
                    <Button
                      href="/dashboard/studies/upload"
                      size="sm"
                      variant="primary"
                    >
                      Upload DICOM
                    </Button>
                  </>
                )}
                {q.status === "Hoàn thành" && (
                  <Button href="/dashboard/studies" size="sm" variant="secondary">
                    Xem Study →
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
