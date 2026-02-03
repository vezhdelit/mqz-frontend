import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  images: {
    remotePatterns: [
      new URL('https://mzjcajrbjkzcwyvcgzfo.supabase.co/**')
    ]
  },

  output: "standalone",
  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: 'http://localhost:9999/api/auth/:path*',
      },
    ];
  },
};

export default nextConfig;
