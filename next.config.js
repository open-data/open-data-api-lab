/** @type {import('next').NextConfig} */
const isExport = process.env.NEXT_EXPORT == 'true';

const nextConfig = {
  allowedDevOrigins: ['0.0.0.0', '127.0.0.1'],
  output: 'export', // static site generations
  basePath: isExport ? '/open-data-api-lab' : '',
  assetPrefix: isExport ? '/open-data-api-lab/' : '',
  trailingSlash: false,
  images: {
    unoptimized: true,
  },
  transpilePackages: [
    'react-shiki',
    'datatables.net-react',
    'datatables.net-bs5',
  ],
  experimental: {
    optimizePackageImports: ['@phosphor-icons/react'],
  },
};

module.exports = nextConfig;
