import type { HTMLAttributes, ReactNode, TdHTMLAttributes } from "react";

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
    <div className="overflow-hidden rounded-xl border border-primary-100 bg-card overview-wrapper-shadow">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-[13px]" style={{ minWidth }}>
          <thead className="sticky top-0 z-[1] border-b border-primary-100 bg-primary-75 text-primary-800">
            <tr>
              {headers.map((h) => (
                <th
                  key={h}
                  className="whitespace-nowrap px-4 py-3.5 text-xs font-bold uppercase tracking-[0.03em] text-primary-700"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-primary-50">{children}</tbody>
        </table>
      </div>
    </div>
  );
}

export function Td({
  children,
  className = "",
  ...rest
}: TdHTMLAttributes<HTMLTableCellElement> & {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <td className={`px-4 py-3.5 align-middle tabular-nums ${className}`} {...rest}>
      {children}
    </td>
  );
}

export function Tr({
  children,
  className = "",
  href,
  ...rest
}: HTMLAttributes<HTMLTableRowElement> & {
  children: ReactNode;
  className?: string;
  href?: string;
}) {
  return (
    <tr
      className={`transition-colors duration-150 hover:bg-primary-50/70 ${className}`}
      data-href={href}
      {...rest}
    >
      {children}
    </tr>
  );
}
