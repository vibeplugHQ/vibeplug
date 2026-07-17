import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

// /mypage 아래 화면이 공유하는 인증 게이트.
// 로그인하지 않은 사용자는 로그인 페이지로 보내고, 로그인한 사용자에게는
// 이후 조회에 바로 쓸 수 있도록 supabase 클라이언트와 user를 함께 돌려준다.
//
// 레이아웃이 아니라 각 페이지에서 호출한다. Next.js 레이아웃은 클라이언트
// 이동 시 다시 렌더되지 않아, 레이아웃에만 두면 인증 확인이 건너뛰어질 수 있다.
export async function requireUser() {
  const supabase = createClient(await cookies());

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return { supabase, user };
}
