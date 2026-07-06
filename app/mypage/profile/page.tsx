import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "내 정보 — Vibeplug",
  description: "계정 정보와 프로필을 확인하고 관리하는 화면.",
};

export default function ProfilePage() {
  return (
    <header>
      <h1 className="text-title-1 tracking-tight">내 정보</h1>
      <p className="mt-text-sm text-body-md text-muted-foreground">
        계정 정보와 프로필을 확인하고 관리할 수 있어요.
      </p>
    </header>
  );
}
