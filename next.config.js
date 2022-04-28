/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['http://localhost:3000', 'https://www.nobetci-eczane.net'],
  },
  i18n: {
    locales: ['tr-TR'],
    defaultLocale: 'tr-TR'
  },
  domains: [
    'http://localhost:3000',
    'https://www.nobetci-eczane.net'
  ]

}

module.exports = nextConfig
