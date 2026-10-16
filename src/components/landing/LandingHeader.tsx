"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown, Search, UserRound } from "lucide-react";
import { Logo } from "@/components/branding/Logo";

const audiences = [
  { label: "Dành cho Bác sĩ & Nhân viên Y tế", href: "#trang-chu", active: true },
  { label: "Cổng Kết quả Bệnh nhân", href: "/portal", active: false },
  { label: "Không gian Nghiên cứu AI", href: "#nghien-cuu", active: false },
];

const nav = [
  { href: "#trang-chu", label: "Trang chủ", hasSub: false },
  { href: "#quy-trinh", label: "Quy trình", hasSub: true },
  { href: "#giai-phap", label: "Tính năng", hasSub: true },
  { href: "#ai-xai", label: "AI & Explainable AI", hasSub: true },
  { href: "#nghien-cuu", label: "Nghiên cứu", hasSub: false },
  { href: "#bao-mat", label: "Bảo mật", hasSub: false },
];

export function LandingHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Tier 1: Top Utility Bar */}
      <div className="relative z-[51] h-[44px] bg-primary-500 text-white">
        <div className="mx-auto flex h-full max-w-[1280px] items-center justify-between px-4 sm:px-6">
          <div className="flex h-full items-center gap-6 overflow-x-auto whitespace-nowrap sm:gap-8">
            {audiences.map((aud) => (
              <Link
                key={aud.label}
                href={aud.href}
                className={`relative flex h-full shrink-0 items-center text-[13.5px] transition-colors hover:text-primary-100 before:absolute before:bottom-0 before:left-0 before:h-[3px] before:bg-primary-200 before:transition-all ${
                  aud.active
                    ? "font-bold text-white before:w-full"
                    : "font-medium text-white/90 before:w-0 hover:before:w-full"
                }`}
              >
                {aud.label}
              </Link>
            ))}
          </div>

          <div className="flex h-full shrink-0 items-center text-[13.5px] font-medium whitespace-nowrap">
            <div className="hidden items-center gap-4 pr-4 md:flex">
              <Link
                href="/dashboard/worklist?role=cdha"
                className="transition-colors hover:text-primary-100"
              >
                Worklist Demo
              </Link>
              <span className="text-white/40">|</span>
              <Link
                href="/viewer/XR20261011-001"
                className="transition-colors hover:text-primary-100"
              >
                Radiology Viewer
              </Link>
              <span className="text-white/40">|</span>
              <Link
                href="/portal"
                className="transition-colors hover:text-primary-100"
              >
                Portal Bệnh nhân
              </Link>
            </div>

            <Link
              href="/dang-nhap"
              aria-label="Tài khoản đăng nhập"
              className="flex h-[44px] w-[42px] items-center justify-center transition-colors duration-150 hover:bg-primary-700"
            >
              <UserRound className="size-4" />
            </Link>
            <Link
              href="/dashboard/worklist?role=cdha"
              aria-label="Tìm kiếm"
              className="flex size-[44px] items-center justify-center bg-primary-400 transition-colors duration-150 hover:bg-primary-700"
            >
              <Search className="size-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Tier 2: Main White Navigation Bar */}
      <div
        className={`border-b border-gray-100 bg-white transition-shadow duration-150 ${
          scrolled ? "shadow-md" : "shadow-xs"
        }`}
      >
        <div className="mx-auto flex h-[78px] max-w-[1280px] items-center justify-between gap-6 px-4 sm:px-6">
          <Logo href="/" />

          <nav className="hidden h-full items-center gap-6 lg:flex xl:gap-7">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex h-full shrink-0 items-center gap-1 whitespace-nowrap text-[15.5px] font-semibold text-primary-600 transition-colors duration-150 hover:text-primary-700"
              >
                <span>{item.label}</span>
                {item.hasSub && <ChevronDown className="size-4 opacity-70" />}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2.5 whitespace-nowrap">
            <Link
              href="/dang-nhap"
              className="inline-flex h-[42px] shrink-0 items-center justify-center whitespace-nowrap rounded-[8px] bg-primary-600 px-5 text-[14.5px] font-bold text-white shadow-xs transition-colors hover:bg-primary-700"
            >
              Đăng nhập hệ thống
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
