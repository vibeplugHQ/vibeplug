"use client";

import { useState } from "react";
import { CheckIcon, CopyIcon } from "@/components/icons";

export function CopyCommand({
  command,
  className = "",
}: {
  command: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard?.writeText(command).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    });
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Copy "${command}" to clipboard`}
      className={`group flex items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3 font-mono text-sm text-zinc-200 transition-colors hover:border-line-strong ${className}`}
    >
      <span className="select-none text-plug">$</span>
      <span className="truncate">{command}</span>
      <span className="ml-auto flex size-7 shrink-0 items-center justify-center rounded-md text-faint transition-colors group-hover:text-zinc-200">
        {copied ? (
          <CheckIcon className="size-4 text-plug" />
        ) : (
          <CopyIcon className="size-4" />
        )}
      </span>
    </button>
  );
}
