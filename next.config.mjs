/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  async redirects() {
    return [{ source: '/sitemap', destination: '/sitemap.xml', permanent: true }]
  },
}

export default nextConfig
