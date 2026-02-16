import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: true, // atau false jika redirect sementara
      },
    ];
  },
};

export default nextConfig;
