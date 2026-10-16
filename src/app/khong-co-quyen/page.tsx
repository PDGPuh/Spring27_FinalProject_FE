import Link from "next/link";
import { ArrowLeft, ShieldAlert } from "lucide-react";
import { Logo } from "@/components/branding/Logo";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";

export const metadata = { title: "Không có quyền truy cập | Hệ thống X-quang AI" };

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen flex-col justify-between bg-linear-overview px-4 py-8 sm:px-6">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between">
        <Logo href="/" />
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 rounded-xl border border-primary-200 bg-white px-3.5 py-2 text-xs font-bold text-primary-600 transition-colors hover:bg-primary-50"
        >
          <ArrowLeft className="size-3.5" /> Về Dashboard
        </Link>
      </div>

      <div className="mx-auto my-8 w-full max-w-lg">
        <EmptyState
          icon={<ShieldAlert className="size-7 text-critical" />}
          title="Bạn không có quyền truy cập nội dung này."
          description="Phân quyền RBAC giới hạn chức năng theo đúng vai trò chuyên môn. Liên hệ quản trị viên hoặc chuyển đổi vai trò demo để tiếp tục."
          action={
            <>
              <Button href="/dashboard" variant="primary">
                Về Dashboard
              </Button>
              <Button href="/dang-nhap" variant="secondary">
                Đổi vai trò (Demo RBAC)
              </Button>
            </>
          }
        />
      </div>

      <p className="text-center text-xs text-text-secondary">
        © 2026 Hệ thống X-quang AI · Kiểm soát truy cập theo vai trò (RBAC)
      </p>
    </div>
  );
}
