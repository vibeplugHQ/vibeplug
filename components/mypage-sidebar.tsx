"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// 마이페이지 구역 공통 사이드 메뉴 항목
const MENU = [
  { label: "내 정보", href: "/mypage/profile" },
  { label: "기능 관리", href: "/mypage/features" },
];

export function MyPageSidebar() {
  const pathname = usePathname();

  return (
    <aside className="md:w-56 md:shrink-0">
      <nav
        aria-label="마이페이지 메뉴"
        className="flex flex-col gap-text-xs border border-sidebar-border bg-sidebar p-field-sm"
      >
        {MENU.map((item) => {
          const active =
            pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`text-label-md border-l-2 px-field-md py-field-sm text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${
                active
                  ? "border-primary bg-sidebar-accent text-sidebar-accent-foreground"
                  : "border-transparent"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
