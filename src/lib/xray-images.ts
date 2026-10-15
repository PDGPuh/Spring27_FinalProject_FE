/** Compatibility re-exports — prefer `@/lib/cxr-images`. */
export {
  DEMO_CXR,
  getCaseImaging,
  getCaseThumbnail,
  type CaseImaging,
  type CxrSeries,
  type HeatmapRegion,
} from "@/lib/cxr-images";

export { getCaseImaging as getCaseXray } from "@/lib/cxr-images";

export const heroXraySrc = "/images/xray/cxr-pneumonia-pa.jpg";
export const landingAiXraySrc = "/images/xray/cxr-influenza-pa.jpg";
