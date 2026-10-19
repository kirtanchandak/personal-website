import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/h/kirtan/font",
        destination: "/fonts/kirtan.ttf",
      },
      {
        source: "/h/kirtan/font/",
        destination: "/fonts/kirtan.ttf",
      },
    ];
  },
};

export default nextConfig;
