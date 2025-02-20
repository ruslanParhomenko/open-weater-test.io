"use client";

import { useEffect, useState } from "react";

import { useData } from "../hooks/useData";

export default function PageCityWather({ city }: { city: string }) {
  const { weatherData, loading, error } = useData(city);
  console.log("weatherData", weatherData);

  return <>{loading ? <div>Loading...</div> : <div>page</div>}</>;
}
