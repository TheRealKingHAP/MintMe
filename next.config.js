/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images:{
    domains: ['robohash.org', 'i.redd.it', 's3.amazonaws.com', 'avatars.dicebear.com', 'raw.githubusercontent.com']
  }
}

module.exports = nextConfig
