import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "마이페이지 — Vibeplug",
  description: "내가 등록한 기능을 확인하고 관리하는 판매자 마이페이지.",
};

export default function MyPage() {
  return (
    <main className="mx-auto max-w-layout-lg px-field-md pb-section-md pt-section-md">
      {/* 페이지 헤더 — 제목 + 안내 문구 */}
      <header>
        <h1 className="text-title-1 tracking-tight">마이페이지</h1>
        <p className="mt-text-sm text-body-md text-muted-foreground">
          내가 등록한 기능을 한 곳에서 확인하고 관리할 수 있어요.
        </p>
      </header>

      {/* 등록한 기능 영역 — 지금은 빈 상태 자리표시 */}
      <section className="mt-grid-gutter-x flex min-h-80 items-center justify-center border border-dashed border-border bg-card p-field-lg text-center">
        <p className="text-body-md text-muted-foreground">
          등록한 기능이 여기에 표시됩니다
        </p>
      </section>
    </main>
  );
}
