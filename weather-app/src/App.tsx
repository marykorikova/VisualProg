import React, { useState } from 'react';
import { useWeather } from './hook/using_weather';
import { WeatherList } from './components/weather_list';
import { WeatherIcon } from './components/weather_icon';
import { getWeatherType, getThemeByWeather, roundTemperature } from './utils/help';

function App() {
  const { 
    weatherData, loading, error, selectedDay, setSelectedDay,
    searchResults, isSearching, searchCityQuery, selectCity, currentCityName
  } = useWeather();
  
  const [searchInput, setSearchInput] = useState('');

  const weatherType = selectedDay 
    ? getWeatherType(selectedDay.weather[0].id) 
    : 'clear';
  const theme = getThemeByWeather(weatherType);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      searchCityQuery(searchInput);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundImage: theme.backgroundColor,  
      transition: 'background 0.5s ease' 
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <h1 style={{ textAlign: 'center', color: 'white', marginBottom: '10px' }}>🌤️ Прогноз погоды</h1>

        <form onSubmit={handleSearch} style={{ textAlign: 'center', marginBottom: '20px' }}>
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Введите город..."
            style={{
              padding: '12px 20px',
              fontSize: '16px',
              borderRadius: '25px',
              border: 'none',
              width: '250px',
              marginRight: '10px'
            }}
          />
          <button
            type="submit"
            style={{
              padding: '12px 24px',
              fontSize: '16px',
              borderRadius: '25px',
              border: 'none',
              backgroundColor: 'rgba(255,255,255,0.3)',
              color: 'white',
              cursor: 'pointer'
            }}
          >
            Найти
          </button>
        </form>

        {isSearching && <div style={{ textAlign: 'center', color: 'white' }}>Поиск...</div>}
        {searchResults.length > 0 && (
          <div style={{
            backgroundColor: 'rgba(0,0,0,0.7)',
            borderRadius: '15px',
            padding: '10px',
            marginBottom: '20px',
            maxWidth: '300px',
            margin: '0 auto 20px'
          }}>
            {searchResults.map((city) => (
              <div
                key={`${city.lat}-${city.lon}`}
                onClick={() => selectCity(city)}
                style={{
                  padding: '8px 15px',
                  cursor: 'pointer',
                  color: 'white',
                  borderBottom: '1px solid rgba(255,255,255,0.2)'
                }}
              >
                {city.name}, {city.country} {city.state && `(${city.state})`}
              </div>
            ))}
          </div>
        )}

        <div style={{ textAlign: 'center', color: 'white', marginBottom: '30px' }}>
          📍 {currentCityName}, Россия
        </div>

        {error && <div style={{ backgroundColor: 'rgba(255,0,0,0.3)', color: 'white', padding: '15px', borderRadius: '10px', textAlign: 'center', marginBottom: '20px' }}>❌ {error}</div>}

        {loading && (
          <div style={{ textAlign: 'center', color: 'white', padding: '40px' }}>
            <div style={{ width: '40px', height: '40px', border: '4px solid rgba(255,255,255,0.3)', borderTop: '4px solid white', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 15px' }}></div>
            <p>Загрузка прогноза...</p>
          </div>
        )}

        {!loading && weatherData && selectedDay && (
          <>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', borderRadius: '25px', padding: '25px', marginBottom: '30px', textAlign: 'center', color: 'white' }}>
              <WeatherIcon iconCode={selectedDay.weather[0].icon} description={selectedDay.weather[0].description} size="large" />
              <div style={{ fontSize: '52px', fontWeight: 'bold', marginTop: '10px' }}>{roundTemperature(selectedDay.temp.day)}°C</div>
              <div style={{ fontSize: '16px', opacity: 0.9 }}>Ощущается как {roundTemperature(selectedDay.feels_like.day)}°C</div>
              <div style={{ fontSize: '18px', marginTop: '10px', textTransform: 'capitalize' }}>{selectedDay.weather[0].description}</div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px', marginTop: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 15px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}>
                  <span>🌡️ Давление</span> <span>{selectedDay.pressure} гПа</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 15px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}>
                  <span>💧 Влажность</span> <span>{selectedDay.humidity}%</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 15px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}>
                  <span>💨 Ветер</span> <span>{selectedDay.wind_speed} м/с</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 15px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}>
                  <span>🌧️ Осадки</span> <span>{Math.round(selectedDay.pop * 100)}%</span>
                </div>
              </div>
            </div>
            
            <h3 style={{ textAlign: 'center', color: 'white', marginBottom: '20px' }}>Прогноз на несколько дней</h3>
            
            <WeatherList 
              days={weatherData.list}
              selectedDay={selectedDay}
              onSelectDay={setSelectedDay}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;

