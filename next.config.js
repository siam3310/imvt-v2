/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "**",
          },
          {
            protocol: "http",
            hostname: "**",
          },
        ],
        // formats: ['image/webp'],
        formats: ["image/avif", "image/webp"],
        minimumCacheTTL: 60,
      },
}

module.exports = nextConfig
