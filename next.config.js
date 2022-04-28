/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['http://localhost:3000'],
  },
  i18n: {
    locales: ['tr-TR'],
    defaultLocale: 'tr-TR'
  },
  domains: [
    'http://localhost:3000'
  ]

}

module.exports = nextConfig
