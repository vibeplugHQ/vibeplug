import type { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import { FeatureCard, type Feature } from "@/components/feature-card";

export const metadata: Metadata = {
  title: "기능 목록 — 바이브플러그",
  description: "필요한 기능을 둘러보세요.",
};

type FeatureRow = Feature & { id: string };

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
          <Link
            key={feature.id}
            href={`/features/${feature.id}`}
            className="rounded-2xl transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <FeatureCard feature={feature} />
          </Link>
        ))}
      </div>
    </main>
  );
}
