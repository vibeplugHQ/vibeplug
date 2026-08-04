import type { MetadataRoute } from "next";

const baseUrl = "https://vibeplug.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // 로그인이 필요하거나 색인 가치가 없는 경로는 크롤링에서 제외한다.
      disallow: ["/api/", "/auth/", "/login", "/cart", "/checkout/", "/mypage"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
