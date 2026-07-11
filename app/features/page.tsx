import type { Metadata } from "next";
import featuresData from "@/data/features.json";
import { FeatureCard, type Feature } from "@/components/feature-card";

export const metadata: Metadata = {
  title: "기능 목록 — Vibeplug",
  description: "판매 중인 기능을 둘러보세요.",
};

const features = featuresData as Feature[];

export default function FeaturesPage() {
  return (
    <main className="mx-auto max-w-layout-lg px-field-md py-section-md sm:py-section-lg">
      <div className="max-w-layout-sm">
        <p className="font-mono text-caption uppercase tracking-[0.2em] text-primary">
          기능 목록
        </p>
        <h1 className="mt-inline-lg text-balance text-display-md tracking-tight">
          필요한 기능을 둘러보세요
        </h1>
        <p className="mt-inline-lg text-pretty text-muted-foreground">
          판매 중인 기능을 한눈에 살펴보세요.
        </p>
      </div>

      <div className="mt-grid-gutter-x grid grid-cols-1 gap-field-md sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <FeatureCard key={feature.name} feature={feature} />
        ))}
      </div>
    </main>
  );
}
