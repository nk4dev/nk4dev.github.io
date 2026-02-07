/** @type {import('next').NextConfig} */

/*
 GitHub Pages用
*/
/*

module.exports = {
  // GitHub Pages用の静的エクスポート設定
  output: "export",
  trailingSlash: true,

  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.microcms-assets.io",
      },
    ],
  },
  // styled-jsx サポート
  //experimental: {
  //  styledComponents: true,
  //},
};


vercel and cloudflare 用
*/
module.exports = {
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

import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();