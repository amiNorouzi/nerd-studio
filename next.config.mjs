import bundleAnalyzer from "@next/bundle-analyzer";
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
    dest: "public/pwa",
    cacheOnFrontEndNav: true,
    aggressiveFrontEndNavCaching: true,
    reloadOnOnline: true,
    swcMinify: true,
    // disable: process.env.NODE_ENV === "development",
    workboxOptions: {
        disableDevLogs: true,
    },
});

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
            {
                protocol: 'https',
                hostname: 'nerdstudio-backend-bucket.s3.amazonaws.com',
            }
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

const config = withPWA(nextConfig);
export default process.env.ANALYZE === "true" ? withBundleAnalyzer(config) : config;
