import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

// Google OAuth 리다이렉트가 돌아오는 지점.
// 전달받은 code 를 세션으로 교환(PKCE)한 뒤, next(기본값 홈)로 돌려보낸다.
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = createClient(await cookies());
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // 로그인할 때마다 구글에서 받은 최신 이름·이메일·프로필 사진을 profiles 에 반영한다.
      const user = data.user;
      if (user) {
        await supabase.from("profiles").upsert({
          id: user.id,
          name: user.user_metadata.full_name ?? user.user_metadata.name ?? null,
          email: user.email ?? null,
          avatar_url: user.user_metadata.avatar_url ?? user.user_metadata.picture ?? null,
        });
      }

      // 배포 환경에서 로드밸런서를 거치면 origin 대신 forwarded host 를 써야 한다.
      const forwardedHost = request.headers.get("x-forwarded-host");
      const isLocalEnv = process.env.NODE_ENV === "development";

      if (isLocalEnv || !forwardedHost) {
        return NextResponse.redirect(`${origin}${next}`);
      }
      return NextResponse.redirect(`https://${forwardedHost}${next}`);
    }
  }

  // code 가 없거나 교환에 실패하면 로그인 페이지로 되돌린다.
  return NextResponse.redirect(`${origin}/login?error=auth`);
}
