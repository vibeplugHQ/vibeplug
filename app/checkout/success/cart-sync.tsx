"use client";

import { useEffect } from "react";
import { useCart } from "@/components/cart-context";

// 결제 성공 화면에서 서버가 장바구니를 비운 뒤, GNB 뱃지를 실제 남은 개수로 맞춘다.
// CartProvider는 레이아웃 위에 있어 페이지 이동만으로는 값이 갱신되지 않으므로,
// 서버가 계산한 최신 개수를 마운트 시 한 번 반영한다.
export function CartSync({ count }: { count: number }) {
  const { setCount } = useCart();

  useEffect(() => {
    setCount(count);
  }, [count, setCount]);

  return null;
}
