import { Card } from "@/components/ui/Card";
import { DataTable, Td, Tr } from "@/components/ui/DataTable";
import { FilterSelect } from "@/components/ui/FilterBar";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata = { title: "Đánh giá AI" };

const metrics = [
  ["Sensitivity", "0.884"],
  ["Specificity", "0.901"],
  ["Precision", "0.892"],
  ["Recall", "0.876"],
  ["F1-score", "0.879"],
  ["AUROC", "0.942"],
  ["AUPRC", "0.918"],
];

const byLabel = [
  ["Viêm phổi", 420, 38, 890, 52, 0.89, 0.96, 0.92, 0.9, 0.95],
  ["Tràn dịch", 180, 22, 1100, 40, 0.82, 0.98, 0.89, 0.85, 0.93],
  ["Tim to", 95, 30, 1180, 28, 0.77, 0.97, 0.76, 0.76, 0.9],
];

export default function AiEvalPage() {
  return (
    <div>
      <PageHeader
        title="Đánh giá AI"
        description="Dashboard khoa học cho hiệu năng mô hình trên dataset nghiên cứu."
      />
      <div className="mb-4 flex flex-wrap gap-2">
        <FilterSelect label="Dataset" options={["ChestXR-Test-2026Q1"]} />
        <FilterSelect label="Model" options={["ChestXAI"]} />
        <FilterSelect label="Version" options={["v2.1.0", "v2.0.0", "v1.1.0"]} />
        <FilterSelect label="Label" options={["Tất cả", "Viêm phổi", "Tràn dịch"]} />
      </div>
      <div className="mb-4 grid gap-3 sm:grid-cols-3 lg:grid-cols-7">
        {metrics.map(([l, v]) => (
          <Card key={l} className="!p-4">
            <p className="text-[11px] text-text-secondary">{l}</p>
            <p className="mt-1 text-xl font-semibold">{v}</p>
          </Card>
        ))}
      </div>
      <div className="mb-4 grid gap-4 lg:grid-cols-3">
        <Card>
          <h3 className="mb-3 text-sm font-semibold">ROC Curve</h3>
          <div className="relative h-40 rounded-[8px] bg-background">
            <svg viewBox="0 0 100 100" className="h-full w-full p-3">
              <line x1="10" y1="90" x2="90" y2="90" stroke="#E5E7EB" />
              <line x1="10" y1="90" x2="10" y2="10" stroke="#E5E7EB" />
              <polyline
                fill="none"
                stroke="#0891B2"
                strokeWidth="2"
                points="10,90 20,70 35,40 50,28 65,20 80,14 90,10"
              />
            </svg>
          </div>
        </Card>
        <Card>
          <h3 className="mb-3 text-sm font-semibold">Precision-Recall</h3>
          <div className="relative h-40 rounded-[8px] bg-background">
            <svg viewBox="0 0 100 100" className="h-full w-full p-3">
              <line x1="10" y1="90" x2="90" y2="90" stroke="#E5E7EB" />
              <line x1="10" y1="90" x2="10" y2="10" stroke="#E5E7EB" />
              <polyline
                fill="none"
                stroke="#7C3AED"
                strokeWidth="2"
                points="10,20 30,25 50,35 70,55 85,75 90,88"
              />
            </svg>
          </div>
        </Card>
        <Card>
          <h3 className="mb-3 text-sm font-semibold">Confusion Matrix</h3>
          <div className="grid grid-cols-2 gap-2 text-center text-sm">
            <div className="rounded-[8px] bg-emerald-50 p-4">
              <p className="text-xs text-text-secondary">TP</p>
              <p className="text-xl font-semibold text-success">695</p>
            </div>
            <div className="rounded-[8px] bg-amber-50 p-4">
              <p className="text-xs text-text-secondary">FP</p>
              <p className="text-xl font-semibold text-warning">90</p>
            </div>
            <div className="rounded-[8px] bg-red-50 p-4">
              <p className="text-xs text-text-secondary">FN</p>
              <p className="text-xl font-semibold text-critical">120</p>
            </div>
            <div className="rounded-[8px] bg-slate-50 p-4">
              <p className="text-xs text-text-secondary">TN</p>
              <p className="text-xl font-semibold">3170</p>
            </div>
          </div>
        </Card>
      </div>
      <Card padding={false}>
        <div className="border-b border-border px-5 py-3">
          <h3 className="font-semibold">Performance theo bệnh lý</h3>
        </div>
        <DataTable
          headers={[
            "Label",
            "TP",
            "FP",
            "TN",
            "FN",
            "Sens",
            "Spec",
            "Prec",
            "F1",
            "AUROC",
          ]}
        >
          {byLabel.map((row) => (
            <Tr key={String(row[0])}>
              {row.map((cell, i) => (
                <Td key={i} className={i === 0 ? "font-medium" : ""}>
                  {cell}
                </Td>
              ))}
            </Tr>
          ))}
        </DataTable>
      </Card>
      <Card className="mt-4">
        <h3 className="mb-3 font-semibold">So sánh model</h3>
        <div className="flex h-32 items-end gap-3">
          {[
            ["v1.0", 78],
            ["v1.1", 84],
            ["v2.0", 90],
            ["v2.1", 94],
          ].map(([v, h]) => (
            <div key={v} className="flex flex-1 flex-col items-center gap-2">
              <div
                className="w-full rounded-t bg-primary"
                style={{ height: `${h}%` }}
              />
              <span className="text-xs text-text-secondary">{v}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
