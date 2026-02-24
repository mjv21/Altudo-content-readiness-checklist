import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
 async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' https://*.sitecorecloud.io https://*.sitecore.com https://*.sitecorecontenthub.cloud",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
