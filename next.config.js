/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost"],
    remotePatterns: [
      {
        hostname: "**",
        pathname: "/uploads/images/**",
      },
    ],
  },
};

module.exports = nextConfig;
