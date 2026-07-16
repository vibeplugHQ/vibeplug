import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 구글 계정 프로필 사진을 next/image 로 최적화해 보여주기 위해 허용한다.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

export default nextConfig;
