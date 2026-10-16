import { FileQuestion } from "lucide-react";
import { Logo } from "@/components/branding/Logo";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col justify-between bg-linear-overview px-4 py-8 sm:px-6">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between">
        <Logo href="/" />
      </div>

      <div className="mx-auto my-8 w-full max-w-lg">
        <EmptyState
          icon={<FileQuestion className="size-7 text-primary-600" />}
          title="Trang không tồn tại (404)."
          description="Đường dẫn có thể đã thay đổi hoặc bạn không có quyền truy cập vào phân hệ này."
          action={
            <>
              <Button href="/" variant="secondary">
                Trang chủ
              </Button>
              <Button href="/dashboard">Về Dashboard</Button>
            </>
          }
        />
      </div>

      <p className="text-center text-xs text-text-secondary">
        © 2026 Hệ thống X-quang AI · Radiology Workflow & Explainable AI
      </p>
    </div>
  );
}
