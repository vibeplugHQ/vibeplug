"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GitHubIcon, Logo } from "@/components/icons";
import { ThemeToggle } from "@/components/theme-toggle";
import { createClient } from "@/utils/supabase/client";

const NAV = [
  { label: "Marketplace", href: "#marketplace" },
  { label: "기능 목록", href: "/features" },
  { label: "How it works", href: "#how" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
];

/** GNB 에 표시할 로그인 사용자 정보 (서버 레이아웃에서 전달). */
export type HeaderUser = {
  name: string;
  avatarUrl: string | null;
};

export function SiteHeader({ user }: { user: HeaderUser | null }) {
  const [open, setOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setLoggingOut(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    setOpen(false);
    // 서버 컴포넌트(레이아웃)를 다시 그려 GNB 를 로그아웃 상태로 갱신한다.
    router.refresh();
    setLoggingOut(false);
  };

  return (
    <header className="sticky top-0 z-header border-b border-border/80 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-gnb max-w-layout-lg items-center justify-between px-field-md">
        <a href="#top" className="flex items-center gap-inline-md">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Logo className="size-5" />
          </span>
          <span className="text-title-3 tracking-tight">
            Vibeplug
          </span>
          <span className="hidden rounded-full border border-border px-field-sm py-text-xs font-mono text-caption text-muted-foreground sm:inline">
            beta
          </span>
        </a>

        <nav className="hidden items-center gap-text-xs md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-md px-inline-lg py-field-sm text-body-md text-muted-foreground transition-colors hover:text-neutral-100"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-inline-md">
          <ThemeToggle />
          <a
            href="#"
            aria-label="GitHub repository"
            className="hidden size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-neutral-700 hover:text-neutral-100 sm:flex"
          >
            <GitHubIcon className="size-4.5" />
          </a>
          {user ? (
            <div className="hidden items-center gap-inline-md sm:flex">
              {user.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element -- 구글 아바타는 외부 URL이라 next/image 원격 설정 없이 그대로 표시
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  referrerPolicy="no-referrer"
                  className="size-8 rounded-full border border-border object-cover"
                />
              ) : (
                <span className="flex size-8 items-center justify-center rounded-full border border-border bg-card text-label-md text-muted-foreground">
                  {user.name.charAt(0)}
                </span>
              )}
              <span className="max-w-32 truncate text-label-lg text-foreground">
                {user.name}
              </span>
              <button
                type="button"
                onClick={handleLogout}
                disabled={loggingOut}
                className="rounded-lg border border-border px-field-md py-field-sm text-label-lg text-foreground transition-colors hover:border-neutral-700 disabled:opacity-60"
              >
                로그아웃
              </button>
            </div>
          ) : (
            <a
              href="/login"
              className="hidden rounded-lg border border-border px-field-md py-field-sm text-label-lg text-foreground transition-colors hover:border-neutral-700 sm:inline-block"
            >
              로그인
            </a>
          )}
          <a
            href="#marketplace"
            className="hidden rounded-lg bg-primary px-field-md py-field-sm text-label-lg text-primary-foreground transition-opacity hover:opacity-90 sm:inline-block"
          >
            Browse plugs
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="flex size-9 items-center justify-center rounded-lg border border-border text-neutral-100 md:hidden"
          >
            <span className="relative block h-3 w-4">
              <span
                className={`absolute left-0 top-0 h-0.5 w-4 bg-current transition-transform ${
                  open ? "translate-y-[5px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute bottom-0 left-0 h-0.5 w-4 bg-current transition-transform ${
                  open ? "-translate-y-[5px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border bg-background px-field-md py-inline-lg md:hidden">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block rounded-md px-field-sm py-field-sm text-body-md text-muted-foreground hover:text-neutral-100"
            >
              {item.label}
            </a>
          ))}
          {user ? (
            <div className="mt-text-sm">
              <div className="flex items-center gap-inline-md px-field-sm py-field-sm">
                {user.avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element -- 구글 아바타는 외부 URL이라 next/image 원격 설정 없이 그대로 표시
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    referrerPolicy="no-referrer"
                    className="size-8 rounded-full border border-border object-cover"
                  />
                ) : (
                  <span className="flex size-8 items-center justify-center rounded-full border border-border bg-card text-label-md text-muted-foreground">
                    {user.name.charAt(0)}
                  </span>
                )}
                <span className="truncate text-label-lg text-foreground">
                  {user.name}
                </span>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                disabled={loggingOut}
                className="mt-inline-md block w-full rounded-lg border border-border px-field-md py-field-sm text-center text-label-lg text-foreground disabled:opacity-60"
              >
                로그아웃
              </button>
            </div>
          ) : (
            <a
              href="/login"
              onClick={() => setOpen(false)}
              className="mt-text-sm block rounded-lg border border-border px-field-md py-field-sm text-center text-label-lg text-foreground"
            >
              로그인
            </a>
          )}
          <a
            href="#marketplace"
            onClick={() => setOpen(false)}
            className="mt-inline-md block rounded-lg bg-primary px-field-md py-field-sm text-center text-label-lg text-primary-foreground"
          >
            Browse plugs
          </a>
        </nav>
      )}
    </header>
  );
}
