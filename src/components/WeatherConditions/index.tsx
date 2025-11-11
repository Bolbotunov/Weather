import useAppSelector from '@/hooks/useAppSelector';

import styles from './styles.module.scss';

const WeatherConditions = () => {
  const CurrentWeatherCondition = useAppSelector(
    (state) => state.app.weather.currentData?.condition,
  );

  return (
    <div className={styles.wrapper}>
      <p className={styles.condition}>{CurrentWeatherCondition}</p>
    </div>
  );
};

export default WeatherConditions;
