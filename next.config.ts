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
      {
        protocol: "https",
        hostname: "utmost-goldfinch-340.convex.cloud",
      },
    ],
  },
};

export default nextConfig;
