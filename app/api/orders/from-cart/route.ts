import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

// cart를 features와 조인해 담긴 기능의 가격을 함께 읽는다.
// features(...)는 단일 FK라 객체 하나로 내려온다(cart 페이지와 같은 형태).
type CartRow = {
  features: { id: string; price: number } | null;
};

// 장바구니 "주문하기"가 호출하는 주문 생성 핸들러.
// 장바구니에 담긴 기능 전부로 orders 1건과 order_items 여러 줄을 만든다.
// 화면에 표시된 가격은 믿지 않는다. cart에 담긴 기능의 가격은 서버가 DB에서 직접 조회하고,
// 그 값으로만 항목 가격과 총액을 저장한다. 주문을 만든 뒤에도 장바구니는 비우지 않는다.
export async function POST() {
  const supabase = createClient(await cookies());

  // 로그인하지 않은 요청은 401로 돌려보내고, 화면에서 로그인 페이지로 이동시킨다.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return Response.json({ error: "로그인이 필요합니다." }, { status: 401 });
  }

  // 담긴 기능과 그 가격을 함께 읽는다. RLS가 본인 cart 행만 내려주고, 가격은
  // features를 조인해 DB에서 직접 읽으므로 클라이언트가 보낸 금액은 저장에 쓰이지 않는다.
  const { data: cartRows, error: cartError } = await supabase
    .from("cart")
    .select("features(id, price)");

  if (cartError) {
    return Response.json({ error: cartError.message }, { status: 500 });
  }

  // 담긴 기능만 남긴다(조회 시점에 사라진 기능은 제외).
  const features = ((cartRows as unknown as CartRow[] | null) ?? [])
    .map((row) => row.features)
    .filter((feature): feature is { id: string; price: number } => feature !== null);

  // 빈 장바구니로는 주문을 만들지 않는다.
  if (features.length === 0) {
    return Response.json({ error: "장바구니가 비어 있습니다." }, { status: 400 });
  }

  // 총액은 DB에서 읽은 가격의 합이다.
  const total = features.reduce((sum, feature) => sum + feature.price, 0);

  // user_id는 orders의 기본값(auth.uid())이 채우고, RLS가 본인 주문만 허용한다.
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({ total, status: "pending" })
    .select("id")
    .single();

  if (orderError || !order) {
    return Response.json(
      { error: orderError?.message ?? "주문을 만들지 못했습니다." },
      { status: 500 },
    );
  }

  // 담긴 기능 수만큼 order_items를 만든다. 가격은 DB에서 읽은 값을 그대로 저장한다.
  const items = features.map((feature) => ({
    order_id: order.id,
    feature_id: feature.id,
    price: feature.price,
  }));

  const { error: itemsError } = await supabase.from("order_items").insert(items);

  if (itemsError) {
    // 항목을 넣지 못하면 방금 만든 빈 주문을 지워 고아 주문이 남지 않게 한다.
    await supabase.from("orders").delete().eq("id", order.id);
    return Response.json({ error: itemsError.message }, { status: 500 });
  }

  return Response.json({ id: order.id }, { status: 201 });
}
