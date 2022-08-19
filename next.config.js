/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["localhost", "elanmed.dev"],
  },
  productionBrowserSourceMaps: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
