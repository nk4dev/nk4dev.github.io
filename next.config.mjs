const VRCHAT_PROFILE =
  "https://vrchat.com/home/user/usr_3c0e5ebc-16db-4f61-bdfb-88ff8385a7d4";

// 短縮URL。ページを描画せずサーバー側で飛ばすので、GA の page_view も発火しない。
// 飛び先が変わる可能性があるので一時的な移動(307)にする。
const shortLinks = {
  "/g": "https://github.com/nk4dev",
  "/rd2/github": "https://github.com/nk4dev",
  "/i": "https://instagram.com/nk4dev",
  "/q": "https://qiita.com/amamiya_dev",
  "/x": "https://x.com/nk4dev",
  "/vrchat": VRCHAT_PROFILE,
  "/l/vx": "https://github.com/nk4dev/vx3",
  "/l/vx/sdk": "https://github.com/nk4dev/vx",
  "/l/vx/docs": "https://nknighta.me/vx",
  "/l/vx/searchrepo": "https://github.com/nk4dev?tab=repositories&q=vx",
  "/l/xnv": "https://github.com/nknighta/xnv",
  "/dev/vx3-mcp": "https://nk4dev.gitmcp.io/vx3",
  "/vrcmeikan": "https://vrc-meikan.com/profile/11e503fa-63d2-445f-9b6a-812853492eb4",
  "/nk4dev": "/",
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 既定値。"/blog/foo/" は "/blog/foo" へ 308 で自動リダイレクトされる
  trailingSlash: false,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.microcms-assets.io",
      },
    ],
  },
  async redirects() {
    return [
      // 旧記事URL → 新URL(恒久的な移動 = 308)
      { source: "/articles", destination: "/blog", permanent: true },
      { source: "/articles/:slug*", destination: "/blog/:slug*", permanent: true },
      ...Object.entries(shortLinks).map(([source, destination]) => ({
        source,
        destination,
        permanent: false,
      })),
    ];
  },
};

export default nextConfig;
