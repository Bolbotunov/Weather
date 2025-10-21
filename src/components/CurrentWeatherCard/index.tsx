import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setHourlyWeather, setWeather } from '@/actions/actions';
import { getCurrentWeather } from '@/api/getCurrentWeather';
import { getHourlyWeather } from '@/api/getHourlyWeather';
import { getUserCoordinates } from '@/api/getUserCoordinates';
import LocationIcon from '@/assets/locationIcon.svg?react';
import useTheme from '@/hooks/useTheme';
import { RootState } from '@/store/store';
import { BlockSize } from '@/types/types';
import { getFormatDate } from '@/utils/getFormatDate';

import Block from '../Block';
import Loader from '../Loader';
import styles from './styles.module.scss';

import '@/styles/global.scss';

const CurrentWeatherCard = ({ gridClass }: { gridClass?: string }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const weather = useSelector((state: RootState) => state.app.weather);
  useTheme();
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const { lat, lon } = await getUserCoordinates();
        const weatherData = await getCurrentWeather(lat, lon);
        dispatch(setWeather(weatherData));
        const hourlyData = await getHourlyWeather(lat, lon);
        dispatch(setHourlyWeather(hourlyData));
        setLoading(false);
      } catch (err) {
        setError('Unable to determine location');
        console.error(err);
        setLoading(false);
      }
    };
    fetchWeather();
  }, [dispatch]);

  let content;

  if (loading) {
    content = <Loader />;
  } else if (error || !weather) {
    content = <div className={styles.location}>{error}</div>;
  } else {
    content = (
      <>
        <div className={styles.location}>
          <LocationIcon className={styles.locationIcon} />
          <div className={styles.locationText}>
            {weather?.city ?? 'Your City'}
          </div>
        </div>
        <div className={styles.condition}>{weather?.condition}</div>
        <div className={styles.temperature}>{weather?.temperature}°C</div>
        <div className={styles.date}>{getFormatDate(new Date(), 'date')}</div>
      </>
    );
  }

  return (
    <Block size={BlockSize.CurrentWeatherCard} gridClass={gridClass}>
      {content}
    </Block>
  );
};

export default CurrentWeatherCard;
