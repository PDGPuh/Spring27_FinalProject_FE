import type { ReactNode } from "react";

export function DataTable({
  headers,
  children,
  minWidth = "900px",
}: {
  headers: string[];
  children: ReactNode;
  minWidth?: string;
}) {
  return (
    <div className="overflow-hidden rounded-[12px] border border-border bg-card">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-[13px]" style={{ minWidth }}>
          <thead className="sticky top-0 z-[1] bg-slate-50 text-text-secondary">
            <tr>
              {headers.map((h) => (
                <th key={h} className="whitespace-nowrap px-4 py-3 font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">{children}</tbody>
        </table>
      </div>
    </div>
  );
}

export function Td({
  children,
  className = "",
}: {
  children?: ReactNode;
  className?: string;
}) {
  return <td className={`px-4 py-3 align-middle ${className}`}>{children}</td>;
}

export function Tr({
  children,
  className = "",
  href,
}: {
  children: ReactNode;
  className?: string;
  href?: string;
}) {
  return (
    <tr
      className={`transition-colors hover:bg-slate-50/80 ${className}`}
      data-href={href}
    >
      {children}
    </tr>
  );
}
