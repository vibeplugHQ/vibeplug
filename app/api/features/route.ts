import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { FEATURE_COLUMNS, parseFeatureInput } from "@/lib/features";

export async function GET() {
  const supabase = createClient(await cookies());

  const { data, error } = await supabase
    .from("features")
    .select(FEATURE_COLUMNS)
    .order("created_at", { ascending: false })
    .order("id", { ascending: false });

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json(data);
}

export async function POST(request: Request) {
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
    .insert(parsed.value)
    .select(FEATURE_COLUMNS)
    .single();

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json(data, { status: 201 });
}
