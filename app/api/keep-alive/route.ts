import { createClient } from "@supabase/supabase-js";

// Supabase 무료 플랜은 일주일 동안 DB 요청이 없으면 프로젝트를 자동으로 일시정지한다.
// 외부 크론이 주기적으로 이 라우트를 호출해 최소한의 읽기 요청을 남기는 것이 전부다.
//
// 세션이 필요 없는 익명 읽기라, 쿠키를 파싱하는 서버 클라이언트(utils/supabase/server.ts)
// 대신 세션을 만들지 않는 클라이언트를 여기서 직접 만든다. RLS를 우회하는 관리자
// 클라이언트(utils/supabase/admin.ts)는 이 공개 라우트에 필요 이상의 권한이라 쓰지 않는다.
// 모듈 스코프에 두어 요청마다 새로 만들지 않는다.
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  { auth: { persistSession: false, autoRefreshToken: false } },
);

// 응답이 CDN이나 프록시에 캐시되면 크론 요청이 DB까지 닿지 않아 휴면 방지 효과가 사라진다.
const NO_STORE = { "Cache-Control": "no-store" };

export async function GET() {
  // id 한 컬럼만, limit(1)로 한 행에서 스캔을 멈춘다. 읽기 전용이라 데이터는 그대로다.
  //
  // select의 { head: true }(HTTP HEAD)가 응답 본문까지 없애 더 가벼워 보이지만 쓰지 않는다.
  // PostgREST가 404를 본문 없이 돌려주면 postgrest-js가 이를 204로 바꾸고 error를 null로
  // 두기 때문에, 테이블이 사라져도 성공으로 응답해 휴면 방지 여부를 확인할 수 없게 된다.
  const { error } = await supabase.from("features").select("id").limit(1);

  if (error) {
    return Response.json({ ok: false, error: error.message }, { status: 500, headers: NO_STORE });
  }

  return Response.json({ ok: true }, { headers: NO_STORE });
}
