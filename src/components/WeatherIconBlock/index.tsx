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
import useAppSelector from '@/hooks/useAppSelector';
import { useDebounce } from '@/hooks/useDebounce';
import { LocationSuggestion, weatherConfig } from '@/types/types';
import { getWeatherUrl } from '@/utils/getWeatherUrl';

import WeatherIconWrapper from '../ImageComponent';
import styles from './styles.module.scss';

type Props = {
  className?: string;
};

const WeatherIconBlock = ({ className }: Props) => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const suggestions = useAppSelector((state) => state.app.suggestions);
  const weather = useAppSelector((state) => state.app.weather);
  const conditionKey = weather?.condition;
  const WeatherIcon = conditionKey ? weatherConfig[conditionKey]?.icon : null;
  const debouncedQuery = useDebounce(query, 1000);
  const [inputError, setInputError] = useState<string | null>(null);

  useEffect(() => {
    if (!debouncedQuery) return;

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
      <section
        className={`${styles.weatherIconBlock} ${className ? className : ''}`}
      >
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search..."
          className={styles.searchInput}
        />
        {inputError && <div className={styles.inputError}>{inputError}</div>}
        {suggestions.length > 0 && (
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
        {WeatherIcon && (
          <WeatherIconWrapper icon={<WeatherIcon />} variant="big" />
        )}
      </section>
    </>
  );
};

export default WeatherIconBlock;
