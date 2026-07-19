import type { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { formatPrice, type Feature } from "@/components/feature-card";
import { BuyButton } from "./buy-button";
import { AddToCartButton } from "./add-to-cart-button";

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
  const { supabase } = await requireUser();

  const { id } = await params;
  const feature = await getFeature(id);

  if (!feature) {
    notFound();
  }

  // 이미 장바구니에 담긴 기능이면 담기 버튼을 "담기 완료"로 표시한다.
  const { data: cartRow } = await supabase
    .from("cart")
    .select("feature_id")
    .eq("feature_id", feature.id)
    .maybeSingle();
  const inCart = Boolean(cartRow);

  // 구매자 전용 콘텐츠는 요청한 사용자의 세션으로 조회한다.
  // feature_contents의 RLS 정책이 결제 완료 여부를 판정하므로,
  // 별도의 구매 검사 없이 결과가 있으면 구매자, 없으면 미구매자다.
  const { data: contentRow } = await supabase
    .from("feature_contents")
    .select("content")
    .eq("feature_id", feature.id)
    .maybeSingle();
  const content = contentRow?.content ?? null;

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

        {/* 콘텐츠 영역 — 구매자에게만 본문을 보여주고, 그 외에는 안내를 보여준다. */}
        <section className="mt-field-lg">
          <h2 className="text-title-3 tracking-tight text-foreground">콘텐츠</h2>
          {content ? (
            <div className="mt-inline-lg rounded-2xl border border-border bg-card p-field-lg">
              <p className="whitespace-pre-wrap text-pretty text-body-md text-foreground">
                {content}
              </p>
            </div>
          ) : (
            <div className="mt-inline-lg flex min-h-40 items-center justify-center rounded-2xl border border-dashed border-border bg-card p-field-lg text-center">
              <p className="text-body-md text-muted-foreground">
                콘텐츠는 구매 후 제공됩니다
              </p>
            </div>
          )}
        </section>

        {/* 바로 구매 / 장바구니 담기 — 각 버튼은 아래에 자기 오류 메시지를 쌓는다. */}
        <div className="mt-section-md flex flex-col gap-field-md sm:flex-row sm:items-start">
          <div>
            <BuyButton featureId={feature.id} />
          </div>
          <div>
            <AddToCartButton featureId={feature.id} initialInCart={inCart} />
          </div>
        </div>
      </article>
    </main>
  );
}
