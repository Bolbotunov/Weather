import { OpenWeatherForecastEntry } from '@/types/types';

import styles from './styles.module.scss';

type Props = {
  conditions: OpenWeatherForecastEntry;
};

const WeatherDailyConditions = ({ conditions }: Props) => {
  const airData = [
    { label: 'Real Feel', value: `${conditions.main.feels_like}°` },
    { label: 'Chance of Rain', value: `${conditions.pop}%` },
    { label: 'Wind', value: `${conditions.wind.speed} km/hr` },
    { label: 'UV Index', value: `${conditions.uvi}` },
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
