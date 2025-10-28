/** @type {import('next').NextConfig} */
module.exports = {
    // GitHub Pages用の静的エクスポート設定
    output: 'export',
    trailingSlash: true,
    
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.microcms-assets.io',
            },
        ],
    },

    // styled-jsx サポート
    experimental: {
        styledComponents: true,
    },

    // 静的エクスポート時はAPIルートとrewritesは使用できないためコメントアウト
    // async rewrites() {
    //     return [
    //         {
    //             source: '/sitemap.xml',
    //             destination: '/api/sitemap',
    //         },
    //     ];
    // },
}