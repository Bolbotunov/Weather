import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  setDailyWeather,
  setHourlyWeather,
  setSuggestions,
  setWeather,
} from '@/actions/actions';
import { getCurrentWeather } from '@/api/getCurrentWeather';
import { getDailyWeather } from '@/api/getDailyWeather';
import { getHourlyWeather } from '@/api/getHourlyWeather';
import WeatherConditions from '@/components/WeatherConditions';
import useAppSelector from '@/hooks/useAppSelector';
import { useBreakPoints } from '@/hooks/useBreakPoints';
import { useDebounce } from '@/hooks/useDebounce';
import { ClassNameProps, LocationSuggestion } from '@/types/types';
import { weatherConfig } from '@/types/weatherConfig';
import { getWeatherUrl } from '@/utils/getWeatherUrl';

import WeatherIconWrapper from '../ImageComponent';
import StatusWrapper from '../StatusWrapper';
import TemperatureAndDate from '../TemperatureAndDate';
import styles from './styles.module.scss';

import '@/styles/global.scss';

const WeatherIconBlock = ({ className }: ClassNameProps) => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const suggestions = useAppSelector((state) => state.app.suggestions);
  const weather = useAppSelector((state) => state.app.weather);
  const conditionKey = weather?.condition;
  const WeatherIcon = conditionKey ? weatherConfig[conditionKey]?.icon : null;
  const debouncedQuery = useDebounce(query, 1000);
  const [inputError, setInputError] = useState<string | null>(null);
  const { isTabletSize } = useBreakPoints();

  useEffect(() => {
    if (!debouncedQuery) return;
    dispatch(setSuggestions([]));

    const fetchCitySuggestions = async () => {
      try {
        const response = await fetch(
          getWeatherUrl({ endpoint: 'geo', query: debouncedQuery }),
        );
        const data = await response.json();
        dispatch(setSuggestions(data));
      } catch (error) {
        console.error('Error fetching city suggestions:', error);
      }
    };
    fetchCitySuggestions();
  }, [debouncedQuery, dispatch]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    const isValid = /^[a-zA-Zа-яА-Я]+$/.test(value.trim());
    if (!isValid && value.length > 0) {
      setInputError('wrong query, try again');
    } else {
      setInputError(null);
    }
  };
  const handleCitySelect = (city: LocationSuggestion) => async () => {
    try {
      const weatherData = await getCurrentWeather(city.lat, city.lon);
      dispatch(setWeather(weatherData));
      const hourlyData = await getHourlyWeather(city.lat, city.lon);
      dispatch(setHourlyWeather(hourlyData));
      const dailyData = await getDailyWeather(city.lat, city.lon);
      dispatch(setDailyWeather(dailyData));
      setQuery('');
    } catch (error) {
      console.error('Error fetching weather for selected city:', error);
    }
    dispatch(setSuggestions([]));
    setQuery('');
  };

  return (
    <>
      <section className={className}>
        <StatusWrapper>
          <div className={styles.searchContainer}>
            <input
              type="text"
              value={query}
              onChange={handleInputChange}
              placeholder="Search..."
              className={styles.searchInput}
            />
            {inputError && (
              <div className={styles.inputError}>{inputError}</div>
            )}
            {debouncedQuery && suggestions.length > 0 && (
              <ul className={styles.suggestions}>
                {suggestions.map((city) => (
                  <li
                    key={city.name}
                    className={styles.suggestion}
                    onClick={handleCitySelect(city)}
                  >
                    {city.name}, {city.country}
                  </li>
                ))}
              </ul>
            )}
            {isTabletSize && <WeatherConditions />}
            {WeatherIcon && (
              <WeatherIconWrapper icon={<WeatherIcon />} variant="big" />
            )}
            {isTabletSize && <TemperatureAndDate />}
          </div>
        </StatusWrapper>
      </section>
    </>
  );
};

export default WeatherIconBlock;
