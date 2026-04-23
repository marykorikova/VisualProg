import type { WeatherType, ThemeConfig } from '../types/weather.types';

export function formatDate(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  const days = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
  const months = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 
                  'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
  
  const dayOfWeek = days[date.getDay()];
  const day = date.getDate();
  const month = months[date.getMonth()];
  
  return `${dayOfWeek}, ${day} ${month}`;
}

export function getWeatherType(weatherId: number): WeatherType {
  if (weatherId === 800) return 'clear';           
  if (weatherId >= 200 && weatherId < 300) return 'thunderstorm';
  if (weatherId >= 300 && weatherId < 400) return 'drizzle';       // Моросит
  if (weatherId >= 500 && weatherId < 600) return 'rain';          
  if (weatherId >= 600 && weatherId < 700) return 'snow';         
  if (weatherId >= 700 && weatherId < 800) return 'mist';          
  if (weatherId >= 801 && weatherId <= 804) return 'clouds';       
  return 'clear';
}

export function getThemeByWeather(weatherType: WeatherType): ThemeConfig {
  const themes: Record<WeatherType, ThemeConfig> = {
    clear: {   
      backgroundColor: 'linear-gradient(135deg, #f5af19, #f12711)',
      textColor: '#ffffff',
      accentColor: '#ffd700'
    },
    rain: {    
      backgroundColor: 'linear-gradient(135deg, #2c3e50, #3498db)',
      textColor: '#ffffff',
      accentColor: '#6dd5fa'
    },
    clouds: {  
      backgroundColor: 'linear-gradient(135deg, #757f9a, #d7dde8)',
      textColor: '#333333',
      accentColor: '#5c6bc0'
    },
    snow: {   
      backgroundColor: 'linear-gradient(135deg, #e6e9f0, #ffffff)',
      textColor: '#2c3e50',
      accentColor: '#4fc3f7'
    },
    thunderstorm: {  
      backgroundColor: 'linear-gradient(135deg, #141e30, #243b55)',
      textColor: '#ffffff',
      accentColor: '#ffeb3b'
    },
    drizzle: {  
      backgroundColor: 'linear-gradient(135deg, #4ca1af, #2c3e50)',
      textColor: '#ffffff',
      accentColor: '#80deea'
    },
    mist: {    
      backgroundColor: 'linear-gradient(135deg, #bdc3c7, #2c3e50)',
      textColor: '#ffffff',
      accentColor: '#95a5a6'
    }
  };
  
  return themes[weatherType];
}

export function getWeatherIconUrl(iconCode: string): string {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

export function roundTemperature(temp: number): number {
  return Math.round(temp);
}