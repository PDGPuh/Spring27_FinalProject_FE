"use client";

import { useMemo, useState } from "react";
import {
  AlertTriangle,
  Bell,
  BellRing,
  CheckCheck,
  Clock,
  FileText,
  Server,
  Sparkles,
  UserCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { BorderBeam } from "@/components/ui/BorderBeam";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { SegmentedTabsParticle } from "@/components/ui/SegmentedTabsParticle";
import { notifications } from "@/lib/demo-data";

const typeLabel = {
  critical: "Critical",
  assignment: "Phân công",
  ai: "AI",
  report: "Báo cáo",
  system: "Hệ thống",
} as const;

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [readIds, setReadIds] = useState<string[]>([]);
  const [savedNotice, setSavedNotice] = useState(false);

  const itemsWithState = useMemo(() => {
    return notifications.map((n) => {
      const id = n.title + n.time;
      return {
        ...n,
        id,
        isUnread: n.unread && !readIds.includes(id),
      };
    });
  }, [readIds]);

  const unreadCount = itemsWithState.filter((n) => n.isUnread).length;

  const filteredNotifications = useMemo(() => {
    return itemsWithState.filter((n) => {
      if (activeTab === "all") return true;
      if (activeTab === "assign") return n.type === "assignment";
      return n.type === activeTab;
    });
  }, [itemsWithState, activeTab]);

  const markAllRead = () => {
    setReadIds(notifications.map((n) => n.title + n.time));
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Thông báo"
        description="Critical, phân công, AI và báo cáo — cấu hình kênh nhận theo vai trò."
        actions={
          <Button variant="secondary" onClick={markAllRead}>
            <CheckCheck className="h-4 w-4" />
            Đánh dấu đã đọc ({unreadCount})
          </Button>
        }
      />

      {/* 4 KPI Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="relative overflow-hidden rounded-2xl border border-primary-100 border-b-[4px] border-b-primary-600 bg-white p-5 overview-wrapper-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[12px] font-extrabold uppercase tracking-wider text-text-secondary">
                Tổng thông báo
              </p>
              <p className="mt-2 font-mono text-[30px] font-black leading-none text-primary-950">
                {notifications.length}
              </p>
              <p className="mt-2 text-[12px] font-semibold text-primary-700">
                Trung tâm cảnh báo lâm sàng
              </p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
              <Bell className="h-5 w-5" />
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-amber-200 border-b-[4px] border-b-amber-500 bg-white p-5 overview-wrapper-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[12px] font-extrabold uppercase tracking-wider text-amber-800">
                Chưa đọc
              </p>
              <p className="mt-2 font-mono text-[30px] font-black leading-none text-amber-700">
                {unreadCount}
              </p>
              <p className="mt-2 text-[12px] font-semibold text-amber-800">
                Thông báo mới cần kiểm tra
              </p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <BellRing className="h-5 w-5" />
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-red-200 border-b-[4px] border-b-critical bg-white p-5 overview-wrapper-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[12px] font-extrabold uppercase tracking-wider text-critical">
                Critical
              </p>
              <p className="mt-2 font-mono text-[30px] font-black leading-none text-critical">
                {notifications.filter((n) => n.type === "critical").length}
              </p>
              <p className="mt-2 text-[12px] font-semibold text-red-700">
                Cảnh báo AI / Lâm sàng khẩn
              </p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-critical">
              <AlertTriangle className="h-5 w-5" />
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-violet-200 border-b-[4px] border-b-ai bg-white p-5 overview-wrapper-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[12px] font-extrabold uppercase tracking-wider text-violet-700">
                Phân công & AI
              </p>
              <p className="mt-2 font-mono text-[30px] font-black leading-none text-ai">
                {
                  notifications.filter(
                    (n) => n.type === "assignment" || n.type === "ai"
                  ).length
                }
              </p>
              <p className="mt-2 text-[12px] font-semibold text-violet-800">
                Ca giao đọc & kết quả suy luận
              </p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-ai">
              <Sparkles className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Segmented Tabs */}
      <SegmentedTabsParticle
        activeId={activeTab}
        onChange={setActiveTab}
        tabs={[
          { id: "all", label: "Tất cả", count: notifications.length },
          {
            id: "critical",
            label: "Critical",
            count: notifications.filter((n) => n.type === "critical").length,
            tone: "critical",
          },
          {
            id: "assign",
            label: "Phân công",
            count: notifications.filter((n) => n.type === "assignment").length,
            tone: "primary",
          },
          {
            id: "ai",
            label: "AI",
            count: notifications.filter((n) => n.type === "ai").length,
          },
          {
            id: "report",
            label: "Báo cáo",
            count: notifications.filter((n) => n.type === "report").length,
            tone: "success",
          },
          {
            id: "system",
            label: "Hệ thống",
            count: notifications.filter((n) => n.type === "system").length,
            tone: "warning",
          },
        ]}
      />

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        {/* Notification Feed */}
        <div className="space-y-3.5">
          {filteredNotifications.map((n) => {
            const Icon =
              n.type === "critical"
                ? AlertTriangle
                : n.type === "ai"
                  ? Sparkles
                  : n.type === "assignment"
                    ? UserCheck
                    : n.type === "report"
                      ? FileText
                      : Server;

            return (
              <div
                key={n.id}
                onClick={() => {
                  if (!readIds.includes(n.id)) {
                    setReadIds((prev) => [...prev, n.id]);
                  }
                }}
                className={`relative overflow-hidden rounded-2xl border bg-white p-5 transition-all overview-wrapper-shadow ${
                  n.type === "critical"
                    ? "border-red-200 border-l-[5px] border-l-critical"
                    : n.isUnread
                      ? "border-primary-200 border-l-[5px] border-l-primary-600 bg-primary-50/25"
                      : "border-primary-100 border-l-[5px] border-l-primary-300"
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                        n.type === "critical"
                          ? "bg-red-100 text-critical"
                          : n.type === "ai"
                            ? "bg-violet-100 text-ai"
                            : n.type === "system"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-primary-75 text-primary-700"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge
                          tone={
                            n.type === "critical"
                              ? "critical"
                              : n.type === "ai"
                                ? "ai"
                                : n.type === "system"
                                  ? "warning"
                                  : "info"
                          }
                        >
                          {typeLabel[n.type]}
                        </Badge>
                        {n.isUnread && <Badge tone="primary">Mới</Badge>}
                        <p className="text-[16px] font-extrabold text-primary-950">
                          {n.title}
                        </p>
                      </div>
                      <p className="mt-1.5 text-[14px] font-medium leading-relaxed text-text-main">
                        {n.body}
                      </p>
                      <p className="mt-2 flex items-center gap-1.5 font-mono text-[12px] font-semibold text-text-secondary">
                        <Clock className="h-3.5 w-3.5 text-primary-600" />
                        {n.time}
                      </p>
                    </div>
                  </div>
                  <Button href={n.action.href} size="sm" variant="soft">
                    {n.action.label}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Notification Preferences & Role Guidance */}
        <div className="space-y-5">
          <Card className="relative overflow-hidden">
            <BorderBeam size={180} duration={11} />
            <h2 className="mb-1 text-[18px] font-extrabold text-primary-950">
              Cài đặt thông báo
            </h2>
            <p className="mb-4 text-[13px] font-medium text-text-secondary">
              Cấu hình kênh nhận và loại sự kiện cảnh báo
            </p>

            <p className="mb-2.5 text-[12px] font-extrabold uppercase tracking-wider text-primary-800">
              Kênh
            </p>
            <div className="space-y-2 rounded-xl border border-primary-100 bg-primary-50/40 p-3.5">
              {["In-app", "Email", "Push"].map((c) => (
                <label
                  key={c}
                  className="flex cursor-pointer items-center justify-between rounded-lg bg-white px-3.5 py-2.5 text-[14px] font-bold text-primary-950 shadow-2xs"
                >
                  <span>{c}</span>
                  <input
                    type="checkbox"
                    defaultChecked={c !== "Push"}
                    className="h-4 w-4 accent-primary-600"
                  />
                </label>
              ))}
            </div>

            <p className="mb-2.5 mt-5 text-[12px] font-extrabold uppercase tracking-wider text-primary-800">
              Sự kiện
            </p>
            <div className="space-y-2 rounded-xl border border-primary-100 bg-primary-50/40 p-3.5">
              {[
                "Critical AI / Clinical",
                "Assignment",
                "AI Error",
                "Report Complete",
                "Machine offline",
              ].map((c) => (
                <label
                  key={c}
                  className="flex cursor-pointer items-center justify-between rounded-lg bg-white px-3.5 py-2.5 text-[14px] font-bold text-primary-950 shadow-2xs"
                >
                  <span>{c}</span>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-4 accent-primary-600"
                  />
                </label>
              ))}
            </div>

            <div className="mt-5 flex items-center justify-between gap-3">
              <Button onClick={() => setSavedNotice(true)}>Lưu preferences</Button>
              {savedNotice && (
                <Badge tone="success">✓ Đã lưu cấu hình</Badge>
              )}
            </div>
          </Card>

          <div className="rounded-2xl border-2 border-violet-200 bg-violet-50/80 p-5 shadow-xs">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ai text-white">
                <Sparkles className="h-4 w-4" />
              </div>
              <p className="text-[15px] font-extrabold text-violet-950">
                Gợi ý theo vai trò
              </p>
            </div>
            <ul className="mt-3.5 space-y-2 text-[13px] font-semibold text-violet-900">
              <li>· CĐHA: Critical + Assignment bật mặc định</li>
              <li>· KTV: AI Error + Upload fail</li>
              <li>· Tiếp đón: Check-in reminder</li>
              <li>· Patient portal: không nhận AI thô</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
