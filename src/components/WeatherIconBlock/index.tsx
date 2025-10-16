import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setSuggestions } from '@/actions/actions';
import { API_KEY } from '@/constants/constants';
import { useDebounce } from '@/hooks/useDebounce';
import { RootState } from '@/store/store';
import { WeatherConditionIcons, weatherIcons } from '@/types/types';

import WeatherIconWrapper from '../ImageComponent';
import styles from './styles.module.scss';

import '@/styles/global.scss';

const WeatherIconBlock = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const suggestions = useSelector((state: RootState) => state.app.suggestions);
  const weather = useSelector((state: RootState) => state.app.weather);
  const conditionKey = weather?.condition as WeatherConditionIcons;
  const WeatherIcon = conditionKey ? weatherIcons[conditionKey] : null;

  const debouncedQuery = useDebounce(query, 1000);

  useEffect(() => {
    if (!debouncedQuery) return;

    const fetchCitySuggestions = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${debouncedQuery}&limit=5&appid=${API_KEY}`,
        );
        const data = await response.json();
        dispatch(setSuggestions(data));
      } catch (error) {
        console.error('Error fetching city suggestions:', error);
      }
    };

    fetchCitySuggestions();
  }, [debouncedQuery]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleCitySelect = () => {
    console.log('test');
  };

  return (
    <>
      <section className={styles.weatherIconBlock}>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search..."
          className={styles.searchInput}
        />

        {suggestions.length > 0 && (
          <ul className={styles.suggestions}>
            {suggestions.map((city, index) => (
              <li
                key={index}
                className={styles.suggestion}
                onClick={handleCitySelect}
              >
                {city.name}, {city.country}
              </li>
            ))}
          </ul>
        )}
        {WeatherIcon && <WeatherIconWrapper icon={<WeatherIcon />} />}
      </section>
    </>
  );
};

export default WeatherIconBlock;
