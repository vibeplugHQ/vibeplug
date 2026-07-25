import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { createAdminClient } from "@/utils/supabase/admin";
import { formatPrice } from "@/components/feature-card";
import { confirmTossPayment } from "@/lib/toss";
import { CartSync } from "./cart-sync";

export const metadata: Metadata = {
  title: "결제 완료 — Vibeplug",
  description: "결제가 완료되었습니다.",
};

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

type OrderItem = {
  feature_id: string;
  feature: { name: string } | null;
};

type Order = {
  id: string;
  total: number;
  status: string;
  order_items: OrderItem[];
};

// 승인 과정 어디서든 실패하면 이 함수로 실패 페이지에 보낸다.
// redirect()는 렌더를 즉시 중단하는 예외를 던지므로 반환 타입은 never다.
function toFail(message: string): never {
  redirect(`/checkout/fail?message=${encodeURIComponent(message)}`);
}

// 토스가 successUrl로 리다이렉트하며 붙여 준 paymentKey·orderId·amount를 받아,
// 성공 화면을 보여주기 전에 서버가 먼저 결제를 승인한다.
//
//  1) 값 검증 → 2) orderId로 본인 주문 조회(RLS) → 3) 총액과 amount 대조
//  → 4) 시크릿 키로 토스 승인 API 호출 → 5) status를 paid로(서버 시크릿 키)
//  → 6) 주문한 기능을 장바구니에서 제거 → 7) 여기까지 성공해야 성공 화면 표시.
//
// 어느 단계든 어긋나면 승인하지 않고 실패 페이지로 보낸다.
export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;

  const paymentKey =
    typeof params.paymentKey === "string" ? params.paymentKey : null;
  const orderId = typeof params.orderId === "string" ? params.orderId : null;
  const amountRaw = typeof params.amount === "string" ? params.amount : null;

  // 필수 값이 없거나 orderId 형식이 이상하면 승인하지 않는다.
  if (!paymentKey || !orderId || !amountRaw || !UUID_PATTERN.test(orderId)) {
    toFail("결제 정보가 올바르지 않습니다.");
  }

  const amount = Number(amountRaw);
  if (!Number.isFinite(amount) || amount <= 0) {
    toFail("결제 금액이 올바르지 않습니다.");
  }

  // 로그인한 사용자 세션(RLS 적용)으로 조회한다. 로그인하지 않았으면 로그인 페이지로.
  const { supabase, user } = await requireUser();

  // orders SELECT RLS는 user_id = auth.uid()로 제한된다. 따라서 존재하지 않는
  // 주문이거나 본인의 주문이 아니면 여기서 아무것도 내려오지 않는다.
  const { data: order, error } = await supabase
    .from("orders")
    .select("id, total, status, order_items(feature_id, feature:features(name))")
    .eq("id", orderId)
    .maybeSingle<Order>();

  if (error) {
    toFail("주문을 확인하지 못했습니다.");
  }

  // 존재하지 않는 주문이거나 본인의 주문이 아님.
  if (!order) {
    toFail("주문을 찾을 수 없습니다.");
  }

  // 이미 결제됐거나(paid) 취소된 주문은 다시 승인하지 않는다.
  if (order.status !== "pending") {
    toFail("이미 처리된 주문입니다.");
  }

  // 승인 API를 호출하기 전에, DB에 저장된 주문 총액과 결제 금액이 같은지 대조한다.
  // (total은 numeric이라 문자열로 내려오므로 Number로 맞춘다.) 다르면 승인하지 않는다.
  if (Number(order.total) !== amount) {
    toFail("결제 금액이 주문 금액과 일치하지 않습니다.");
  }

  // 금액이 일치하므로 시크릿 키로 토스페이먼츠 결제 승인 API를 호출한다.
  const payment = await confirmTossPayment({ paymentKey, orderId, amount });
  if (!payment) {
    toFail("결제 승인에 실패했습니다.");
  }

  // 승인 성공. 여기부터는 RLS에 orders UPDATE 정책이 없어 사용자 세션으로는 바꿀 수
  // 없으므로, 서버 전용 시크릿 키 클라이언트로 처리한다.
  const admin = createAdminClient();

  // status를 paid로 바꾼다. 아직 pending일 때만 바꿔 이중 처리를 막는다.
  const { error: updateError } = await admin
    .from("orders")
    .update({ status: "paid" })
    .eq("id", order.id)
    .eq("status", "pending");

  if (updateError) {
    toFail("결제 상태를 저장하지 못했습니다.");
  }

  // 주문한 기능들을 이 사용자의 장바구니에서 뺀다. 시크릿 키는 RLS를 우회하므로
  // user_id로 대상 행을 반드시 직접 좁힌다.
  const featureIds = order.order_items
    .map((item) => item.feature_id)
    .filter((id): id is string => typeof id === "string");

  if (featureIds.length > 0) {
    await admin
      .from("cart")
      .delete()
      .eq("user_id", user.id)
      .in("feature_id", featureIds);
  }

  // 장바구니를 비운 뒤 실제 남은 개수를 세어, GNB 뱃지를 이 값으로 맞춘다.
  // (주문에 담기지 않았던 다른 기능이 장바구니에 남아 있을 수 있으므로 다시 센다.)
  const { count: remainingCartCount } = await admin
    .from("cart")
    .select("feature_id", { count: "exact", head: true })
    .eq("user_id", user.id);

  // 여기까지 전부 성공했을 때만 성공 화면을 보여 준다. 전달받은 원시 값 대신
  // 주문한 기능들의 이름과 결제 금액을 보여 준다.
  const featureNames = order.order_items.map(
    (item) => item.feature?.name ?? "알 수 없는 기능",
  );

  // "구매한 기능 보기" 버튼이 향할 기능 상세 페이지. 주문의 첫 기능으로 연결한다.
  const detailFeatureId = featureIds[0] ?? null;

  return (
    <main className="mx-auto max-w-layout-md px-field-md py-section-md sm:py-section-lg">
      {/* 서버가 비운 장바구니를 GNB 뱃지에 즉시 반영한다. */}
      <CartSync count={remainingCartCount ?? 0} />
      <article className="mt-grid-gutter-x">
        <header className="border-b border-border pb-field-lg">
          <span className="inline-flex w-fit items-center rounded-full border border-border px-field-sm py-text-xs text-caption text-success">
            결제 성공
          </span>
          <h1 className="mt-text-md text-balance text-display-md tracking-tight text-foreground">
            결제가 완료되었습니다
          </h1>
        </header>

        <section className="mt-field-lg">
          <h2 className="text-title-3 tracking-tight text-foreground">
            주문한 기능
          </h2>
          <ul className="mt-inline-lg divide-y divide-border border-y border-border">
            {featureNames.map((name, index) => (
              <li
                key={index}
                className="flex items-center justify-between gap-field-md py-field-md"
              >
                <span className="text-body-md text-foreground">{name}</span>
              </li>
            ))}
          </ul>

          <div className="mt-field-md flex items-center justify-between gap-field-md">
            <span className="text-label-lg text-foreground">결제 금액</span>
            <span className="font-mono text-title-2 text-foreground">
              {formatPrice(Number(order.total))}
            </span>
          </div>
        </section>

        <div className="mt-field-lg flex flex-wrap items-center gap-field-md">
          <Link
            href={detailFeatureId ? `/features/${detailFeatureId}` : "/mypage/features"}
            className="inline-flex h-12 items-center justify-center bg-primary px-field-lg text-label-lg text-primary-foreground transition-opacity hover:opacity-90"
          >
            구매한 기능 보기
          </Link>
          <Link
            href="/features"
            className="inline-flex items-center text-body-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            기능 목록으로 →
          </Link>
        </div>
      </article>
    </main>
  );
}
