import { Suspense } from "react";
import { Sidebar } from "@/components/app-shell/Sidebar";
import { Topbar } from "@/components/app-shell/Topbar";

function SidebarFallback() {
  return (
    <aside className="h-full w-[240px] shrink-0 bg-nav-dark" aria-hidden />
  );
}

function TopbarFallback() {
  return (
    <header className="h-16 shrink-0 border-b border-border bg-card" aria-hidden />
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-dvh max-h-dvh overflow-hidden bg-background">
      <Suspense fallback={<SidebarFallback />}>
        <Sidebar />
      </Suspense>
      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        <Suspense fallback={<TopbarFallback />}>
          <Topbar />
        </Suspense>
        <main className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
