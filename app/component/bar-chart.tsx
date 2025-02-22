"use client";
import { useContextValue } from "../context/context";
import { useData } from "../hooks/useData";
import ButtonFavoritCity from "../ui/button-favorit-city";

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
  GroupedData,
  WeatherItem,
  FormattedData,
  Parameter,
} from "../type/data-type";
import FormSelect from "../ui/form-select";

export default function BarChartComponent() {
  const { selectedCity, selectedParam } = useContextValue();
  console.log("selectedCity", selectedCity);

  const { weatherData, loading, error } = useData(selectedCity);
  console.log("weatherData", weatherData);
  if (loading) return <p>LOADING...</p>;
  if (error) return <p>ERROR: {error}</p>;

  if (!weatherData?.list)
    return <p className="text-[#011a42]">NO DATA AVAILABLE</p>;

  const groupedData: GroupedData = weatherData?.list.reduce(
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

  const formattedData: FormattedData[] = Object.values(groupedData)?.map(
    (day) => ({
      day: day.day,
      temp: (day.temp / day.count).toFixed(1),
      pressure: (day.pressure / day.count).toFixed(1),
      humidity: (day.humidity / day.count).toFixed(1),
      windSpeed: (day.windSpeed / day.count).toFixed(1),
    })
  );

  const parameterDetails: Record<Parameter, { label: string; unit: string }> = {
    temp: { label: "Температура (°C)", unit: "°C" },
    pressure: { label: "Давление (hPa)", unit: "hPa" },
    humidity: { label: "Влажность (%)", unit: "%" },
    windSpeed: { label: "Скорость ветра (м/с)", unit: "м/с" },
  };
  const { label } = parameterDetails[selectedParam];
  const CustomTooltip = ({ payload, label }: any) => {
    if (!payload || !payload.length) return null;

    const data = payload[0].payload;
    return (
      <div className="bg-white p-1 rounded-lg text-xs ">
        <p className="font-semibold">{`day: ${label}`}</p>
        <p>{`Temperature: ${data.temp} °C`}</p>
        <p>{`Pressure: ${data.pressure} hPa`}</p>
        <p>{`Humidity: ${data.humidity} %`}</p>
        <p>{`Wind speed: ${data.windSpeed} m/s`}</p>
      </div>
    );
  };

  return (
    <div className="flex flex-col justify-between items-center w-full py-4 px-6">
      <ButtonFavoritCity />
      <h1 className="text-3xl text-foreground font-bold pb-3">
        {weatherData.city.name.toUpperCase()}
      </h1>

      <ResponsiveContainer width="95%" height={300}>
        <BarChart
          data={formattedData}
          margin={{ top: 20, bottom: 10, right: 0, left: -20 }}
        >
          <Tooltip content={<CustomTooltip />} />
          <XAxis dataKey="day" stroke="#011a42" tick={{ fontSize: 14 }} />
          <YAxis
            stroke="#011a42"
            domain={["auto", "auto"]}
            allowDataOverflow={true}
            tick={{ fontSize: 14 }}
          />
          {/* <Legend /> */}
          <Bar dataKey={selectedParam} fill="#385179" name={label} />
        </BarChart>
      </ResponsiveContainer>
      <FormSelect parameterDetails={parameterDetails} />
    </div>
  );
}
