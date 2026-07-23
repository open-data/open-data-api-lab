/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['0.0.0.0', '127.0.0.1'],
  output: 'export', // static site generations
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
