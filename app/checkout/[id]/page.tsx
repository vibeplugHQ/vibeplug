import type { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { createClient } from "@/utils/supabase/server";
import { formatPrice } from "@/components/feature-card";

export const metadata: Metadata = {
  title: "주문서 — Vibeplug",
  description: "주문 내용을 확인하고 결제를 진행하세요.",
};

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

type OrderItem = {
  price: number;
  feature: { name: string } | null;
};

type Order = {
  id: string;
  total: number;
  status: string;
  order_items: OrderItem[];
};

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // 로그인하지 않은 사용자는 로그인 페이지로 보낸다.
  await requireUser();

  const { id } = await params;

  if (!UUID_PATTERN.test(id)) {
    notFound();
  }

  const supabase = createClient(await cookies());

  // RLS가 본인 주문만 내려주므로, 남의 주문 id로는 여기서 아무것도 조회되지 않는다.
  // 항목 가격은 주문 시점에 order_items에 저장된 값을 그대로 보여준다.
  const { data, error } = await supabase
    .from("orders")
    .select("id, total, status, order_items(price, feature:features(name))")
    .eq("id", id)
    .maybeSingle<Order>();

  if (error) {
    throw new Error("주문을 불러오지 못했습니다.");
  }

  if (!data) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-layout-md px-field-md py-section-md sm:py-section-lg">
      <Link
        href="/features"
        className="inline-flex items-center text-body-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        ← 기능 목록으로
      </Link>

      <article className="mt-grid-gutter-x">
        <header className="border-b border-border pb-field-lg">
          <span className="inline-flex w-fit items-center rounded-full border border-border px-field-sm py-text-xs text-caption text-muted-foreground">
            주문 {data.status}
          </span>
          <h1 className="mt-text-md text-balance text-display-md tracking-tight text-foreground">
            주문서
          </h1>
        </header>

        <section className="mt-field-lg">
          <h2 className="text-title-3 tracking-tight text-foreground">주문 내역</h2>
          <ul className="mt-inline-lg divide-y divide-border border-y border-border">
            {data.order_items.map((item, index) => (
              <li
                key={index}
                className="flex items-center justify-between gap-field-md py-field-md"
              >
                <span className="text-body-md text-foreground">
                  {item.feature?.name ?? "알 수 없는 기능"}
                </span>
                <span className="font-mono text-body-md text-foreground">
                  {formatPrice(item.price)}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-field-md flex items-center justify-between gap-field-md">
            <span className="text-label-lg text-foreground">총액</span>
            <span className="font-mono text-title-2 text-foreground">
              {formatPrice(data.total)}
            </span>
          </div>
        </section>

        {/* 결제 수단 — 아직 결제 기능은 붙이지 않았다. */}
        <section className="mt-field-lg">
          <h2 className="text-title-3 tracking-tight text-foreground">결제 수단</h2>
          <div className="mt-inline-lg flex min-h-40 items-center justify-center rounded-2xl border border-dashed border-border bg-card p-field-lg text-center">
            <p className="text-body-md text-muted-foreground">
              결제 수단 선택이 여기에 들어갑니다
            </p>
          </div>
        </section>
      </article>
    </main>
  );
}
