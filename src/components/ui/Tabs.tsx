"use client";

import {
  SegmentedTabsParticle,
  type SegmentedTabItem,
} from "@/components/ui/particles/p-segmented-tabs";

export function Tabs({
  items,
  active,
  onChange,
  className = "",
}: {
  items: SegmentedTabItem[];
  active: string;
  onChange?: (id: string) => void;
  className?: string;
}) {
  return (
    <SegmentedTabsParticle
      items={items}
      active={active}
      onChange={onChange}
      className={className}
    />
  );
}
