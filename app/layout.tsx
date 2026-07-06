import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`dark ${pretendard.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">{children}</body>
    </html>
  );
}
