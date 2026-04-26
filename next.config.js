/** @type {import('next').NextConfig} */



//vercel and cloudflare 用

const nextConfig = {
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