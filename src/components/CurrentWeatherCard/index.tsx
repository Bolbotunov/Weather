import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  setDailyWeather,
  setHourlyWeather,
  setSelectedDate,
  setWeather,
} from '@/actions/actions';
import { getCurrentWeather } from '@/api/getCurrentWeather';
import { getDailyWeather } from '@/api/getDailyWeather';
import { getHourlyWeather } from '@/api/getHourlyWeather';
import { getUserCoordinates } from '@/api/getUserCoordinates';
import useAppSelector from '@/hooks/useAppSelector';
import { useStatus } from '@/hooks/useStatus';
import useTheme from '@/hooks/useTheme';
import { RootState } from '@/reducers/rootReducer';
import { BlockSize } from '@/types/types';
import { formatDate, FormatType, getFormatDate } from '@/utils/getFormatDate';

import { PersistState } from 'redux-persist';

import Block from '../Block';
import CurrentLocation from '../CurrentLocation';
import ErrorBlock from '../ErrorBlock';
import Loader from '../Loader';
import styles from './styles.module.scss';

import '@/styles/global.scss';

export type ExtendedRootState = RootState & {
  _persist: PersistState;
};

const CurrentWeatherCard = ({ gridClass }: { gridClass?: string }) => {
  const { loading, error, setLoading, setError } = useStatus();
  const dispatch = useDispatch();
  const weather = useAppSelector((state) => state.app.weather);
  const rehydrated = useSelector(
    (state: ExtendedRootState) => state._persist?.rehydrated,
  );

  useTheme();
  useEffect(() => {
    if (!rehydrated) return;

    if (weather) {
      setLoading(false);
      return;
    }
    const fetchWeather = async () => {
      setLoading(true);
      try {
        const { lat, lon } = await getUserCoordinates();
        const weatherData = await getCurrentWeather(lat, lon);
        dispatch(setWeather(weatherData));
        const hourlyData = await getHourlyWeather(lat, lon);
        dispatch(setHourlyWeather(hourlyData));
        const dailyData = await getDailyWeather(lat, lon);
        dispatch(setDailyWeather(dailyData));
        dispatch(
          setSelectedDate(formatDate(dailyData[0].dt, FormatType.RawDate)),
        );
        setLoading(false);
      } catch (err) {
        setError('Unable to determine location');
        console.error(err);
        setLoading(false);
      }
    };
    fetchWeather();
  }, [dispatch, rehydrated, weather, setError, setLoading]);

  let content;

  if (loading) {
    content = <Loader />;
  } else if (error) {
    content = <ErrorBlock message={error} />;
  } else {
    content = (
      <>
        <CurrentLocation />
        <div className={styles.condition}>{weather?.condition}</div>
        <div className={styles.temperature}>{weather?.temperature}°C</div>
        <div className={styles.date}>
          {getFormatDate(new Date(), FormatType.FullDate)}
        </div>
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
