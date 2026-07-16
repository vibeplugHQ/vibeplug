"use client";

import { useState } from "react";
import type { SVGProps } from "react";
import { createClient } from "@/utils/supabase/client";

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

/**
 * Google OAuth 로그인 버튼.
 * Supabase 인증(PKCE)으로 Google 로그인 흐름을 시작한다.
 * 인증 후에는 /auth/callback 라우트가 세션을 만들고 홈으로 돌려보낸다.
 */
export function GoogleLoginButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/`,
      },
    });

    // 성공하면 브라우저가 Google로 이동하므로 이 아래는 실행되지 않는다.
    if (error) {
      setError("로그인을 시작하지 못했어요. 잠시 후 다시 시도해 주세요.");
      setLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className="mt-text-lg flex w-full items-center justify-center gap-inline-md rounded-lg border border-border bg-card px-field-md py-field-md text-label-lg text-foreground transition-colors hover:border-neutral-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <GoogleIcon className="size-5" />
        {loading ? "이동 중…" : "Google로 계속하기"}
      </button>
      {error && (
        <p className="mt-text-sm text-center text-body-sm text-destructive" role="alert">
          {error}
        </p>
      )}
    </>
  );
}
