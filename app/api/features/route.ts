import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export async function GET() {
  const supabase = createClient(await cookies());

  const { data, error } = await supabase
    .from("features")
    .select("id, name, description, category, price")
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

  const { name, description, category, price } = (body ?? {}) as Record<string, unknown>;

  if (
    typeof name !== "string" ||
    typeof description !== "string" ||
    typeof category !== "string" ||
    !name.trim() ||
    !description.trim() ||
    !category.trim()
  ) {
    return Response.json({ error: "모든 항목을 입력해주세요." }, { status: 400 });
  }

  const parsedPrice = Number(price);

  if (!Number.isFinite(parsedPrice) || parsedPrice < 0) {
    return Response.json({ error: "가격은 0 이상의 숫자여야 합니다." }, { status: 400 });
  }

  const supabase = createClient(await cookies());

  const { data, error } = await supabase
    .from("features")
    .insert({
      name: name.trim(),
      description: description.trim(),
      category: category.trim(),
      price: parsedPrice,
    })
    .select("id, name, description, category, price")
    .single();

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json(data, { status: 201 });
}
