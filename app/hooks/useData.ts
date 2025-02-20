"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export const useData = (city: string) => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!city) {
      setWeatherData(null);
      setError(null);
      return;
    }

    const API_KEY_WEATHER = process.env.NEXT_PUBLIC_API_KEY_WEATHER;
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    if (!API_KEY_WEATHER || !API_URL) {
      setError("API keys or URL are missing in environment variables.");
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${API_URL}?q=${city}&appid=${API_KEY_WEATHER}`
        );
        setWeatherData(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setError("Failed to fetch weather data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [city]);

  return { weatherData, loading, error };
};
