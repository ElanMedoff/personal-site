/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost", "elanmed.dev"],
  },
  productionBrowserSourceMaps: true,
  /* eslint: { */
  /*   ignoreDuringBuilds: true, */
  /* }, */
  /* typescript: { */
  /*   ignoreBuildErrors: true, */
  /* }, */
};

module.exports = nextConfig;
