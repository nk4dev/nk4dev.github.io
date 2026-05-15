
import { defineCloudflareConfig } from "@opennextjs/cloudflare";

/** @type {import('next').NextConfig} */
const nextConfig = {
plugins: [
    defineCloudflareConfig()
  ],
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.microcms-assets.io",
      },
    ],
  },
};

export default nextConfig;
