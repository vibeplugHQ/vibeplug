import type { Metadata } from "next";
import featuresData from "@/data/features.json";
import type { Feature } from "@/components/feature-card";
import { FeatureForm } from "@/components/feature-form";

export const metadata: Metadata = {
  title: "기능 관리 — Vibeplug",
  description: "내가 등록한 기능을 확인하고 관리하는 화면.",
};

const features = featuresData as Feature[];

// 카테고리는 직접 타이핑하지 않고 데이터에 존재하는 값 중에서만 고른다.
const categories = Array.from(new Set(features.map((feature) => feature.category)));

export default function FeaturesPage() {
  return (
    <div className="flex flex-col gap-text-lg">
      <header>
        <h1 className="text-title-1 tracking-tight">기능 관리</h1>
        <p className="mt-text-sm text-body-md text-muted-foreground">
          새 기능을 등록하고 관리할 수 있어요.
        </p>
      </header>

      <FeatureForm categories={categories} />
    </div>
  );
}
