"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Activity,
  Building2,
  CreditCard,
  Phone,
  Plus,
  Stethoscope,
  UserCheck,
  UserMinus,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { DataTable, Td, Tr } from "@/components/ui/DataTable";
import { FilterBar, FilterSelect } from "@/components/ui/FilterBar";
import { PageHeader } from "@/components/ui/PageHeader";
import { SegmentedTabsParticle } from "@/components/ui/particles/p-segmented-tabs";
import { patients } from "@/lib/demo-data";

export default function PatientsPage() {
  const [statusTab, setStatusTab] = useState("all");
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("");
  const [facility, setFacility] = useState("");
  const [ageRange, setAgeRange] = useState("");

  const activeCount = useMemo(
    () => patients.filter((p) => p.status === "Hoạt động").length,
    [],
  );
  const pausedCount = patients.length - activeCount;

  const filtered = useMemo(() => {
    return patients.filter((p) => {
      if (statusTab === "active" && p.status !== "Hoạt động") return false;
      if (statusTab === "paused" && p.status !== "Tạm ngưng") return false;
      if (gender && p.gender !== gender) return false;
      if (facility && p.facility !== facility) return false;
      if (ageRange) {
        if (ageRange === "<18" && p.age >= 18) return false;
        if (ageRange === "18–40" && (p.age < 18 || p.age > 40)) return false;
        if (ageRange === "41–65" && (p.age < 41 || p.age > 65)) return false;
        if (ageRange === ">65" && p.age <= 65) return false;
      }
      if (search.trim()) {
        const q = search.toLowerCase();
        const hit =
          p.id.toLowerCase().includes(q) ||
          p.name.toLowerCase().includes(q) ||
          p.phone.toLowerCase().includes(q) ||
          p.bhyt.toLowerCase().includes(q);
        if (!hit) return false;
      }
      return true;
    });
  }, [statusTab, search, gender, facility, ageRange]);

  const kpiBlocks = [
    {
      label: "Tổng BN (mẫu)",
      value: patients.length,
      sub: "Hồ sơ lưu trữ hệ thống",
      icon: Users,
      tone: "bg-primary-50 text-primary-600",
    },
    {
      label: "Hoạt động",
      value: activeCount,
      sub: "Đang theo dõi lâm sàng",
      icon: UserCheck,
      tone: "bg-emerald-50 text-emerald-700",
    },
    {
      label: "Tạm ngưng",
      value: pausedCount,
      sub: "Tạm đóng hồ sơ ngoại trú",
      icon: UserMinus,
      tone: "bg-amber-50 text-amber-700",
    },
    {
      label: "Có study hôm nay",
      value: 9,
      sub: "Ca chụp X-quang trong ngày",
      icon: Activity,
      tone: "bg-primary-75 text-primary-700",
    },
  ];

  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        breadcrumb="LÂM SÀNG & TIẾP NHẬN · HỒ SƠ BỆNH NHÂN"
        title="Bệnh nhân"
        description="Quản lý hồ sơ bệnh nhân và lịch sử chẩn đoán hình ảnh."
        actions={
          <>
            <Button href="/dashboard/chi-dinh" size="sm" variant="secondary">
              Tạo chỉ định
            </Button>
            <Button href="/dashboard/benh-nhan/them" size="sm">
              <Plus className="size-4" /> Thêm bệnh nhân
            </Button>
          </>
        }
      />

      {/* 4 Clinical KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpiBlocks.map((b) => (
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

      {/* Segmented Status Tabs & Live Filter Bar */}
      <div className="flex flex-col gap-3.5 rounded-2xl border border-primary-100 bg-white p-4 overview-wrapper-shadow">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-primary-100/80 pb-3.5">
          <SegmentedTabsParticle
            active={statusTab}
            onChange={setStatusTab}
            items={[
              { id: "all", label: "Tất cả hồ sơ", count: patients.length },
              { id: "active", label: "Hoạt động", count: activeCount },
              { id: "paused", label: "Tạm ngưng", count: pausedCount },
            ]}
          />
          <span className="text-xs font-semibold text-primary-700 tabular-nums">
            Hiển thị <strong>{filtered.length}</strong> / {patients.length} bệnh nhân
          </span>
        </div>

        <FilterBar
          searchPlaceholder="Tìm theo mã bệnh nhân, họ tên, số điện thoại hoặc mã BHYT..."
          searchValue={search}
          onSearchChange={setSearch}
        >
          <FilterSelect
            label="Giới tính"
            options={["Nam", "Nữ"]}
            value={gender}
            onChange={setGender}
          />
          <FilterSelect
            label="Cơ sở"
            options={[
              "BV Đa khoa Trung ương",
              "Phòng khám Đa khoa số 3",
              "Bệnh viện Quận 7",
            ]}
            value={facility}
            onChange={setFacility}
          />
          <FilterSelect
            label="Khoảng tuổi"
            options={["<18", "18–40", "41–65", ">65"]}
            value={ageRange}
            onChange={setAgeRange}
          />
          {(search || gender || facility || ageRange || statusTab !== "all") && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setGender("");
                setFacility("");
                setAgeRange("");
                setStatusTab("all");
              }}
              className="h-11 rounded-xl border border-primary-200 bg-primary-50 px-3.5 text-xs font-bold text-primary-700 transition-colors hover:bg-primary-600 hover:text-white"
            >
              Xóa lọc
            </button>
          )}
        </FilterBar>
      </div>

      {/* Composite 6-Column Patient Table (preserving all 13 original fields without horizontal cramping) */}
      <DataTable
        headers={[
          "Bệnh nhân & Mã hồ sơ",
          "Liên hệ & Thẻ BHYT",
          "Cơ sở & BS chỉ định",
          "Lịch sử chụp X-quang",
          "Trạng thái",
          "Thao tác",
        ]}
        minWidth="960px"
      >
        {filtered.map((p) => {
          const initials = p.name
            .split(" ")
            .slice(-2)
            .map((w) => w[0])
            .join("");
          return (
            <Tr key={p.id}>
              {/* 1. Patient Identity + ID + DOB/Age/Gender */}
              <Td>
                <div className="flex items-center gap-3.5">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-full border border-primary-200 bg-primary-50 text-xs font-extrabold text-primary-700">
                    {initials}
                  </div>
                  <div className="min-w-0">
                    <Link
                      href={`/dashboard/benh-nhan/${p.id}`}
                      className="block text-[15px] font-bold text-primary-900 hover:text-primary-600 hover:underline"
                    >
                      {p.name}
                    </Link>
                    <div className="mt-1 flex flex-wrap items-center gap-1.5 text-xs text-text-secondary">
                      <span className="rounded bg-primary-75 px-1.5 py-0.5 font-mono text-[11px] font-bold text-primary-700">
                        {p.id}
                      </span>
                      <span>·</span>
                      <span>{p.dob}</span>
                      <span>·</span>
                      <span className="font-semibold text-primary-800">
                        {p.age}T · {p.gender}
                      </span>
                    </div>
                  </div>
                </div>
              </Td>

              {/* 2. Phone & BHYT */}
              <Td>
                <div className="flex flex-col gap-1">
                  <p className="flex items-center gap-1.5 text-[13.5px] font-semibold text-primary-900 tabular-nums">
                    <Phone className="size-3.5 text-primary-600" />
                    {p.phone}
                  </p>
                  <p className="flex items-center gap-1.5 text-xs text-text-secondary">
                    <CreditCard className="size-3.5 text-primary-500" />
                    <span className="font-mono text-[11.5px] font-semibold text-primary-800">
                      {p.bhyt}
                    </span>
                  </p>
                </div>
              </Td>

              {/* 3. Facility & Referring Doctor */}
              <Td>
                <div className="flex flex-col gap-1">
                  <p className="flex items-center gap-1.5 text-[13.5px] font-semibold text-primary-900">
                    <Building2 className="size-3.5 shrink-0 text-primary-600" />
                    <span className="truncate">{p.facility}</span>
                  </p>
                  <p className="flex items-center gap-1.5 text-xs text-text-secondary">
                    <Stethoscope className="size-3.5 shrink-0 text-primary-500" />
                    <span>{p.referringDoctor}</span>
                  </p>
                </div>
              </Td>

              {/* 4. Last Scan & Total Studies */}
              <Td>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center rounded-md bg-primary-75 px-2 py-0.5 text-xs font-bold text-primary-700 tabular-nums">
                      {p.studies} Study
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary tabular-nums">
                    Chụp gần nhất: <strong className="text-primary-800">{p.lastScan}</strong>
                  </p>
                </div>
              </Td>

              {/* 5. Status */}
              <Td>
                <Badge tone={p.status === "Hoạt động" ? "success" : "neutral"}>
                  {p.status}
                </Badge>
              </Td>

              {/* 6. Actions */}
              <Td>
                <div className="flex items-center gap-2">
                  <Button href={`/dashboard/benh-nhan/${p.id}`} size="sm" variant="primary">
                    Xem hồ sơ
                  </Button>
                  <Button href="/dashboard/chi-dinh" size="sm" variant="secondary">
                    Chỉ định
                  </Button>
                </div>
              </Td>
            </Tr>
          );
        })}
      </DataTable>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-primary-100 bg-white px-5 py-3.5 text-xs font-medium text-text-secondary overview-wrapper-shadow">
        <span>
          Hiển thị <strong className="text-primary-800">1–{filtered.length}</strong> /{" "}
          {patients.length} bệnh nhân
        </span>
        <div className="flex items-center gap-1.5">
          <button
            className="rounded-lg border border-primary-200 bg-white px-3 py-1.5 font-semibold text-primary-700 transition-colors hover:bg-primary-50"
            type="button"
          >
            Trước
          </button>
          <button
            className="rounded-lg bg-primary-600 px-3 py-1.5 font-bold text-white shadow-2xs"
            type="button"
          >
            1
          </button>
          <button
            className="rounded-lg border border-primary-200 bg-white px-3 py-1.5 font-semibold text-primary-700 transition-colors hover:bg-primary-50"
            type="button"
          >
            Sau
          </button>
        </div>
      </div>
    </div>
  );
}
