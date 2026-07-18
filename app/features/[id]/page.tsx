import type { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { formatPrice, type Feature } from "@/components/feature-card";

export const metadata: Metadata = {
  title: "기능 상세 — Vibeplug",
  description: "기능의 상세 정보를 확인하세요.",
};

type FeatureDetail = Feature & { id: string };

// 목록 페이지와 같은 방식으로, 라우트 핸들러를 통해 데이터를 조회한다.
// 라우트 핸들러가 FEATURE_COLUMNS만 내려주므로 content 컬럼은 응답에 포함되지 않는다.
async function getFeature(id: string): Promise<FeatureDetail | null> {
  const headerList = await headers();
  const host = headerList.get("host");
  const protocol = headerList.get("x-forwarded-proto") ?? "http";

  const res = await fetch(`${protocol}://${host}/api/features/${id}`, {
    cache: "no-store",
  });

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error("기능을 불러오지 못했습니다.");
  }

  return res.json();
}

export default async function FeatureDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // 로그인하지 않은 사용자는 로그인 페이지로 보낸다.
  await requireUser();

  const { id } = await params;
  const feature = await getFeature(id);

  if (!feature) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-layout-md px-field-md py-section-md sm:py-section-lg">
      <Link
        href="/features"
        className="inline-flex items-center text-body-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        ← 기능 목록으로
      </Link>

      <article className="mt-grid-gutter-x">
        <header className="border-b border-border pb-field-lg">
          <span className="inline-flex w-fit items-center rounded-full border border-border px-field-sm py-text-xs text-caption text-muted-foreground">
            {feature.category}
          </span>

          <h1 className="mt-text-md text-balance text-display-md tracking-tight text-foreground">
            {feature.name}
          </h1>

          <p className="mt-inline-lg font-mono text-title-2 text-foreground">
            {formatPrice(feature.price)}
          </p>
        </header>

        <section className="mt-field-lg">
          <h2 className="text-title-3 tracking-tight text-foreground">설명</h2>
          <p className="mt-inline-lg text-pretty text-body-md text-muted-foreground">
            {feature.description}
          </p>
        </section>

        {/* 콘텐츠 영역 — 실제 콘텐츠(content)는 구매 후에만 제공한다. */}
        <section className="mt-field-lg">
          <h2 className="text-title-3 tracking-tight text-foreground">콘텐츠</h2>
          <div className="mt-inline-lg flex min-h-40 items-center justify-center rounded-2xl border border-dashed border-border bg-card p-field-lg text-center">
            <p className="text-body-md text-muted-foreground">
              콘텐츠는 구매 후 제공됩니다
            </p>
          </div>
        </section>

        {/* 구매하기 — 아직 동작을 연결하지 않았다. */}
        <div className="mt-section-md">
          <button
            type="button"
            className="flex h-12 w-full items-center justify-center bg-primary px-field-md text-label-lg text-primary-foreground transition-opacity hover:opacity-90 sm:w-auto sm:min-w-52"
          >
            구매하기
          </button>
        </div>
      </article>
    </main>
  );
}
