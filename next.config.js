/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["https://chat-app-client-yeonghunko.vercel.app"],
    remotePatterns: [
      {
        hostname: "**",
        pathname: "/uploads/images/**",
      },
      {
        hostname: "lh3.googleusercontent.com",
        pathname: "/**/**",
      },
    ],
  },
};

module.exports = nextConfig;
