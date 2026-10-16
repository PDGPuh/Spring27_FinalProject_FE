/** Chart-ready series for clinical dashboards (demo). */

export const hourlyCasesChart = [
  { hour: "07", Normal: 4, High: 1, Critical: 0, total: 5 },
  { hour: "08", Normal: 8, High: 2, Critical: 1, total: 11 },
  { hour: "09", Normal: 12, High: 3, Critical: 1, total: 16 },
  { hour: "10", Normal: 10, High: 4, Critical: 2, total: 16 },
  { hour: "11", Normal: 9, High: 2, Critical: 0, total: 11 },
  { hour: "12", Normal: 5, High: 1, Critical: 0, total: 6 },
  { hour: "13", Normal: 7, High: 2, Critical: 1, total: 10 },
  { hour: "14", Normal: 11, High: 3, Critical: 1, total: 15 },
  { hour: "15", Normal: 13, High: 4, Critical: 2, total: 19 },
  { hour: "16", Normal: 8, High: 2, Critical: 0, total: 10 },
];

export const weeklyVolume = [
  { day: "T2", cases: 132, completed: 118, waiting: 14 },
  { day: "T3", cases: 141, completed: 125, waiting: 16 },
  { day: "T4", cases: 128, completed: 119, waiting: 9 },
  { day: "T5", cases: 156, completed: 138, waiting: 18 },
  { day: "T6", cases: 148, completed: 113, waiting: 28 },
  { day: "T7", cases: 96, completed: 88, waiting: 8 },
  { day: "CN", cases: 64, completed: 58, waiting: 6 },
];

export const tatTrend = [
  { day: "T2", tat: 31 },
  { day: "T3", tat: 29 },
  { day: "T4", tat: 27 },
  { day: "T5", tat: 28 },
  { day: "T6", tat: 26 },
  { day: "T7", tat: 24 },
  { day: "CN", tat: 22 },
];

export const aiDoctorAgreement = [
  { name: "Đồng thuận", value: 92, color: "#0d71ba" },
  { name: "Chỉnh sửa", value: 6, color: "#d97706" },
  { name: "Bác bỏ", value: 2, color: "#dc2626" },
];

export const worklistStatusMix = [
  { name: "Chờ đọc", value: 18, color: "#0d71ba" },
  { name: "AI Critical", value: 5, color: "#dc2626" },
  { name: "Đang đọc", value: 2, color: "#0096d1" },
  { name: "Hoàn tất", value: 3, color: "#16a34a" },
];

export const pathologyMix = [
  { name: "Bình thường", value: 42 },
  { name: "Viêm phổi", value: 28 },
  { name: "Tràn dịch", value: 12 },
  { name: "Tim to", value: 9 },
  { name: "Khác", value: 9 },
];

export const facilityBars = [
  { name: "BV Đa khoa TW", cases: 86, waiting: 16, critical: 4, tat: 24, utilization: 88 },
  { name: "Cơ sở 1", cases: 39, waiting: 8, critical: 2, tat: 29, utilization: 72 },
  { name: "Cơ sở 2", cases: 23, waiting: 4, critical: 1, tat: 31, utilization: 61 },
];

export const machineUtilization = [
  { name: "XQ-01", load: 86, status: "Online" },
  { name: "XQ-02", load: 74, status: "Online" },
  { name: "XQ-03", load: 0, status: "Bảo trì" },
];

export const researchMetricsSpark = [
  { label: "AUROC", value: 0.942, series: [0.88, 0.9, 0.91, 0.925, 0.931, 0.938, 0.942] },
  { label: "F1", value: 0.879, series: [0.81, 0.83, 0.85, 0.86, 0.87, 0.875, 0.879] },
  { label: "Dice", value: 0.831, series: [0.74, 0.76, 0.78, 0.8, 0.81, 0.825, 0.831] },
];

export const queueFlow = [
  { stage: "Chờ đến", count: 4 },
  { stage: "Check-in", count: 1 },
  { stage: "Đang chụp", count: 1 },
  { stage: "Upload/AI", count: 3 },
  { stage: "Hoàn thành", count: 22 },
];

/** Tiny sparkline points for KPI cards */
export const kpiSparks: Record<string, number[]> = {
  wait: [8, 9, 11, 10, 12, 11, 11],
  priority: [2, 3, 2, 4, 3, 2, 3],
  cases: [18, 22, 20, 24, 26, 23, 28],
  done: [90, 95, 100, 105, 108, 110, 113],
  time: [34, 32, 30, 29, 28, 27, 26],
};
