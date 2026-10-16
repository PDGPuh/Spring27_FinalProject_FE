import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BorderBeam } from "@/components/magicui/BorderBeam";

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  className?: string;
}

interface BentoCardProps extends ComponentPropsWithoutRef<"article"> {
  name: string;
  className?: string;
  background?: ReactNode;
  Icon: ElementType;
  description: string;
  href: string;
  cta: string;
  badge?: string;
  beam?: boolean;
}

export function BentoGrid({ children, className = "", ...props }: BentoGridProps) {
  return (
    <div
      className={`grid w-full auto-rows-[20.5rem] grid-cols-1 gap-6 md:grid-cols-3 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function BentoCard({
  name,
  className = "",
  background,
  Icon,
  description,
  href,
  cta,
  badge,
  beam = false,
  ...props
}: BentoCardProps) {
  return (
    <article
      className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-primary-100 border-b-[6px] border-b-primary-600 bg-card p-7 overview-wrapper-shadow transition-all duration-300 hover:-translate-y-1 hover:border-primary-400 hover:shadow-main-blue ${className}`}
      {...props}
    >
      {beam && <BorderBeam size={260} duration={11} colorFrom="#0096d1" colorTo="#0d71ba" />}

      {background && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {background}
        </div>
      )}

      <div className="relative z-10 flex items-start justify-between gap-3">
        <div className="flex size-16 items-center justify-center rounded-full bg-primary-50 text-primary-600 shadow-xs transition-all duration-300 group-hover:scale-105 group-hover:bg-primary-600 group-hover:text-white">
          <Icon className="size-7" />
        </div>
        {badge && (
          <span className="inline-flex items-center rounded-full border border-primary-200/80 bg-primary-75 px-3.5 py-1 text-[13px] font-bold text-primary-700">
            {badge}
          </span>
        )}
      </div>

      <div className="relative z-10 mt-auto pt-4 transition-transform duration-300 group-hover:-translate-y-1">
        <h3 className="text-[20px] font-bold leading-snug text-primary-900 transition-colors group-hover:text-primary-600">
          {name}
        </h3>
        <p className="mt-2 line-clamp-3 text-[15px] leading-relaxed text-text-secondary">
          {description}
        </p>
        <div className="mt-5 flex items-center">
          <Link
            href={href}
            className="inline-flex items-center gap-2 rounded-lg border border-primary-600/30 bg-primary-50/80 px-4 py-2 text-[14px] font-bold text-primary-600 transition-all duration-200 group-hover:border-primary-600 group-hover:bg-primary-600 group-hover:text-white"
          >
            {cta}
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
