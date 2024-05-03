import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer();

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    output: "standalone",
    images: {
        minimumCacheTTL: 2592000, // 1 month
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
            },
            {
                protocol: 'https',
                hostname: 'u398193.your-storagebox.de',
            },
        ]
    },
    async headers() {
        return [
            {
                source: "/:all*(svg|jpg|png|webp|woff2|ttf|woff)",
                locale: false,
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=2592000, must-revalidate",
                    },
                ],
            },
        ];
    },
    webpack(config, context) {
        config.externals.push({ canvas: 'commonjs canvas' })
        return config
    },
};

export default process.env.ANALYZE === "true" ? withBundleAnalyzer(nextConfig) : nextConfig;
