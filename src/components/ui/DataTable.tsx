import type { HTMLAttributes, ReactNode, TdHTMLAttributes } from "react";

export function DataTable({
  headers,
  children,
  minWidth = "860px",
}: {
  headers: string[];
  children: ReactNode;
  minWidth?: string;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-primary-100 bg-white overview-wrapper-shadow">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-[15px]" style={{ minWidth }}>
          <thead className="sticky top-0 z-[1] border-b-2 border-primary-100 bg-primary-75/90 text-primary-950">
            <tr>
              {headers.map((h) => (
                <th
                  key={h}
                  className="whitespace-nowrap px-6 py-4.5 text-[13px] font-extrabold uppercase tracking-[0.04em] text-primary-900"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-primary-100/80">{children}</tbody>
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
    <td
      className={`px-6 py-4.5 text-[15px] align-middle tabular-nums ${className}`}
      {...rest}
    >
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
