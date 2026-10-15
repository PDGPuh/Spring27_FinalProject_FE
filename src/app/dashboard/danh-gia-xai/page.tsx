import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { DataTable, Td, Tr } from "@/components/ui/DataTable";
import { FilterSelect } from "@/components/ui/FilterBar";
import { PageHeader } from "@/components/ui/PageHeader";
import { getCaseThumbnail } from "@/lib/cxr-images";

export const metadata = { title: "Đánh giá XAI" };

const experiments = [
  ["EXP-241", "v2.1.0", "Grad-CAM++", "ChestXR-XAI", "0.4", "0.711", "0.831", "0.834", "12/04/2026"],
  ["EXP-240", "v2.1.0", "Grad-CAM", "ChestXR-XAI", "0.4", "0.682", "0.802", "0.811", "11/04/2026"],
  ["EXP-238", "v2.1.0", "Grad-CAM++", "ChestXR-XAI", "0.3", "0.695", "0.818", "0.822", "10/04/2026"],
  ["EXP-235", "v2.0.0", "Grad-CAM++", "ChestXR-XAI", "0.5", "0.664", "0.791", "0.798", "02/04/2026"],
  ["EXP-230", "v2.0.0", "Grad-CAM", "ChestXR-XAI", "0.4", "0.641", "0.772", "0.780", "28/03/2026"],
  ["EXP-221", "v1.1.0", "Grad-CAM++", "ChestXR-XAI", "0.4", "0.598", "0.741", "0.755", "15/03/2026"],
];

export default function XaiEvalPage() {
  return (
    <div>
      <PageHeader
        title="Đánh giá XAI"
        description="Đánh giá mức độ khớp heatmap với Expert Annotation (IoU, Dice, Pointing Game). Heatmap clinical viewer mặc định OFF."
      />
      <div className="mb-4 flex flex-wrap gap-2">
        <FilterSelect label="Dataset" options={["ChestXR-XAI-2026"]} />
        <FilterSelect label="Model" options={["ChestXAI v2.1.0", "v2.0.0", "v1.1.0"]} />
        <FilterSelect label="XAI Method" options={["Grad-CAM", "Grad-CAM++"]} />
        <FilterSelect label="Label" options={["Viêm phổi", "Tràn khí", "Tràn dịch"]} />
        <FilterSelect label="Threshold" options={["0.3", "0.4", "0.5"]} />
      </div>
      <div className="mb-4 grid gap-3 sm:grid-cols-4">
        {[
          ["IoU (best)", "0.711"],
          ["Dice (best)", "0.831"],
          ["Pointing Game", "0.834"],
          ["Experiments", String(experiments.length)],
        ].map(([l, v]) => (
          <Card key={l} className="!p-4">
            <p className="text-xs text-text-secondary">{l}</p>
            <p className="mt-1 text-[28px] font-semibold">{v}</p>
          </Card>
        ))}
      </div>
      <div className="mb-4 grid gap-4 lg:grid-cols-3">
        <Card>
          <h3 className="mb-3 text-sm font-semibold">IoU theo Model</h3>
          <div className="flex h-28 items-end gap-2">
            {[0.61, 0.66, 0.69, 0.71].map((h, i) => (
              <div key={i} className="flex-1 rounded-t bg-ai" style={{ height: `${h * 100}%` }} />
            ))}
          </div>
        </Card>
        <Card>
          <h3 className="mb-3 text-sm font-semibold">Dice theo XAI Method</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Grad-CAM</span>
              <span className="font-semibold">0.802</span>
            </div>
            <div className="h-2 rounded-full bg-slate-100">
              <div className="h-full w-[80%] rounded-full bg-primary" />
            </div>
            <div className="flex justify-between">
              <span>Grad-CAM++</span>
              <span className="font-semibold">0.831</span>
            </div>
            <div className="h-2 rounded-full bg-slate-100">
              <div className="h-full w-[83%] rounded-full bg-ai" />
            </div>
          </div>
        </Card>
        <Card>
          <h3 className="mb-3 text-sm font-semibold">Pointing Game theo Label</h3>
          <ul className="space-y-2 text-sm">
            {[
              ["Viêm phổi", "0.86"],
              ["Tràn dịch", "0.81"],
              ["Tim to", "0.78"],
            ].map(([l, v]) => (
              <li key={l} className="flex justify-between">
                <span>{l}</span>
                <span className="font-semibold">{v}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
      <Card className="mb-4">
        <h3 className="mb-3 font-semibold">So sánh hình ảnh (mẫu de-identify)</h3>
        <div className="grid gap-3 sm:grid-cols-4">
          {[
            ["Original X-ray", getCaseThumbnail("XR20261011-001")],
            ["AI Heatmap (overlay demo)", getCaseThumbnail("XR20261011-001")],
            ["Thresholded Region", getCaseThumbnail("XR20261011-004")],
            ["Expert Annotation ref", getCaseThumbnail("XR20261011-009")],
          ].map(([t, src]) => (
            <div key={t as string}>
              <div className="relative aspect-square overflow-hidden rounded-[8px] border border-border bg-viewer-bg">
                <Image
                  src={src as string}
                  alt={t as string}
                  fill
                  className="object-cover object-center opacity-90"
                  sizes="200px"
                />
              </div>
              <p className="mt-2 text-center text-xs text-text-secondary">{t}</p>
            </div>
          ))}
        </div>
      </Card>
      <DataTable
        headers={[
          "Experiment ID",
          "Model",
          "XAI Method",
          "Dataset",
          "Threshold",
          "IoU",
          "Dice",
          "Pointing Game",
          "Date",
        ]}
        minWidth="1000px"
      >
        {experiments.map((row) => (
          <Tr key={row[0]}>
            {row.map((c, i) => (
              <Td key={`${row[0]}-${i}`} className={i === 0 ? "font-mono text-xs font-medium" : ""}>
                {c}
              </Td>
            ))}
          </Tr>
        ))}
      </DataTable>
    </div>
  );
}
