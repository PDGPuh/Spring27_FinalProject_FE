"use client";

import { useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  Cpu,
  UserRound,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { BorderBeam } from "@/components/magicui/BorderBeam";
import { machines } from "@/lib/demo-data";

const slots = ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30"];

export default function BookingPage() {
  const [selectedDay, setSelectedDay] = useState(16);
  const [selectedSlot, setSelectedSlot] = useState("10:30");
  const [selectedMachineId, setSelectedMachineId] = useState("XQ-01");

  const selectedMachine =
    machines.find((m) => m.id === selectedMachineId) ?? machines[0];
  const formattedDate = `${String(selectedDay).padStart(2, "0")}/04/2026`;

  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        breadcrumb="LÂM SÀNG & TIẾP NHẬN · ĐẶT LỊCH CHỤP"
        title="Đặt lịch chụp"
        description="Bước 2/3 — Chọn ngày, khung giờ và máy X-quang."
        actions={
          <Button href="/dashboard/chi-dinh" variant="secondary" size="sm">
            ← Quay lại chỉ định
          </Button>
        }
      />

      <div className="grid gap-5 lg:grid-cols-[340px_1fr]">
        {/* Left: Order Summary Card */}
        <div className="flex flex-col gap-5">
          <Card accent="bottom">
            <div className="flex items-center gap-2 border-b border-primary-100 pb-3 text-xs font-extrabold uppercase tracking-[0.04em] text-primary-600">
              <UserRound className="size-4" /> Tóm tắt chỉ định
            </div>
            <p className="mt-4 text-lg font-extrabold text-primary-900">
              Nguyễn Văn Hùng
            </p>
            <p className="mt-0.5 font-mono text-xs font-bold text-primary-600">
              BN0001287 · 68 tuổi · Nam
            </p>

            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between border-b border-primary-100/70 pb-2.5">
                <dt className="text-text-secondary">Loại chụp</dt>
                <dd className="font-bold text-primary-900">X-quang ngực PA</dd>
              </div>
              <div className="flex justify-between border-b border-primary-100/70 pb-2.5">
                <dt className="text-text-secondary">Clinical Priority</dt>
                <dd>
                  <Badge tone="neutral">Thường</Badge>
                </dd>
              </div>
              <div className="flex justify-between border-b border-primary-100/70 pb-2.5">
                <dt className="text-text-secondary">BS chỉ định</dt>
                <dd className="font-semibold text-primary-900">BS. Lê Thu Hà</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-text-secondary">Cơ sở</dt>
                <dd className="font-semibold text-primary-700">BV Đa khoa TW</dd>
              </div>
            </dl>
          </Card>

          <Card className="bg-primary-75/60">
            <p className="text-xs font-extrabold uppercase tracking-[0.04em] text-primary-700">
              Hướng dẫn chuẩn bị cho bệnh nhân
            </p>
            <p className="mt-1.5 text-xs leading-relaxed text-text-secondary">
              Tháo dây chuyền kim loại, cúc áo vùng ngực và mang theo phiếu chỉ định hoặc
              mã hẹn điện tử đến quầy tiếp đón trước 15 phút.
            </p>
          </Card>
        </div>

        {/* Right: Interactive Date, Slot, Machine & Confirmation */}
        <div className="flex flex-col gap-5">
          <div className="grid gap-5 xl:grid-cols-2">
            {/* 1. Calendar Picker */}
            <Card accent="bottom">
              <div className="mb-4 flex items-center justify-between border-b border-primary-100 pb-3">
                <div className="flex items-center gap-2">
                  <CalendarDays className="size-5 text-primary-600" />
                  <h2 className="text-base font-extrabold text-primary-900">
                    Tháng 4, 2026
                  </h2>
                </div>
                <span className="rounded-lg bg-primary-75 px-2.5 py-1 text-xs font-bold text-primary-700 tabular-nums">
                  Đã chọn: {formattedDate}
                </span>
              </div>
              <div className="grid grid-cols-7 gap-1.5 text-center text-xs">
                {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((d) => (
                  <div
                    key={d}
                    className="py-1.5 font-extrabold uppercase text-primary-700"
                  >
                    {d}
                  </div>
                ))}
                {Array.from({ length: 30 }, (_, i) => i + 1).map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setSelectedDay(d)}
                    className={`h-9 rounded-xl font-bold transition-all tabular-nums ${
                      d === selectedDay
                        ? "bg-primary-600 text-white shadow-xs"
                        : "text-primary-900 hover:bg-primary-75"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </Card>

            {/* 2. Available Time Slots */}
            <Card accent="bottom" className="flex flex-col justify-between">
              <div>
                <div className="mb-4 flex items-center justify-between border-b border-primary-100 pb-3">
                  <div className="flex items-center gap-2">
                    <Clock3 className="size-5 text-primary-600" />
                    <h2 className="text-base font-extrabold text-primary-900">
                      Khung giờ trống
                    </h2>
                  </div>
                  <span className="text-xs font-semibold text-primary-600">
                    15 phút / ca
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                  {slots.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSelectedSlot(s)}
                      className={`flex h-11 items-center justify-center rounded-xl border text-sm font-bold transition-all tabular-nums ${
                        s === selectedSlot
                          ? "border-primary-600 bg-primary-600 text-white shadow-xs"
                          : "border-primary-200 bg-white text-primary-900 hover:border-primary-500 hover:bg-primary-50"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-4 rounded-xl bg-primary-50/70 p-3 text-xs text-primary-800">
                Khung giờ <strong>{selectedSlot}</strong> ngày{" "}
                <strong>{formattedDate}</strong> hiện còn trống trên{" "}
                <strong>{selectedMachine.name}</strong>.
              </div>
            </Card>
          </div>

          {/* 3. Select Modality Machine */}
          <Card accent="bottom">
            <div className="mb-4 flex items-center gap-2 border-b border-primary-100 pb-3">
              <Cpu className="size-5 text-primary-600" />
              <h2 className="text-base font-extrabold text-primary-900">
                Chọn máy X-quang thực hiện
              </h2>
            </div>
            <div className="grid gap-3.5 md:grid-cols-3">
              {machines.map((m) => {
                const active = m.id === selectedMachineId;
                return (
                  <button
                    key={m.id}
                    type="button"
                    disabled={m.status === "maintenance"}
                    onClick={() => setSelectedMachineId(m.id)}
                    className={`rounded-2xl border p-4 text-left transition-all ${
                      active
                        ? "border-2 border-primary-600 bg-primary-50/70 shadow-xs"
                        : m.status === "maintenance"
                          ? "cursor-not-allowed border-gray-200 bg-gray-50 opacity-60"
                          : "border-primary-100 bg-white hover:border-primary-400 hover:bg-primary-50/30"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-base font-extrabold text-primary-900">
                        {m.name}
                      </p>
                      <Badge tone={m.status === "maintenance" ? "warning" : "success"}>
                        {m.status === "maintenance" ? "Đang bảo trì" : "Có sẵn"}
                      </Badge>
                    </div>
                    <p className="mt-1 text-xs font-medium text-text-secondary">
                      {m.room} · {m.facility}
                    </p>
                  </button>
                );
              })}
            </div>
          </Card>

          {/* 4. Live Confirmation Card with BorderBeam */}
          <div className="relative overflow-hidden rounded-2xl border border-primary-100 border-b-[5px] border-b-primary-600 bg-white p-6 overview-wrapper-shadow">
            <BorderBeam size={240} duration={11} colorFrom="#0096d1" colorTo="#0d71ba" />
            <div className="mb-4 flex items-center gap-2">
              <CheckCircle2 className="size-5 text-primary-600" />
              <h2 className="text-lg font-extrabold text-primary-900">Xác nhận lịch</h2>
            </div>
            <dl className="grid gap-3 rounded-xl bg-primary-50/60 p-4 text-sm sm:grid-cols-3">
              {[
                ["Ngày chụp", formattedDate],
                ["Giờ hẹn", selectedSlot],
                ["Máy thực hiện", selectedMachine.name],
                ["Phòng chụp", selectedMachine.room],
                ["Cơ sở", selectedMachine.facility],
                ["Thời lượng dự kiến", "15 phút"],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-xs font-semibold text-text-secondary">{k}</dt>
                  <dd className="mt-0.5 font-extrabold text-primary-900 tabular-nums">
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-5 flex flex-wrap justify-end gap-2.5">
              <Button href="/dashboard/chi-dinh" variant="secondary">
                Quay lại
              </Button>
              <Button href="/dashboard/hang-doi">Đặt lịch chụp →</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
