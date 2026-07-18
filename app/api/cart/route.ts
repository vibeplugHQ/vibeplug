import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// 요청 본문에서 feature_id를 꺼내 UUID 형식일 때만 돌려준다.
async function readFeatureId(request: Request): Promise<string | null> {
  try {
    const body = await request.json();
    const id = (body as Record<string, unknown> | null)?.feature_id;
    return typeof id === "string" && UUID_PATTERN.test(id) ? id : null;
  } catch {
    return null;
  }
}

// 장바구니 담기. feature_id만 받아 현재 사용자의 cart에 한 줄 넣는다.
// user_id는 cart의 기본값(auth.uid())이 채우고, RLS가 본인 행만 허용한다.
export async function POST(request: Request) {
  const featureId = await readFeatureId(request);

  if (!featureId) {
    return Response.json({ error: "기능을 찾을 수 없습니다." }, { status: 404 });
  }

  const supabase = createClient(await cookies());

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return Response.json({ error: "로그인이 필요합니다." }, { status: 401 });
  }

  // 존재하지 않는 기능은 담지 않는다.
  const { data: feature, error: featureError } = await supabase
    .from("features")
    .select("id")
    .eq("id", featureId)
    .maybeSingle();

  if (featureError) {
    return Response.json({ error: featureError.message }, { status: 500 });
  }

  if (!feature) {
    return Response.json({ error: "기능을 찾을 수 없습니다." }, { status: 404 });
  }

  // 이미 담긴 기능(중복 PK, 23505)은 성공으로 본다 — 담기는 몇 번 눌러도 결과가 같다.
  const { error: insertError } = await supabase
    .from("cart")
    .insert({ feature_id: featureId });

  if (insertError && insertError.code !== "23505") {
    return Response.json({ error: insertError.message }, { status: 500 });
  }

  const { count } = await supabase
    .from("cart")
    .select("feature_id", { count: "exact", head: true });

  return Response.json({ count: count ?? 0 }, { status: 200 });
}

// 장바구니 빼기. RLS가 본인 행만 지우도록 보장하므로 feature_id로만 삭제한다.
export async function DELETE(request: Request) {
  const featureId = await readFeatureId(request);

  if (!featureId) {
    return Response.json({ error: "기능을 찾을 수 없습니다." }, { status: 404 });
  }

  const supabase = createClient(await cookies());

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return Response.json({ error: "로그인이 필요합니다." }, { status: 401 });
  }

  const { error: deleteError } = await supabase
    .from("cart")
    .delete()
    .eq("feature_id", featureId);

  if (deleteError) {
    return Response.json({ error: deleteError.message }, { status: 500 });
  }

  const { count } = await supabase
    .from("cart")
    .select("feature_id", { count: "exact", head: true });

  return Response.json({ count: count ?? 0 }, { status: 200 });
}
