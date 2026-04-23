import type { WeatherResponse } from '../types/weather.types';

export const mockWeatherData: WeatherResponse = {
  cod: "200",
  message: 0,
  city: {
    id: 1496747,
    name: "Novosibirsk",
    country: "RU",
    timezone: 25200
  },
  list: [
    {
      dt: Math.floor(Date.now() / 1000),  
      temp: { day: 12, min: 5, max: 20, night: 10, eve: 16, morn: 9 },
      feels_like: { day: 10, min: 9, max: 19, night: 11, eve: 15, morn: 8 },
      pressure: 1012,
      humidity: 55,
      weather: [{ id: 800, main: "Clear", description: "солнечно", icon: "01d" }],
      wind_speed: 3.2,
      wind_deg: 220,
      clouds: 5,
      pop: 0
    },
    {
      dt: Math.floor(Date.now() / 1000) + 86400, 
      temp: { day: 16, min: 9, max: 17, night: 11, eve: 14, morn: 8 },
      feels_like: { day: 15, min: 5, max: 16, night: 10, eve: 13, morn: 7 },
      pressure: 1010,
      humidity: 62,
      weather: [{ id: 500, main: "Rain", description: "небольшой дождь", icon: "10d" }],
      wind_speed: 4.1,
      wind_deg: 250,
      clouds: 80,
      pop: 0.7,
      rain: 3.5
    },
    {
      dt: Math.floor(Date.now() / 1000) + 172800,  
      temp: { day: 14, min: 8, max: 15, night: 9, eve: 12, morn: 7 },
      feels_like: { day: 13, min: 7, max: 14, night: 8, eve: 11, morn: 6 },
      pressure: 1013,
      humidity: 68,
      weather: [{ id: 803, main: "Clouds", description: "облачно", icon: "04d" }],
      wind_speed: 3.8,
      wind_deg: 240,
      clouds: 85,
      pop: 0.2
    },
    {
      dt: Math.floor(Date.now() / 1000) + 259200,
      temp: { day: 12, min: 6, max: 13, night: 7, eve: 10, morn: 5 },
      feels_like: { day: 11, min: 5, max: 12, night: 6, eve: 9, morn: 4 },
      pressure: 1015,
      humidity: 60,
      weather: [{ id: 800, main: "Clear", description: "солнечно", icon: "01d" }],
      wind_speed: 4.5,
      wind_deg: 30,
      clouds: 90,
      pop: 0.5
    }
  ]
};