import { createMDX } from 'fumadocs-mdx/next';

import { defineCloudflareConfig } from "@opennextjs/cloudflare";

const withMDX = createMDX();

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

export default withMDX(nextConfig);
