import { useState, useEffect, useCallback } from 'react';
import type { WeatherResponse, DailyWeather } from '../types/weather.types';
import { fetchWeatherByCoords } from '../services/weatherAPI';
import { searchCity, type GeocodingResult } from '../services/geocodingApi';

export function useWeather() {
  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<DailyWeather | null>(null);
  const [searchResults, setSearchResults] = useState<GeocodingResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [currentCityName, setCurrentCityName] = useState('Новосибирск');

  const loadWeatherByCoords = useCallback(async (lat: number, lon: number, cityName: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeatherByCoords(lat, lon, cityName);
      
  
      if (!data || !data.list || data.list.length === 0) { //есть данные?
        throw new Error('Нет данных о погоде');
      }
      
      setWeatherData(data);
      setCurrentCityName(cityName);
      if (data.list.length > 0) {
        setSelectedDay(data.list[0]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка');
    } finally {
      setLoading(false);
    }
  }, []);

  const searchCityQuery = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    setIsSearching(true);
    const results = await searchCity(query);
    setSearchResults(results);
    setIsSearching(false);
  }, []);

  const selectCity = useCallback((city: GeocodingResult) => {
    setSearchResults([]);
    loadWeatherByCoords(city.lat, city.lon, city.name);
  }, [loadWeatherByCoords]);

  useEffect(() => {
    const defaultCity = { name: 'Novosibirsk', lat: 55.0415, lon: 82.9346 };
    loadWeatherByCoords(defaultCity.lat, defaultCity.lon, 'Новосибирск');
  }, []);

  return {
    weatherData,
    loading,
    error,
    selectedDay,
    setSelectedDay,
    searchResults,
    isSearching,
    searchCityQuery,
    selectCity,
    currentCityName
  };
}