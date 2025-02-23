"use client";

import {
  useContext,
  createContext,
  useState,
  ReactNode,
  useReducer,
} from "react";

import { ContextType, Parameter } from "../type/data-type";

const ValueContext = createContext<ContextType | undefined>(undefined);

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedParam, setSelectedParam] = useState<Parameter>("temp");

  const value: ContextType = {
    selectedCity,
    setSelectedCity,
    selectedParam,
    setSelectedParam,
  };

  return (
    <ValueContext.Provider value={value}>{children}</ValueContext.Provider>
  );
};

export const useContextValue = (): ContextType => {
  const context = useContext(ValueContext);
  if (!context) {
    throw new Error("useInputCity must be used within a InputCityProvider");
  }
  return context;
};
