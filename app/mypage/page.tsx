import type { Metadata } from "next";
import { requireUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "마이페이지 — Vibeplug",
  description: "내가 등록한 기능을 확인하고 관리하는 판매자 마이페이지.",
};

export default async function MyPage() {
  // 로그인하지 않은 사용자는 로그인 페이지로 보낸다.
  await requireUser();

  return (
    <>
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
    </>
  );
}
