"use client";

import { useContext, createContext, useState, ReactNode } from "react";

interface InputCityContextType {
  selectedCity: string;
  setSelectedCity: (city: string) => void;
}

const InputCityContext = createContext<InputCityContextType | undefined>(
  undefined
);

export const InputCityProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCity, setSelectedCity] = useState<string>("");

  const value: InputCityContextType = {
    selectedCity,
    setSelectedCity,
  };

  return (
    <InputCityContext.Provider value={value}>
      {children}
    </InputCityContext.Provider>
  );
};

export const useInputCity = (): InputCityContextType => {
  const context = useContext(InputCityContext);
  if (!context) {
    throw new Error("useInputCity must be used within a InputCityProvider");
  }
  return context;
};
