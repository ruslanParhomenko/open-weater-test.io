export interface WeatherItem {
  dt_txt: string;
  main: { temp: number; pressure: number; humidity: number };
  wind: { speed: number };
}

//bar-chart
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

export interface FormattedData {
  day: string;
  temp: string;
  pressure: string;
  humidity: string;
  windSpeed: string;
}

//context
export interface ContextType {
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  selectedParam: Parameter;
  setSelectedParam: (param: Parameter) => void;
  state: CityDataType[];
  dispatch: React.Dispatch<Action>;
}
export type Parameter = "temp" | "pressure" | "humidity" | "windSpeed";
export type Action = {
  type: "ADD_FAVORIT" | "REMOVE_FAVORIT";
  payload: CityDataType;
};

export interface CityDataType {
  city: {
    id: number;
    name: string;
  };
  list: WeatherItem[];
}
