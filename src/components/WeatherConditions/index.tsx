import useAppSelector from '@/hooks/useAppSelector';

import styles from './styles.module.scss';

const WeatherConditions = () => {
  const CurrentWeatherData = useAppSelector((state) => state.app.weather);

  return (
    <div className={styles.wrapper}>
      <p className={styles.condition}>{CurrentWeatherData?.condition}</p>
    </div>
  );
};

export default WeatherConditions;
