import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import useAppSelector from '@/hooks/useAppSelector';
import { useStatus } from '@/hooks/useStatus';
import useApplyCurrentTheme from '@/hooks/useTheme';
import { BlockSize } from '@/types/types';
import { FormatType, getFormatDate } from '@/utils/getFormatDate';

import Block from '../Block';
import CurrentLocation from '../CurrentLocation';
import ErrorBlock from '../ErrorBlock';
import Loader from '../Loader';
import styles from './styles.module.scss';

const CurrentWeatherCard = ({ gridClass }: { gridClass?: string }) => {
  const { loading, error } = useStatus();
  const dispatch = useDispatch();
  const weather = useAppSelector((state) => state.app.weather);
  const rehydrated = useAppSelector((state) => state._persist?.rehydrated);

  useApplyCurrentTheme();
  useEffect(() => {
    if (!rehydrated || weather) return;
    dispatch({ type: 'FETCH_WEATHER_REQUEST' });
  }, [dispatch, rehydrated, weather]);

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
