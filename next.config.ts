import { clientEnv } from "@/env/client";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  images: {
    remotePatterns: [
      new URL('https://mzjcajrbjkzcwyvcgzfo.supabase.co/**')
    ]
  },
};

export default nextConfig;
