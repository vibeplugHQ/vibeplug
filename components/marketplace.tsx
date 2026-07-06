"use client";

import { useMemo, useState } from "react";
import {
  CATEGORIES,
  PLUGS,
  formatInstalls,
  type Category,
  type Plug,
} from "@/lib/plugs";
import {
  CheckIcon,
  PlugIcon,
  SearchIcon,
  StarIcon,
} from "@/components/icons";

type Filter = Category | "All";
const FILTERS: Filter[] = ["All", ...CATEGORIES];

export function Marketplace() {
  const [filter, setFilter] = useState<Filter>("All");
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PLUGS.filter((p) => {
      const matchesCat = filter === "All" || p.category === filter;
      const matchesQuery =
        q === "" ||
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    }).sort((a, b) => b.installs - a.installs);
  }, [filter, query]);

  return (
    <section id="marketplace" className="scroll-mt-anchor border-t border-border">
      <div className="mx-auto max-w-layout-lg px-field-md py-section-md sm:py-section-lg">
        <div className="flex flex-col gap-field-lg sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-layout-sm">
            <p className="text-caption uppercase tracking-[0.2em] text-primary">
              마켓플레이스
            </p>
            <h2 className="mt-inline-lg text-balance text-display-md tracking-tight">
              필요한 기능을 골라 꽂으세요
            </h2>
            <p className="mt-inline-lg text-pretty text-muted-foreground">
              모든 plug은 프론트엔드 · API · 데이터베이스 마이그레이션을 함께
              제공합니다. 설치되는 코드는 전부 당신의 저장소 안에 남습니다.
            </p>
          </div>

          <label className="relative block w-full sm:w-layout-sm">
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-500" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="plug 검색…"
              className="h-11 w-full rounded-xl border border-border bg-card pl-grid-gutter-x pr-inline-lg text-label-lg text-neutral-100 outline-none transition-colors placeholder:text-neutral-500 focus:border-primary/60"
            />
          </label>
        </div>

        {/* Filter pills */}
        <div className="mt-grid-gutter-x flex flex-wrap gap-inline-md">
          {FILTERS.map((f) => {
            const active = f === filter;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                aria-pressed={active}
                className={`rounded-full border px-field-md py-inline-sm text-label-lg transition-colors ${
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-muted-foreground hover:border-neutral-700 hover:text-neutral-200"
                }`}
              >
                {f === "All" ? "전체" : f}
              </button>
            );
          })}
          <span className="ml-auto self-center font-mono text-caption text-neutral-500">
            {results.length}개 결과
          </span>
        </div>

        {/* Grid */}
        {results.length > 0 ? (
          <div className="mt-grid-gutter-x grid grid-cols-1 gap-field-md sm:grid-cols-2 lg:grid-cols-3">
            {results.map((plug) => (
              <PlugCard key={plug.slug} plug={plug} />
            ))}
          </div>
        ) : (
          <div className="mt-grid-gutter-x rounded-2xl border border-dashed border-border py-grid-gutter-x text-center">
            <p className="text-muted-foreground">
              <span className="font-mono text-neutral-300">“{query}”</span>에 맞는
              plug이 없습니다.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setFilter("All");
              }}
              className="mt-inline-lg text-label-lg text-primary hover:underline"
            >
              필터 초기화
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function PlugCard({ plug }: { plug: Plug }) {
  return (
    <article className="group flex flex-col rounded-2xl border border-border bg-card p-field-md transition-colors hover:border-neutral-700">
      <div className="flex items-start justify-between">
        <span className="flex size-11 items-center justify-center rounded-xl border border-border bg-muted text-neutral-300 transition-colors group-hover:border-primary/40 group-hover:text-primary">
          <PlugIcon name={plug.icon} className="size-5.5" />
        </span>
        {plug.official ? (
          <span className="inline-flex items-center gap-text-xs rounded-full border border-primary/30 bg-primary/10 px-field-sm py-text-xs text-caption text-primary">
            <StarIcon className="size-3" />
            Official
          </span>
        ) : (
          <span className="rounded-full border border-border px-field-sm py-text-xs text-caption text-neutral-500">
            Community
          </span>
        )}
      </div>

      <h3 className="mt-text-md text-title-3 tracking-tight text-neutral-100">
        {plug.name}
      </h3>
      <p className="mt-inline-sm text-body-md text-muted-foreground">{plug.tagline}</p>

      <div className="mt-text-md flex flex-wrap gap-inline-sm">
        {plug.includes.slice(0, 3).map((item) => (
          <span
            key={item}
            className="inline-flex items-center gap-text-xs rounded-md bg-muted px-field-sm py-text-xs font-mono text-caption text-neutral-400"
          >
            <CheckIcon className="size-3 text-accent" />
            {item}
          </span>
        ))}
        {plug.includes.length > 3 && (
          <span className="inline-flex items-center rounded-md bg-muted px-field-sm py-text-xs font-mono text-caption text-neutral-500">
            +{plug.includes.length - 3}
          </span>
        )}
      </div>

      <div className="mt-text-md flex items-center justify-between border-t border-border pt-field-md font-mono text-caption text-neutral-500">
        <code className="truncate text-neutral-400">
          vibeplug add {plug.slug}
        </code>
        <span className="flex shrink-0 items-center gap-inline-lg pl-inline-lg">
          <span>{formatInstalls(plug.installs)}</span>
          <span className="text-neutral-700">·</span>
          <span>v{plug.version}</span>
        </span>
      </div>
    </article>
  );
}
