import type { NextConfig } from 'next'

const isProd = process.env.NODE_ENV === 'production'

const REPO_NAME = 'Demo_Log-Intelligence'

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  // Setting up GitHub Pages
  output: 'export',
  basePath: isProd ? `/${REPO_NAME}` : '',
  assetPrefix: isProd ? `/${REPO_NAME}/` : '',
  images: {
    unoptimized: true,
  },
}

export default nextConfig
