import { createClient } from "@supabase/supabase-js";

// 서버 전용 Supabase 클라이언트.
//
// .env.local의 SUPABASE_SECRET_KEY(RLS를 우회하는 시크릿 키)로 만든다. 이 키는
// NEXT_PUBLIC_ 접두사가 없어 클라이언트 번들에 인라인되지 않으며, 이 모듈은
// 서버 코드에서만 import한다 — 절대 브라우저로 나가면 안 된다.
//
// RLS를 우회하므로 이 클라이언트로 쓰기를 할 때는 대상 행을 user_id 등으로
// 반드시 직접 좁혀야 한다. 승인 성공 뒤 주문 status 변경처럼, RLS 정책이 없어
// 사용자 세션으로는 불가능한 작업에만 쓴다.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;

export const createAdminClient = () =>
  createClient(supabaseUrl!, supabaseSecretKey!, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
