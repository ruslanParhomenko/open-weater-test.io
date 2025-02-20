"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export const useData = async (city: string) => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_KEY_WEATHER = process.env.API_KEY_WEATHER;
  const API_URL = process.env.API_URL;

  if (!API_KEY_WEATHER || !API_URL) {
    setError("API keys or URL are missing in environment variables.");
    setLoading(false);
    return;
  }

  useEffect(() => {
    if (!city) {
      setWeatherData(null);
      setError(null);
      return;
    }

    setLoading(true);
    const fetchData = async () => {
      await axios
        .get(`${API_URL}?q=${city}&appid=${API_KEY_WEATHER}`)
        .then((data) => {
          setWeatherData(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
          setLoading(false);
        });
    };
    fetchData();
  }, [city]);

  return { weatherData, loading, error };
};
