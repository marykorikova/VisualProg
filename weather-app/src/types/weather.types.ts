export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}
export interface Temperature {
  day: number;
  min: number;
  max: number;
  night: number;
  eve: number;
  morn: number;
}
export interface DailyWeather {
  dt: number;
  temp: Temperature;
  feels_like: Temperature;
  pressure: number;
  humidity: number;
  weather: WeatherCondition[];
  wind_speed: number;
  wind_deg: number;
  clouds: number;
  pop: number;
  rain?: number;
}
export interface WeatherResponse {
    message?:number;
  city: {
    id: number;
    name: string;
    country: string;
    timezone: number;
  };
  list: DailyWeather[];
  cod: string;
}
export type WeatherType = 
  | 'clear'     
  | 'rain'       
  | 'clouds'   
  | 'snow'      
  | 'thunderstorm' 
  | 'drizzle'    // Моросит
  | 'mist';     


export interface ThemeConfig {
  backgroundColor: string;
  textColor: string;
  accentColor: string;
}