export type DemoRoleId =
  | "cdha"
  | "chidinh"
  | "ktv"
  | "tiepdon"
  | "researcher"
  | "facility"
  | "admin"
  | "patient";

export type DemoRole = {
  id: DemoRoleId;
  label: string;
  shortLabel: string;
  name: string;
  initials: string;
  email: string;
  home: string;
  description: string;
  /**
   * If set, only these href prefixes appear in the sidebar (plus always-visible footer links).
   * If null, use navGroups filtering instead.
   */
  allowedHrefs: string[] | null;
  /** Sidebar section labels this role can see when allowedHrefs is null; "all" = everything */
  navGroups: string[] | "all";
};

export const DEMO_ROLES: DemoRole[] = [
  {
    id: "cdha",
    label: "Bác sĩ CĐHA",
    shortLabel: "CĐHA",
    name: "BS. Nguyễn Văn A",
    initials: "NA",
    email: "a.nguyen@benhvien.vn",
    home: "/dashboard/worklist",
    description: "Worklist-first · Viewer sâu · Báo cáo Clinical Sign-off",
    allowedHrefs: [
      "/dashboard",
      "/dashboard/worklist",
      "/dashboard/studies",
      "/dashboard/bao-cao",
      "/dashboard/benh-nhan",
      "/dashboard/thong-bao",
      "/dashboard/ho-so",
    ],
    navGroups: "all",
  },
  {
    id: "chidinh",
    label: "Bác sĩ chỉ định",
    shortLabel: "Chỉ định",
    name: "BS. Lê Thu Hà",
    initials: "LH",
    email: "ha.le@benhvien.vn",
    home: "/dashboard/benh-nhan",
    description: "Bệnh nhân · Chỉ định · Theo dõi báo cáo đã ký",
    allowedHrefs: [
      "/dashboard",
      "/dashboard/benh-nhan",
      "/dashboard/chi-dinh",
      "/dashboard/lich-chup",
      "/dashboard/dat-lich",
      "/dashboard/bao-cao",
      "/dashboard/thong-bao",
      "/dashboard/ho-so",
    ],
    navGroups: "all",
  },
  {
    id: "ktv",
    label: "Kỹ thuật viên",
    shortLabel: "KTV",
    name: "KTV. Phạm Đức",
    initials: "PD",
    email: "duc.pham@benhvien.vn",
    home: "/dashboard/hang-doi",
    description: "Hàng đợi · Upload DICOM · Studies",
    allowedHrefs: [
      "/dashboard",
      "/dashboard/hang-doi",
      "/dashboard/lich-chup",
      "/dashboard/studies",
      "/dashboard/benh-nhan",
      "/dashboard/thong-bao",
      "/dashboard/ho-so",
    ],
    navGroups: "all",
  },
  {
    id: "tiepdon",
    label: "Tiếp đón",
    shortLabel: "Tiếp đón",
    name: "NV. Trần Mai",
    initials: "TM",
    email: "mai.tran.nv@benhvien.vn",
    home: "/dashboard/hang-doi",
    description: "Tiếp nhận · Đặt lịch · Check-in",
    allowedHrefs: [
      "/dashboard",
      "/dashboard/benh-nhan",
      "/dashboard/chi-dinh",
      "/dashboard/lich-chup",
      "/dashboard/dat-lich",
      "/dashboard/hang-doi",
      "/dashboard/thong-bao",
      "/dashboard/ho-so",
    ],
    navGroups: "all",
  },
  {
    id: "researcher",
    label: "Researcher",
    shortLabel: "NC",
    name: "TS. Hoàng An",
    initials: "HA",
    email: "an.hoang@benhvien.vn",
    home: "/dashboard/dataset",
    description: "Dataset de-identify · Đánh giá AI/XAI · Model registry",
    allowedHrefs: [
      "/dashboard",
      "/dashboard/dataset",
      "/dashboard/danh-gia-ai",
      "/dashboard/danh-gia-xai",
      "/dashboard/mo-hinh",
      "/dashboard/thong-bao",
      "/dashboard/ho-so",
    ],
    navGroups: "all",
  },
  {
    id: "facility",
    label: "Facility Manager",
    shortLabel: "CS",
    name: "CN. Võ Minh",
    initials: "VM",
    email: "minh.vo@benhvien.vn",
    home: "/dashboard/co-so",
    description: "Cơ sở · Máy móc · Workload · Nhân sự",
    allowedHrefs: [
      "/dashboard",
      "/dashboard/co-so",
      "/dashboard/nguoi-dung",
      "/dashboard/nhat-ky",
      "/dashboard/tich-hop",
      "/dashboard/cai-dat",
      "/dashboard/thong-bao",
      "/dashboard/ho-so",
      "/dashboard/trang-thai",
    ],
    navGroups: "all",
  },
  {
    id: "admin",
    label: "Quản trị hệ thống",
    shortLabel: "Admin",
    name: "Admin. System",
    initials: "AS",
    email: "admin@benhvien.vn",
    home: "/dashboard",
    description: "Toàn quyền cấu hình · RBAC · Audit · Tích hợp",
    allowedHrefs: null,
    navGroups: "all",
  },
  {
    id: "patient",
    label: "Bệnh nhân (Portal)",
    shortLabel: "BN",
    name: "Nguyễn Văn Hùng",
    initials: "NH",
    email: "hung.nguyen@email.vn",
    home: "/portal",
    description: "Portal — chỉ báo cáo đã Clinical Sign-off, không AI thô",
    allowedHrefs: [],
    navGroups: [],
  },
];

export const DEFAULT_ROLE_ID: DemoRoleId = "cdha";
export const ROLE_STORAGE_KEY = "xquang-demo-role";

export function getRole(id: string | null | undefined): DemoRole {
  return DEMO_ROLES.find((r) => r.id === id) ?? DEMO_ROLES[0];
}

export function parseRoleParam(value: string | null | undefined): DemoRoleId {
  if (value && DEMO_ROLES.some((r) => r.id === value)) {
    return value as DemoRoleId;
  }
  return DEFAULT_ROLE_ID;
}

function hrefMatches(allowed: string, href: string): boolean {
  if (allowed === "/dashboard") return href === "/dashboard";
  return href === allowed || href.startsWith(allowed + "/");
}

/** Whether a nav href is visible for the role */
export function canAccessHref(role: DemoRole, href: string): boolean {
  if (role.id === "patient") return false;
  if (role.allowedHrefs === null) return true;
  return role.allowedHrefs.some((a) => hrefMatches(a, href));
}
