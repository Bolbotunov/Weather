import { useEffect, useRef } from 'react';

import LeftIcon from '@/assets/LeftIcon.svg?react';
import RightIcon from '@/assets/RightIcon.svg?react';
import { CARD_OFFSET, SLIDE_WIDTH } from '@/constants/constants';
import { DailySliderProps, weatherConfig } from '@/types/types';
import { formatDate, FormatType } from '@/utils/getFormatDate';

import WeatherIconWrapper from '../ImageComponent';
import styles from './styles.module.scss';

const DailySlider = ({
  forecast,
  activeIndex,
  setActiveIndex,
  handleDayChange,
}: DailySliderProps) => {
  const iconRowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const iconRow = iconRowRef.current;
    if (!iconRow) return;

    iconRow.style.transform = `translateX(calc(${CARD_OFFSET}% + ${-activeIndex * SLIDE_WIDTH}px))`;
  }, [activeIndex]);

  const updateIndex = (delta: number) => {
    const newIndex = (activeIndex + delta + forecast.length) % forecast.length;
    setActiveIndex(newIndex);
    handleDayChange?.(newIndex);
  };

  const handlePrev = () => updateIndex(-1);
  const handleNext = () => updateIndex(1);

  const handleActiveIndex = (index: number) => () => {
    setActiveIndex(index);
    handleDayChange?.(index);
  };

  const formattedDate = formatDate(
    forecast[activeIndex].dt,
    FormatType.ShortDate,
  );

  return (
    <div className={styles.sliderWrapper}>
      <div className={styles.sliderViewport}>
        <div className={styles.iconRow} ref={iconRowRef}>
          {forecast.map(({ dt, weather }, index) => {
            const day = formatDate(dt, FormatType.ShortDate);
            const condition = weather[0].main;
            const Icon = weatherConfig[condition]?.icon;
            const isActive = index === activeIndex;

            return (
              <div
                key={dt}
                className={`${styles.forecastItem} ${isActive ? styles.active : ''}`}
                onClick={handleActiveIndex(index)}
              >
                <div>{day}</div>
                {Icon && <WeatherIconWrapper icon={<Icon />} variant="small" />}
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.dateRow}>
        <button onClick={handlePrev} className={styles.navButton}>
          <WeatherIconWrapper icon={<LeftIcon />} variant="small" />
        </button>
        <div className={styles.dateDisplay}>{formattedDate}</div>
        <button onClick={handleNext} className={styles.navButton}>
          <WeatherIconWrapper icon={<RightIcon />} variant="small" />
        </button>
      </div>
    </div>
  );
};

export default DailySlider;
