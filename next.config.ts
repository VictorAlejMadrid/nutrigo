import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  allowedDevOrigins: ['172.20.10.5'],
  basePath: process.env.NODE_ENV === 'production' ? '/nutrigo' : '',
};

export default nextConfig;
