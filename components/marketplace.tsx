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
    <section id="marketplace" className="scroll-mt-20 border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-plug">
              마켓플레이스
            </p>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              필요한 기능을 골라 꽂으세요
            </h2>
            <p className="mt-3 text-pretty text-muted">
              모든 plug은 프론트엔드 · API · 데이터베이스 마이그레이션을 함께
              제공합니다. 설치되는 코드는 전부 당신의 저장소 안에 남습니다.
            </p>
          </div>

          <label className="relative block w-full sm:w-72">
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-faint" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="plug 검색…"
              className="h-11 w-full rounded-xl border border-line bg-surface pl-9 pr-3 text-sm text-zinc-100 outline-none transition-colors placeholder:text-faint focus:border-plug/60"
            />
          </label>
        </div>

        {/* Filter pills */}
        <div className="mt-8 flex flex-wrap gap-2">
          {FILTERS.map((f) => {
            const active = f === filter;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                aria-pressed={active}
                className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                  active
                    ? "border-plug bg-plug text-ink"
                    : "border-line bg-surface text-muted hover:border-line-strong hover:text-zinc-200"
                }`}
              >
                {f === "All" ? "전체" : f}
              </button>
            );
          })}
          <span className="ml-auto self-center font-mono text-xs text-faint">
            {results.length}개 결과
          </span>
        </div>

        {/* Grid */}
        {results.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((plug) => (
              <PlugCard key={plug.slug} plug={plug} />
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-2xl border border-dashed border-line py-16 text-center">
            <p className="text-muted">
              <span className="font-mono text-zinc-300">“{query}”</span>에 맞는
              plug이 없습니다.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setFilter("All");
              }}
              className="mt-3 text-sm font-medium text-plug hover:underline"
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
    <article className="group flex flex-col rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-line-strong">
      <div className="flex items-start justify-between">
        <span className="flex size-11 items-center justify-center rounded-xl border border-line bg-surface-2 text-zinc-300 transition-colors group-hover:border-plug/40 group-hover:text-plug">
          <PlugIcon name={plug.icon} className="size-5.5" />
        </span>
        {plug.official ? (
          <span className="inline-flex items-center gap-1 rounded-full border border-plug/30 bg-plug/10 px-2 py-0.5 text-[11px] font-medium text-plug">
            <StarIcon className="size-3" />
            Official
          </span>
        ) : (
          <span className="rounded-full border border-line px-2 py-0.5 text-[11px] text-faint">
            Community
          </span>
        )}
      </div>

      <h3 className="mt-4 text-base font-semibold tracking-tight text-zinc-100">
        {plug.name}
      </h3>
      <p className="mt-1.5 text-sm leading-6 text-muted">{plug.tagline}</p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {plug.includes.slice(0, 3).map((item) => (
          <span
            key={item}
            className="inline-flex items-center gap-1 rounded-md bg-surface-2 px-2 py-1 font-mono text-[11px] text-zinc-400"
          >
            <CheckIcon className="size-3 text-plug-dim" />
            {item}
          </span>
        ))}
        {plug.includes.length > 3 && (
          <span className="inline-flex items-center rounded-md bg-surface-2 px-2 py-1 font-mono text-[11px] text-faint">
            +{plug.includes.length - 3}
          </span>
        )}
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-line pt-4 font-mono text-[11px] text-faint">
        <code className="truncate text-zinc-400">
          vibeplug add {plug.slug}
        </code>
        <span className="flex shrink-0 items-center gap-3 pl-3">
          <span>{formatInstalls(plug.installs)}</span>
          <span className="text-line-strong">·</span>
          <span>v{plug.version}</span>
        </span>
      </div>
    </article>
  );
}
