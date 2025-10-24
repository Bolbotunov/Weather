import { useState } from 'react';

import { OpenWeatherForecastEntry, weatherConfig } from '@/types/types';
import { FormatType, getFormatDate } from '@/utils/getFormatDate';

import WeatherIconWrapper from '../ImageComponent';
import styles from './styles.module.scss';

type Props = {
  forecast: OpenWeatherForecastEntry[];
};

const DailySlider = ({ forecast }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? forecast.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === forecast.length - 1 ? 0 : prev + 1));
  };

  const activeDate = new Date(forecast[activeIndex].dt * 1000);
  const formattedDate = getFormatDate(activeDate, FormatType.ShortDate);

  return (
    <div className={styles.sliderWrapper}>
      <div className={styles.iconRow}>
        {forecast.map(({ dt, weather }, index) => {
          const date = new Date(dt * 1000);
          const day = getFormatDate(date, FormatType.ShortDate);
          const condition = weather[0].main;
          const Icon = weatherConfig[condition]?.icon;
          const isActive = index === activeIndex;

          return (
            <div
              key={dt}
              className={`${styles.forecastItem} ${isActive ? styles.active : ''}`}
              onClick={() => setActiveIndex(index)}
            >
              <span>{day}</span>
              {Icon && <WeatherIconWrapper icon={<Icon />} variant="small" />}
            </div>
          );
        })}
      </div>

      <div className={styles.dateRow}>
        <button onClick={handlePrev} className={styles.navButton}>
          {'<'}
        </button>
        <div className={styles.dateDisplay}>{formattedDate}</div>
        <button onClick={handleNext} className={styles.navButton}>
          {'>'}
        </button>
      </div>
    </div>
  );
};

export default DailySlider;
