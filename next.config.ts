import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  images: {
    remotePatterns: [
      new URL('https://vjcqyljtcvdapntxkrsi.supabase.co/**')
    ]
  },
};

export default nextConfig;
