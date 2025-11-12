import { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  fetchWeatherRequest,
  setCurrentWeather,
  setSuggestions,
} from '@/actions/actions';
import WeatherConditions from '@/components/WeatherConditions';
import { weatherConfig } from '@/constants/weatherConfig';
import useAppSelector from '@/hooks/useAppSelector';
import { useBreakPoints } from '@/hooks/useBreakPoints';
import { useDebounce } from '@/hooks/useDebounce';
import { ClassNameProps, LocationSuggestion } from '@/types/types';
import { getWeatherUrl } from '@/utils/getWeatherUrl';

import WeatherIconWrapper from '../ImageComponent';
import StatusWrapper from '../StatusWrapper';
import TemperatureAndDate from '../TemperatureAndDate';
import styles from './styles.module.scss';

const WeatherIconBlock = ({ className }: ClassNameProps) => {
  const [query, setQuery] = useState('');

  const dispatch = useDispatch();

  const { citySuggestions } = useAppSelector((state) => state.app);

  const conditionKey = useAppSelector(
    (state) => state.app.weather.currentData?.condition,
  );

  const WeatherIcon = conditionKey ? weatherConfig[conditionKey]?.icon : null;

  const [inputError, setInputError] = useState<string | null>(null);

  const { isTabletSize } = useBreakPoints();

  const fetchCitySuggestions = async () => {
    if (!query) return;
    dispatch(setSuggestions([]));
    try {
      const response = await fetch(getWeatherUrl({ endpoint: 'geo', query }));

      const data = await response.json();
      dispatch(setSuggestions(data));
    } catch (error) {
      console.error('Error fetching city suggestions:', error);
    }
  };

  useDebounce(fetchCitySuggestions, 1000, query);

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
      dispatch(
        setCurrentWeather({
          city: city.name,
          lat: city.lat,
          lon: city.lon,
        }),
      );
      dispatch(fetchWeatherRequest());
      dispatch(setSuggestions([]));
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
            {query && citySuggestions.length > 0 && (
              <ul className={styles.suggestions}>
                {citySuggestions.map(({ name, country, lat, lon }) => (
                  <li
                    key={`${lat}-${lon}`}
                    className={styles.suggestion}
                    onClick={handleCitySelect({ name, country, lat, lon })}
                  >
                    {name}, {country}
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
