"use client";

import { useState } from "react";
import PageCityWather from "./component/page-city-wather";

export default function Home() {
  const [city, setCity] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const handleAddData = (e: React.FormEvent) => {
    e.preventDefault();
    setSelectedCity(city);
    setCity("");
  };

  return (
    <div className="p-4 w-full h-screen mx-auto flex flex-col justify-center items-center">
      <h1 className="text-xl font-bold pb-6">Weather Forecast</h1>
      <form className="mb-4" onSubmit={handleAddData}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
          className="border border-background rounded-lg px-2 py-2 mr-2  focus:outline-1 focus:outline-background"
        />
        <button
          type="submit"
          className="bg-[#183769] text-white px-4 py-2 rounded-lg"
        >
          Add
        </button>
      </form>
      {selectedCity && <PageCityWather city={selectedCity} />}
    </div>
  );
}
