import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <div className="w-full max-w-lg">
        <EmptyState
          title="Trang không tồn tại."
          description="Đường dẫn có thể đã thay đổi hoặc bạn không có quyền truy cập."
          action={
            <div className="flex gap-2">
              <Button href="/" variant="secondary">
                Trang chủ
              </Button>
              <Button href="/dashboard">Dashboard</Button>
            </div>
          }
        />
      </div>
    </div>
  );
}
