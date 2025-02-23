"use client";

import InputSearch from "./ui/input-city-search";
import CityWeather from "./widgets/city-weather-info";
import { useSwipeable } from "react-swipeable";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const left = "/favorits";
  const right = "/";
  const handlers = useSwipeable({
    onSwipedLeft: () => router.push(left),
    onSwipedRight: () => router.push(right),
  });
  return (
    <div
      {...handlers}
      className="flex flex-col justify-start gap-4 items-center  w-full h-screen mx-auto pt-7"
    >
      <CityWeather />
      <InputSearch />
    </div>
  );
}
