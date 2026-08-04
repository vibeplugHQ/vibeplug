import type { MetadataRoute } from "next";

// Next.js 가 <link rel="manifest"> 를 자동으로 주입한다.
// 아이콘은 URL 이 고정되어야 하므로 app/icon.png 대신 public/icons/ 를 참조한다.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "바이브플러그 — 완성된 기능을 내 프로젝트에",
    short_name: "바이브플러그",
    description:
      "프론트엔드와 API, 데이터베이스가 한 세트로 — 명령어 한 줄로 설치하고, 코드는 온전히 당신의 것이 됩니다.",
    start_url: "/",
    display: "standalone",
    lang: "ko",
    // 사이트가 다크를 기본으로 그리므로 --neutral-1000 (ink) 값을 맞춘다.
    background_color: "#08080a",
    theme_color: "#08080a",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
