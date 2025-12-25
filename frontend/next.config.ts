import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      new URL(`${process.env.NEXT_PUBLIC_BASE_PATH}/**.jpg`),
      new URL(`${process.env.NEXT_PUBLIC_BASE_PATH_LARGE}/**.jpg`),
      new URL("https://img.youtube.com/vi/**"),
    ],
  },
};

export default nextConfig;
