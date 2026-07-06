"use client";

import { useState } from "react";
import { GitHubIcon, Logo } from "@/components/icons";
import { ThemeToggle } from "@/components/theme-toggle";

const NAV = [
  { label: "Marketplace", href: "#marketplace" },
  { label: "How it works", href: "#how" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

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
          <a
            href="#marketplace"
            onClick={() => setOpen(false)}
            className="mt-text-sm block rounded-lg bg-primary px-field-md py-field-sm text-center text-label-lg text-primary-foreground"
          >
            Browse plugs
          </a>
        </nav>
      )}
    </header>
  );
}
