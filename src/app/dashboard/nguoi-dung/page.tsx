"use client";

import { useMemo, useState } from "react";
import {
  CheckCircle2,
  KeyRound,
  Lock,
  Shield,
  ShieldCheck,
  UserCheck,
  UserPlus,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { BorderBeam } from "@/components/ui/BorderBeam";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { DataTable, Td, Tr } from "@/components/ui/DataTable";
import { FilterBar, FilterSelect } from "@/components/ui/FilterBar";
import { PageHeader } from "@/components/ui/PageHeader";
import { SegmentedTabsParticle } from "@/components/ui/SegmentedTabsParticle";
import { users } from "@/lib/demo-data";

const roleMatrix = [
  {
    role: "Bác sĩ CĐHA",
    perms: "Worklist · Viewer · Draft/Finalize/Amend · View AI · Reject AI",
  },
  {
    role: "Bác sĩ chỉ định",
    perms: "Patient · Order · View FINAL reports · Không finalize CĐHA",
  },
  {
    role: "KTV",
    perms: "Queue · Upload DICOM · View Studies · Re-run AI (nếu lỗi)",
  },
  {
    role: "Tiếp đón",
    perms: "Patient create · Appointment · Check-in · Không xem AI thô",
  },
  {
    role: "Researcher",
    perms: "De-ID dataset · Eval AI/XAI · Export (audited) · Không PHI",
  },
  {
    role: "Facility Manager",
    perms: "Facilities · Machines · Staff roster · Audit read",
  },
  {
    role: "Admin",
    perms: "RBAC · Settings · Integrations · Model activate — không sửa kết luận BS",
  },
];

const permissions = [
  ["Patient", "View", "Create", "Edit", "Delete"],
  ["Study", "View", "Upload", "Delete", "—"],
  ["AI", "View Results", "Run", "Manage Models", "—"],
  ["Report", "Draft", "Finalize", "Amend", "—"],
  ["Research", "View Dataset", "Export", "—", "—"],
  ["Audit", "View", "—", "—", "—"],
  ["Model", "Activate", "Rollback", "—", "—"],
];

export default function UsersPage() {
  const [activeTab, setActiveTab] = useState("users");
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [tfaFilter, setTfaFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const activeCount = users.filter((u) => u.status === "Hoạt động").length;
  const tfaOnCount = users.filter((u) => u.tfa).length;

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      if (roleFilter && u.role !== roleFilter) return false;
      if (tfaFilter === "Bật" && !u.tfa) return false;
      if (tfaFilter === "Tắt" && u.tfa) return false;
      if (statusFilter && u.status !== statusFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match =
          u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          u.role.toLowerCase().includes(q) ||
          u.facility.toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    });
  }, [searchQuery, roleFilter, tfaFilter, statusFilter]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Người dùng & Phân quyền"
        description="RBAC theo vai trò và cơ sở. Một user có thể thuộc nhiều facility. Admin không thay kết luận chuyên môn."
        actions={
          <Button>
            <UserPlus className="h-4 w-4" />
            + Thêm người dùng
          </Button>
        }
      />

      {/* 4 KPI Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="relative overflow-hidden rounded-2xl border border-primary-100 border-b-[4px] border-b-primary-600 bg-white p-5 overview-wrapper-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[12px] font-extrabold uppercase tracking-wider text-text-secondary">
                Users
              </p>
              <p className="mt-2 font-mono text-[30px] font-black leading-none text-primary-950">
                {users.length}
              </p>
              <p className="mt-2 text-[12px] font-semibold text-primary-700">
                Tài khoản định danh y tế
              </p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
              <Users className="h-5 w-5" />
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-emerald-200 border-b-[4px] border-b-emerald-600 bg-white p-5 overview-wrapper-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[12px] font-extrabold uppercase tracking-wider text-emerald-700">
                Hoạt động
              </p>
              <p className="mt-2 font-mono text-[30px] font-black leading-none text-emerald-700">
                {activeCount}
              </p>
              <p className="mt-2 text-[12px] font-semibold text-emerald-800">
                Đang được cấp quyền truy cập
              </p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <UserCheck className="h-5 w-5" />
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-violet-200 border-b-[4px] border-b-ai bg-white p-5 overview-wrapper-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[12px] font-extrabold uppercase tracking-wider text-violet-700">
                2FA bật
              </p>
              <p className="mt-2 font-mono text-[30px] font-black leading-none text-ai">
                {tfaOnCount}/{users.length}
              </p>
              <p className="mt-2 text-[12px] font-semibold text-violet-800">
                Xác thực 2 lớp OTP bảo mật
              </p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-ai">
              <ShieldCheck className="h-5 w-5" />
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-amber-200 border-b-[4px] border-b-amber-500 bg-white p-5 overview-wrapper-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[12px] font-extrabold uppercase tracking-wider text-amber-800">
                Tạm khóa
              </p>
              <p className="mt-2 font-mono text-[30px] font-black leading-none text-amber-700">
                {users.length - activeCount}
              </p>
              <p className="mt-2 text-[12px] font-semibold text-amber-800">
                Tài khoản tạm ngưng phiên
              </p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <Lock className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Tabs & FilterBar */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <SegmentedTabsParticle
            activeId={activeTab}
            onChange={setActiveTab}
            tabs={[
              { id: "users", label: "Người dùng", count: users.length },
              { id: "roles", label: "Vai trò", count: roleMatrix.length, tone: "primary" },
              { id: "matrix", label: "Ma trận quyền", count: permissions.length },
            ]}
          />
          {(searchQuery || roleFilter || tfaFilter || statusFilter) && (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                setSearchQuery("");
                setRoleFilter("");
                setTfaFilter("");
                setStatusFilter("");
              }}
            >
              Xóa bộ lọc ({filteredUsers.length}/{users.length})
            </Button>
          )}
        </div>

        <FilterBar
          searchPlaceholder="Tìm theo họ tên bác sĩ / nhân sự, email, vai trò hoặc cơ sở..."
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
              "Facility Manager",
              "Admin",
            ]}
            value={roleFilter}
            onChange={setRoleFilter}
          />
          <FilterSelect
            label="2FA"
            options={["Bật", "Tắt"]}
            value={tfaFilter}
            onChange={setTfaFilter}
          />
          <FilterSelect
            label="Status"
            options={["Hoạt động", "Tạm khóa"]}
            value={statusFilter}
            onChange={setStatusFilter}
          />
        </FilterBar>
      </div>

      {/* Users Table */}
      <DataTable
        headers={[
          "Nhân sự & Email",
          "Vai trò RBAC",
          "Cơ sở trực thuộc",
          "Bảo mật 2FA & Trạng thái",
          "Đăng nhập gần nhất",
        ]}
      >
        {filteredUsers.map((u) => {
          const initials = u.name
            .split(" ")
            .slice(-2)
            .map((w) => w[0])
            .join("")
            .toUpperCase();
          return (
            <Tr key={u.email}>
              <Td>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-75 font-extrabold text-primary-800">
                    {initials}
                  </div>
                  <div>
                    <p className="text-[15px] font-extrabold text-primary-950">{u.name}</p>
                    <p className="mt-0.5 font-mono text-[12px] font-medium text-text-secondary">
                      {u.email}
                    </p>
                  </div>
                </div>
              </Td>
              <Td>
                <Badge
                  tone={
                    u.role === "Bác sĩ CĐHA"
                      ? "primary"
                      : u.role === "Researcher"
                        ? "ai"
                        : u.role === "Admin"
                          ? "warning"
                          : "info"
                  }
                >
                  {u.role}
                </Badge>
              </Td>
              <Td>
                <p className="max-w-[240px] text-[13px] font-semibold text-primary-900">
                  {u.facility}
                </p>
              </Td>
              <Td>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone={u.tfa ? "success" : "warning"}>
                    2FA: {u.tfa ? "Bật" : "Tắt"}
                  </Badge>
                  <Badge tone={u.status === "Hoạt động" ? "success" : "neutral"}>
                    {u.status}
                  </Badge>
                </div>
              </Td>
              <Td>
                <span className="font-mono text-[13px] font-semibold text-text-secondary">
                  {u.lastLogin}
                </span>
              </Td>
            </Tr>
          );
        })}
      </DataTable>

      {/* Tóm tắt quyền theo vai trò */}
      <div>
        <div className="mb-3.5 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-[18px] font-extrabold text-primary-950">
            <Shield className="h-5 w-5 text-primary-700" />
            Tóm tắt quyền theo vai trò
          </h2>
          <span className="text-[13px] font-semibold text-text-secondary">
            Chọn thẻ vai trò để lọc danh sách nhân sự tương ứng
          </span>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {roleMatrix.map((r, idx) => {
            const isSelected = roleFilter === r.role;
            return (
              <div
                key={r.role}
                onClick={() => setRoleFilter(isSelected ? "" : r.role)}
                className={`relative cursor-pointer overflow-hidden rounded-2xl border bg-white p-5 transition-all overview-wrapper-shadow ${
                  isSelected
                    ? "border-2 border-primary-600 ring-4 ring-primary-500/10"
                    : "border-primary-100 border-b-[4px] border-b-primary-600 hover:-translate-y-0.5 hover:border-primary-300"
                }`}
              >
                {idx === 0 && <BorderBeam size={160} duration={11} />}
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[16px] font-extrabold text-primary-950">{r.role}</p>
                  <KeyRound className="h-4 w-4 text-primary-600" />
                </div>
                <p className="mt-2 text-[13px] font-medium leading-relaxed text-text-secondary">
                  {r.perms}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Ma trận quyền */}
      <Card padding={false}>
        <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-primary-100 bg-primary-75/70 px-6 py-4">
          <h2 className="flex items-center gap-2 text-[17px] font-extrabold text-primary-950">
            <ShieldCheck className="h-5 w-5 text-primary-700" />
            Ma trận quyền (tóm tắt module)
          </h2>
          <Badge tone="info">Zero-Trust Clinical RBAC</Badge>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[14px]">
            <thead className="border-b border-primary-100 bg-primary-50/60 text-[12px] font-extrabold uppercase tracking-wider text-primary-900">
              <tr>
                {["Module", "Quyền 1", "Quyền 2", "Quyền 3", "Quyền 4"].map((h) => (
                  <th key={h} className="px-5 py-3.5">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-primary-100/80">
              {permissions.map((row) => (
                <tr key={row[0]} className="transition-colors hover:bg-primary-50/30">
                  {row.map((c, i) => (
                    <td
                      key={i}
                      className={`px-5 py-3.5 ${
                        i === 0 ? "font-extrabold text-primary-950" : "font-medium text-text-main"
                      }`}
                    >
                      {i === 0 ? (
                        c
                      ) : c === "—" ? (
                        <span className="text-muted">—</span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-lg border border-primary-200 bg-primary-50/60 px-2.5 py-1 text-[13px] font-bold text-primary-900">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                          {c}
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
