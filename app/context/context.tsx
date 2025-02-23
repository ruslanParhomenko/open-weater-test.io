"use client";

import {
  useContext,
  createContext,
  useState,
  ReactNode,
  useReducer,
} from "react";

import {
  ContextType,
  Parameter,
  Action,
  CityDataType,
} from "../type/data-type";

const ValueContext = createContext<ContextType | undefined>(undefined);

const initialState: CityDataType[] = [];

function reducer(state: CityDataType[], action: Action): CityDataType[] {
  switch (action.type) {
    case "ADD_FAVORIT":
      return [...state, action.payload];
    case "REMOVE_FAVORIT":
      return state.filter((city) => city.city.id !== action.payload.city.id);
    default:
      return state;
  }
}

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedParam, setSelectedParam] = useState<Parameter>("temp");
  const [state, dispatch] = useReducer(reducer, initialState);

  const value: ContextType = {
    selectedCity,
    setSelectedCity,
    selectedParam,
    setSelectedParam,
    state,
    dispatch,
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
