import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// "바로 구매"가 호출하는 주문 생성 핸들러.
// 화면에 표시된 가격은 믿지 않는다. feature_id만 받아 서버가 DB에서 직접 가격을 조회하고,
// 그 값으로 orders 1건과 order_items 1줄을 만든다.
export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "요청 형식이 올바르지 않습니다." }, { status: 400 });
  }

  const featureId = (body as Record<string, unknown> | null)?.feature_id;

  if (typeof featureId !== "string" || !UUID_PATTERN.test(featureId)) {
    return Response.json({ error: "기능을 찾을 수 없습니다." }, { status: 404 });
  }

  const supabase = createClient(await cookies());

  // 로그인하지 않은 요청은 401로 돌려보내고, 화면에서 로그인 페이지로 이동시킨다.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return Response.json({ error: "로그인이 필요합니다." }, { status: 401 });
  }

  // 가격은 반드시 DB에서 직접 읽는다. 클라이언트가 보낸 금액은 저장에 쓰지 않는다.
  const { data: feature, error: featureError } = await supabase
    .from("features")
    .select("id, price")
    .eq("id", featureId)
    .maybeSingle();

  if (featureError) {
    return Response.json({ error: featureError.message }, { status: 500 });
  }

  if (!feature) {
    return Response.json({ error: "기능을 찾을 수 없습니다." }, { status: 404 });
  }

  // 단일 기능 주문이므로 총액은 그 기능의 가격과 같다.
  // user_id는 orders의 기본값(auth.uid())이 채우고, RLS가 본인 주문만 허용한다.
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({ total: feature.price, status: "pending" })
    .select("id")
    .single();

  if (orderError || !order) {
    return Response.json(
      { error: orderError?.message ?? "주문을 만들지 못했습니다." },
      { status: 500 },
    );
  }

  const { error: itemError } = await supabase
    .from("order_items")
    .insert({ order_id: order.id, feature_id: feature.id, price: feature.price });

  if (itemError) {
    // 주문 항목을 넣지 못하면 방금 만든 빈 주문을 지워 고아 주문이 남지 않게 한다.
    await supabase.from("orders").delete().eq("id", order.id);
    return Response.json({ error: itemError.message }, { status: 500 });
  }

  return Response.json({ id: order.id }, { status: 201 });
}
