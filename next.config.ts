import type {NextConfig} from 'next';
const nextConfig: NextConfig = {
  /* config options here */
  serverExternalPackages: ['genkit', '@genkit-ai/googleai', 'firebase'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
       {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
    
