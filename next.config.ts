import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    API_KEY: "b71417abae15ca44c5afb71187cd139c",
    API_URL: "https://api.openweathermap.org/data/2.5/forecast",
  },
};

export default nextConfig;
