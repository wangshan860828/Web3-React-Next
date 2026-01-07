import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: config => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding', 'porto')
    return config
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'salmon-fashionable-elk-908.mypinata.cloud',
      },
    ],
  },
};

export default nextConfig;
