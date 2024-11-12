import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  env: {
    SECRET: process.env.SECRET,
  },
  
};

export default nextConfig;
