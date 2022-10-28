/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  concurrentFeatures: true,
  trailingSlash: true,
  images: {
    domains: ["images.unsplash.com", "res.cloudinary.com"],
  },
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
