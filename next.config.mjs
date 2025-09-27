import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

const rewrites = async () => {
  if (process.env.NODE_ENV === 'production') {
    return [];
  }
  return [
    {
      source: '/mirror/api/:slug*',
      destination: process.env.PROXY_DOMAIN || '' + '/api/:slug*',
    },
  ];
};

/** @type {import('next').NextConfig} */
const config = {
  output: 'export',
  reactStrictMode: true,
  rewrites,
  images: {
    unoptimized: true,
    dangerouslyAllowSVG: true,
  },
};

export default withMDX(config);
