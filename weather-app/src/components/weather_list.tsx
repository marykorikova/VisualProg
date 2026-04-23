import React from 'react';
import type { DailyWeather } from '../types/weather.types';

interface WeatherListProps {
  days: DailyWeather[];
  selectedDay: DailyWeather | null;
  onSelectDay: (day: DailyWeather) => void;
}

export const WeatherList: React.FC<WeatherListProps> = ({ 
  days, 
  selectedDay, 
  onSelectDay 
}) => {
  return (
    <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', justifyContent: 'center' }}>
      {days.map((day) => (
        <div
          key={day.dt}
          onClick={() => onSelectDay(day)}
          style={{
            backgroundColor: 'rgba(255,255,255,0.15)',
            borderRadius: '15px',
            padding: '15px',
            cursor: 'pointer',
            textAlign: 'center',
            ...(selectedDay?.dt === day.dt ? { backgroundColor: 'rgba(255,255,255,0.3)' } : {})
          }}
        >
          <div>{new Date(day.dt * 1000).toLocaleDateString('ru-RU', { weekday: 'short' })}</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{Math.round(day.temp.day)}°C</div>
          <div>{day.weather[0]?.description}</div>
        </div>
      ))}
    </div>
  );
};