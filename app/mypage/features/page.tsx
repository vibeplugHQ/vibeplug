import type { Metadata } from "next";
import { headers } from "next/headers";
import { FeatureForm } from "@/components/feature-form";
import { FeatureList, type FeatureRow } from "@/components/feature-list";

export const metadata: Metadata = {
  title: "기능 관리 — Vibeplug",
  description: "내가 등록한 기능을 확인하고 관리하는 화면.",
};

async function getFeatures(): Promise<FeatureRow[]> {
  const headerList = await headers();
  const host = headerList.get("host");
  const protocol = headerList.get("x-forwarded-proto") ?? "http";

  const res = await fetch(`${protocol}://${host}/api/features`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("기능 목록을 불러오지 못했습니다.");
  }

  return res.json();
}

export default async function FeaturesPage() {
  const features = await getFeatures();

  // 이미 쓰이는 카테고리를 입력창의 추천 목록으로 넘긴다.
  // 목록에 없는 값도 직접 타이핑할 수 있으므로, 비어 있어도 등록은 막히지 않는다.
  const categories = Array.from(
    new Set(features.map((feature) => feature.category)),
  );

  return (
    <div className="flex flex-col gap-text-lg">
      <header>
        <h1 className="text-title-1 tracking-tight">기능 관리</h1>
        <p className="mt-text-sm text-body-md text-muted-foreground">
          새 기능을 등록하고 관리할 수 있어요.
        </p>
      </header>

      <FeatureForm categories={categories} />

      <FeatureList features={features} categories={categories} />
    </div>
  );
}
