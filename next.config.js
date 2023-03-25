/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images:{
    domains: ['raw.githubusercontent.com', 'res.cloudinary.com']
  }
}

module.exports = nextConfig
