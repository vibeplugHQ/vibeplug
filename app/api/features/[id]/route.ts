import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { FEATURE_COLUMNS, parseFeatureInput } from "@/lib/features";

type SupabaseClient = ReturnType<typeof createClient>;
type RouteContext = { params: Promise<{ id: string }> };

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// features는 RLS가 켜져 있어, 권한이 없는 UPDATE·DELETE는 오류가 아니라 "고친 행 0건"으로 돌아온다.
// (예: 운영자가 아닌 사용자, 또는 본인이 등록하지 않은 상품을 고치려는 컨트리뷰터.)
// 행이 아예 없는 것(404)과 구분하려면 존재 여부를 따로 확인해야 한다.
// 이 확인이 없으면 아무것도 바뀌지 않은 요청에 200을 돌려주게 된다.
async function explainNoRowsAffected(supabase: SupabaseClient, id: string) {
  const { data, error } = await supabase
    .from("features")
    .select("id")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    return { status: 500, message: error.message };
  }

  if (!data) {
    return { status: 404, message: "기능을 찾을 수 없습니다." };
  }

  return { status: 403, message: "이 기능을 수정하거나 삭제할 권한이 없습니다." };
}

export async function PUT(request: Request, { params }: RouteContext) {
  const { id } = await params;

  if (!UUID_PATTERN.test(id)) {
    return Response.json({ error: "기능을 찾을 수 없습니다." }, { status: 404 });
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "요청 형식이 올바르지 않습니다." }, { status: 400 });
  }

  const parsed = parseFeatureInput(body);

  if (!parsed.ok) {
    return Response.json({ error: parsed.message }, { status: 400 });
  }

  const supabase = createClient(await cookies());

  const { data, error } = await supabase
    .from("features")
    .update(parsed.value)
    .eq("id", id)
    .select(FEATURE_COLUMNS)
    .maybeSingle();

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  if (!data) {
    const { status, message } = await explainNoRowsAffected(supabase, id);
    return Response.json({ error: message }, { status });
  }

  return Response.json(data);
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  const { id } = await params;

  if (!UUID_PATTERN.test(id)) {
    return Response.json({ error: "기능을 찾을 수 없습니다." }, { status: 404 });
  }

  const supabase = createClient(await cookies());

  const { data, error } = await supabase
    .from("features")
    .delete()
    .eq("id", id)
    .select("id")
    .maybeSingle();

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  if (!data) {
    const { status, message } = await explainNoRowsAffected(supabase, id);
    return Response.json({ error: message }, { status });
  }

  return new Response(null, { status: 204 });
}
