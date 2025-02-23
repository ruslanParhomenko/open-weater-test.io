"use client";

import { useState, useEffect } from "react";
import axios, { isCancel } from "axios";

export const useData = (city: string) => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_KEY = process.env.API_KEY;
  const API_URL = process.env.API_URL;

  useEffect(() => {
    if (!city) {
      setWeatherData(null);
      setError(null);
      return;
    }

    if (!API_KEY || !API_URL) {
      setError("API keys or URL are missing in the environment variables.");
      return;
    }

    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `${API_URL}?q=${city}&limit=1&appid=${API_KEY}`,
          { signal }
        );
        setWeatherData(response.data);
      } catch (err: any) {
        if (isCancel(err)) {
          return;
        }
        console.error("Data loading error:", err);
        setError(err.message || "Failed to load weather data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [city, API_KEY, API_URL]);

  return { weatherData, loading, error };
};
