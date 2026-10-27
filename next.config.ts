import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/vyklad",
        destination: "/makro-204/vyklad",
        permanent: true,
      },
      {
        source: "/vyklad/:path*",
        destination: "/makro-204/vyklad/:path*",
        permanent: true,
      },
      {
        source: "/vzorce",
        destination: "/makro-204/vzorce",
        permanent: true,
      },
      {
        source: "/grafy",
        destination: "/makro-204/grafy",
        permanent: true,
      },
      {
        source: "/grafy/:path*",
        destination: "/makro-204/grafy/:path*",
        permanent: true,
      },
      {
        source: "/test",
        destination: "/makro-204/test",
        permanent: true,
      },
      {
        source: "/test/:path*",
        destination: "/makro-204/test/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
