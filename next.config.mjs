/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static HTML export -> deployable to GitHub Pages (no server, no backend).
  output: 'export',

  // GitHub Pages serves plain files; next/image optimisation needs a server.
  images: { unoptimized: true },

  // Emit /about/index.html instead of /about.html so static hosts resolve
  // clean URLs without a trailing-slash redirect.
  trailingSlash: true,

  reactStrictMode: true,

  // Never let a lint nit or a stray type break the production deploy.
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  compiler: {
    // Strip console.* from the client bundle in production (keep errors).
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },

  experimental: {
    // Tree-shake these down to only the icons/helpers actually imported.
    optimizePackageImports: ['framer-motion', 'gsap'],
  },

  productionBrowserSourceMaps: false,
};

export default nextConfig;
