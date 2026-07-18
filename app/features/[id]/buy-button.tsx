"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

/**
 * "바로 구매" 버튼.
 * 라우트 핸들러(/api/orders)에 feature_id만 넘겨 주문을 만들고,
 * 만들어진 주문서 페이지(/checkout/[id])로 이동한다.
 * 세션이 없으면(401) 로그인 페이지로 보낸다.
 */
export function BuyButton({ featureId }: { featureId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feature_id: featureId }),
      });

      if (res.status === 401) {
        router.push("/login");
        return;
      }

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.error ?? "주문을 만들지 못했어요. 잠시 후 다시 시도해 주세요.");
        setLoading(false);
        return;
      }

      const { id } = await res.json();
      router.push(`/checkout/${id}`);
    } catch {
      setError("주문을 만들지 못했어요. 잠시 후 다시 시도해 주세요.");
      setLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className="flex h-12 w-full items-center justify-center bg-primary px-field-md text-label-lg text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-52"
      >
        {loading ? "주문 만드는 중…" : "바로 구매"}
      </button>
      {error && (
        <p className="mt-text-sm text-body-sm text-destructive" role="alert">
          {error}
        </p>
      )}
    </>
  );
}
