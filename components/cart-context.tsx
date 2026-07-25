"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

// 장바구니 담긴 개수를 앱 전체에서 공유하는 클라이언트 상태.
// 초기값은 서버 레이아웃에서 세어 넘겨주고(initialCount), 담기/빼기 API 응답으로
// 받은 최신 개수로 갱신한다. GNB 뱃지와 담기 버튼이 같은 값을 즉시 바라보게 한다.
type CartResult = { ok: boolean; status: number; error?: string };

type CartContextValue = {
  count: number;
  add: (featureId: string) => Promise<CartResult>;
  remove: (featureId: string) => Promise<CartResult>;
  setCount: (count: number) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({
  initialCount,
  children,
}: {
  initialCount: number;
  children: ReactNode;
}) {
  const [count, setCount] = useState(initialCount);

  const mutate = useCallback(
    async (featureId: string, method: "POST" | "DELETE"): Promise<CartResult> => {
      try {
        const res = await fetch("/api/cart", {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ feature_id: featureId }),
        });

        const data = await res.json().catch(() => null);

        if (!res.ok) {
          return { ok: false, status: res.status, error: data?.error };
        }

        // 서버가 돌려준 최신 개수로 뱃지를 바로 갱신한다.
        if (data && typeof data.count === "number") {
          setCount(data.count);
        }

        return { ok: true, status: res.status };
      } catch {
        return { ok: false, status: 0 };
      }
    },
    [],
  );

  const add = useCallback((featureId: string) => mutate(featureId, "POST"), [mutate]);
  const remove = useCallback(
    (featureId: string) => mutate(featureId, "DELETE"),
    [mutate],
  );

  return (
    <CartContext.Provider value={{ count, add, remove, setCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart는 CartProvider 안에서만 사용할 수 있습니다.");
  }
  return ctx;
}
