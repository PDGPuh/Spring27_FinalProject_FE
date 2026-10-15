/** Demo chest X-ray assets from Wikimedia Commons (see public/images/xray/ATTRIBUTION.md). */

export type HeatmapRegion = {
  top: string;
  left: string;
  width: string;
  height: string;
};

export type CxrSeries = {
  id: string;
  label: string;
  src: string;
  orientation: "PA" | "Lat" | "AP";
};

export type CaseImaging = {
  primary: string;
  series: CxrSeries[];
  prior?: string;
  heatmap: HeatmapRegion;
};

const BASE = "/images/xray";

export const DEMO_CXR = {
  pneumonia: `${BASE}/cxr-pneumonia-pa.jpg`,
  normal: `${BASE}/cxr-normal-pa.jpg`,
  normalLat: `${BASE}/cxr-normal-lat.jpg`,
  normalAlt: `${BASE}/cxr-normal-pa-2.jpg`,
  effusion: `${BASE}/cxr-pleural-effusion.jpg`,
  influenza: `${BASE}/cxr-influenza-pa.jpg`,
  chf: `${BASE}/cxr-chf-pa.jpg`,
  chfLat: `${BASE}/cxr-chf-lat.jpg`,
  pneumothorax: `${BASE}/cxr-pneumothorax.jpg`,
} as const;

const CASE_MAP: Record<string, CaseImaging> = {
  "XR20261011-001": {
    primary: DEMO_CXR.pneumonia,
    series: [
      { id: "pa", label: "Chest X-ray PA", src: DEMO_CXR.pneumonia, orientation: "PA" },
      { id: "lat", label: "Chest X-ray Lateral", src: DEMO_CXR.normalLat, orientation: "Lat" },
    ],
    prior: DEMO_CXR.normalAlt,
    heatmap: { top: "30%", left: "18%", width: "28%", height: "34%" },
  },
  "XR20261011-002": {
    primary: DEMO_CXR.effusion,
    series: [
      { id: "pa", label: "Chest X-ray PA", src: DEMO_CXR.effusion, orientation: "PA" },
    ],
    prior: DEMO_CXR.normal,
    heatmap: { top: "50%", left: "52%", width: "30%", height: "34%" },
  },
  "XR20261011-003": {
    primary: DEMO_CXR.normal,
    series: [
      { id: "pa", label: "Chest X-ray PA", src: DEMO_CXR.normal, orientation: "PA" },
      { id: "lat", label: "Chest X-ray Lateral", src: DEMO_CXR.normalLat, orientation: "Lat" },
    ],
    prior: DEMO_CXR.normalAlt,
    heatmap: { top: "36%", left: "38%", width: "18%", height: "18%" },
  },
  "XR20261011-004": {
    primary: DEMO_CXR.influenza,
    series: [
      { id: "pa", label: "Chest X-ray PA", src: DEMO_CXR.influenza, orientation: "PA" },
    ],
    prior: DEMO_CXR.normal,
    heatmap: { top: "28%", left: "46%", width: "30%", height: "36%" },
  },
  "XR20261011-005": {
    primary: DEMO_CXR.chf,
    series: [
      { id: "pa", label: "Chest X-ray PA", src: DEMO_CXR.chf, orientation: "PA" },
      { id: "lat", label: "Chest X-ray Lateral", src: DEMO_CXR.chfLat, orientation: "Lat" },
    ],
    prior: DEMO_CXR.normalAlt,
    heatmap: { top: "36%", left: "32%", width: "34%", height: "30%" },
  },
  "XR20261011-006": {
    primary: DEMO_CXR.pneumothorax,
    series: [
      { id: "pa", label: "Chest X-ray PA", src: DEMO_CXR.pneumothorax, orientation: "PA" },
    ],
    prior: DEMO_CXR.normal,
    heatmap: { top: "20%", left: "56%", width: "26%", height: "42%" },
  },
  "XR20261011-007": {
    primary: DEMO_CXR.pneumonia,
    series: [
      { id: "pa", label: "Chest X-ray PA", src: DEMO_CXR.pneumonia, orientation: "PA" },
    ],
    prior: DEMO_CXR.normal,
    heatmap: { top: "32%", left: "20%", width: "26%", height: "32%" },
  },
  "XR20261011-008": {
    primary: DEMO_CXR.normalAlt,
    series: [
      { id: "pa", label: "Chest X-ray PA", src: DEMO_CXR.normalAlt, orientation: "PA" },
    ],
    prior: DEMO_CXR.normal,
    heatmap: { top: "40%", left: "40%", width: "16%", height: "16%" },
  },
  "XR20261011-009": {
    primary: DEMO_CXR.pneumothorax,
    series: [
      { id: "pa", label: "Chest X-ray PA", src: DEMO_CXR.pneumothorax, orientation: "PA" },
      { id: "lat", label: "Chest X-ray Lateral", src: DEMO_CXR.normalLat, orientation: "Lat" },
    ],
    prior: DEMO_CXR.normalAlt,
    heatmap: { top: "18%", left: "58%", width: "28%", height: "44%" },
  },
  "XR20261011-010": {
    primary: DEMO_CXR.chf,
    series: [
      { id: "pa", label: "Chest X-ray PA", src: DEMO_CXR.chf, orientation: "PA" },
    ],
    prior: DEMO_CXR.normal,
    heatmap: { top: "34%", left: "30%", width: "36%", height: "32%" },
  },
  "XR20261011-011": {
    primary: DEMO_CXR.normal,
    series: [
      { id: "pa", label: "Chest X-ray PA", src: DEMO_CXR.normal, orientation: "PA" },
    ],
    prior: DEMO_CXR.normalAlt,
    heatmap: { top: "38%", left: "40%", width: "14%", height: "14%" },
  },
  "XR20261011-012": {
    primary: DEMO_CXR.influenza,
    series: [
      { id: "pa", label: "Chest X-ray PA", src: DEMO_CXR.influenza, orientation: "PA" },
    ],
    prior: DEMO_CXR.normal,
    heatmap: { top: "30%", left: "44%", width: "28%", height: "34%" },
  },
  "XR20261011-013": {
    primary: DEMO_CXR.effusion,
    series: [
      { id: "pa", label: "Chest X-ray PA", src: DEMO_CXR.effusion, orientation: "PA" },
    ],
    prior: DEMO_CXR.normal,
    heatmap: { top: "52%", left: "50%", width: "28%", height: "30%" },
  },
  "XR20261011-014": {
    primary: DEMO_CXR.normalAlt,
    series: [
      { id: "pa", label: "Chest X-ray PA", src: DEMO_CXR.normalAlt, orientation: "PA" },
    ],
    prior: DEMO_CXR.normal,
    heatmap: { top: "40%", left: "40%", width: "14%", height: "14%" },
  },
  "XR20261011-015": {
    primary: DEMO_CXR.normal,
    series: [
      { id: "pa", label: "Chest X-ray PA", src: DEMO_CXR.normal, orientation: "PA" },
    ],
    prior: DEMO_CXR.normalAlt,
    heatmap: { top: "40%", left: "40%", width: "14%", height: "14%" },
  },
  "XR20261011-016": {
    primary: DEMO_CXR.pneumonia,
    series: [
      { id: "pa", label: "Chest X-ray PA", src: DEMO_CXR.pneumonia, orientation: "PA" },
    ],
    prior: DEMO_CXR.normal,
    heatmap: { top: "34%", left: "22%", width: "26%", height: "30%" },
  },
};

const FALLBACK = CASE_MAP["XR20261011-001"];

export function getCaseImaging(caseId: string): CaseImaging {
  return CASE_MAP[caseId] ?? FALLBACK;
}

export function getCaseThumbnail(caseId: string): string {
  return getCaseImaging(caseId).primary;
}
