import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { DataTable, Td, Tr } from "@/components/ui/DataTable";
import { FilterBar, FilterSelect } from "@/components/ui/FilterBar";
import { PageHeader } from "@/components/ui/PageHeader";
import { Tabs } from "@/components/ui/Tabs";
import { getCaseThumbnail } from "@/lib/cxr-images";
import { worklistCases } from "@/lib/demo-data";

export const metadata = { title: "Worklist đọc phim" };

const aiPTone = {
  Critical: "critical" as const,
  High: "warning" as const,
  Normal: "success" as const,
};

const clinicalTone = {
  Thường: "neutral" as const,
  "Ưu tiên": "warning" as const,
  "Cấp cứu": "critical" as const,
};

export default function WorklistPage() {
  const counts = {
    all: worklistCases.length,
    high: worklistCases.filter(
      (c) => c.aiPriority === "High" || c.clinicalPriority === "Ưu tiên",
    ).length,
    ai: worklistCases.filter((c) => c.aiPriority === "Critical").length,
    wait: worklistCases.filter((c) => c.status === "Chờ đọc").length,
    reading: worklistCases.filter((c) => c.status === "Đang đọc").length,
    done: worklistCases.filter((c) => c.status === "Đã hoàn tất").length,
  };

  return (
    <div>
      <PageHeader
        title="Worklist đọc phim"
        description="Danh sách các ca chờ bác sĩ đọc và xác nhận kết quả. Clinical Priority và AI Priority hiển thị riêng."
        actions={
          <Button href="/viewer/XR20261011-009" size="sm">
            Mở ca Critical mới nhất
          </Button>
        }
      />

      <div className="mb-4 grid gap-3 sm:grid-cols-4">
        {[
          ["Chờ đọc", counts.wait],
          ["AI Critical", counts.ai],
          ["Đang đọc", counts.reading],
          ["Hoàn tất (mẫu)", counts.done],
        ].map(([l, v]) => (
          <Card key={l as string} className="!p-4">
            <p className="text-xs text-text-secondary">{l}</p>
            <p className="mt-1 text-[28px] font-semibold">{v}</p>
          </Card>
        ))}
      </div>

      <Tabs
        active="all"
        items={[
          { id: "all", label: "Tất cả", count: counts.all },
          { id: "high", label: "Ưu tiên cao", count: counts.high },
          { id: "ai", label: "AI Critical", count: counts.ai },
          { id: "wait", label: "Chờ đọc", count: counts.wait },
          { id: "reading", label: "Đang đọc", count: counts.reading },
          { id: "done", label: "Đã hoàn tất", count: counts.done },
        ]}
      />
      <div className="mt-4">
        <FilterBar searchPlaceholder="Mã ca, bệnh nhân, Study...">
          <FilterSelect label="Cơ sở" options={["BV Đa khoa TW", "Cơ sở 1", "Cơ sở 2"]} />
          <FilterSelect label="Clinical Priority" options={["Thường", "Ưu tiên", "Cấp cứu"]} />
          <FilterSelect label="AI Priority" options={["Normal", "High", "Critical"]} />
          <FilterSelect label="Bác sĩ được gán" options={["BS. Nguyễn Văn A", "BS. Trần Minh", "Chưa gán"]} />
        </FilterBar>
      </div>
      <DataTable
        minWidth="1300px"
        headers={[
          "Ảnh",
          "Ưu tiên AI",
          "Mã ca",
          "Bệnh nhân",
          "Tuổi",
          "GT",
          "Cơ sở",
          "Loại chụp",
          "Kết quả AI",
          "Model",
          "Clinical Priority",
          "AI Priority",
          "Được gán",
          "Chờ",
          "Trạng thái",
          "Thao tác",
        ]}
      >
        {worklistCases.map((c) => (
          <Tr
            key={c.id}
            className={
              c.aiPriority === "Critical"
                ? "bg-red-50/40"
                : c.aiPriority === "High"
                  ? "bg-amber-50/30"
                  : undefined
            }
          >
            <Td>
              <Link
                href={`/viewer/${c.id}`}
                className="relative inline-block h-12 w-10 overflow-hidden rounded border border-border bg-viewer-bg"
              >
                <Image
                  src={getCaseThumbnail(c.id)}
                  alt={`CXR ${c.id}`}
                  fill
                  className="object-cover object-center"
                  sizes="40px"
                />
              </Link>
            </Td>
            <Td>
              <Badge tone={aiPTone[c.aiPriority]}>
                {c.aiPriority === "Critical"
                  ? "Khẩn cấp"
                  : c.aiPriority === "High"
                    ? "Cao"
                    : "Thường"}
              </Badge>
            </Td>
            <Td className="font-medium">{c.id}</Td>
            <Td>
              <Link href={`/dashboard/benh-nhan/${c.patientId}`} className="hover:text-primary">
                {c.patient}
              </Link>
            </Td>
            <Td>{c.age}</Td>
            <Td>{c.gender}</Td>
            <Td>{c.facility}</Td>
            <Td>{c.exam}</Td>
            <Td>
              <span className="text-ai">
                {c.aiFinding} {c.aiConfidence}%
              </span>
            </Td>
            <Td className="text-xs text-text-secondary">{c.modelVersion}</Td>
            <Td>
              <Badge tone={clinicalTone[c.clinicalPriority]}>{c.clinicalPriority}</Badge>
            </Td>
            <Td>
              <Badge tone={aiPTone[c.aiPriority]}>{c.aiPriority}</Badge>
            </Td>
            <Td className="text-xs">{c.assignedTo}</Td>
            <Td>{c.wait}</Td>
            <Td>
              <Badge tone="neutral">{c.status}</Badge>
            </Td>
            <Td>
              <Button href={`/viewer/${c.id}`} size="sm">
                Mở ca
              </Button>
            </Td>
          </Tr>
        ))}
      </DataTable>
      <p className="mt-3 text-xs text-text-secondary">
        AI hỗ trợ phân tích. Bác sĩ quyết định kết luận cuối cùng. Heatmap mặc định OFF trong
        Viewer. ·{" "}
        <Link href="/dashboard/studies" className="text-primary">
          Xem Studies
        </Link>
      </p>
    </div>
  );
}
