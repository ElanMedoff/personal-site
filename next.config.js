/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost", "elanmed.dev"],
  },
  productionBrowserSourceMaps: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false };
    return config;
  },
  // handle myself
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreBuildErrors: true },
};

module.exports = nextConfig;
