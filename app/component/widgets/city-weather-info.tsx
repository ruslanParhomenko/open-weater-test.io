import BarChartComponent from "../bar-chart";
import ButtonFavoritCity from "../ui/button-favorit-city";

export default function CityWeather() {
  return (
    <div className=" border border-background bg-white rounded-3xl w-full max-w-[360px]   flex flex-col justify-center items-center">
      <ButtonFavoritCity />
      <BarChartComponent />
    </div>
  );
}
