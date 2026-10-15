import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata = { title: "Trạng thái UI" };

export default function StatesPage() {
  return (
    <div>
      <PageHeader
        title="Empty / Loading / Error states"
        description="Mẫu trạng thái dùng xuyên suốt clinical workspace."
      />
      <div className="grid gap-4 lg:grid-cols-2">
        <EmptyState
          title="Không có ca đang chờ đọc."
          description="Worklist trống. Các ca mới sẽ xuất hiện khi AI hoàn tất hoặc Study sẵn sàng."
          action={<Button href="/dashboard/worklist" size="sm">Làm mới Worklist</Button>}
        />
        <EmptyState
          title="Không tìm thấy bệnh nhân phù hợp."
          description="Thử đổi từ khóa hoặc bỏ bớt bộ lọc."
        />
        <EmptyState
          title="Chưa có báo cáo."
          description="Báo cáo xuất hiện sau khi bác sĩ lưu nháp hoặc Clinical Sign-off."
        />
        <EmptyState
          title="Dataset chưa có dữ liệu."
          description="Tạo dataset và đồng bộ studies đã de-identify."
        />
        <Card>
          <h3 className="font-semibold">Loading — Clinical</h3>
          <div className="mt-4 space-y-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-10 animate-pulse rounded-[8px] bg-slate-100" />
            ))}
          </div>
        </Card>
        <Card className="bg-viewer-bg text-viewer-text border-viewer-border">
          <h3 className="font-semibold">Loading — Viewer</h3>
          <p className="mt-4 text-sm text-viewer-muted">Đang tải hình ảnh DICOM...</p>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-2/3 animate-pulse rounded-full bg-primary" />
          </div>
          <p className="mt-4 text-xs text-viewer-muted">AI đang phân tích Study... (không chặn đọc phim)</p>
        </Card>
        <Card className="border-critical/30">
          <h3 className="font-semibold text-critical">Không thể hoàn tất phân tích AI.</h3>
          <p className="mt-2 text-sm text-text-secondary">
            Bạn vẫn có thể đọc phim thủ công.
          </p>
          <div className="mt-4 flex gap-2">
            <Button size="sm">Chạy lại</Button>
            <Button size="sm" variant="outline">
              Xem chi tiết lỗi
            </Button>
          </div>
        </Card>
        <Card className="border-warning/40">
          <h3 className="font-semibold">Không thể kết nối máy chủ.</h3>
          <p className="mt-2 text-sm text-text-secondary">
            Kiểm tra mạng hoặc thử lại sau ít phút.
          </p>
          <Button size="sm" variant="secondary" className="mt-4">
            Thử lại
          </Button>
        </Card>
      </div>
    </div>
  );
}
