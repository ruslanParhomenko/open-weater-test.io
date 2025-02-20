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

    const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
    const API_URL_WEATHER = process.env.NEXT_PUBLIC_API_URL_WEATHER;
    const API_URL_LOCAL = process.env.NEXT_PUBLIC_API_URL_LOCAL;

    const controller = new AbortController(); // Перенес объявление выше
    const { signal } = controller;

    const fetchData = async () => {
      setLoading(true);

      try {
        const geoResponse = await axios.get(
          `${API_URL_LOCAL}?q=${city}&limit=1&appid=${API_KEY}`,
          { signal }
        );

        if (!geoResponse.data.length) {
          throw new Error("Город не найден");
        }

        const lat = parseFloat(geoResponse.data[0].lat).toFixed(2);
        const lon = parseFloat(geoResponse.data[0].lon).toFixed(2);

        const weatherRes = await axios.get(
          `${API_URL_WEATHER}?lat=${lat}&lon=${lon}&appid=${API_KEY}`,
          { signal }
        );

        setWeatherData(weatherRes.data);
        setError(null);
      } catch (err: any) {
        if (axios.isCancel(err)) return;
        console.error("Ошибка загрузки данных:", err);
        setError(err.message || "Не удалось загрузить данные о погоде");
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => controller.abort(); // Теперь `controller` всегда определен
  }, [city]);

  console.log(weatherData);

  return { weatherData, loading, error };
};
