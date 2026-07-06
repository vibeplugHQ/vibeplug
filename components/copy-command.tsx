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
      className={`group flex items-center gap-inline-lg rounded-xl border border-border bg-card px-field-md py-inline-lg font-mono text-body-md text-neutral-200 transition-colors hover:border-neutral-700 ${className}`}
    >
      <span className="select-none text-primary">$</span>
      <span className="truncate">{command}</span>
      <span className="ml-auto flex size-7 shrink-0 items-center justify-center rounded-md text-neutral-500 transition-colors group-hover:text-neutral-200">
        {copied ? (
          <CheckIcon className="size-4 text-primary" />
        ) : (
          <CopyIcon className="size-4" />
        )}
      </span>
    </button>
  );
}
