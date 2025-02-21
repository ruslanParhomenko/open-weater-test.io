"use client";

import React, { useState } from "react";
import { useInputCity } from "../context/input-city";
import { useData } from "../hooks/useData";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

import ButtonFavoritCity from "../ui/button-favorit-city";

type Parameter = "temp" | "pressure" | "humidity" | "windSpeed";

const parameterDetails: Record<Parameter, { label: string; unit: string }> = {
  temp: { label: "Температура (°C)", unit: "°C" },
  pressure: { label: "Давление (hPa)", unit: "hPa" },
  humidity: { label: "Влажность (%)", unit: "%" },
  windSpeed: { label: "Скорость ветра (м/с)", unit: "м/с" },
};

interface WeatherItem {
  dt_txt: string;
  main: { temp: number; pressure: number; humidity: number };
  wind: { speed: number };
}

interface GroupedData {
  [day: string]: {
    day: string;
    temp: number;
    pressure: number;
    humidity: number;
    windSpeed: number;
    count: number;
  };
}

interface FormattedData {
  day: string;
  temp: string;
  pressure: string;
  humidity: string;
  windSpeed: string;
}

export default function PageCityWeather() {
  const { selectedCity } = useInputCity();

  const { weatherData, loading, error } = useData(selectedCity);
  console.log(weatherData);
  const [selectedParam, setSelectedParam] = useState<Parameter>("temp");

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  if (!weatherData?.list) return <p>Нет данных для отображения</p>;

  const groupedData: GroupedData = weatherData.list.reduce(
    (acc: GroupedData, item: WeatherItem) => {
      const date = item.dt_txt.split(" ")[0];
      const day = date.split("-")[2];
      const tempCelsius = item.main.temp - 273.15;

      if (!acc[day]) {
        acc[day] = {
          day,
          temp: tempCelsius,
          pressure: item.main.pressure,
          humidity: item.main.humidity,
          windSpeed: item.wind.speed,
          count: 1,
        };
      } else {
        acc[day].temp += tempCelsius;
        acc[day].pressure += item.main.pressure;
        acc[day].humidity += item.main.humidity;
        acc[day].windSpeed += item.wind.speed;
        acc[day].count += 1;
      }

      return acc;
    },
    {}
  );

  const formattedData: FormattedData[] = Object.values(groupedData).map(
    (day) => ({
      day: day.day,
      temp: (day.temp / day.count).toFixed(1),
      pressure: (day.pressure / day.count).toFixed(1),
      humidity: (day.humidity / day.count).toFixed(1),
      windSpeed: (day.windSpeed / day.count).toFixed(1),
    })
  );

  const { label, unit } = parameterDetails[selectedParam];

  const CustomTooltip = ({ payload, label }: any) => {
    if (!payload || !payload.length) return null;

    const data = payload[0].payload;
    return (
      <div className="bg-white p-2 rounded-lg ">
        <p className="font-semibold">{`День: ${label}`}</p>
        <p>{`Температура: ${data.temp} °C`}</p>
        <p>{`Давление: ${data.pressure} hPa`}</p>
        <p>{`Влажность: ${data.humidity} %`}</p>
        <p>{`Скорость ветра: ${data.windSpeed} м/с`}</p>
      </div>
    );
  };

  const handleChange = (event: SelectChangeEvent<Parameter>) => {
    // Изменяем тип события
    setSelectedParam(event.target.value as Parameter);
  };
  return (
    <div className=" border border-background bg-white rounded-3xl w-full max-w-[400px]   flex flex-col justify-center items-center">
      <ButtonFavoritCity />
      <div className="flex justify-between items-center w-full py-4 px-6">
        <h1 className="text-xl text-foreground font-bold pb-1">
          {weatherData.city.name}
        </h1>

        <FormControl>
          <Select
            labelId="param-select-label"
            id="param-select"
            value={selectedParam}
            onChange={handleChange}
            className="text-foreground"
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              height: "20px",
            }}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 220,
                },
              },
            }}
          >
            {Object.keys(parameterDetails).map((param) => (
              <MenuItem key={param} value={param}>
                {parameterDetails[param as Parameter].unit}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={formattedData}>
          <XAxis dataKey="day" stroke="#24506457" />
          <YAxis
            stroke="#24506457"
            domain={["auto", "auto"]}
            allowDataOverflow={true}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey={selectedParam} fill="#385179" name={label} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
