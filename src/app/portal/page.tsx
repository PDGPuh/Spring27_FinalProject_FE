import Link from "next/link";
import { CalendarDays, FileText, MapPin, Phone, UserRound } from "lucide-react";
import { Logo } from "@/components/branding/Logo";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { portalAppointments, portalReports } from "@/lib/demo-data";

export const metadata = {
  title: "Cổng bệnh nhân | Hệ thống X-quang AI",
};

export default function PatientPortalPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <Logo href="/portal" />
          <nav className="flex items-center gap-5 text-sm text-text-secondary">
            <a href="#lich" className="font-medium text-primary">
              Lịch chụp
            </a>
            <a href="#ket-qua">Kết quả</a>
            <a href="#ho-so">Hồ sơ</a>
            <Link href="/dang-nhap?role=patient">Tài khoản</Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-[28px] font-semibold tracking-tight">
              Xin chào, Nguyễn Văn Hùng
            </h1>
            <p className="mt-1 text-sm text-text-secondary">
              Cổng bệnh nhân — chỉ hiển thị lịch hẹn và báo cáo đã được bác sĩ xác nhận
              (Clinical Sign-off).
            </p>
          </div>
          <Badge tone="success">Đã xác thực OTP</Badge>
        </div>

        <div className="mt-6 rounded-[10px] border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          Bạn không xem được kết quả AI thô hay heatmap. Chỉ nội dung bác sĩ đã ký mới xuất
          hiện tại đây.
        </div>

        <section id="lich" className="mt-8">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Lịch chụp</h2>
            <span className="text-xs text-text-secondary">
              {portalAppointments.length} lịch
            </span>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {portalAppointments.map((a) => (
              <Card key={a.date + a.time}>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 text-primary">
                    <CalendarDays className="h-4 w-4" />
                    <p className="text-xs font-medium">Lịch hẹn</p>
                  </div>
                  <Badge
                    tone={a.status === "Đã check-in" ? "primary" : "info"}
                  >
                    {a.status}
                  </Badge>
                </div>
                <p className="mt-3 text-lg font-semibold">
                  {a.date} · {a.time}
                </p>
                <p className="mt-1 text-sm">{a.exam}</p>
                <p className="mt-2 flex items-center gap-1.5 text-sm text-text-secondary">
                  <MapPin className="h-3.5 w-3.5" />
                  {a.facility} · {a.room}
                </p>
                <p className="mt-3 rounded-[8px] bg-background px-3 py-2 text-xs text-text-secondary">
                  Chuẩn bị: {a.prep}
                </p>
                <div className="mt-4 flex gap-2">
                  <Button size="sm" variant="secondary">
                    Xem chi tiết
                  </Button>
                  <Button size="sm" variant="outline">
                    Đổi lịch (liên hệ)
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section id="ket-qua" className="mt-10">
          <div className="mb-3 flex items-center gap-2">
            <FileText className="h-4 w-4 text-text-secondary" />
            <h2 className="text-lg font-semibold">Kết quả đã xác nhận</h2>
          </div>
          <div className="space-y-3">
            {portalReports.map((r) => (
              <Card key={r.id} className="!p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">{r.title}</p>
                      <Badge tone="success">{r.status}</Badge>
                    </div>
                    <p className="mt-1 text-xs text-text-secondary">
                      {r.date} · {r.doctor} · {r.id}
                    </p>
                    <p className="mt-3 max-w-2xl text-sm text-text-secondary">{r.summary}</p>
                  </div>
                  <Button size="sm" variant="soft">
                    Xem báo cáo PDF
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section id="ho-so" className="mt-10 grid gap-4 md:grid-cols-2">
          <Card>
            <div className="mb-3 flex items-center gap-2">
              <UserRound className="h-4 w-4 text-text-secondary" />
              <h2 className="font-semibold">Hồ sơ của bạn</h2>
            </div>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-text-secondary">Mã BN</dt>
                <dd className="font-medium">BN0001287</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-text-secondary">Ngày sinh</dt>
                <dd className="font-medium">12/05/1958</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-text-secondary">BHYT</dt>
                <dd className="font-medium">DN4012••••8901</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-text-secondary">Cơ sở chính</dt>
                <dd className="font-medium text-right">BV Đa khoa Trung ương</dd>
              </div>
            </dl>
          </Card>
          <Card>
            <div className="mb-3 flex items-center gap-2">
              <Phone className="h-4 w-4 text-text-secondary" />
              <h2 className="font-semibold">Hỗ trợ</h2>
            </div>
            <p className="text-sm text-text-secondary">
              Tổng đài đặt lịch: <span className="font-medium text-text">1900 1234</span>
            </p>
            <p className="mt-2 text-sm text-text-secondary">
              Email: <span className="font-medium text-text">hotro@benhvien.vn</span>
            </p>
            <p className="mt-4 text-xs text-muted">
              Demo portal · Để quay lại workspace nội bộ, đăng nhập với vai trò nhân viên.
            </p>
            <Button href="/dang-nhap" size="sm" className="mt-4" variant="outline">
              Đăng nhập nhân viên
            </Button>
          </Card>
        </section>
      </main>
    </div>
  );
}
