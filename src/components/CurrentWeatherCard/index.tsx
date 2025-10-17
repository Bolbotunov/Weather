import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setWeather } from '@/actions/actions';
import { getCurrentWeather } from '@/api/getCurrentWeather';
import LocationIcon from '@/assets/locationIcon.svg?react';
import { RootState } from '@/store/store';
import { BlockSize } from '@/types/types';
import getFormatDate from '@/utils/getFormatDate';

import Block from '../Block';
import styles from './styles.module.scss';

import '@/styles/global.scss';

const CurrentWeatherCard = ({ gridClass }: { gridClass?: string }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const weather = useSelector((state: RootState) => state.app.weather);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const weatherData = await getCurrentWeather();
        setWeather(weatherData);
        dispatch(setWeather(weatherData));
        setLoading(false);
      } catch (err) {
        setError('Unable to determine location');
        console.error(err);
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) {
    return (
      <Block size={BlockSize.CurrentWeatherCard} gridClass={gridClass}>
        <div className={styles.location}>loading location...</div>
      </Block>
    );
  }

  if (error || !weather) {
    return (
      <Block size={BlockSize.CurrentWeatherCard} gridClass={gridClass}>
        <div className={styles.location}>{error}</div>
      </Block>
    );
  }

  return (
    <Block size={BlockSize.CurrentWeatherCard} gridClass={gridClass}>
      <div className={styles.location}>
        <LocationIcon className={styles.locationIcon} />
        <div className={styles.locationText}>
          {weather?.city ?? 'Your City'}
        </div>
      </div>
      <div className={styles.condition}>{weather?.condition}</div>
      <div className={styles.temperature}>{weather?.temperature}°C</div>
      <div className={styles.date}>{getFormatDate(new Date())}</div>
    </Block>
  );
};

export default CurrentWeatherCard;
