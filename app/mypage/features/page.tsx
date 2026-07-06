import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "기능 관리 — Vibeplug",
  description: "내가 등록한 기능을 확인하고 관리하는 화면.",
};

export default function FeaturesPage() {
  return (
    <header>
      <h1 className="text-title-1 tracking-tight">기능 관리</h1>
      <p className="mt-text-sm text-body-md text-muted-foreground">
        내가 등록한 기능을 확인하고 관리할 수 있어요.
      </p>
    </header>
  );
}
