import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'baes.so',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
