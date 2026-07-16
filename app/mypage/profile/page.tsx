import type { Metadata } from "next";
import Image from "next/image";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export const metadata: Metadata = {
  title: "내 정보 — Vibeplug",
  description: "계정 정보와 프로필을 확인하고 관리하는 화면.",
};

export default async function ProfilePage() {
  const supabase = createClient(await cookies());

  // 로그인하지 않은 사용자는 로그인 페이지로 보낸다.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // RLS 정책 덕분에 본인 행만 조회된다.
  const { data: profile } = await supabase
    .from("profiles")
    .select("name, email, avatar_url")
    .eq("id", user.id)
    .maybeSingle();

  return (
    <div className="flex flex-col gap-text-lg">
      <header>
        <h1 className="text-title-1 tracking-tight">내 정보</h1>
        <p className="mt-text-sm text-body-md text-muted-foreground">
          계정 정보와 프로필을 확인하고 관리할 수 있어요.
        </p>
      </header>

      <section className="flex items-center gap-inline-lg rounded-lg border border-border bg-card p-field-md">
        {profile?.avatar_url ? (
          <Image
            src={profile.avatar_url}
            alt={`${profile.name ?? "사용자"} 프로필 사진`}
            width={64}
            height={64}
            className="size-16 shrink-0 rounded-full object-cover"
          />
        ) : (
          <span
            aria-hidden="true"
            className="flex size-16 shrink-0 items-center justify-center rounded-full bg-muted text-title-2 text-muted-foreground"
          >
            {(profile?.name ?? "?").charAt(0)}
          </span>
        )}

        <dl className="min-w-0">
          <dt className="sr-only">이름</dt>
          <dd className="truncate text-title-3 tracking-tight">
            {profile?.name ?? "이름 없음"}
          </dd>
          <dt className="sr-only">이메일</dt>
          <dd className="mt-text-xs truncate text-body-md text-muted-foreground">
            {profile?.email ?? "이메일 없음"}
          </dd>
        </dl>
      </section>
    </div>
  );
}
