/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/Web",
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
