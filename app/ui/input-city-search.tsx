"use client";

import React, { useState } from "react";

import { useContextValue } from "../context/context";
export default function InputSearch() {
  const [city, setCity] = useState("");
  const { setSelectedCity } = useContextValue();

  const handlerAddData = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      setSelectedCity(city);
      setCity("");
    }
  };

  return (
    <div className="flex flex-col items-center  pt-12">
      <form
        className="mb-4 flex justify-center items-center gap-4"
        onSubmit={handlerAddData}
      >
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
          className="rounded-lg px-4 py-2  outline-1 outline-background"
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
