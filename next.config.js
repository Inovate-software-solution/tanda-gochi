/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env:{
    BACKEND_API:"http://localhost:4000"
  }
}

module.exports = nextConfig
