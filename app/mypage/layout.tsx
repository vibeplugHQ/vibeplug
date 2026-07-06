import type { ReactNode } from "react";
import { MyPageSidebar } from "@/components/mypage-sidebar";

// 마이페이지 구역(/mypage 아래 모든 화면)이 공유하는 레이아웃.
// 사이드 메뉴는 여기 한 곳에만 두고 children 으로 각 화면을 받는다.
export default function MyPageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex max-w-layout-lg flex-col gap-grid-gutter-x px-field-md pb-section-md pt-section-md md:flex-row">
      <MyPageSidebar />
      <main className="min-w-0 flex-1">{children}</main>
    </div>
  );
}
