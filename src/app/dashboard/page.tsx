import { Suspense } from "react";
import { DashboardView } from "@/components/dashboard/DashboardView";

export const metadata = {
  title: "Tổng quan hệ thống | Hệ thống X-quang AI",
  description: "Dashboard theo dõi hoạt động chẩn đoán hình ảnh và AI",
};

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="space-y-4">
          <div className="h-10 w-72 animate-pulse rounded bg-slate-100" />
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-28 animate-pulse rounded-[12px] bg-slate-100" />
            ))}
          </div>
        </div>
      }
    >
      <DashboardView />
    </Suspense>
  );
}
