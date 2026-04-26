/** @type {import('next').NextConfig} */

import { defineCloudflareConfig } from "@opennextjs/cloudflare";

//export default defineCloudflareConfig();

//vercel and cloudflare 用

const nextConfig = {
  plugins: [
    defineCloudflareConfig()
  ],
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.microcms-assets.io",
        },
    ],
  },
};

export default nextConfig;