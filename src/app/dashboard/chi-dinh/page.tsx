"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  Building2,
  CheckCircle2,
  ClipboardList,
  Clock3,
  Plus,
  Stethoscope,
  UserRound,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { DataTable, Td, Tr } from "@/components/ui/DataTable";
import { FilterBar, FilterSelect } from "@/components/ui/FilterBar";
import { Input } from "@/components/ui/Input";
import { PageHeader } from "@/components/ui/PageHeader";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { BorderBeam } from "@/components/magicui/BorderBeam";
import { SegmentedTabsParticle } from "@/components/ui/particles/p-segmented-tabs";
import { imagingOrders } from "@/lib/demo-data";

const priorityTone = {
  Thường: "neutral" as const,
  "Ưu tiên": "warning" as const,
  "Cấp cứu": "critical" as const,
};

const steps = ["Thông tin chỉ định", "Đặt lịch", "Xác nhận"];

export default function ImagingOrderPage() {
  const [priorityTab, setPriorityTab] = useState("all");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [doctorFilter, setDoctorFilter] = useState("");

  const urgentCount = useMemo(
    () => imagingOrders.filter((o) => o.clinicalPriority === "Cấp cứu").length,
    [],
  );
  const waitingCount = useMemo(
    () => imagingOrders.filter((o) => o.status === "Chờ check-in").length,
    [],
  );
  const doneCount = useMemo(
    () => imagingOrders.filter((o) => o.status === "Hoàn tất báo cáo").length,
    [],
  );

  const filtered = useMemo(() => {
    return imagingOrders.filter((o) => {
      if (priorityTab !== "all" && o.clinicalPriority !== priorityTab) return false;
      if (statusFilter && o.status !== statusFilter) return false;
      if (doctorFilter && o.doctor !== doctorFilter) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        const hit =
          o.id.toLowerCase().includes(q) ||
          o.patient.toLowerCase().includes(q) ||
          o.patientId.toLowerCase().includes(q) ||
          o.exam.toLowerCase().includes(q);
        if (!hit) return false;
      }
      return true;
    });
  }, [priorityTab, statusFilter, doctorFilter, search]);

  const kpis = [
    {
      label: "Tổng chỉ định",
      value: imagingOrders.length,
      sub: "Phiếu chỉ định trong ca",
      icon: ClipboardList,
      tone: "bg-primary-50 text-primary-600",
    },
    {
      label: "Cấp cứu",
      value: urgentCount,
      sub: "Ưu tiên chụp ngay (STAT)",
      icon: AlertTriangle,
      tone: "bg-red-50 text-critical",
    },
    {
      label: "Chờ check-in",
      value: waitingCount,
      sub: "Đang chờ tiếp nhận tại quầy",
      icon: Clock3,
      tone: "bg-amber-50 text-amber-700",
    },
    {
      label: "Hoàn tất báo cáo",
      value: doneCount,
      sub: "Đã ký trả kết quả lâm sàng",
      icon: CheckCircle2,
      tone: "bg-emerald-50 text-emerald-700",
    },
  ];

  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        breadcrumb="LÂM SÀNG & TIẾP NHẬN · CHỈ ĐỊNH CHỤP"
        title="Chỉ định chụp X-quang"
        description="Danh sách chỉ định và form tạo mới. Clinical Priority do bác sĩ chỉ định — độc lập với AI Priority."
        actions={
          <Button href="#tao-moi" size="sm">
            <Plus className="size-4" /> Tạo chỉ định
          </Button>
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

      {/* Unified Segmented Tabs & Search Bar */}
      <div className="flex flex-col gap-3.5 rounded-2xl border border-primary-100 bg-white p-4 overview-wrapper-shadow">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-primary-100/80 pb-3.5">
          <SegmentedTabsParticle
            active={priorityTab}
            onChange={setPriorityTab}
            items={[
              { id: "all", label: "Tất cả chỉ định", count: imagingOrders.length },
              { id: "Cấp cứu", label: "Cấp cứu", count: urgentCount },
              {
                id: "Ưu tiên",
                label: "Ưu tiên",
                count: imagingOrders.filter((o) => o.clinicalPriority === "Ưu tiên").length,
              },
              {
                id: "Thường",
                label: "Thường",
                count: imagingOrders.filter((o) => o.clinicalPriority === "Thường").length,
              },
            ]}
          />
          <span className="text-xs font-semibold text-primary-700 tabular-nums">
            Hiển thị <strong>{filtered.length}</strong> / {imagingOrders.length} phiếu
          </span>
        </div>

        <FilterBar
          searchPlaceholder="Tìm theo mã chỉ định (CD2026...), tên hoặc mã bệnh nhân..."
          searchValue={search}
          onSearchChange={setSearch}
        >
          <FilterSelect
            label="Trạng thái"
            options={[
              "Đã đặt lịch",
              "Chờ check-in",
              "Đang chụp",
              "Chờ đọc",
              "Hoàn tất báo cáo",
            ]}
            value={statusFilter}
            onChange={setStatusFilter}
          />
          <FilterSelect
            label="Bác sĩ"
            options={["BS. Lê Thu Hà", "BS. Phạm Quang", "BS. Trần Minh"]}
            value={doctorFilter}
            onChange={setDoctorFilter}
          />
        </FilterBar>
      </div>

      {/* Composite Table */}
      <DataTable
        headers={[
          "Mã chỉ định & Thời gian",
          "Bệnh nhân",
          "Kỹ thuật chụp X-quang",
          "Clinical Priority",
          "Bác sĩ & Cơ sở",
          "Trạng thái",
          "Thao tác",
        ]}
        minWidth="940px"
      >
        {filtered.map((o) => (
          <Tr
            key={o.id}
            className={
              o.clinicalPriority === "Cấp cứu"
                ? "border-l-4 border-l-critical bg-red-50/35"
                : o.clinicalPriority === "Ưu tiên"
                  ? "border-l-4 border-l-warning bg-amber-50/25"
                  : undefined
            }
          >
            <Td>
              <span className="inline-block rounded-md bg-primary-75 px-2 py-0.5 font-mono text-xs font-extrabold text-primary-700">
                {o.id}
              </span>
              <p className="mt-1 text-xs text-text-secondary tabular-nums">{o.createdAt}</p>
            </Td>
            <Td>
              <Link
                href={`/dashboard/benh-nhan/${o.patientId}`}
                className="text-[15px] font-bold text-primary-900 hover:text-primary-600 hover:underline"
              >
                {o.patient}
              </Link>
              <p className="mt-0.5 font-mono text-xs font-semibold text-primary-600">
                {o.patientId}
              </p>
            </Td>
            <Td>
              <p className="font-bold text-primary-900">{o.exam}</p>
              <p className="mt-0.5 text-xs text-text-secondary">Modality: DX / CR</p>
            </Td>
            <Td>
              <Badge tone={priorityTone[o.clinicalPriority]}>{o.clinicalPriority}</Badge>
            </Td>
            <Td>
              <p className="flex items-center gap-1.5 font-semibold text-primary-900">
                <Stethoscope className="size-3.5 text-primary-600" />
                {o.doctor}
              </p>
              <p className="mt-0.5 flex items-center gap-1.5 text-xs text-text-secondary">
                <Building2 className="size-3.5 text-primary-500" />
                {o.facility}
              </p>
            </Td>
            <Td>
              <Badge
                tone={
                  o.status === "Hoàn tất báo cáo"
                    ? "success"
                    : o.status === "Đang chụp"
                      ? "warning"
                      : "primary"
                }
              >
                {o.status}
              </Badge>
            </Td>
            <Td>
              {o.status === "Đã đặt lịch" || o.status === "Chờ check-in" ? (
                <Button href="/dashboard/hang-doi" size="sm" variant="primary">
                  Check-in →
                </Button>
              ) : (
                <Button href="/dashboard/lich-chup" size="sm" variant="secondary">
                  Xem lịch
                </Button>
              )}
            </Td>
          </Tr>
        ))}
      </DataTable>

      {/* Step 1/3 Create New Imaging Order */}
      <div id="tao-moi" className="mt-6 scroll-mt-6">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-extrabold text-primary-900">Tạo chỉ định mới</h2>
            <p className="mt-0.5 text-sm text-text-secondary">
              Bước 1/3 — Nhập thông tin chỉ định lâm sàng trước khi chuyển sang đặt lịch máy.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`flex h-9 items-center gap-2 rounded-full px-4 text-xs font-bold ${
                    i === 0
                      ? "bg-primary-600 text-white shadow-xs"
                      : "border border-primary-100 bg-white text-text-secondary"
                  }`}
                >
                  <span className="flex size-5 items-center justify-center rounded-full bg-white/20 text-[11px]">
                    {i + 1}
                  </span>
                  {s}
                </div>
                {i < steps.length - 1 && (
                  <span className="font-bold text-primary-300">→</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[320px_1fr]">
          <Card accent="bottom" className="flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.04em] text-primary-600">
                <UserRound className="size-4" /> Hồ sơ người bệnh đang chọn
              </div>
              <p className="mt-3 text-lg font-extrabold text-primary-900">Nguyễn Văn Hùng</p>
              <p className="mt-1 font-mono text-xs font-bold text-primary-600">
                BN0001287 · 68 tuổi · Nam
              </p>
              <div className="mt-4 space-y-2 rounded-xl bg-primary-50/60 p-3.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Cơ sở:</span>
                  <strong className="text-primary-900">BV Đa khoa Trung ương</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Dị ứng:</span>
                  <strong className="text-emerald-700">Không</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Study gần nhất:</span>
                  <strong className="text-primary-900">16/04/2026</strong>
                </div>
              </div>
            </div>
            <Button
              href="/dashboard/benh-nhan/BN0001287"
              variant="secondary"
              size="sm"
              className="mt-5 w-full"
            >
              Đổi bệnh nhân
            </Button>
          </Card>

          <div className="relative overflow-hidden rounded-2xl border border-primary-100 border-b-[5px] border-b-primary-600 bg-white p-6 overview-wrapper-shadow">
            <BorderBeam size={240} duration={12} colorFrom="#0096d1" colorTo="#0d71ba" />
            <h3 className="mb-5 text-lg font-extrabold text-primary-900">
              Thông tin chỉ định lâm sàng
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              <Select
                label="Loại chụp"
                required
                options={[{ value: "xq", label: "X-quang" }]}
              />
              <Select
                label="Vùng chụp"
                required
                options={[{ value: "nguc", label: "Ngực" }]}
              />
              <Select
                label="Tư thế"
                required
                options={[
                  { value: "pa", label: "PA (Thẳng)" },
                  { value: "lat", label: "Lateral (Nghiêng)" },
                  { value: "pa-lat", label: "PA + Lateral" },
                ]}
              />
              <Select
                label="Clinical Priority"
                required
                options={[
                  { value: "thuong", label: "Thường" },
                  { value: "uu-tien", label: "Ưu tiên" },
                  { value: "cap-cuu", label: "Cấp cứu" },
                ]}
              />
              <Select
                label="Cơ sở thực hiện"
                required
                options={[
                  { value: "tw", label: "Bệnh viện Đa khoa Trung ương" },
                  { value: "cs1", label: "Cơ sở 1" },
                  { value: "cs2", label: "Cơ sở 2" },
                ]}
              />
              <Input label="Bác sĩ chỉ định" defaultValue="BS. Lê Thu Hà" required />
              <div className="md:col-span-2">
                <Textarea
                  label="Lý do / Chỉ định lâm sàng"
                  required
                  defaultValue="Ho kéo dài 5 ngày, sốt nhẹ. Đánh giá viêm phổi."
                />
              </div>
              <div className="md:col-span-2">
                <Textarea
                  label="Ghi chú"
                  placeholder="Ghi chú thêm cho KTV (tư thế đứng/nằm, hỗ trợ oxy...)"
                />
              </div>
            </div>
            <div className="mt-6 flex flex-wrap justify-end gap-2.5 border-t border-primary-100 pt-4">
              <Button variant="secondary">Lưu nháp</Button>
              <Button href="/dashboard/dat-lich">Tiếp tục đặt lịch →</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
