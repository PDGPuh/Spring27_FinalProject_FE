import Image from "next/image";
import type { HeatmapRegion } from "@/lib/cxr-images";

type Props = {
  src: string;
  alt: string;
  showHeatmap?: boolean;
  opacity?: number;
  heatmap?: HeatmapRegion;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

export function ChestXrayFrame({
  src,
  alt,
  showHeatmap = false,
  opacity = 55,
  heatmap = { top: "28%", left: "22%", width: "24%", height: "36%" },
  className = "",
  sizes = "(max-width: 768px) 90vw, 720px",
  priority = false,
}: Props) {
  return (
    <div className={`relative overflow-hidden bg-black ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-contain"
      />
      {showHeatmap && (
        <div
          className="pointer-events-none absolute rounded-full blur-[1px] mix-blend-screen"
          style={{
            top: heatmap.top,
            left: heatmap.left,
            width: heatmap.width,
            height: heatmap.height,
            opacity: opacity / 100,
            background:
              "radial-gradient(circle, rgba(220,38,38,0.85) 0%, rgba(249,115,22,0.55) 28%, rgba(234,179,8,0.35) 48%, rgba(34,211,238,0.25) 68%, transparent 78%)",
          }}
        />
      )}
    </div>
  );
}
