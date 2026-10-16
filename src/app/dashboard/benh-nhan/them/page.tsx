import { Building2, Phone, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { PageHeader } from "@/components/ui/PageHeader";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";

export const metadata = { title: "Thêm bệnh nhân | Hệ thống X-quang AI" };

export default function CreatePatientPage() {
  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        title="Thêm bệnh nhân"
        description="Tạo hồ sơ bệnh nhân mới trong hệ thống."
        breadcrumb={
          <span>
            Bệnh nhân / <span className="text-primary-900">Thêm mới</span>
          </span>
        }
        actions={
          <Button href="/dashboard/benh-nhan" variant="secondary" size="sm">
            ← Danh sách bệnh nhân
          </Button>
        }
      />

      <form className="grid gap-5 pb-4 lg:grid-cols-12">
        <div className="flex flex-col gap-5 lg:col-span-8">
          <Card accent="bottom">
            <div className="mb-5 flex items-center gap-3 border-b border-primary-100 pb-3.5">
              <span className="flex size-10 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                <UserPlus className="size-5" />
              </span>
              <div>
                <h2 className="text-lg font-extrabold text-primary-900">Thông tin cơ bản</h2>
                <p className="text-xs text-text-secondary">
                  Thông tin định danh hành chính bắt buộc trên hồ sơ chẩn đoán hình ảnh
                </p>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Input label="Mã bệnh nhân" name="id" defaultValue="BN0001288" required />
              <Input label="Họ tên" name="name" placeholder="Nguyễn Văn A" required />
              <Input label="Ngày sinh" name="dob" type="date" required />
              <Select
                label="Giới tính"
                name="gender"
                required
                options={[
                  { value: "nam", label: "Nam" },
                  { value: "nu", label: "Nữ" },
                ]}
              />
              <Input label="CCCD (tùy chọn)" name="cccd" placeholder="001234567890" />
              <Input label="Mã thẻ BHYT (tùy chọn)" name="bhyt" placeholder="DN401234567890" />
            </div>
          </Card>

          <Card accent="bottom">
            <div className="mb-5 flex items-center gap-3 border-b border-primary-100 pb-3.5">
              <span className="flex size-10 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                <Phone className="size-5" />
              </span>
              <div>
                <h2 className="text-lg font-extrabold text-primary-900">Liên hệ</h2>
                <p className="text-xs text-text-secondary">
                  Thông tin nhận kết quả đã xác nhận và nhắc lịch hẹn chụp
                </p>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Input label="Điện thoại" name="phone" placeholder="0903 123 456" required />
              <Input label="Email" name="email" type="email" placeholder="benhnhan@example.vn" />
              <div className="md:col-span-2">
                <Input
                  label="Địa chỉ"
                  name="address"
                  placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố"
                />
              </div>
            </div>
          </Card>
        </div>

        <div className="flex flex-col gap-5 lg:col-span-4">
          <Card accent="bottom">
            <div className="mb-5 flex items-center gap-3 border-b border-primary-100 pb-3.5">
              <span className="flex size-10 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                <Building2 className="size-5" />
              </span>
              <div>
                <h2 className="text-lg font-extrabold text-primary-900">Quản lý</h2>
                <p className="text-xs text-text-secondary">
                  Đơn vị tiếp nhận và lưu ý lâm sàng nội bộ
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <Select
                label="Cơ sở"
                name="facility"
                required
                options={[
                  { value: "tw", label: "Bệnh viện Đa khoa Trung ương" },
                  { value: "cs1", label: "Cơ sở 1" },
                  { value: "cs2", label: "Cơ sở 2" },
                ]}
              />
              <Input label="Tiền sử dị ứng" name="allergies" defaultValue="Không ghi nhận" />
              <Textarea
                label="Ghi chú"
                name="notes"
                placeholder="Ghi chú nội bộ cho bác sĩ chỉ định và kỹ thuật viên..."
              />
            </div>
          </Card>

          <Card className="bg-primary-75/70">
            <p className="text-xs font-extrabold uppercase tracking-[0.04em] text-primary-700">
              Quy trình tiếp theo
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">
              Sau khi lưu hồ sơ bệnh nhân, bạn có thể chuyển thẳng sang bước{" "}
              <strong className="font-bold text-primary-900">Tạo chỉ định chụp X-quang</strong>{" "}
              hoặc <strong className="font-bold text-primary-900">Đặt lịch chụp</strong>.
            </p>
            <div className="mt-5 flex flex-col gap-2.5">
              <Button href="/dashboard/benh-nhan/BN0001287" size="lg" className="w-full">
                Lưu bệnh nhân
              </Button>
              <Button href="/dashboard/benh-nhan" variant="secondary" size="lg" className="w-full">
                Hủy
              </Button>
            </div>
          </Card>
        </div>
      </form>
    </div>
  );
}
