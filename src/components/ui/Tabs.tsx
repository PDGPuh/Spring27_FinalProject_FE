import Link from "next/link";

export function Tabs({
  items,
  active,
}: {
  items: { id: string; label: string; count?: number; href?: string }[];
  active: string;
}) {
  return (
    <div className="flex flex-wrap gap-1 border-b border-border">
      {items.map((item) => {
        const isActive = item.id === active;
        const className = `inline-flex items-center gap-2 border-b-2 px-3 py-2.5 text-sm transition-colors ${
          isActive
            ? "border-primary font-medium text-primary"
            : "border-transparent text-text-secondary hover:text-text"
        }`;
        const content = (
          <>
            {item.label}
            {typeof item.count === "number" && (
              <span
                className={`rounded-md px-1.5 py-0.5 text-xs ${
                  isActive ? "bg-primary-soft text-primary-dark" : "bg-slate-100"
                }`}
              >
                {item.count}
              </span>
            )}
          </>
        );
        if (item.href) {
          return (
            <Link key={item.id} href={item.href} className={className}>
              {content}
            </Link>
          );
        }
        return (
          <button key={item.id} type="button" className={className}>
            {content}
          </button>
        );
      })}
    </div>
  );
}
