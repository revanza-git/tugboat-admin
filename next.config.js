/** @type {import('next').NextConfig} */
require("dotenv").config();

const nextConfig = {
  basePath: process.env.NEXT_PUBLIC_BASEPATH,
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
};

module.exports = nextConfig;
