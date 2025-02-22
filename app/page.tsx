import Header from "./component/header";
import CityWeather from "./component/widgets/city-weather-info";

export default function Home() {
  return (
    <div className="flex flex-col justify-start gap-4 items-center  w-full h-screen mx-auto pt-7">
      <Header />
      <CityWeather />
    </div>
  );
}
