"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/branding/Logo";
import { Button } from "@/components/ui/Button";

const nav = [
  { href: "#trang-chu", label: "Trang chủ" },
  { href: "#giai-phap", label: "Giải pháp" },
  { href: "#quy-trinh", label: "Quy trình" },
  { href: "#ai-xai", label: "AI & XAI" },
  { href: "#nghien-cuu", label: "Nghiên cứu" },
  { href: "#bao-mat", label: "Bảo mật" },
  { href: "#lien-he", label: "Liên hệ" },
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
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-border/80 bg-white/90 shadow-[0_8px_30px_-20px_rgba(15,42,56,0.35)] backdrop-blur-md"
          : "border-transparent bg-white/70 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-6 px-6">
        <Logo />
        <nav className="hidden items-center gap-5 lg:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative text-[13px] text-text-secondary transition-colors hover:text-text after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all hover:after:w-full"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button href="/dang-nhap" variant="ghost" size="sm" className="hidden sm:inline-flex">
            Đăng nhập
          </Button>
          <Button href="/dang-nhap" size="sm">
            Yêu cầu Demo
          </Button>
        </div>
      </div>
    </header>
  );
}
