import React from 'react';
import { getWeatherIconUrl } from '../utils/help';

interface WeatherIconProps {
  iconCode: string;
  description: string;
  size?: 'small' | 'medium' | 'large';
}

const sizeMap = {
  small: 40,
  medium: 60,
  large: 80
};

export const WeatherIcon: React.FC<WeatherIconProps> = ({ 
  iconCode, 
  description, 
  size = 'medium' 
}) => {
  return (
    <img
      src={getWeatherIconUrl(iconCode)}
      alt={description}
      title={description}
      width={sizeMap[size]}
      height={sizeMap[size]}
      style={{ filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.2))' }}
    />
  );
};