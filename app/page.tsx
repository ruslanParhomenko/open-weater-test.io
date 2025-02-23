import Header from "./component/header";
import CityWeather from "./widgets/city-weather-info";

export default function Home() {
  return (
    <div className="flex flex-col justify-start gap-4 items-center  w-full h-screen mx-auto pt-7">
      <CityWeather />
      <Header />
    </div>
  );
}
