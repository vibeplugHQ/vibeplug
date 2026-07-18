import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "결제 완료 — Vibeplug",
  description: "결제가 완료되었습니다.",
};

// 토스가 successUrl로 리다이렉트하며 붙여 주는 값들(paymentKey·orderId·amount 등)을
// 그대로 화면에 보여 준다. 승인은 여기서 하지 않는다.
export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;

  const entries = Object.entries(params).map(([key, value]) => ({
    key,
    value: Array.isArray(value) ? value.join(", ") : (value ?? ""),
  }));

  return (
    <main className="mx-auto max-w-layout-md px-field-md py-section-md sm:py-section-lg">
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
            전달받은 결제 정보
          </h2>
          {entries.length > 0 ? (
            <dl className="mt-inline-lg divide-y divide-border border-y border-border">
              {entries.map(({ key, value }) => (
                <div
                  key={key}
                  className="flex items-start justify-between gap-field-md py-field-md"
                >
                  <dt className="text-body-md text-muted-foreground">{key}</dt>
                  <dd className="min-w-0 break-all text-right font-mono text-body-md text-foreground">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          ) : (
            <p className="mt-inline-lg text-body-md text-muted-foreground">
              전달받은 값이 없습니다.
            </p>
          )}
        </section>

        <Link
          href="/features"
          className="mt-field-lg inline-flex items-center text-body-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          기능 목록으로 →
        </Link>
      </article>
    </main>
  );
}
