import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { PageHeader } from "@/components/ui/PageHeader";
import { Select } from "@/components/ui/Select";
import { Tabs } from "@/components/ui/Tabs";

export const metadata = { title: "Cài đặt hệ thống" };

export default function SettingsPage() {
  return (
    <div>
      <PageHeader
        title="Cài đặt hệ thống"
        description="Cấu hình chung, AI thresholds, worklist, bảo mật và lưu trữ."
      />
      <Tabs
        active="ai"
        items={[
          { id: "chung", label: "Chung" },
          { id: "ai", label: "AI" },
          { id: "worklist", label: "Worklist" },
          { id: "bao-cao", label: "Báo cáo" },
          { id: "thong-bao", label: "Thông báo" },
          { id: "bao-mat", label: "Bảo mật" },
          { id: "luu-tru", label: "Lưu trữ" },
        ]}
      />
      <div className="mt-4 space-y-4">
        <Card>
          <h2 className="mb-4 text-lg font-semibold">AI Settings</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Select
              label="Active Model"
              options={[
                { value: "v21", label: "ChestXAI v2.1.0" },
                { value: "v20", label: "ChestXAI v2.0.0" },
              ]}
            />
            <Input label="Critical Confidence Rule" defaultValue="≥ 80%" />
          </div>
          <h3 className="mb-3 mt-6 text-sm font-semibold">Threshold theo label</h3>
          <div className="grid gap-3 md:grid-cols-2">
            {[
              ["Viêm phổi", "70"],
              ["Tràn khí màng phổi", "65"],
              ["Tràn dịch", "70"],
              ["Cardiomegaly", "75"],
            ].map(([l, v]) => (
              <Input key={l} label={`${l} (%)`} defaultValue={v} />
            ))}
          </div>
          <p className="mt-3 text-xs text-text-secondary">
            Threshold phải configurable — không hard-code trong ứng dụng.
          </p>
          <Button className="mt-4" size="sm">
            Lưu cấu hình AI
          </Button>
        </Card>

        <Card>
          <h2 className="mb-4 text-lg font-semibold">Bảo mật</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Input label="Session timeout (phút)" defaultValue="30" />
            <Select
              label="Bắt buộc 2FA"
              options={[
                { value: "all", label: "Tất cả người dùng" },
                { value: "clinical", label: "Chỉ vai trò lâm sàng" },
              ]}
            />
            <Input label="Độ dài mật khẩu tối thiểu" defaultValue="10" />
            <Input label="Khóa sau N lần sai" defaultValue="5" />
          </div>
        </Card>

        <Card>
          <h2 className="mb-4 text-lg font-semibold">Báo cáo PDF</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Input label="Hospital Header" defaultValue="Bệnh viện Đa khoa Trung ương" />
            <Input label="Footer" defaultValue="AI hỗ trợ — Bác sĩ quyết định kết luận" />
          </div>
        </Card>

        <Card>
          <h2 className="mb-4 text-lg font-semibold">Lưu trữ</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Input label="DICOM Storage" defaultValue="s3://xquang-dicom" />
            <Input label="Research Storage" defaultValue="s3://xquang-research" />
            <Input label="Retention (tháng)" defaultValue="84" />
          </div>
        </Card>

        <Card className="border-critical/30">
          <h2 className="mb-2 text-lg font-semibold text-critical">Danger Zone</h2>
          <p className="text-sm text-text-secondary">
            Các thao tác không thể hoàn tác. Admin không được thay đổi kết luận chuyên môn
            của bác sĩ.
          </p>
          <Button variant="danger" size="sm" className="mt-4">
            Purge cache inference (không xóa lịch sử)
          </Button>
        </Card>
      </div>
    </div>
  );
}
