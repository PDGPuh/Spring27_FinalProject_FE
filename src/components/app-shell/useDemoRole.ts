"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  DEFAULT_ROLE_ID,
  DEMO_ROLES,
  ROLE_STORAGE_KEY,
  getRole,
  parseRoleParam,
  type DemoRole,
  type DemoRoleId,
} from "@/lib/roles";

export function useDemoRole() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [roleId, setRoleId] = useState<DemoRoleId>(DEFAULT_ROLE_ID);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const fromQuery = searchParams.get("role");
    if (fromQuery) {
      const parsed = parseRoleParam(fromQuery);
      setRoleId(parsed);
      try {
        localStorage.setItem(ROLE_STORAGE_KEY, parsed);
      } catch {
        /* ignore */
      }
      setReady(true);
      return;
    }
    try {
      const stored = localStorage.getItem(ROLE_STORAGE_KEY);
      setRoleId(parseRoleParam(stored));
    } catch {
      setRoleId(DEFAULT_ROLE_ID);
    }
    setReady(true);
  }, [searchParams]);

  const role: DemoRole = getRole(roleId);

  const setRole = useCallback(
    (next: DemoRoleId) => {
      setRoleId(next);
      try {
        localStorage.setItem(ROLE_STORAGE_KEY, next);
      } catch {
        /* ignore */
      }
      const profile = getRole(next);
      if (profile.id === "patient") {
        router.push("/portal");
        return;
      }
      const params = new URLSearchParams(searchParams.toString());
      params.set("role", next);
      const target =
        pathname.startsWith("/dashboard") || pathname.startsWith("/viewer")
          ? `${profile.home}?role=${next}`
          : `${pathname}?${params.toString()}`;
      router.push(target);
    },
    [pathname, router, searchParams],
  );

  return { role, roleId, setRole, ready, roles: DEMO_ROLES };
}
