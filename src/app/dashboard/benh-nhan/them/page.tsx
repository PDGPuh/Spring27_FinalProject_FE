import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { PageHeader } from "@/components/ui/PageHeader";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";

export const metadata = { title: "Thêm bệnh nhân" };

export default function CreatePatientPage() {
  return (
    <div>
      <PageHeader
        title="Thêm bệnh nhân"
        description="Tạo hồ sơ bệnh nhân mới trong hệ thống."
        breadcrumb={
          <span>
            Bệnh nhân / <span className="text-text">Thêm mới</span>
          </span>
        }
      />
      <form className="space-y-4 pb-4">
        <Card>
          <h2 className="mb-4 text-lg font-semibold">Thông tin cơ bản</h2>
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
          </div>
        </Card>
        <Card>
          <h2 className="mb-4 text-lg font-semibold">Liên hệ</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Input label="Điện thoại" name="phone" required />
            <Input label="Email" name="email" type="email" />
            <div className="md:col-span-2">
              <Input label="Địa chỉ" name="address" />
            </div>
          </div>
        </Card>
        <Card>
          <h2 className="mb-4 text-lg font-semibold">Quản lý</h2>
          <div className="grid gap-4 md:grid-cols-2">
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
            <div className="md:col-span-2">
              <Textarea label="Ghi chú" name="notes" placeholder="Ghi chú nội bộ..." />
            </div>
          </div>
        </Card>
      </form>
      <div className="sticky bottom-0 z-20 -mx-6 mt-4 flex items-center justify-end gap-2 border-t border-border bg-card/95 px-6 py-3 backdrop-blur">
        <Button href="/dashboard/benh-nhan" variant="secondary">
          Hủy
        </Button>
        <Button href="/dashboard/benh-nhan/BN0001287">Lưu bệnh nhân</Button>
      </div>
    </div>
  );
}
