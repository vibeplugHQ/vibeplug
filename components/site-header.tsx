"use client";

import { useState } from "react";
import { GitHubIcon, Logo } from "@/components/icons";

const NAV = [
  { label: "Marketplace", href: "#marketplace" },
  { label: "How it works", href: "#how" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-ink/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-lg bg-plug text-ink">
            <Logo className="size-5" />
          </span>
          <span className="text-[15px] font-semibold tracking-tight">
            Vibeplug
          </span>
          <span className="hidden rounded-full border border-line px-2 py-0.5 font-mono text-[10px] text-muted sm:inline">
            beta
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm text-muted transition-colors hover:text-zinc-100"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#"
            aria-label="GitHub repository"
            className="hidden size-9 items-center justify-center rounded-lg border border-line text-muted transition-colors hover:border-line-strong hover:text-zinc-100 sm:flex"
          >
            <GitHubIcon className="size-4.5" />
          </a>
          <a
            href="#marketplace"
            className="hidden rounded-lg bg-plug px-4 py-2 text-sm font-semibold text-ink transition-opacity hover:opacity-90 sm:inline-block"
          >
            Browse plugs
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="flex size-9 items-center justify-center rounded-lg border border-line text-zinc-100 md:hidden"
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
        <nav className="border-t border-line bg-ink px-5 py-3 md:hidden">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block rounded-md px-2 py-2.5 text-sm text-muted hover:text-zinc-100"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#marketplace"
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-lg bg-plug px-4 py-2.5 text-center text-sm font-semibold text-ink"
          >
            Browse plugs
          </a>
        </nav>
      )}
    </header>
  );
}
