import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { DataTable, Td, Tr } from "@/components/ui/DataTable";
import { PageHeader } from "@/components/ui/PageHeader";
import { models } from "@/lib/demo-data";

export const metadata = { title: "Mô hình AI" };

const statusTone = {
  Active: "success" as const,
  Testing: "warning" as const,
  Inactive: "neutral" as const,
  Archived: "neutral" as const,
};

export default function ModelsPage() {
  const active = models.find((m) => m.status === "Active")!;

  return (
    <div>
      <PageHeader
        title="Mô hình AI"
        description="Model Registry. Thay đổi Active Model không chỉnh sửa inference lịch sử. Threshold cấu hình ở Cài đặt AI."
        actions={<Button size="sm">+ Thêm Model</Button>}
      />

      <div className="mb-4 grid gap-3 sm:grid-cols-4">
        {[
          ["Versions", String(models.length)],
          ["Active", active.version],
          ["Inference (active)", active.inferences.toLocaleString("vi-VN")],
          ["AUROC", String(active.auroc)],
        ].map(([l, v]) => (
          <Card key={l} className="!p-4">
            <p className="text-xs text-text-secondary">{l}</p>
            <p className="mt-1 text-[28px] font-semibold">{v}</p>
          </Card>
        ))}
      </div>

      <Card className="mb-4 border-primary/30 bg-primary-soft/40">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs text-primary-dark">Active Model</p>
            <p className="mt-1 text-xl font-semibold">
              {active.name} {active.version}
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              Triển khai {active.deployed} · {active.inferences.toLocaleString("vi-VN")} inference
              · AUROC {active.auroc} · AUPRC {active.auprc}
            </p>
            <p className="mt-2 text-xs text-text-secondary">{active.changelog}</p>
          </div>
          <Badge tone="success">Đang hoạt động</Badge>
        </div>
      </Card>

      <DataTable
        headers={[
          "Model",
          "Version",
          "Labels",
          "Ngày triển khai",
          "Inference",
          "AUROC",
          "AUPRC",
          "Changelog",
          "Status",
          "Thao tác",
        ]}
        minWidth="1200px"
      >
        {models.map((m) => (
          <Tr key={m.name + m.version}>
            <Td className="font-medium">{m.name}</Td>
            <Td>{m.version}</Td>
            <Td>{m.labels}</Td>
            <Td>{m.deployed}</Td>
            <Td>{m.inferences.toLocaleString("vi-VN")}</Td>
            <Td>{m.auroc}</Td>
            <Td>{m.auprc}</Td>
            <Td className="max-w-[200px] text-xs text-text-secondary">{m.changelog}</Td>
            <Td>
              <Badge tone={statusTone[m.status as keyof typeof statusTone]}>{m.status}</Badge>
            </Td>
            <Td>
              <div className="flex flex-wrap gap-2 text-sm">
                <button type="button" className="font-medium text-primary">
                  Chi tiết
                </button>
                {m.status !== "Active" && m.status !== "Archived" && (
                  <button type="button" className="text-text-secondary">
                    Activate
                  </button>
                )}
                {m.status === "Inactive" && (
                  <button type="button" className="text-warning">
                    Rollback
                  </button>
                )}
              </div>
            </Td>
          </Tr>
        ))}
      </DataTable>
      <p className="mt-3 text-xs text-text-secondary">
        Rollback yêu cầu confirmation modal. Không fake certification / CE / FDA trên UI.
      </p>
    </div>
  );
}
