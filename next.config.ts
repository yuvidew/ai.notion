import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
      {
        protocol: "https",
        hostname: "enduring-reindeer-434.convex.cloud",
      },
    ],
  },
};

export default nextConfig;
