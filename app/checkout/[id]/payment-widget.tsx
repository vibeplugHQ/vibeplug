"use client";

import { useCallback, useRef, useState } from "react";
import Script from "next/script";

// 토스페이먼츠 v2 결제위젯 SDK(https://js.tosspayments.com/v2/standard)가 브라우저에
// 붙여 주는 전역 객체의 최소 타입. 우리가 실제로 쓰는 메서드만 좁게 선언한다.
type Widgets = {
  setAmount: (amount: { currency: string; value: number }) => Promise<void>;
  renderPaymentMethods: (options: {
    selector: string;
    variantKey?: string;
  }) => Promise<unknown>;
  renderAgreement: (options: {
    selector: string;
    variantKey?: string;
  }) => Promise<unknown>;
  requestPayment: (options: {
    orderId: string;
    orderName: string;
    successUrl: string;
    failUrl: string;
  }) => Promise<void>;
};

type TossPaymentsInstance = {
  widgets: (options: { customerKey: string }) => Widgets;
};

type TossPaymentsSdk = ((clientKey: string) => TossPaymentsInstance) & {
  ANONYMOUS: string;
};

declare global {
  interface Window {
    TossPayments?: TossPaymentsSdk;
  }
}

// .env.local의 클라이언트 키. NEXT_PUBLIC_ 접두사라 빌드 시 그대로 인라인된다.
const CLIENT_KEY = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY;

/**
 * 주문서의 결제 수단 영역. 토스페이먼츠 결제위젯을 그리고, 결제하기를 누르면
 * 결제창을 띄운다.
 *
 * - 결제 금액(amount)은 서버가 DB에서 읽어 내려준 주문 총액을 그대로 쓴다.
 * - 토스에 넘기는 orderId는 우리 주문의 id다.
 * - 결제 승인은 여기서 하지 않는다. 성공하면 /checkout/success,
 *   실패·중단이면 /checkout/fail 로 토스가 리다이렉트한다.
 */
export function PaymentWidget({
  orderId,
  orderName,
  amount,
}: {
  orderId: string;
  orderName: string;
  amount: number;
}) {
  const widgetsRef = useRef<Widgets | null>(null);
  const [ready, setReady] = useState(false);
  const [requesting, setRequesting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // SDK 스크립트가 로드되면 위젯을 초기화하고 결제 UI를 그린다.
  const initWidgets = useCallback(async () => {
    const TossPayments = window.TossPayments;

    if (!TossPayments || !CLIENT_KEY) {
      setError("결제 모듈을 불러오지 못했어요. 잠시 후 다시 시도해 주세요.");
      return;
    }

    try {
      const tossPayments = TossPayments(CLIENT_KEY);
      // 비회원 결제이므로 익명 customerKey를 사용한다.
      const widgets = tossPayments.widgets({
        customerKey: TossPayments.ANONYMOUS,
      });

      // 결제 금액은 DB에서 온 총액. 렌더 전에 반드시 설정한다.
      await widgets.setAmount({ currency: "KRW", value: amount });

      await Promise.all([
        widgets.renderPaymentMethods({
          selector: "#payment-method",
          variantKey: "DEFAULT",
        }),
        widgets.renderAgreement({
          selector: "#agreement",
          variantKey: "AGREEMENT",
        }),
      ]);

      widgetsRef.current = widgets;
      setReady(true);
    } catch {
      setError("결제 위젯을 그리지 못했어요. 잠시 후 다시 시도해 주세요.");
    }
  }, [amount]);

  const handlePay = useCallback(async () => {
    const widgets = widgetsRef.current;
    if (!widgets) return;

    setRequesting(true);
    setError(null);

    try {
      // 결제창을 띄운다. 성공/실패 시 토스가 아래 URL로 리다이렉트한다.
      // (successUrl에는 paymentKey·orderId·amount, failUrl에는 code·message·orderId가 붙는다.)
      await widgets.requestPayment({
        orderId,
        orderName,
        successUrl: `${window.location.origin}/checkout/success`,
        failUrl: `${window.location.origin}/checkout/fail`,
      });
    } catch {
      // 사용자가 결제창을 닫는 등으로 요청이 중단된 경우. 페이지에 머무른다.
      setError("결제가 진행되지 않았어요. 다시 시도해 주세요.");
      setRequesting(false);
    }
  }, [orderId, orderName]);

  return (
    <>
      <Script
        src="https://js.tosspayments.com/v2/standard"
        strategy="afterInteractive"
        onLoad={initWidgets}
        onError={() =>
          setError("결제 모듈을 불러오지 못했어요. 잠시 후 다시 시도해 주세요.")
        }
      />

      {/* 결제 수단 선택 UI */}
      <div id="payment-method" className="mt-inline-lg" />
      {/* 약관 동의 UI */}
      <div id="agreement" className="mt-field-md" />

      {error && (
        <p className="mt-field-md text-body-sm text-destructive" role="alert">
          {error}
        </p>
      )}

      <button
        type="button"
        onClick={handlePay}
        disabled={!ready || requesting}
        className="mt-field-lg flex h-12 w-full items-center justify-center bg-primary px-field-md text-label-lg text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {requesting
          ? "결제창 여는 중…"
          : ready
            ? "결제하기"
            : "결제 수단 불러오는 중…"}
      </button>
    </>
  );
}
