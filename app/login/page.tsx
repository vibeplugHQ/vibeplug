import type { Metadata } from "next";
import { Logo } from "@/components/icons";
import { GoogleLoginButton } from "./google-login-button";

export const metadata: Metadata = {
  title: "로그인 — Vibeplug",
  description: "Google 계정으로 Vibeplug을 시작하세요.",
};

export default function LoginPage() {
  return (
    <main className="mx-auto flex min-h-[calc(100svh-var(--gnb-height))] max-w-layout-sm flex-col items-center justify-center px-field-md py-section-md">
      <div className="w-full">
        <div className="flex flex-col items-center text-center">
          <span className="flex size-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Logo className="size-7" />
          </span>
          <h1 className="mt-text-md text-title-1 tracking-tight">
            다시 오신 걸 환영해요
          </h1>
          <p className="mt-text-sm text-body-md text-muted-foreground">
            Google 계정으로 Vibeplug을 시작하세요.
          </p>
        </div>

        <GoogleLoginButton />
      </div>
    </main>
  );
}
