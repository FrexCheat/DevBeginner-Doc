import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

const rewrites = async () => {
  return [
    {
      source: '/mirror/api/:slug*',
      destination: (process.env.PROXY_DOMAIN || 'http://undefined.domain') + '/api/:slug*',
    },
  ];
};

/** @type {import('next').NextConfig} */
const config = {
  output: 'export',
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    unoptimized: true,
    dangerouslyAllowSVG: true,
  },
};
if (process.env.NODE_ENV === 'development') {
  config.output = undefined;
  config.rewrites = rewrites;
}

export default withMDX(config);
