"use client";

import { useMemo, useState } from "react";
import {
  Activity,
  CheckCircle2,
  Eye,
  FileSearch,
  History,
  Lock,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { BorderBeam } from "@/components/ui/BorderBeam";
import { Button } from "@/components/ui/Button";
import { DataTable, Td, Tr } from "@/components/ui/DataTable";
import { FilterBar, FilterSelect } from "@/components/ui/FilterBar";
import { PageHeader } from "@/components/ui/PageHeader";
import { SegmentedTabsParticle } from "@/components/ui/SegmentedTabsParticle";
import { auditLogs } from "@/lib/demo-data";

export default function AuditPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [actionFilter, setActionFilter] = useState("");
  const [resultFilter, setResultFilter] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const failedCount = auditLogs.filter((a) => a.result !== "Success").length;
  const successCount = auditLogs.length - failedCount;

  const filteredLogs = useMemo(() => {
    return auditLogs.filter((a) => {
      if (activeTab === "success" && a.result !== "Success") return false;
      if (activeTab === "failed" && a.result === "Success") return false;
      if (roleFilter && a.role !== roleFilter) return false;
      if (actionFilter && a.action !== actionFilter) return false;
      if (resultFilter && a.result !== resultFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match =
          a.user.toLowerCase().includes(q) ||
          a.role.toLowerCase().includes(q) ||
          a.action.toLowerCase().includes(q) ||
          a.object.toLowerCase().includes(q) ||
          a.detail.toLowerCase().includes(q) ||
          a.facility.toLowerCase().includes(q) ||
          a.ip.toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    });
  }, [activeTab, searchQuery, roleFilter, actionFilter, resultFilter]);

  const activeRecord = filteredLogs[selectedIndex] ?? filteredLogs[0] ?? auditLogs[0];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Nhật ký hệ thống"
        description="Audit log chỉ đọc. Không thể chỉnh sửa bản ghi. Mọi thao tác lâm sàng và cấu hình đều được ghi nhận."
        actions={
          <Badge tone="info">
            <Lock className="mr-1 inline h-3.5 w-3.5" />
            Immutable WORM Audit Log
          </Badge>
        }
      />

      {/* 4 KPI Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="relative overflow-hidden rounded-2xl border border-primary-100 border-b-[4px] border-b-primary-600 bg-white p-5 overview-wrapper-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[12px] font-extrabold uppercase tracking-wider text-text-secondary">
                Sự kiện (mẫu)
              </p>
              <p className="mt-2 font-mono text-[30px] font-black leading-none text-primary-950">
                {auditLogs.length}
              </p>
              <p className="mt-2 text-[12px] font-semibold text-primary-700">
                Bản ghi kiểm toán truy xuất nhanh
              </p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
              <History className="h-5 w-5" />
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-emerald-200 border-b-[4px] border-b-emerald-600 bg-white p-5 overview-wrapper-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[12px] font-extrabold uppercase tracking-wider text-emerald-700">
                Thành công
              </p>
              <p className="mt-2 font-mono text-[30px] font-black leading-none text-emerald-700">
                {successCount}
              </p>
              <p className="mt-2 text-[12px] font-semibold text-emerald-800">
                Thao tác hợp lệ đã xác thực
              </p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-red-200 border-b-[4px] border-b-critical bg-white p-5 overview-wrapper-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[12px] font-extrabold uppercase tracking-wider text-critical">
                Thất bại / Denied
              </p>
              <p className="mt-2 font-mono text-[30px] font-black leading-none text-critical">
                {failedCount}
              </p>
              <p className="mt-2 text-[12px] font-semibold text-red-700">
                Lỗi thực thi hoặc từ chối quyền
              </p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-critical">
              <ShieldAlert className="h-5 w-5" />
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-primary-100 border-b-[4px] border-b-primary-800 bg-white p-5 overview-wrapper-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[12px] font-extrabold uppercase tracking-wider text-text-secondary">
                Hôm nay (ước tính)
              </p>
              <p className="mt-2 font-mono text-[30px] font-black leading-none text-primary-950">
                186
              </p>
              <p className="mt-2 text-[12px] font-semibold text-text-secondary">
                Tổng sự kiện toàn hệ thống
              </p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-75 text-primary-800">
              <Activity className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Tabs + FilterBar */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <SegmentedTabsParticle
            activeId={activeTab}
            onChange={(id) => {
              setActiveTab(id);
              setSelectedIndex(0);
            }}
            tabs={[
              { id: "all", label: "Tất cả sự kiện", count: auditLogs.length },
              {
                id: "success",
                label: "Thành công",
                count: successCount,
                tone: "success",
              },
              {
                id: "failed",
                label: "Thất bại / Denied",
                count: failedCount,
                tone: "critical",
              },
            ]}
          />
          {(searchQuery || roleFilter || actionFilter || resultFilter || activeTab !== "all") && (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                setActiveTab("all");
                setSearchQuery("");
                setRoleFilter("");
                setActionFilter("");
                setResultFilter("");
                setSelectedIndex(0);
              }}
            >
              Xóa bộ lọc ({filteredLogs.length}/{auditLogs.length})
            </Button>
          )}
        </div>

        <FilterBar
          searchPlaceholder="Tìm User, Action (FINALIZE_REPORT), Object (XR2026...), IP..."
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
        >
          <FilterSelect
            label="Role"
            options={[
              "Bác sĩ CĐHA",
              "Bác sĩ chỉ định",
              "KTV",
              "Tiếp đón",
              "Researcher",
              "Admin",
              "AI Worker",
            ]}
            value={roleFilter}
            onChange={setRoleFilter}
          />
          <FilterSelect
            label="Action"
            options={[
              "FINALIZE_REPORT",
              "REJECT_AI_RESULT",
              "UPLOAD_DICOM",
              "CHECK_IN",
              "CREATE_ORDER",
              "AI_INFERENCE_COMPLETE",
              "AI_INFERENCE_FAILED",
              "EXPORT_DATASET",
            ]}
            value={actionFilter}
            onChange={setActionFilter}
          />
          <FilterSelect
            label="Result"
            options={["Success", "Failed", "Denied"]}
            value={resultFilter}
            onChange={setResultFilter}
          />
        </FilterBar>
      </div>

      {/* Composite Audit Table */}
      <DataTable
        headers={[
          "Timestamp & IP",
          "Người thực hiện & Vai trò",
          "Hành động (Action)",
          "Đối tượng (Object)",
          "Chi tiết & Cơ sở",
          "Kết quả",
        ]}
      >
        {filteredLogs.map((a, idx) => (
          <Tr key={a.time + a.action + a.object}>
            <Td>
              <span className="font-mono text-[13px] font-bold text-primary-950">
                {a.time}
              </span>
              <p className="mt-1 font-mono text-[12px] font-medium text-text-secondary">
                IP: {a.ip}
              </p>
            </Td>
            <Td>
              <p className="text-[14px] font-extrabold text-primary-950">{a.user}</p>
              <div className="mt-1">
                <Badge tone={a.role === "AI Worker" ? "ai" : "neutral"}>{a.role}</Badge>
              </div>
            </Td>
            <Td>
              <span className="rounded-lg border border-primary-200 bg-primary-50/70 px-2.5 py-1 font-mono text-[12px] font-bold text-primary-900">
                {a.action}
              </span>
            </Td>
            <Td>
              <span className="rounded-md bg-primary-75 px-2.5 py-1 font-mono text-[13px] font-bold text-primary-950">
                {a.object}
              </span>
            </Td>
            <Td>
              <p className="max-w-[260px] text-[13px] font-semibold text-primary-950">
                {a.detail}
              </p>
              <p className="mt-0.5 text-[12px] font-medium text-text-secondary">
                Cơ sở: {a.facility}
              </p>
            </Td>
            <Td>
              <div className="flex items-center gap-2">
                <Badge tone={a.result === "Success" ? "success" : "critical"}>
                  {a.result}
                </Badge>
                <button
                  type="button"
                  onClick={() => setSelectedIndex(idx)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-primary-200 bg-white text-primary-700 transition-colors hover:bg-primary-50"
                  title="Xem bản ghi bất biến"
                >
                  <Eye className="h-4 w-4" />
                </button>
              </div>
            </Td>
          </Tr>
        ))}
      </DataTable>

      {/* Immutable Record Inspector Drawer/Card */}
      {activeRecord && (
        <div className="relative overflow-hidden rounded-2xl border-2 border-primary-200 bg-white p-6 overview-wrapper-shadow">
          <BorderBeam size={200} duration={12} />
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-primary-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-75 text-primary-800">
                <FileSearch className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-[16px] font-extrabold text-primary-950">
                  Drawer chi tiết (demo): Ai · Làm gì · Đối tượng · Khi nào · Old/New Value · Reason — bản ghi bất biến.
                </h3>
                <p className="text-[12px] font-medium text-text-secondary">
                  Nhấn biểu tượng con mắt ở bất kỳ dòng nào trên bảng để kiểm tra chữ ký SHA-256 của sự kiện
                </p>
              </div>
            </div>
            <Badge tone={activeRecord.result === "Success" ? "success" : "critical"}>
              {activeRecord.result}
            </Badge>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-primary-100 bg-primary-50/40 p-3.5">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-text-secondary">
                Ai thực hiện (Actor)
              </span>
              <p className="mt-1 text-[14px] font-extrabold text-primary-950">
                {activeRecord.user}
              </p>
              <p className="text-[12px] font-semibold text-primary-700">
                {activeRecord.role} · IP {activeRecord.ip}
              </p>
            </div>

            <div className="rounded-xl border border-primary-100 bg-primary-50/40 p-3.5">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-text-secondary">
                Hành động & Thời điểm
              </span>
              <p className="mt-1 font-mono text-[13px] font-extrabold text-primary-900">
                {activeRecord.action}
              </p>
              <p className="font-mono text-[12px] font-semibold text-text-secondary">
                {activeRecord.time}
              </p>
            </div>

            <div className="rounded-xl border border-primary-100 bg-primary-50/40 p-3.5">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-text-secondary">
                Đối tượng & Cơ sở
              </span>
              <p className="mt-1 font-mono text-[14px] font-extrabold text-primary-950">
                {activeRecord.object}
              </p>
              <p className="text-[12px] font-semibold text-text-secondary">
                {activeRecord.facility}
              </p>
            </div>

            <div className="rounded-xl border border-primary-100 bg-primary-50/40 p-3.5">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-text-secondary">
                Chi tiết & Lý do (Reason)
              </span>
              <p className="mt-1 text-[13px] font-bold text-primary-950">
                {activeRecord.detail}
              </p>
              <p className="mt-0.5 flex items-center gap-1 font-mono text-[11px] font-semibold text-emerald-700">
                <ShieldCheck className="h-3.5 w-3.5" />
                Verified Immutable Hash
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
