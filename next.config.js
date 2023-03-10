/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images:{
    domains: ['robohash.org', 'i.redd.it', 's3.amazonaws.com', 'avatars.dicebear.com', 'raw.githubusercontent.com', 'res.cloudinary.com']
  }
}

module.exports = nextConfig
