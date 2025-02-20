import { useData } from "../hooks/useData";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function PageCityWather({ city }: any) {
  const { weatherData } = useData(city);
  // const formattedData = weatherData.list.map((item) => ({
  //   time: item.dt_txt,
  //   temp: item.main.temp,
  //   pressure: item.main.pressure,
  //   humidity: item.main.humidity,
  //   wind: item.wind.speed,
  // }));
  return (
    <>
      {weatherData && (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={weatherData}>
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="temp"
              stroke="#8884d8"
              name="Температура"
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </>
  );
}
