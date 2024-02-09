/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wallpaperaccess.com',
        port: '',
        pathname: '/full/752715.jpg',
      },
    ],
  },
};

export default nextConfig;
