import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();
const rewrites = async () => {
  return [
    // {
    //   source: '/mirror/api/:slug*',
    //   destination: 'http://xxxx/api/:slug*',
    // },
  ];
};

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  rewrites,
};

export default withMDX(config);
