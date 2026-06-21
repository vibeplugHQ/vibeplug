import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-ink text-[#ededf0]">{children}</body>
    </html>
  );
}
