import type { Metadata } from "next";
import { requireUser } from "@/lib/auth";
import { CartList, type CartLineItem } from "./cart-list";

export const metadata: Metadata = {
  title: "장바구니 — Vibeplug",
  description: "장바구니에 담은 기능을 확인하고 주문하세요.",
};

// cart 를 features 와 조인해 담긴 기능의 이름·가격을 함께 읽는다.
// features(...) 는 단일 FK라 객체 하나로 내려온다.
type CartRow = {
  feature_id: string;
  features: { id: string; name: string; price: number } | null;
};

export default async function CartPage() {
  // 로그인하지 않은 사용자는 로그인 페이지로 보낸다.
  const { supabase } = await requireUser();

  const { data } = await supabase
    .from("cart")
    .select("feature_id, features(id, name, price)")
    .order("feature_id");

  const items: CartLineItem[] = ((data as CartRow[] | null) ?? [])
    .map((row) =>
      row.features
        ? {
            featureId: row.features.id,
            name: row.features.name,
            price: row.features.price,
          }
        : null,
    )
    .filter((item): item is CartLineItem => item !== null);

  return (
    <main className="mx-auto max-w-layout-md px-field-md py-section-md sm:py-section-lg">
      <h1 className="text-display-md tracking-tight text-foreground">장바구니</h1>
      <CartList initialItems={items} />
    </main>
  );
}
