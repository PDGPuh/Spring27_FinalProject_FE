"use client";

import { useState } from "react";
import {
  AlertTriangle,
  Database,
  FileText,
  Inbox,
  Loader2,
  RefreshCw,
  SearchX,
  ShieldAlert,
  Sparkles,
  WifiOff,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { BorderBeam } from "@/components/ui/BorderBeam";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/ui/PageHeader";
import { SegmentedTabsParticle } from "@/components/ui/SegmentedTabsParticle";

export default function StatesPage() {
  const [activeTab, setActiveTab] = useState("all");

  const show = (cat: "empty" | "loading" | "error") =>
    activeTab === "all" || activeTab === cat;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Empty / Loading / Error states"
        description="Mẫu trạng thái dùng xuyên suốt clinical workspace."
        actions={<Badge tone="info">Clinical UI State System</Badge>}
      />

      <SegmentedTabsParticle
        activeId={activeTab}
        onChange={setActiveTab}
        tabs={[
          { id: "all", label: "Tất cả trạng thái", count: 8 },
          { id: "empty", label: "Empty States", count: 4 },
          { id: "loading", label: "Loading States", count: 2, tone: "primary" },
          { id: "error", label: "Error & Fallback States", count: 2, tone: "critical" },
        ]}
      />

      <div className="grid gap-5 lg:grid-cols-2">
        {show("empty") && (
          <>
            <EmptyState
              icon={<Inbox className="h-7 w-7 text-primary-600" />}
              title="Không có ca đang chờ đọc."
              description="Worklist trống. Các ca mới sẽ xuất hiện khi AI hoàn tất hoặc Study sẵn sàng."
              action={
                <Button href="/dashboard/worklist">
                  <RefreshCw className="h-4 w-4" />
                  Làm mới Worklist
                </Button>
              }
            />
            <EmptyState
              icon={<SearchX className="h-7 w-7 text-primary-600" />}
              title="Không tìm thấy bệnh nhân phù hợp."
              description="Thử đổi từ khóa hoặc bỏ bớt bộ lọc."
            />
            <EmptyState
              icon={<FileText className="h-7 w-7 text-primary-600" />}
              title="Chưa có báo cáo."
              description="Báo cáo xuất hiện sau khi bác sĩ lưu nháp hoặc Clinical Sign-off."
            />
            <EmptyState
              icon={<Database className="h-7 w-7 text-primary-600" />}
              title="Dataset chưa có dữ liệu."
              description="Tạo dataset và đồng bộ studies đã de-identify."
            />
          </>
        )}

        {show("loading") && (
          <>
            <Card>
              <div className="flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-[17px] font-extrabold text-primary-950">
                  <Loader2 className="h-5 w-5 animate-spin text-primary-600" />
                  Loading — Clinical
                </h3>
                <Badge tone="info">Skeleton Shimmer</Badge>
              </div>
              <div className="mt-4 space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 rounded-xl border border-primary-100/70 bg-primary-50/40 p-3"
                  >
                    <div className="h-10 w-10 shrink-0 animate-pulse rounded-xl bg-primary-100" />
                    <div className="flex-1 space-y-2">
                      <div className="h-3.5 w-2/3 animate-pulse rounded bg-primary-100" />
                      <div className="h-2.5 w-1/3 animate-pulse rounded bg-primary-75" />
                    </div>
                    <div className="h-6 w-16 animate-pulse rounded-full bg-primary-100" />
                  </div>
                ))}
              </div>
            </Card>

            <div className="relative overflow-hidden rounded-2xl border-2 border-[#213241] bg-[#050B12] p-6 text-slate-100 shadow-lg">
              <BorderBeam size={200} duration={10} />
              <div className="flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-[17px] font-extrabold text-white">
                  <Sparkles className="h-5 w-5 text-violet-400" />
                  Loading — Viewer
                </h3>
                <span className="rounded-lg border border-cyan-500/40 bg-cyan-500/10 px-2.5 py-1 font-mono text-[11px] font-bold text-cyan-300">
                  DICOM WADO-RS Stream
                </span>
              </div>
              <p className="mt-5 text-[15px] font-bold text-slate-200">
                Đang tải hình ảnh DICOM...
              </p>
              <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-2/3 animate-pulse rounded-full bg-gradient-to-r from-cyan-500 to-violet-500" />
              </div>
              <p className="mt-4 rounded-xl border border-white/10 bg-[#0B1722] px-4 py-3 text-[13px] font-medium text-slate-300">
                AI đang phân tích Study... (không chặn đọc phim)
              </p>
            </div>
          </>
        )}

        {show("error") && (
          <>
            <div className="rounded-2xl border-2 border-red-200 border-b-[5px] border-b-critical bg-white p-6 overview-wrapper-shadow">
              <div className="flex items-start gap-3.5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50 text-critical">
                  <ShieldAlert className="h-6 w-6" />
                </div>
                <div>
                  <Badge tone="critical">AI Worker Fallback</Badge>
                  <h3 className="mt-2 text-[18px] font-extrabold text-critical">
                    Không thể hoàn tất phân tích AI.
                  </h3>
                  <p className="mt-1.5 text-[14px] font-medium text-text-main">
                    Bạn vẫn có thể đọc phim thủ công.
                  </p>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-2.5 border-t border-red-100 pt-4">
                <Button size="sm">
                  <RefreshCw className="h-4 w-4" />
                  Chạy lại
                </Button>
                <Button size="sm" variant="outline">
                  Xem chi tiết lỗi
                </Button>
              </div>
            </div>

            <div className="rounded-2xl border-2 border-amber-200 border-b-[5px] border-b-amber-500 bg-white p-6 overview-wrapper-shadow">
              <div className="flex items-start gap-3.5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                  <WifiOff className="h-6 w-6" />
                </div>
                <div>
                  <Badge tone="warning">
                    <AlertTriangle className="mr-1 inline h-3.5 w-3.5" />
                    Network / Gateway Timeout
                  </Badge>
                  <h3 className="mt-2 text-[18px] font-extrabold text-primary-950">
                    Không thể kết nối máy chủ.
                  </h3>
                  <p className="mt-1.5 text-[14px] font-medium text-text-main">
                    Kiểm tra mạng hoặc thử lại sau ít phút.
                  </p>
                </div>
              </div>
              <div className="mt-5 border-t border-amber-100 pt-4">
                <Button size="sm" variant="secondary">
                  <RefreshCw className="h-4 w-4" />
                  Thử lại
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
