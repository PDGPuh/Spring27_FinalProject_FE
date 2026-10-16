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
        <div className="h-[46px] bg-primary-700 text-white">
          <div className="mx-auto flex h-full max-w-[1360px] items-center justify-between px-5 text-[13.5px] font-semibold sm:px-8">
            <div className="flex items-center gap-4">
              <span className="font-extrabold tracking-wide text-white">
                CỔNG THÔNG TIN NGƯỜI BỆNH
              </span>
              <span className="hidden text-sky-100 sm:inline">
                Hệ thống X-quang AI · Khoa Chẩn đoán Hình ảnh
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span>Tổng đài hỗ trợ: 1900 1234</span>
              <span className="text-white/35">|</span>
              <Link href="/" className="font-bold hover:text-sky-200">
                Trang giới thiệu
              </Link>
            </div>
          </div>
        </div>

        <div className="border-b border-primary-100 bg-white shadow-sm">
          <div className="mx-auto flex h-[80px] max-w-[1360px] items-center justify-between px-5 sm:px-8">
            <Logo href="/portal" />
            <nav className="hidden items-center gap-8 text-[16px] font-extrabold text-primary-800 md:flex">
              <a href="#lich" className="hover:text-primary-600">
                Lịch hẹn
              </a>
              <a href="#ket-qua" className="hover:text-primary-600">
                Kết quả đã xác nhận
              </a>
              <a href="#ho-so" className="hover:text-primary-600">
                Hồ sơ cá nhân
              </a>
            </nav>
            <div className="flex items-center gap-3">
              <Badge tone="success">
                <CheckCircle2 className="size-4" /> Đã xác thực
              </Badge>
              <Button href="/dang-nhap?role=patient" variant="secondary" size="sm">
                Đổi tài khoản
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1360px] px-5 py-9 sm:px-8">
        {/* Split Patient Welcome Banner */}
        <div className="grid gap-6 rounded-3xl bg-gradient-to-r from-[#073B7A] via-primary-600 to-primary-500 p-7 text-white shadow-main-blue md:grid-cols-12 sm:p-10">
          <div className="md:col-span-8">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-[13.5px] font-bold">
              <ShieldCheck className="size-4 text-sky-200" />
              Cổng thông tin bệnh nhân · Mã BN: BN0001287
            </span>
            <h1 className="mt-4 text-[32px] font-black leading-tight text-white sm:text-[40px]">
              Xin chào, Nguyễn Văn Hùng
            </h1>
            <p className="mt-3 max-w-2xl text-[16.5px] font-medium leading-relaxed text-sky-50">
              Tại đây bạn có thể theo dõi lịch chụp X-quang và xem các báo cáo kết quả{" "}
              <strong className="font-extrabold text-white">
                đã được bác sĩ chuyên khoa xác nhận
              </strong>
              .
            </p>
          </div>
          <div className="flex flex-col justify-between rounded-2xl border border-white/20 bg-white/12 p-6 backdrop-blur-xs md:col-span-4">
            <div className="text-[13.5px] font-bold uppercase tracking-wider text-sky-100">
              Cơ sở đăng ký khám chính
            </div>
            <div className="mt-1.5 text-[19px] font-black text-white">
              BV Đa khoa Trung ương · Cơ sở 1
            </div>
            <div className="mt-2 text-[14px] font-semibold text-sky-100">
              BHYT: <span className="font-mono font-bold text-white">DN4012••••8901</span>
            </div>
            <div className="mt-5 flex gap-2">
              <a
                href="#ket-qua"
                className="inline-flex flex-1 items-center justify-center rounded-xl bg-white px-4 py-3 text-[14.5px] font-extrabold text-primary-700 shadow-xs transition-colors hover:bg-primary-50"
              >
                Xem kết quả chụp
              </a>
            </div>
          </div>
        </div>

        {/* Clinical Safety Notice */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-primary-200 bg-primary-75 px-6 py-4 text-[14.5px] font-bold text-primary-900">
          <span>
            Vì lý do an toàn y khoa, bệnh nhân không xem trực tiếp kết quả AI thô chưa qua
            bác sĩ kết luận.
          </span>
          <SegmentedTabsParticle
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
          <section id="lich" className="mt-9">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-[26px] font-black text-primary-950">
                Lịch hẹn chụp X-quang
              </h2>
              <span className="text-[14.5px] font-bold text-primary-700 tabular-nums">
                {portalAppointments.length} lịch hẹn
              </span>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {portalAppointments.map((a) => (
                <Card key={a.date + a.time} accent="left" lift>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2 text-primary-700">
                      <CalendarDays className="size-5" />
                      <p className="text-[13.5px] font-extrabold uppercase tracking-[0.03em]">
                        Lịch hẹn
                      </p>
                    </div>
                    <Badge tone={a.status === "Đã check-in" ? "primary" : "info"}>
                      {a.status}
                    </Badge>
                  </div>
                  <p className="mt-3 text-[22px] font-black text-primary-950 tabular-nums">
                    {a.date} · {a.time}
                  </p>
                  <p className="mt-1.5 text-[16px] font-bold text-primary-700">{a.exam}</p>
                  <p className="mt-2.5 flex items-center gap-2 text-[15px] font-semibold text-text-secondary">
                    <MapPin className="size-4.5 text-primary-600" />
                    {a.facility} · {a.room}
                  </p>
                  <p className="mt-4 rounded-xl bg-primary-50/80 px-4 py-3 text-[14px] font-medium text-primary-900">
                    <strong>Chuẩn bị:</strong> {a.prep}
                  </p>
                  <div className="mt-5 flex gap-3">
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
            <div className="mb-5 flex items-center gap-2.5">
              <FileText className="size-6 text-primary-600" />
              <h2 className="text-[26px] font-black text-primary-950">
                Kết quả X-quang đã được bác sĩ xác nhận
              </h2>
            </div>
            <div className="flex flex-col gap-4">
              {portalReports.map((r) => (
                <Card key={r.id} accent="left" lift>
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <p className="text-[20px] font-extrabold text-primary-950">
                          {r.title}
                        </p>
                        <Badge tone="success">{r.status}</Badge>
                      </div>
                      <p className="mt-1.5 text-[14px] font-semibold text-primary-700 tabular-nums">
                        Ngày ký: {r.date} · Bác sĩ kết luận: {r.doctor} · Mã báo cáo:{" "}
                        <span className="font-mono font-bold">{r.id}</span>
                      </p>
                      <p className="mt-3.5 max-w-3xl text-[15.5px] font-medium leading-relaxed text-text-main">
                        {r.summary}
                      </p>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Button size="sm" variant="secondary">
                        <Download className="size-4" /> Tải PDF
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}

        <section id="ho-so" className="mt-10 grid gap-5 md:grid-cols-2">
          <Card accent="bottom">
            <div className="mb-4 flex items-center gap-2.5">
              <UserRound className="size-5 text-primary-600" />
              <h2 className="text-[20px] font-extrabold text-primary-950">
                Hồ sơ cá nhân
              </h2>
            </div>
            <dl className="flex flex-col gap-3.5 text-[15.5px]">
              <div className="flex justify-between gap-4 border-b border-primary-100/80 pb-3">
                <dt className="font-medium text-text-secondary">Mã bệnh nhân</dt>
                <dd className="font-mono font-extrabold text-primary-900">BN0001287</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-primary-100/80 pb-3">
                <dt className="font-medium text-text-secondary">Ngày sinh</dt>
                <dd className="font-bold text-primary-950 tabular-nums">
                  12/05/1958 (68 tuổi)
                </dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-primary-100/80 pb-3">
                <dt className="font-medium text-text-secondary">Bảo hiểm y tế</dt>
                <dd className="font-mono font-bold text-primary-950">DN4012••••8901</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="font-medium text-text-secondary">Cơ sở đăng ký chính</dt>
                <dd className="text-right font-extrabold text-primary-700">
                  BV Đa khoa Trung ương · Cơ sở 1
                </dd>
              </div>
            </dl>
          </Card>

          <Card accent="bottom">
            <div className="mb-4 flex items-center gap-2.5">
              <Phone className="size-5 text-primary-600" />
              <h2 className="text-[20px] font-extrabold text-primary-950">
                Hỗ trợ bệnh nhân
              </h2>
            </div>
            <p className="text-[15.5px] font-medium text-text-secondary">
              Tổng đài hỗ trợ kết quả & lịch hẹn:{" "}
              <span className="font-extrabold text-primary-700 tabular-nums">
                1900 1234
              </span>{" "}
              (7:00 – 19:00 hằng ngày).
            </p>
            <p className="mt-2.5 text-[15.5px] font-medium text-text-secondary">
              Email:{" "}
              <span className="font-bold text-primary-800">
                hotro@benhvien.vn
              </span>
            </p>
            <p className="mt-5 rounded-xl border border-primary-100 bg-white p-4 text-[14.5px] font-medium text-text-secondary">
              Nếu bạn là nhân viên y tế đang thử nghiệm, có thể{" "}
              <Link
                href="/dashboard/worklist?role=cdha"
                className="font-extrabold text-primary-700 hover:underline"
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
