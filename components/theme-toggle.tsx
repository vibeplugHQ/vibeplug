"use client";

import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@/components/icons";

/** Light/dark toggle. Only flips the `.dark` class on <html> — no persistence,
 *  so a refresh always returns to the default (dark, set in the root layout). */
export function ThemeToggle() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    setDark(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "라이트 모드로 전환" : "다크 모드로 전환"}
      title={dark ? "라이트 모드로 전환" : "다크 모드로 전환"}
      className="flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-neutral-700 hover:text-foreground"
    >
      {dark ? (
        <SunIcon className="size-4.5" />
      ) : (
        <MoonIcon className="size-4.5" />
      )}
    </button>
  );
}
