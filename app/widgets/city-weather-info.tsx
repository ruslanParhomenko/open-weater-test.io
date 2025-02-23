import BarChartComponent from "../component/bar-chart";

export default function CityWeather() {
  return (
    <div className=" border border-background bg-white rounded-3xl w-full max-w-[340px] min-h-10 px-4 flex flex-col justify-center items-center">
      <BarChartComponent />
    </div>
  );
}
