export interface GroupedData {
  [day: string]: {
    day: string;
    temp: number;
    pressure: number;
    humidity: number;
    windSpeed: number;
    count: number;
  };
}

export interface WeatherItem {
  dt_txt: string;
  main: { temp: number; pressure: number; humidity: number };
  wind: { speed: number };
}

export interface FormattedData {
  day: string;
  temp: string;
  pressure: string;
  humidity: string;
  windSpeed: string;
}

export type Parameter = "temp" | "pressure" | "humidity" | "windSpeed";

export interface ContextType {
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  selectedParam: Parameter;
  setSelectedParam: (param: Parameter) => void;
}
