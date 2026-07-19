// 토스페이먼츠 결제 승인(confirm) API 호출. 서버 전용.
//
// 결제창에서 인증을 마치면 successUrl로 paymentKey·orderId·amount가 돌아온다.
// 이 값들로 승인 API를 호출해야 실제 결제가 확정된다(인증만으로는 확정되지 않는다).
// 시크릿 키는 NEXT_PUBLIC_ 접두사가 없어 클라이언트로 인라인되지 않으며, 이 모듈은
// 서버에서만 import한다.
//
// 참고(토스페이먼츠 v2 결제위젯 연동 문서):
//   POST https://api.tosspayments.com/v1/payments/confirm
//   Authorization: Basic base64("{시크릿 키}:")   ← 키 뒤에 콜론을 붙여 인코딩
//   body: { paymentKey, orderId, amount }

const CONFIRM_URL = "https://api.tosspayments.com/v1/payments/confirm";
const SECRET_KEY = process.env.TOSS_SECRET_KEY;

// 승인이 완료된 결제(Payment) 객체 중 화면·로그에 쓰는 최소 필드만 좁게 선언한다.
export type TossPayment = {
  orderId: string;
  orderName: string;
  status: string;
  totalAmount: number;
  method: string | null;
  approvedAt: string;
};

// 승인에 성공하면 Payment 객체를, 실패하면 null을 돌려준다.
// (호출부가 null이면 실패 페이지로 보내도록, 예외를 던지지 않고 null로 통일한다.)
export async function confirmTossPayment({
  paymentKey,
  orderId,
  amount,
}: {
  paymentKey: string;
  orderId: string;
  amount: number;
}): Promise<TossPayment | null> {
  if (!SECRET_KEY) {
    return null;
  }

  // 시크릿 키 뒤에 콜론을 붙여 base64로 인코딩한 Basic 인증 헤더.
  const authorization = `Basic ${Buffer.from(`${SECRET_KEY}:`).toString("base64")}`;

  let response: Response;
  try {
    response = await fetch(CONFIRM_URL, {
      method: "POST",
      headers: {
        Authorization: authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ paymentKey, orderId, amount }),
      // 승인은 매번 실제로 호출해야 하므로 캐시하지 않는다.
      cache: "no-store",
    });
  } catch {
    // 네트워크 오류 등으로 요청 자체가 실패한 경우.
    return null;
  }

  // 승인 실패는 4XX·5XX로 온다. 200 OK일 때만 결제가 확정된 것으로 본다.
  if (!response.ok) {
    return null;
  }

  return (await response.json()) as TossPayment;
}
