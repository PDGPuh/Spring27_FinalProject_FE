"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Download,
  FileCheck2,
  FileClock,
  FileEdit,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { DataTable, Td, Tr } from "@/components/ui/DataTable";
import { FilterBar, FilterSelect } from "@/components/ui/FilterBar";
import { PageHeader } from "@/components/ui/PageHeader";
import { SegmentedTabsParticle } from "@/components/ui/particles/p-segmented-tabs";
import { reports } from "@/lib/demo-data";

const statusTone = {
  DRAFT: "warning" as const,
  FINAL: "success" as const,
  AMENDED: "info" as const,
};

export default function ReportsPage() {
  const [statusTab, setStatusTab] = useState("all");
  const [search, setSearch] = useState("");
  const [doctorFilter, setDoctorFilter] = useState("");

  const draft = useMemo(() => reports.filter((r) => r.status === "DRAFT").length, []);
  const final = useMemo(() => reports.filter((r) => r.status === "FINAL").length, []);
  const amended = useMemo(
    () => reports.filter((r) => r.status === "AMENDED").length,
    [],
  );

  const filtered = useMemo(() => {
    return reports.filter((r) => {
      if (statusTab !== "all" && r.status !== statusTab) return false;
      if (doctorFilter && r.doctor !== doctorFilter) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        const hit =
          r.id.toLowerCase().includes(q) ||
          r.patient.toLowerCase().includes(q) ||
          r.patientId.toLowerCase().includes(q) ||
          r.impression.toLowerCase().includes(q);
        if (!hit) return false;
      }
      return true;
    });
  }, [statusTab, doctorFilter, search]);

  const kpis = [
    {
      label: "Nháp (mẫu)",
      value: draft,
      sub: "Chờ bác sĩ ký xác nhận",
      icon: FileClock,
      tone: "bg-amber-50 text-amber-700",
    },
    {
      label: "FINAL (mẫu)",
      value: final,
      sub: "Đã ký số Clinical Sign-off",
      icon: FileCheck2,
      tone: "bg-emerald-50 text-emerald-700",
    },
    {
      label: "Amended",
      value: amended,
      sub: "Phiên bản đính chính (v2)",
      icon: FileEdit,
      tone: "bg-primary-50 text-primary-600",
    },
    {
      label: "Đã hoàn tất hôm nay",
      value: 113,
      sub: "Đồng bộ Cổng bệnh nhân",
      icon: CheckCircle2,
      tone: "bg-primary-75 text-primary-700",
    },
  ];

  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        breadcrumb="CHẨN ĐOÁN HÌNH ẢNH · BÁO CÁO ĐÃ KÝ SỐ"
        title="Báo cáo"
        description="Quản lý báo cáo chẩn đoán, phiên bản và Clinical Sign-off. Báo cáo FINAL không sửa trực tiếp — tạo Amendment."
        actions={
          <Button href="/dashboard/worklist" size="sm">
            Mở Worklist đọc phim →
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

      {/* Unified Segmented Tabs & Search Filter Bar */}
      <div className="flex flex-col gap-3.5 rounded-2xl border border-primary-100 bg-white p-4 overview-wrapper-shadow">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-primary-100/80 pb-3.5">
          <SegmentedTabsParticle
            active={statusTab}
            onChange={setStatusTab}
            items={[
              { id: "all", label: "Tất cả báo cáo", count: reports.length },
              { id: "FINAL", label: "FINAL (Đã ký)", count: final },
              { id: "DRAFT", label: "DRAFT (Bản nháp)", count: draft },
              { id: "AMENDED", label: "AMENDED", count: amended },
            ]}
          />
          <span className="text-xs font-semibold text-primary-700 tabular-nums">
            Hiển thị <strong>{filtered.length}</strong> / {reports.length} báo cáo
          </span>
        </div>

        <FilterBar
          searchPlaceholder="Tìm theo mã báo cáo (RP2026...), tên bệnh nhân hoặc nội dung kết luận..."
          searchValue={search}
          onSearchChange={setSearch}
        >
          <FilterSelect
            label="Bác sĩ"
            options={["BS. Nguyễn Văn A", "BS. Lê Thu Hà", "BS. Trần Minh"]}
            value={doctorFilter}
            onChange={setDoctorFilter}
          />
          <FilterSelect
            label="Cơ sở"
            options={["BV Đa khoa TW", "Cơ sở 1", "Cơ sở 2"]}
          />
        </FilterBar>
      </div>

      {/* Composite 6-Column Reports Table */}
      <DataTable
        headers={[
          "Mã báo cáo & Ngày ký",
          "Bệnh nhân & Ca chụp",
          "Impression / Kết luận chẩn đoán",
          "Bác sĩ kết luận",
          "Phiên bản & Trạng thái",
          "Thao tác",
        ]}
        minWidth="960px"
      >
        {filtered.map((r) => (
          <Tr key={r.id}>
            {/* 1. Report ID & Date */}
            <Td>
              <Link
                href={`/dashboard/bao-cao/${r.id}`}
                className="inline-block rounded-md bg-primary-75 px-2.5 py-1 font-mono text-xs font-extrabold text-primary-700 hover:bg-primary-600 hover:text-white"
              >
                {r.id}
              </Link>
              <p className="mt-1.5 text-xs font-medium text-text-secondary tabular-nums">
                Ngày ký: <strong>{r.date}</strong>
              </p>
            </Td>

            {/* 2. Patient & Study */}
            <Td>
              <Link
                href={`/dashboard/benh-nhan/${r.patientId}`}
                className="text-[15px] font-bold text-primary-900 hover:text-primary-600 hover:underline"
              >
                {r.patient}
              </Link>
              <div className="mt-1 flex flex-wrap items-center gap-1.5 text-xs text-text-secondary">
                <span className="font-mono font-semibold text-primary-700">
                  {r.patientId}
                </span>
                <span>·</span>
                <span>{r.study}</span>
                {r.caseId && (
                  <>
                    <span>·</span>
                    <Link
                      href={`/viewer/${r.caseId}`}
                      className="font-mono font-bold text-primary-600 hover:underline"
                    >
                      {r.caseId}
                    </Link>
                  </>
                )}
              </div>
            </Td>

            {/* 3. Impression */}
            <Td className="max-w-[290px]">
              <p className="line-clamp-2 text-[13.5px] font-medium leading-relaxed text-primary-950">
                {r.impression}
              </p>
            </Td>

            {/* 4. Doctor */}
            <Td>
              <p className="flex items-center gap-1.5 font-bold text-primary-900">
                <Stethoscope className="size-3.5 text-primary-600" />
                {r.doctor}
              </p>
              <p className="mt-0.5 text-xs text-text-secondary">Khoa CĐHA</p>
            </Td>

            {/* 5. Version & Status */}
            <Td>
              <div className="flex items-center gap-2">
                <Badge tone={statusTone[r.status as keyof typeof statusTone]}>
                  {r.status}
                </Badge>
                <span className="rounded bg-primary-50 px-2 py-0.5 font-mono text-xs font-bold text-primary-700">
                  {r.version}
                </span>
              </div>
            </Td>

            {/* 6. Actions */}
            <Td>
              <div className="flex flex-wrap items-center gap-2">
                <Button href={`/dashboard/bao-cao/${r.id}`} size="sm" variant="primary">
                  Chi tiết
                </Button>
                <Button size="sm" variant="secondary">
                  <Download className="size-3.5" /> PDF
                </Button>
                {(r.status === "FINAL" || r.status === "AMENDED") && (
                  <Button
                    href={`/dashboard/bao-cao/${r.id}`}
                    size="sm"
                    variant="outline"
                  >
                    Amend
                  </Button>
                )}
              </div>
            </Td>
          </Tr>
        ))}
      </DataTable>

      <div className="flex items-center gap-2.5 rounded-xl border border-primary-100 bg-primary-75/70 px-4 py-3 text-xs font-semibold text-primary-800">
        <ShieldCheck className="size-4 shrink-0 text-primary-600" />
        <span>
          Quy tắc an toàn lâm sàng: Patient portal chỉ nhận báo cáo{" "}
          <strong>FINAL / AMENDED</strong> đã Clinical Sign-off — không hiển thị dữ liệu AI
          thô.
        </span>
      </div>
    </div>
  );
}
