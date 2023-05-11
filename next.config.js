/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost", "elanmed.dev"],
  },
  productionBrowserSourceMaps: true,
  swcMinify: false,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false };

    return config;
  },
  publicRuntimeConfig: {
    APP_ENV: process.env.APP_ENV,
  },
};

module.exports = nextConfig;
