"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  CheckCircle2,
  Download,
  FileText,
  MapPin,
  Phone,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { Logo } from "@/components/branding/Logo";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SegmentedTabsParticle } from "@/components/ui/particles/p-segmented-tabs";
import { portalAppointments, portalReports } from "@/lib/demo-data";

export default function PatientPortalPage() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="min-h-screen bg-background">
      {/* 2-Tier Patient Portal Header */}
      <header className="sticky top-0 z-40">
        <div className="h-[40px] bg-primary-500 text-white">
          <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-4 text-xs sm:px-6">
            <div className="flex items-center gap-4">
              <span className="font-semibold text-white">
                CỔNG THÔNG TIN NGƯỜI BỆNH
              </span>
              <span className="hidden text-primary-100 sm:inline">
                Hệ thống X-quang AI · Khoa Chẩn đoán Hình ảnh
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span>Tổng đài hỗ trợ: 1900 1234</span>
              <span className="text-white/35">|</span>
              <Link href="/" className="hover:text-primary-100">
                Trang giới thiệu
              </Link>
            </div>
          </div>
        </div>

        <div className="border-b border-primary-100 bg-white shadow-sm">
          <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-4 sm:px-6">
            <Logo href="/portal" />
            <nav className="hidden items-center gap-6 text-sm font-semibold text-primary-600 md:flex">
              <a href="#lich" className="hover:text-primary-700">
                Lịch hẹn
              </a>
              <a href="#ket-qua" className="hover:text-primary-700">
                Kết quả đã xác nhận
              </a>
              <a href="#ho-so" className="hover:text-primary-700">
                Hồ sơ cá nhân
              </a>
            </nav>
            <div className="flex items-center gap-2">
              <Badge tone="success">
                <CheckCircle2 className="size-3.5" /> Đã xác thực
              </Badge>
              <Button href="/dang-nhap?role=patient" variant="secondary" size="sm">
                Đổi tài khoản
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {/* Split Patient Welcome Banner */}
        <div className="grid gap-6 rounded-2xl bg-primary-600 p-6 text-white shadow-main-blue md:grid-cols-12 sm:p-8">
          <div className="md:col-span-8">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
              <ShieldCheck className="size-3.5 text-primary-200" />
              Cổng thông tin bệnh nhân · Mã BN: BN0001287
            </span>
            <h1 className="display-3 mt-3 text-white">
              Xin chào, Nguyễn Văn Hùng
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-primary-75">
              Tại đây bạn có thể theo dõi lịch chụp X-quang và xem các báo cáo kết quả{" "}
              <strong className="font-semibold text-white">
                đã được bác sĩ chuyên khoa xác nhận
              </strong>
              .
            </p>
          </div>
          <div className="flex flex-col justify-between rounded-xl bg-white/10 p-4 backdrop-blur-xs md:col-span-4">
            <div className="text-xs text-primary-100">Cơ sở đăng ký khám chính</div>
            <div className="mt-1 text-base font-bold text-white">
              BV Đa khoa Trung ương · Cơ sở 1
            </div>
            <div className="mt-2 text-xs text-primary-100">
              BHYT: <span className="font-mono font-semibold text-white">DN4012••••8901</span>
            </div>
            <div className="mt-4 flex gap-2">
              <a
                href="#ket-qua"
                className="inline-flex flex-1 items-center justify-center rounded-lg bg-white px-3 py-2 text-xs font-bold text-primary-600 transition-colors hover:bg-primary-50"
              >
                Xem kết quả chụp
              </a>
            </div>
          </div>
        </div>

        {/* Clinical Safety Notice */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-primary-200 bg-primary-75 px-4 py-3 text-xs font-medium text-primary-800">
          <span>
            Vì lý do an toàn y khoa, bệnh nhân không xem trực tiếp kết quả AI thô chưa qua
            bác sĩ kết luận.
          </span>
          <SegmentedTabsParticle
            size="sm"
            active={activeTab}
            onChange={setActiveTab}
            items={[
              { id: "all", label: "Tất cả" },
              { id: "lich", label: "Lịch chụp", count: portalAppointments.length },
              { id: "ket-qua", label: "Kết quả đã ký", count: portalReports.length },
            ]}
          />
        </div>

        {(activeTab === "all" || activeTab === "lich") && (
          <section id="lich" className="mt-8">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="heading-1 text-primary-800">Lịch hẹn chụp X-quang</h2>
              <span className="text-xs font-semibold text-primary-600 tabular-nums">
                {portalAppointments.length} lịch hẹn
              </span>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {portalAppointments.map((a) => (
                <Card key={a.date + a.time} accent="left" lift>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 text-primary-600">
                      <CalendarDays className="size-4" />
                      <p className="text-xs font-bold uppercase tracking-[0.03em]">
                        Lịch hẹn
                      </p>
                    </div>
                    <Badge tone={a.status === "Đã check-in" ? "primary" : "info"}>
                      {a.status}
                    </Badge>
                  </div>
                  <p className="mt-3 text-lg font-bold text-primary-900 tabular-nums">
                    {a.date} · {a.time}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-primary-600">{a.exam}</p>
                  <p className="mt-2 flex items-center gap-1.5 text-sm text-text-secondary">
                    <MapPin className="size-3.5 text-primary-600" />
                    {a.facility} · {a.room}
                  </p>
                  <p className="mt-3 rounded-lg bg-primary-50/70 px-3 py-2 text-xs text-primary-800">
                    <strong>Chuẩn bị:</strong> {a.prep}
                  </p>
                  <div className="mt-4 flex gap-2">
                    <Button size="sm" variant="primary">
                      Xem hướng dẫn
                    </Button>
                    <Button size="sm" variant="secondary">
                      Liên hệ đổi lịch
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}

        {(activeTab === "all" || activeTab === "ket-qua") && (
          <section id="ket-qua" className="mt-10">
            <div className="mb-4 flex items-center gap-2">
              <FileText className="size-5 text-primary-600" />
              <h2 className="heading-1 text-primary-800">
                Kết quả X-quang đã được bác sĩ xác nhận
              </h2>
            </div>
            <div className="flex flex-col gap-3.5">
              {portalReports.map((r) => (
                <Card key={r.id} accent="left" lift>
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2.5">
                        <p className="title-1 font-bold text-primary-900">{r.title}</p>
                        <Badge tone="success">{r.status}</Badge>
                      </div>
                      <p className="mt-1 text-xs font-medium text-primary-600 tabular-nums">
                        Ngày ký: {r.date} · Bác sĩ kết luận: {r.doctor} · Mã báo cáo:{" "}
                        <span className="font-mono">{r.id}</span>
                      </p>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-secondary">
                        {r.summary}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="secondary">
                        <Download className="size-3.5" /> Tải PDF
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}

        <section id="ho-so" className="mt-10 grid gap-4 md:grid-cols-2">
          <Card accent="bottom">
            <div className="mb-3 flex items-center gap-2">
              <UserRound className="size-4 text-primary-600" />
              <h2 className="title-1 text-primary-800">Hồ sơ cá nhân</h2>
            </div>
            <dl className="flex flex-col gap-2.5 text-sm">
              <div className="flex justify-between gap-4 border-b border-primary-100/70 pb-2">
                <dt className="text-text-secondary">Mã bệnh nhân</dt>
                <dd className="font-mono font-bold text-primary-800">BN0001287</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-primary-100/70 pb-2">
                <dt className="text-text-secondary">Ngày sinh</dt>
                <dd className="font-semibold tabular-nums">12/05/1958 (68 tuổi)</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-primary-100/70 pb-2">
                <dt className="text-text-secondary">Bảo hiểm y tế</dt>
                <dd className="font-mono font-semibold">DN4012••••8901</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-text-secondary">Cơ sở đăng ký chính</dt>
                <dd className="text-right font-semibold text-primary-700">
                  BV Đa khoa Trung ương · Cơ sở 1
                </dd>
              </div>
            </dl>
          </Card>

          <Card accent="bottom">
            <div className="mb-3 flex items-center gap-2">
              <Phone className="size-4 text-primary-600" />
              <h2 className="title-1 text-primary-800">
                Hỗ trợ bệnh nhân
              </h2>
            </div>
            <p className="text-sm text-text-secondary">
              Tổng đài hỗ trợ kết quả & lịch hẹn:{" "}
              <span className="font-bold text-primary-600 tabular-nums">
                1900 1234
              </span>{" "}
              (7:00 – 19:00 hằng ngày).
            </p>
            <p className="mt-2 text-sm text-text-secondary">
              Email:{" "}
              <span className="font-semibold text-primary-700">
                hotro@benhvien.vn
              </span>
            </p>
            <p className="mt-4 rounded-lg bg-white p-3 text-xs text-text-secondary">
              Nếu bạn là nhân viên y tế đang thử nghiệm, có thể{" "}
              <Link
                href="/dashboard/worklist?role=cdha"
                className="font-bold text-primary-600 hover:underline"
              >
                chuyển sang giao diện nội bộ →
              </Link>
            </p>
          </Card>
        </section>
      </main>
    </div>
  );
}
