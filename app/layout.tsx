import type { Metadata } from "next";
import localFont from "next/font/local";
import { cookies } from "next/headers";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { CartProvider } from "@/components/cart-context";
import { createClient } from "@/utils/supabase/server";

// Pretendard — body / UI / headings (--font-sans, --font-heading in globals.css)
const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  weight: "45 920",
  display: "swap",
});

// JetBrains Mono — code / terminal (--font-mono in globals.css)
const jetbrainsMono = localFont({
  src: "./fonts/JetBrainsMono[wght].ttf",
  variable: "--font-jetbrains-mono",
  weight: "100 800",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vibeplug — The full-stack shadcn",
  description:
    "A marketplace of full-stack features you copy, own, and ship. Auth, payments, AI, realtime — frontend, API, and database in one command: npx vibeplug add.",
  metadataBase: new URL("https://vibeplug.dev"),
  openGraph: {
    title: "Vibeplug — The full-stack shadcn",
    description:
      "Copy-paste full-stack features for your app. Frontend, API, and database wired together. One command to install.",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // GNB 를 로그인 상태에 맞춰 그리려면 서버에서 현재 사용자를 읽어 전달한다.
  const supabase = createClient(await cookies());
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const headerUser = user
    ? {
        name:
          user.user_metadata?.full_name ??
          user.user_metadata?.name ??
          user.email ??
          "사용자",
        avatarUrl:
          user.user_metadata?.avatar_url ??
          user.user_metadata?.picture ??
          null,
      }
    : null;

  // GNB 장바구니 뱃지의 초기 개수. 로그인하지 않았으면 뱃지 자체를 숨기므로 0으로 둔다.
  let cartCount = 0;
  if (user) {
    const { count } = await supabase
      .from("cart")
      .select("feature_id", { count: "exact", head: true });
    cartCount = count ?? 0;
  }

  return (
    <html
      lang="ko"
      className={`dark ${pretendard.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <CartProvider initialCount={cartCount}>
          <SiteHeader user={headerUser} />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
