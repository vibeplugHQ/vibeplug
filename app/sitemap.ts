import type { MetadataRoute } from "next";

const baseUrl = "https://vibeplug.app";

// 로그인이 필요한 경로(/cart, /checkout, /mypage)와 인증 경로(/login, /auth)는
// 색인 대상이 아니므로 제외한다.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/features`,
      lastModified,
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];
}
