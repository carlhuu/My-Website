import type { NextConfig } from "next";
import webpack from 'webpack';

const nextConfig: NextConfig = {
  // Required for server components to access env vars
  env: {
    SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
    SPOTIFY_REFRESH_TOKEN: process.env.SPOTIFY_REFRESH_TOKEN,
    STRAVA_CLIENT_ID: process.env.STRAVA_CLIENT_ID,
    STRAVA_CLIENT_SECRET: process.env.STRAVA_CLIENT_SECRET,
    STRAVA_REFRESH_TOKEN: process.env.STRAVA_REFRESH_TOKEN
  },
  // Recommended additional settings
  reactStrictMode: true,
  swcMinify: true,
  // Ensure Webpack includes env vars
  webpack: (config) => {
    config.plugins.push(new webpack.EnvironmentPlugin([
      'SPOTIFY_CLIENT_ID',
      'SPOTIFY_CLIENT_SECRET',
      'SPOTIFY_REFRESH_TOKEN',
      'STRAVA_CLIENT_ID',
      'STRAVA_CLIENT_SECRET',
      'STRAVA_REFRESH_TOKEN'
    ]));
    return config;
  }
};

export default nextConfig;