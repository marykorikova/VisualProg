import type { WeatherResponse, DailyWeather } from '../types/weather.types';
import { mockWeatherData } from './data_mock';

const API_KEY = '5b0221abdd8784d0b0b07c2f943ac06d';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const USE_MOCK = false;  //  true для тестирования без API

export async function fetchWeatherByCoords(lat: number, lon: number, cityName: string): Promise<WeatherResponse> {
  if (USE_MOCK) {
    await new Promise(resolve => setTimeout(resolve, 800));
    return {
      ...mockWeatherData,
      city: { ...mockWeatherData.city, name: cityName }
    };
  }

  try {
    const response = await fetch(
      `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&cnt=40&units=metric&appid=${API_KEY}&lang=ru`
    );
    
    if (!response.ok) {
      throw new Error(`Ошибка API: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('API Response:', data); // Для отладки
    return transformForecastResponse(data, cityName);
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

function transformForecastResponse(apiData: any, cityName: string): WeatherResponse {
  // Группируем прогнозы по дням
  const daysMap = new Map<string, DailyWeather>();
  
  apiData.list.forEach((item: any) => {
    const date = new Date(item.dt * 1000);
    const dateKey = date.toLocaleDateString('ru-RU');
    
    if (!daysMap.has(dateKey)) {
      // Создаём запись для нового дня
      daysMap.set(dateKey, {
        dt: item.dt,
        temp: {
          day: item.main.temp,
          min: item.main.temp_min,
          max: item.main.temp_max,
          night: item.main.temp,
          eve: item.main.temp,
          morn: item.main.temp,
        },
        feels_like: {
          day: item.main.feels_like,
          min: item.main.temp_min,
          max: item.main.temp_max,
          night: item.main.feels_like,
          eve: item.main.feels_like,
          morn: item.main.feels_like,
        },
        pressure: item.main.pressure,
        humidity: item.main.humidity,
        weather: item.weather,
        wind_speed: item.wind.speed,
        wind_deg: item.wind.deg,
        clouds: item.clouds.all,
        pop: item.pop || 0,
        rain: item.rain?.['3h'],
      });
    } else {
      // Обновляем существующий день
      const existing = daysMap.get(dateKey)!;
      
      // Обновляем min/max температуры
      existing.temp.min = Math.min(existing.temp.min, item.main.temp_min);
      existing.temp.max = Math.max(existing.temp.max, item.main.temp_max);
      existing.feels_like.min = Math.min(existing.feels_like.min, item.main.temp_min);
      existing.feels_like.max = Math.max(existing.feels_like.max, item.main.temp_max);
      
      // Если это дневной прогноз (около полудня), обновляем day температуру
      const hour = date.getHours();
      if (hour >= 11 && hour <= 14) {
        existing.temp.day = item.main.temp;
        existing.feels_like.day = item.main.feels_like;
        existing.weather = item.weather; // Обновляем погоду на дневную
      }
    }
  });
  
  // Преобразуем Map в массив и сортируем по дате
  const sortedList = Array.from(daysMap.values())
    .sort((a, b) => a.dt - b.dt)
    .slice(0, 5); // Берём 5 дней
  
  console.log('Transformed data:', sortedList); // Для отладки
  
  return {
    cod: "200",
    message: 0,
    city: {
      id: apiData.city?.id || 0,
      name: cityName,
      country: apiData.city?.country || "RU",
      timezone: apiData.city?.timezone || 25200
    },
    list: sortedList
  };
}