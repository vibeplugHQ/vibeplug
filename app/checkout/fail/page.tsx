import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "결제 실패 — Vibeplug",
  description: "결제가 완료되지 못했습니다.",
};

// 토스가 failUrl로 리다이렉트하며 붙여 주는 실패 사유(code·message)를 안내하고,
// 장바구니로 돌아갈 수 있는 링크를 보여 준다.
export default async function CheckoutFailPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const message = typeof params.message === "string" ? params.message : null;
  const code = typeof params.code === "string" ? params.code : null;

  return (
    <main className="mx-auto max-w-layout-md px-field-md py-section-md sm:py-section-lg">
      <article className="mt-grid-gutter-x">
        <header className="border-b border-border pb-field-lg">
          <span className="inline-flex w-fit items-center rounded-full border border-border px-field-sm py-text-xs text-caption text-destructive">
            결제 실패
          </span>
          <h1 className="mt-text-md text-balance text-display-md tracking-tight text-foreground">
            결제가 완료되지 못했습니다
          </h1>
          <p className="mt-text-md text-body-md text-muted-foreground">
            {message ?? "결제가 중단되었거나 처리되지 않았어요. 다시 시도해 주세요."}
            {code && (
              <span className="ml-inline-md font-mono text-caption text-tertiary">
                ({code})
              </span>
            )}
          </p>
        </header>

        <Link
          href="/cart"
          className="mt-field-lg inline-flex h-12 w-full items-center justify-center bg-primary px-field-md text-label-lg text-primary-foreground transition-opacity hover:opacity-90"
        >
          장바구니로 돌아가기
        </Link>
      </article>
    </main>
  );
}
