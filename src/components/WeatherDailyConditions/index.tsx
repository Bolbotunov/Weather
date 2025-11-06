import { OpenWeatherForecastEntryProps } from '@/types/types';

import styles from './styles.module.scss';

const WeatherDailyConditions = ({
  conditions,
}: OpenWeatherForecastEntryProps) => {
  const airData = [
    { label: 'Temperature', value: `${Math.round(conditions.main.temp)}°` },
    { label: 'Chance of Rain', value: `${Math.round(conditions.pop)}%` },
    { label: 'Wind', value: `${Math.round(conditions.wind.speed)} km/hr` },
    { label: 'Real Feel', value: `${Math.round(conditions.main.feels_like)}°` },
  ];

  return (
    <div className={styles.airConditions}>
      {airData.map(({ label, value }) => (
        <div key={label} className={styles.airItem}>
          <span className={styles.label}>{label}</span>
          <span className={styles.value}>{value}</span>
        </div>
      ))}
    </div>
  );
};

export default WeatherDailyConditions;
