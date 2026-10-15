import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { DataTable, Td, Tr } from "@/components/ui/DataTable";
import { FilterBar, FilterSelect } from "@/components/ui/FilterBar";
import { PageHeader } from "@/components/ui/PageHeader";
import { Tabs } from "@/components/ui/Tabs";
import { datasetsCatalog, researchRows } from "@/lib/demo-data";

export const metadata = { title: "Bộ dữ liệu nghiên cứu" };

export default function DatasetPage() {
  const annotated = researchRows.filter((r) => r.annotation === "Có").length;

  return (
    <div>
      <PageHeader
        title="Bộ dữ liệu nghiên cứu"
        description="Dữ liệu đã de-identify. Không hiển thị tên, SĐT, địa chỉ hay Patient ID thật."
        actions={
          <>
            <Button size="sm" variant="secondary">
              Đồng bộ Studies
            </Button>
            <Button size="sm">+ Tạo Dataset</Button>
          </>
        }
      />

      <div className="mb-4 rounded-[10px] border border-violet-100 bg-violet-50 px-4 py-3 text-xs text-ai">
        Research Subject ID (RS-*) thay thế định danh lâm sàng. Export chỉ chứa cho vai trò
        Researcher / Admin có audit.
      </div>

      <div className="mb-4 grid gap-3 sm:grid-cols-4">
        {[
          ["Tổng Studies", "12,480"],
          ["Đã ẩn danh", "12,480"],
          ["Có Expert Annotation", "4,213"],
          ["Dataset catalog", String(datasetsCatalog.length)],
        ].map(([l, v]) => (
          <Card key={l} className="!p-4">
            <p className="text-xs text-text-secondary">{l}</p>
            <p className="mt-1 text-[28px] font-semibold">{v}</p>
          </Card>
        ))}
      </div>

      <h2 className="mb-3 text-lg font-semibold">Catalog Dataset</h2>
      <div className="mb-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {datasetsCatalog.map((d) => (
          <Card key={d.name} className="!p-4">
            <div className="flex items-start justify-between gap-2">
              <p className="font-semibold leading-snug">{d.name}</p>
              <Badge tone={d.status === "Ready" ? "success" : "warning"}>{d.status}</Badge>
            </div>
            <dl className="mt-3 grid grid-cols-2 gap-2 text-xs">
              <div>
                <dt className="text-text-secondary">Studies</dt>
                <dd className="font-semibold">{d.studies.toLocaleString("vi-VN")}</dd>
              </div>
              <div>
                <dt className="text-text-secondary">Annotated</dt>
                <dd className="font-semibold">{d.annotated.toLocaleString("vi-VN")}</dd>
              </div>
              <div>
                <dt className="text-text-secondary">Split</dt>
                <dd className="font-semibold">{d.split}</dd>
              </div>
              <div>
                <dt className="text-text-secondary">Cập nhật</dt>
                <dd className="font-semibold">{d.updated}</dd>
              </div>
            </dl>
          </Card>
        ))}
      </div>

      <Tabs
        active="rows"
        items={[
          { id: "rows", label: "Research rows", count: researchRows.length },
          { id: "ann", label: "Có annotation", count: annotated },
          { id: "pending", label: "Chưa gán nhãn", count: researchRows.length - annotated },
        ]}
      />
      <div className="mt-4">
        <FilterBar searchPlaceholder="Research Subject ID, Dataset...">
          <FilterSelect
            label="Dataset"
            options={datasetsCatalog.map((d) => d.name)}
          />
          <FilterSelect label="Split" options={["train", "val", "test", "external"]} />
          <FilterSelect label="Annotation" options={["Có", "Chưa"]} />
        </FilterBar>
      </div>
      <DataTable
        headers={[
          "Research ID",
          "Dataset",
          "Split",
          "Modality",
          "Label",
          "Annotation",
          "Model Tested",
          "Ngày thêm",
        ]}
        minWidth="1000px"
      >
        {researchRows.map((r) => (
          <Tr key={r.id}>
            <Td className="font-mono text-xs font-medium">{r.id}</Td>
            <Td>{r.dataset}</Td>
            <Td>
              <Badge tone="neutral">{r.split}</Badge>
            </Td>
            <Td>{r.modality}</Td>
            <Td>{r.label}</Td>
            <Td>
              <Badge tone={r.annotation === "Có" ? "success" : "warning"}>
                {r.annotation}
              </Badge>
            </Td>
            <Td>{r.model}</Td>
            <Td>{r.date}</Td>
          </Tr>
        ))}
      </DataTable>
      <p className="mt-3 text-xs text-text-secondary">
        Hiển thị {researchRows.length} mẫu · Catalog đầy đủ trên object storage research.
      </p>
    </div>
  );
}
