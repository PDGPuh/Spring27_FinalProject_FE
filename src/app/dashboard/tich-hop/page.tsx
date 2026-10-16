"use client";

import { useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Cpu,
  KeyRound,
  Network,
  PlugZap,
  RefreshCw,
  Server,
  ShieldCheck,
  Webhook,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { BorderBeam } from "@/components/ui/BorderBeam";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { DataTable, Td, Tr } from "@/components/ui/DataTable";
import { Input } from "@/components/ui/Input";
import { PageHeader } from "@/components/ui/PageHeader";
import { SegmentedTabsParticle } from "@/components/ui/SegmentedTabsParticle";
import { integrations } from "@/lib/demo-data";

const webhookEvents = [
  { time: "10:58:12", event: "study.received", target: "https://api…/hooks", status: "200" },
  { time: "10:55:40", event: "ai.inference.complete", target: "https://api…/hooks", status: "200" },
  { time: "10:33:08", event: "dicom.stored", target: "https://api…/hooks", status: "200" },
  { time: "09:12:01", event: "report.finalized", target: "https://partner…/xr", status: "503" },
];

export default function IntegrationsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [echoSuccess, setEchoSuccess] = useState(false);
  const [keyRotated, setKeyRotated] = useState(false);

  const connectedCount = integrations.filter(
    (i) => i.status === "Connected" || i.status === "Active"
  ).length;
  const unconfiguredCount = integrations.filter(
    (i) => i.status === "Not configured"
  ).length;

  const filteredIntegrations = useMemo(() => {
    return integrations.filter((i) => {
      if (activeTab === "connected") {
        return i.status === "Connected" || i.status === "Active";
      }
      if (activeTab === "unconfigured") {
        return i.status === "Not configured";
      }
      return true;
    });
  }, [activeTab]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Tích hợp"
        description="PACS, DICOMweb, HIS, FHIR và REST API — không hiển thị full secret."
        actions={
          <Badge tone="success">
            <PlugZap className="mr-1 inline h-3.5 w-3.5" />
            {connectedCount}/{integrations.length} Cổng tích hợp sẵn sàng
          </Badge>
        }
      />

      {/* 4 KPI Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="relative overflow-hidden rounded-2xl border border-emerald-200 border-b-[4px] border-b-emerald-600 bg-white p-5 overview-wrapper-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[12px] font-extrabold uppercase tracking-wider text-emerald-700">
                Kết nối OK
              </p>
              <p className="mt-2 font-mono text-[30px] font-black leading-none text-emerald-700">
                {connectedCount}
              </p>
              <p className="mt-2 text-[12px] font-semibold text-emerald-800">
                PACS, DICOMweb, HIS & AI Worker
              </p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-amber-200 border-b-[4px] border-b-amber-500 bg-white p-5 overview-wrapper-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[12px] font-extrabold uppercase tracking-wider text-amber-800">
                Chưa cấu hình
              </p>
              <p className="mt-2 font-mono text-[30px] font-black leading-none text-amber-700">
                {unconfiguredCount}
              </p>
              <p className="mt-2 text-[12px] font-semibold text-amber-800">
                Endpoint tùy chọn chờ kích hoạt
              </p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <Network className="h-5 w-5" />
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-primary-100 border-b-[4px] border-b-primary-600 bg-white p-5 overview-wrapper-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[12px] font-extrabold uppercase tracking-wider text-text-secondary">
                Webhook 24h
              </p>
              <p className="mt-2 font-mono text-[30px] font-black leading-none text-primary-950">
                142
              </p>
              <p className="mt-2 text-[12px] font-semibold text-primary-700">
                Sự kiện đồng bộ liên thông
              </p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
              <Webhook className="h-5 w-5" />
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-red-200 border-b-[4px] border-b-critical bg-white p-5 overview-wrapper-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[12px] font-extrabold uppercase tracking-wider text-critical">
                Lỗi gần nhất
              </p>
              <p className="mt-2 font-mono text-[30px] font-black leading-none text-critical">
                1
              </p>
              <p className="mt-2 text-[12px] font-semibold text-red-700">
                HTTP 503 partner endpoint (auto-retry)
              </p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-critical">
              <AlertTriangle className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs + Integration Cards */}
      <div className="space-y-4">
        <SegmentedTabsParticle
          activeId={activeTab}
          onChange={setActiveTab}
          tabs={[
            { id: "all", label: "Tất cả tích hợp", count: integrations.length },
            {
              id: "connected",
              label: "Connected / Active",
              count: connectedCount,
              tone: "success",
            },
            {
              id: "unconfigured",
              label: "Chưa cấu hình",
              count: unconfiguredCount,
              tone: "warning",
            },
          ]}
        />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredIntegrations.map((i, idx) => {
            const isOk = i.status === "Connected" || i.status === "Active";
            return (
              <div
                key={i.name}
                className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-primary-100 border-b-[4px] border-b-primary-600 bg-white p-5 overview-wrapper-shadow"
              >
                {idx === 0 && <BorderBeam size={180} duration={11} />}
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                          isOk
                            ? "bg-primary-75 text-primary-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        <Server className="h-5 w-5" />
                      </div>
                      <div>
                        <h2 className="text-[16px] font-extrabold text-primary-950">
                          {i.name}
                        </h2>
                        <p className="mt-0.5 font-mono text-[12px] font-bold text-primary-700">
                          {i.detail}
                        </p>
                      </div>
                    </div>
                    <Badge tone={isOk ? "success" : "warning"}>{i.status}</Badge>
                  </div>

                  <p className="mt-3.5 rounded-xl border border-primary-100/80 bg-primary-50/40 px-3.5 py-2.5 text-[13px] font-medium text-text-main">
                    {i.notes}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-primary-100 pt-3.5">
                  <span className="flex items-center gap-1.5 font-mono text-[12px] font-semibold text-text-secondary">
                    <Clock className="h-3.5 w-3.5 text-primary-600" />
                    Last sync: {i.lastSync}
                  </span>
                  <Button size="sm" variant="secondary">
                    Cấu hình
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* DICOM Configuration & REST API */}
      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-75 text-primary-700">
                <Cpu className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-[17px] font-extrabold text-primary-950">
                  DICOM Configuration
                </h3>
                <p className="text-[12px] font-medium text-text-secondary">
                  Thông số C-STORE / C-FIND / C-ECHO với Orthanc PACS
                </p>
              </div>
            </div>
            {echoSuccess && (
              <Badge tone="success">✓ C-ECHO OK (12ms)</Badge>
            )}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="AE Title" defaultValue="XQUANGAI" />
            <Input label="Host" defaultValue="orthanc.internal" />
            <Input label="Port" defaultValue="4242" />
            <Input label="Calling AE" defaultValue="ORTHANC" />
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Button onClick={() => setEchoSuccess(true)}>
              <Activity className="h-4 w-4" />
              Lưu & kiểm tra C-ECHO
            </Button>
            <span className="text-[12px] font-semibold text-text-secondary">
              TLS 1.3 · DICOM Part 15 Security Profile
            </span>
          </div>
        </Card>

        <Card>
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-ai">
                <KeyRound className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-[17px] font-extrabold text-primary-950">
                  REST API
                </h3>
                <p className="text-[12px] font-medium text-text-secondary">
                  Khóa xác thực dịch vụ HIS/EMR (đã che secret)
                </p>
              </div>
            </div>
            {keyRotated ? (
              <Badge tone="warning">Đã tạo khóa mới</Badge>
            ) : (
              <Badge tone="info">SHA-256 HMAC</Badge>
            )}
          </div>

          <Input
            label="API Key"
            defaultValue={
              keyRotated
                ? "xq_live_••••••••••••4c8e"
                : "xq_live_••••••••••••9f2a"
            }
            disabled
          />

          <div className="mt-3.5 rounded-xl border border-primary-100 bg-primary-50/50 p-3.5">
            <p className="text-[12px] font-bold uppercase tracking-wider text-text-secondary">
              Webhook endpoint
            </p>
            <p className="mt-1 font-mono text-[13px] font-bold text-primary-900">
              https://api.xquang-ai.vn/hooks/events
            </p>
          </div>

          <div className="mt-5 flex flex-wrap gap-2.5">
            <Button variant="secondary" onClick={() => setKeyRotated(true)}>
              <RefreshCw className="h-4 w-4" />
              Xoay key mới
            </Button>
            <Button variant="outline">
              <ShieldCheck className="h-4 w-4" />
              Xem tài liệu API
            </Button>
          </div>
        </Card>
      </div>

      {/* Webhook delivery gần đây */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-[18px] font-extrabold text-primary-950">
            <Webhook className="h-5 w-5 text-primary-700" />
            Webhook delivery gần đây
          </h2>
          <span className="text-[13px] font-semibold text-text-secondary">
            Tự động retry theo cấp số nhân khi HTTP ≠ 2xx
          </span>
        </div>
        <DataTable headers={["Thời gian", "Sự kiện (Event)", "Target Endpoint", "Mã phản hồi HTTP"]}>
          {webhookEvents.map((w) => (
            <Tr key={w.time + w.event}>
              <Td>
                <span className="font-mono text-[13px] font-bold text-primary-950">
                  {w.time}
                </span>
              </Td>
              <Td>
                <span className="rounded-lg border border-primary-200 bg-primary-50/70 px-2.5 py-1 font-mono text-[13px] font-bold text-primary-900">
                  {w.event}
                </span>
              </Td>
              <Td>
                <span className="font-mono text-[13px] font-medium text-text-secondary">
                  {w.target}
                </span>
              </Td>
              <Td>
                <Badge tone={w.status === "200" ? "success" : "critical"}>
                  HTTP {w.status}
                </Badge>
              </Td>
            </Tr>
          ))}
        </DataTable>
      </div>
    </div>
  );
}
