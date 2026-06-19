import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  // Static caching for /public assets so the browser doesn't re-request them
  // on every navigation. The aggressive max-age is safe because we ship
  // fingerprinted assets through next/image for everything else.
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|jpeg|png|webp|ico|woff2)',
        locale: false,
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ]
  },
  images: {
    // Compress + resize on the fly so a 3MB source JPEG stops being the
    // dominant LCP contributor.
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  experimental: {
    // React 19 / Next 16 default; explicit for documentation.
    optimizePackageImports: ['lucide-react'],
  },
  turbopack: {
    root: __dirname,
  },
}

export default nextConfig

