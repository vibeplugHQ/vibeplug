"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/cart-context";
import { formatPrice } from "@/components/feature-card";

export type CartLineItem = {
  featureId: string;
  name: string;
  price: number;
};

/**
 * 장바구니 목록. 담긴 기능의 이름·가격·빼기 버튼, 합계, 주문하기 버튼을 그린다.
 * 빼기를 누르면 그 자리에서 항목을 지우고(합계·목록 즉시 갱신), GNB 뱃지는
 * CartProvider가 서버 응답 개수로 갱신한다. 마지막 항목까지 빼면 빈 상태를 보여준다.
 */
export function CartList({ initialItems }: { initialItems: CartLineItem[] }) {
  const router = useRouter();
  const { remove } = useCart();
  const [items, setItems] = useState(initialItems);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [ordering, setOrdering] = useState(false);

  const handleRemove = async (featureId: string) => {
    setRemovingId(featureId);
    setError(null);

    const res = await remove(featureId);

    if (!res.ok) {
      setError(res.error ?? "빼지 못했어요. 잠시 후 다시 시도해 주세요.");
      setRemovingId(null);
      return;
    }

    setItems((prev) => prev.filter((item) => item.featureId !== featureId));
    setRemovingId(null);
  };

  // 담긴 기능 전부로 주문을 만들고, 만들어진 주문서 페이지로 이동한다.
  // 가격·총액은 서버가 DB에서 직접 읽어 저장하므로 여기서는 금액을 넘기지 않는다.
  const handleOrder = async () => {
    if (items.length === 0) return;

    setOrdering(true);
    setError(null);

    try {
      const res = await fetch("/api/orders/from-cart", { method: "POST" });

      if (res.status === 401) {
        router.push("/login");
        return;
      }

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.error ?? "주문을 만들지 못했어요. 잠시 후 다시 시도해 주세요.");
        setOrdering(false);
        return;
      }

      const { id } = await res.json();
      router.push(`/checkout/${id}`);
    } catch {
      setError("주문을 만들지 못했어요. 잠시 후 다시 시도해 주세요.");
      setOrdering(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="mt-grid-gutter-x flex min-h-60 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card p-field-lg text-center">
        <p className="text-body-md text-muted-foreground">장바구니가 비어 있어요.</p>
        <Link
          href="/features"
          className="mt-field-md inline-flex items-center rounded-lg bg-primary px-field-md py-field-sm text-label-lg text-primary-foreground transition-opacity hover:opacity-90"
        >
          기능 목록 보러 가기
        </Link>
      </div>
    );
  }

  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="mt-grid-gutter-x">
      <ul className="border-t border-border">
        {items.map((item) => (
          <li
            key={item.featureId}
            className="flex items-center justify-between gap-field-md border-b border-border py-field-md"
          >
            <Link
              href={`/features/${item.featureId}`}
              className="min-w-0 flex-1 truncate text-body-md text-foreground transition-colors hover:text-muted-foreground"
            >
              {item.name}
            </Link>
            <span className="font-mono text-body-md text-foreground">
              {formatPrice(item.price)}
            </span>
            <button
              type="button"
              onClick={() => handleRemove(item.featureId)}
              disabled={removingId === item.featureId}
              className="shrink-0 rounded-lg border border-border px-field-sm py-field-sm text-label-md text-muted-foreground transition-colors hover:border-neutral-700 hover:text-foreground disabled:opacity-60"
            >
              {removingId === item.featureId ? "빼는 중…" : "빼기"}
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-field-md flex items-center justify-between">
        <span className="text-label-lg text-muted-foreground">합계</span>
        <span className="font-mono text-title-2 text-foreground">
          {formatPrice(total)}
        </span>
      </div>

      {error && (
        <p className="mt-text-sm text-body-sm text-destructive" role="alert">
          {error}
        </p>
      )}

      {/* 주문하기 — 담긴 기능 전부로 주문을 만들고 주문서 페이지로 이동한다. */}
      <button
        type="button"
        onClick={handleOrder}
        disabled={ordering || items.length === 0}
        className="mt-field-lg flex h-12 w-full items-center justify-center bg-primary px-field-md text-label-lg text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {ordering ? "주문 만드는 중…" : "주문하기"}
      </button>
    </div>
  );
}
