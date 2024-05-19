'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from "./page.module.css";
import { ArrowLeftIcon, SunIcon, ArrowUpIcon, ArrowDownIcon, MoonIcon } from '@heroicons/react/24/outline';
import { CiCloudSun } from "react-icons/ci";
import { GoSun } from "react-icons/go";
import Link from 'next/link';

interface ForecastData {
  list: {
    dt: number;
    main: {
      temp: number;
      temp_max: number;
      temp_min: number;
      humidity: number;
    };
    weather: {
      main: string;
    }[];
    wind: {
      speed: number;
    };
  }[];
}

interface CurrentWeatherData {
  name: string;
  sys: {
    sunrise: number;
    sunset: number;
  };
}

export default function Weather() {
  const [cityName, setCityName] = useState<string>('');
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [currentWeatherData, setCurrentWeatherData] = useState<CurrentWeatherData | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const forecastResponse = await axios.get<ForecastData>('https://api.openweathermap.org/data/2.5/forecast?q=London,uk&APPID=faeb1c94d1ffb62f19dd32e8f0e6ebb2');
        const currentWeatherResponse = await axios.get<CurrentWeatherData>('https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=faeb1c94d1ffb62f19dd32e8f0e6ebb2');
        
        setForecastData(forecastResponse.data);
        setCurrentWeatherData(currentWeatherResponse.data);
        setCityName(currentWeatherResponse.data.name); 
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, []);

  const getTemperatureAtHour = (hour: number): number | null => {
    if (!forecastData) return null;
    const targetTime = new Date();
    targetTime.setHours(hour, 0, 0, 0);

    const forecast = forecastData.list.find(entry => {
      const entryTime = new Date(entry.dt * 1000);
      return entryTime.getHours() === targetTime.getHours();
    });

    return forecast ? Math.round(forecast.main.temp - 273.15) : null;
  };

  return (
    <main className={`${styles.main} ${styles.blueBackground}`}>
      <Link href="/">
        <ArrowLeftIcon className={styles.iconArrow} />
      </Link>
      <div className={styles.headerMain}>
        <h1>{cityName}</h1>
        {forecastData && (
          <>
            <h2>{forecastData.list[0].weather[0].main}</h2>
            <div className={styles.temperatureContainer}>
              <div className={styles.temperature}>
                <span className={styles.numC}>{Math.round(forecastData.list[0].main.temp - 273.15)}</span>
                <span className={styles.celsius}>&deg;C</span>
                <div className={styles.tempRange}>
                  <div className={styles.tempRangeItem}>
                    <ArrowUpIcon className={styles.arrowIcon} />
                    <span>{Math.round(forecastData.list[0].main.temp_max - 273.15)}&deg;</span>
                  </div>
                  <div className={styles.tempRangeItem}>
                    <ArrowDownIcon className={styles.arrowIcon} />
                    <span>{Math.round(forecastData.list[0].main.temp_min - 273.15)}&deg;</span>
                  </div>
                </div>
              </div>
            </div>
            <GoSun className={styles.icon} />
            <div className={styles.temperatureContainerTwo}>
              <div className={styles.climateItem}>
                <span>Dawn</span>
                <CiCloudSun className={styles.icon} />
                <p>{getTemperatureAtHour(3)}&deg;C</p>
              </div>
              <div className={styles.climateItem}>
                <span>Morning</span>
                <SunIcon className={styles.icon} />
                <p>{getTemperatureAtHour(9)}&deg;C</p>
              </div>
              <div className={styles.climateItem}>
                <span>Afternoon</span>
                <CiCloudSun className={styles.icon} />
                <p>{getTemperatureAtHour(15)}&deg;C</p>
              </div>
              <div className={styles.climateItem}>
                <span>Night</span>
                <MoonIcon className={styles.icon} />
                <p>{getTemperatureAtHour(21)}&deg;C</p>
              </div>
            </div>
            <div className={styles.temperatureContainerTree}>
              <div className={styles.climateItem}>
                <span>Wind Speed</span>
                <span>{forecastData.list[0].wind.speed} m/s</span>
              </div>
              <span className={styles.bar}></span>
              {currentWeatherData && (
                <>
                  <div className={styles.climateItem}>
                    <span>Sunrise</span>
                    <span>{new Date(currentWeatherData.sys.sunrise * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <span className={styles.bar}></span>
                  <div className={styles.climateItem}>
                    <span>Sunset</span>
                    <span>{new Date(currentWeatherData.sys.sunset * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <span className={styles.bar}></span>
                </>
              )}
              <div className={styles.climateItem}>
                <span>Humidity</span>
                <span>{forecastData.list[0].main.humidity}%</span>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
