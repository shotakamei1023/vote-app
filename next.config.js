/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "flowbite.s3.amazonaws.com",
        port: "",
        pathname: "/blocks/marketing-ui/avatars/sofia-mcguire.png",
      },
    ],
  },
};

module.exports = nextConfig;
