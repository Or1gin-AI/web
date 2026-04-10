import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/docs/",
        destination: "/docs",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/docs",
        destination: "/docs/index.html",
      },
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
