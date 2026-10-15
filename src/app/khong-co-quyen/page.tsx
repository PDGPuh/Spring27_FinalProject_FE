import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";

export const metadata = { title: "Không có quyền" };

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <div className="w-full max-w-lg">
        <EmptyState
          title="Bạn không có quyền truy cập nội dung này."
          description="Liên hệ quản trị viên nếu bạn cần được cấp quyền phù hợp với vai trò."
          action={
            <Button href="/dashboard" variant="secondary">
              Về Dashboard
            </Button>
          }
        />
      </div>
    </div>
  );
}
