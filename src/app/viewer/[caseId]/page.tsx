import { Suspense } from "react";
import { RadiologyViewer } from "@/components/viewer/RadiologyViewer";
import { worklistCases } from "@/lib/demo-data";

export function generateStaticParams() {
  return worklistCases.map((c) => ({ caseId: c.id }));
}

export default async function ViewerPage({
  params,
}: {
  params: Promise<{ caseId: string }>;
}) {
  const { caseId } = await params;
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center bg-viewer-bg text-sm text-viewer-muted">
          Đang tải hình ảnh DICOM...
        </div>
      }
    >
      <RadiologyViewer caseId={caseId} />
    </Suspense>
  );
}
