import type { Metadata } from "next";
import type { SVGProps } from "react";
import { Logo } from "@/components/icons";

export const metadata: Metadata = {
  title: "로그인 — Vibeplug",
  description: "Google 계정으로 Vibeplug을 시작하세요.",
};

/** Google 멀티컬러 "G" 로고 마크. */
function GoogleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09Z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23Z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18A10.98 10.98 0 0 0 1 12c0 1.78.43 3.46 1.18 4.93l3.66-2.83Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.83C6.71 7.3 9.14 5.38 12 5.38Z"
      />
    </svg>
  );
}

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

        <button
          type="button"
          className="mt-text-lg flex w-full items-center justify-center gap-inline-md rounded-lg border border-border bg-card px-field-md py-field-md text-label-lg text-foreground transition-colors hover:border-neutral-700"
        >
          <GoogleIcon className="size-5" />
          Google로 계속하기
        </button>
      </div>
    </main>
  );
}
