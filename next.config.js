const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    BACKEND_API: "https://capstone.marcusnguyen.dev/api",
  },
  webpack: (config) => {
    config.resolve.alias["@"] = path.join(__dirname);
    return config;
  },
};

module.exports = nextConfig;
