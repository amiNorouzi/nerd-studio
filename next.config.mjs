/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    output: "standalone",
    images: {
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
    webpack: (
        config,
        { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
    ) => {
        config.externals.push({ canvas: 'commonjs canvas' })
        return config
    },
};

export default nextConfig;
