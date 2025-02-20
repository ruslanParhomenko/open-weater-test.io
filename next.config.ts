import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    API_KEY_WEATHER: "73ea0e243f5c86c68663da2605bc6483",
    API_URL: "https://api.openweathermap.org/data/2.5/forecast",
  },
};

export default nextConfig;
