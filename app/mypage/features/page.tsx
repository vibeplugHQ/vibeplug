import type { Metadata } from "next";
import { requireUser } from "@/lib/auth";
import { FEATURE_COLUMNS, UI_COMPONENT_CATEGORY } from "@/lib/features";
import { FeatureForm } from "@/components/feature-form";
import { FeatureList, type FeatureRow } from "@/components/feature-list";

export const metadata: Metadata = {
  title: "기능 관리 — Vibeplug",
  description: "내가 등록한 기능을 확인하고 관리하는 화면.",
};

export default async function FeaturesPage() {
  // 로그인하지 않은 사용자는 로그인 페이지로 보낸다.
  const { supabase, user } = await requireUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  const isOperator = profile?.role === "운영자";
  const isContributor = profile?.role === "컨트리뷰터";
  const isRegularMember = profile?.role === "일반회원";

  // 목록에 내려줄 상품을 역할별로 고른다.
  // features의 SELECT 정책은 전체 공개라 화면 단계에서 걸러야 한다.
  // - 운영자: 전체 상품
  // - 컨트리뷰터: 본인이 등록한 상품만
  // - 그 외: 전체 상품(읽기 전용)
  let query = supabase
    .from("features")
    .select(FEATURE_COLUMNS)
    .order("created_at", { ascending: false })
    .order("id", { ascending: false });

  if (isContributor) {
    query = query.eq("user_id", user.id);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error("기능 목록을 불러오지 못했습니다.");
  }

  const features = (data ?? []) as FeatureRow[];

  // 이미 쓰이는 카테고리를 입력창의 추천 목록으로 넘긴다.
  // 'UI 컴포넌트'는 아직 등록된 상품이 없어도 항상 고를 수 있도록 함께 넣는다.
  const categories = Array.from(
    new Set([
      ...features.map((feature) => feature.category),
      UI_COMPONENT_CATEGORY,
    ]),
  );

  // 운영자와 컨트리뷰터는 등록·관리할 수 있다.
  const canManage = isOperator || isContributor;

  return (
    <div className="flex flex-col gap-text-lg">
      <header>
        <h1 className="text-title-1 tracking-tight">기능 관리</h1>
        <p className="mt-text-sm text-body-md text-muted-foreground">
          새 기능을 등록하고 관리할 수 있어요.
        </p>
      </header>

      {isOperator ? (
        <FeatureForm categories={categories} />
      ) : isContributor ? (
        // 컨트리뷰터에게도 등록 폼을 보여주되 카테고리는 'UI 컴포넌트'로 고정한다.
        <FeatureForm
          categories={categories}
          lockedCategory={UI_COMPONENT_CATEGORY}
        />
      ) : (
        <div className="flex flex-col items-start gap-field-md border border-border bg-card p-field-lg">
          <p className="text-body-md text-muted-foreground">
            상품 등록 권한이 없습니다.
          </p>
          <button
            type="button"
            className="rounded-lg bg-primary px-field-md py-field-sm text-label-lg text-primary-foreground transition-opacity hover:opacity-90"
          >
            판매자 신청하기
          </button>
        </div>
      )}

      {/* 일반회원에게는 기능 목록을 표시하지 않는다. */}
      {!isRegularMember && (
        <FeatureList
          features={features}
          categories={categories}
          canManage={canManage}
          lockedCategory={isContributor ? UI_COMPONENT_CATEGORY : undefined}
        />
      )}
    </div>
  );
}
