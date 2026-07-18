"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/cart-context";

/**
 * "장바구니 담기" 버튼.
 * 이미 담긴 기능이면 "담기 완료" 상태로 비활성화된다(initialInCart).
 * 담기에 성공하면 그 자리에서 "담기 완료"로 바뀌고, GNB 뱃지는 CartProvider가 갱신한다.
 * 세션이 없으면(401) 로그인 페이지로 보낸다.
 */
export function AddToCartButton({
  featureId,
  initialInCart,
}: {
  featureId: string;
  initialInCart: boolean;
}) {
  const router = useRouter();
  const { add } = useCart();
  const [inCart, setInCart] = useState(initialInCart);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    setLoading(true);
    setError(null);

    const res = await add(featureId);

    if (res.status === 401) {
      router.push("/login");
      return;
    }

    if (!res.ok) {
      setError(res.error ?? "장바구니에 담지 못했어요. 잠시 후 다시 시도해 주세요.");
      setLoading(false);
      return;
    }

    setInCart(true);
    setLoading(false);
  };

  const label = inCart ? "담기 완료" : loading ? "담는 중…" : "장바구니 담기";

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        disabled={inCart || loading}
        className="flex h-12 w-full items-center justify-center border border-border bg-card px-field-md text-label-lg text-foreground transition-colors hover:border-neutral-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-52"
      >
        {label}
      </button>
      {error && (
        <p className="mt-text-sm text-body-sm text-destructive" role="alert">
          {error}
        </p>
      )}
    </>
  );
}
