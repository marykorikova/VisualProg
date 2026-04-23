import React from 'react';
import type { DailyWeather } from '../types/weather.types';
import { WeatherIcon } from './weather_icon';
import { formatDate, roundTemperature } from '../utils/help';

interface WeatherCardProps {
  day: DailyWeather;           // погода на день
  isSelected: boolean;         // выбран этот день?
  onSelect: () => void;        // по клику
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ 
  day, 
  isSelected, 
  onSelect 
}) => {
  const weather = day.weather[0];
  const tempMax = roundTemperature(day.temp.max);
  const tempMin = roundTemperature(day.temp.min);
  
  return (
    <div
      onClick={onSelect}
      style={{
        ...styles.card,
        ...(isSelected ? styles.cardSelected : {})
      }}
    >
      <div style={styles.date}>
        {formatDate(day.dt)}
      </div>
      
      <WeatherIcon 
        iconCode={weather.icon} 
        description={weather.description}
        size="small"
      />
      
      <div style={styles.temp}>
        <span style={styles.tempMax}>{tempMax}°</span>
        <span style={styles.tempMin}>{tempMin}°</span>
      </div>
      
      <div style={styles.description}>
        {weather.description}
      </div>
      
      {day.pop > 0.3 && (
        <div style={styles.rainChance}>
          🌧️ {Math.round(day.pop * 100)}%
        </div>
      )}
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(10px)',
    borderRadius: '15px',
    padding: '15px',
    textAlign: 'center' as const,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    minWidth: '100px',
    border: '1px solid rgba(255, 255, 255, 0.2)'
  },
  cardSelected: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    border: '1px solid rgba(255, 255, 255, 0.5)',
    transform: 'scale(1.02)'
  },
  date: {
    fontWeight: 'bold',
    marginBottom: '10px',
    fontSize: '14px'
  },
  temp: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginTop: '10px'
  },
  tempMax: {
    fontWeight: 'bold',
    fontSize: '18px'
  },
  tempMin: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '14px'
  },
  description: {
    fontSize: '12px',
    marginTop: '8px',
    opacity: 0.9,
    textTransform: 'capitalize' as const
  },
  rainChance: {
    fontSize: '11px',
    marginTop: '5px',
    color: '#64b5f6'
  }
};