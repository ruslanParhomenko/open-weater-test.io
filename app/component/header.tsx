"use client";

import React, { useState } from "react";

import { useInputCity } from "../context/input-city";

export default function Header() {
  const [city, setCity] = useState("");
  const { setSelectedCity } = useInputCity();

  const handlerAddData = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      setSelectedCity(city);
      setCity("");
    }
  };

  return (
    <div className="flex flex-col items-center pt-14">
      <h1 className="text-xl font-bold pb-6">Weather Forecast</h1>
      <form className="mb-4" onSubmit={handlerAddData}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
          className="rounded-lg px-2 py-2 mr-2 outline-1 outline-background"
        />
        <button
          type="submit"
          className="bg-foreground text-white px-4 py-2 rounded-lg"
        >
          Add
        </button>
      </form>
    </div>
  );
}
