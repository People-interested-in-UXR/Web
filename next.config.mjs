/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ufrjplzdvmnqkncmrifp.supabase.co",
      },
    ],
  },
};

export default nextConfig;
