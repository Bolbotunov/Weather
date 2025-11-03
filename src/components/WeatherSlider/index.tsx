import { useEffect, useRef } from 'react';

import WeatherIconWrapper from '@/components/ImageComponent';
import SubBlock from '@/components/SubBlock';
import { visibleCount } from '@/constants/constants';
import { HourlyWeatherData, SubBlockSize, weatherConfig } from '@/types/types';

import styles from './styles.module.scss';

type WeatherSliderProps = {
  hourlyWeather: HourlyWeatherData[];
};

const WeatherSlider = ({ hourlyWeather }: WeatherSliderProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const currentHour = new Date().getHours();

  const visibleWeather = [...hourlyWeather].sort(
    (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime(),
  );

  const centerIndex = visibleWeather.findIndex(
    (hour) => new Date(hour.time).getHours() === currentHour,
  );

  let start = centerIndex - visibleCount;
  let end = centerIndex + visibleCount + 1;

  if (start < 0) {
    end += Math.abs(start);
    start = 0;
  }

  if (end > visibleWeather.length) {
    const overflow = end - visibleWeather.length;
    start = Math.max(0, start - overflow);
    end = visibleWeather.length;
  }

  useEffect(() => {
    const container = wrapperRef.current;
    if (container) {
      container.scrollTo({
        left: container.scrollLeft,
        behavior: 'smooth',
      });
    }
  }, [visibleWeather, centerIndex, start]);

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      {visibleWeather.map((hour, index) => {
        const Icon = weatherConfig[hour.condition]?.icon;

        return (
          <SubBlock
            key={`${index}-${hour.condition}`}
            size={SubBlockSize.HourlySubBlock}
          >
            <div className={styles.hourItem}>
              <div className={styles.temperature}>{hour.temperature}°C</div>
              <WeatherIconWrapper icon={<Icon />} variant="small" />
              <div className={styles.speed}>{hour.windSpeed} km/h</div>
              <div className={styles.time}>
                {new Date(hour.time).getHours()}:00
              </div>
            </div>
          </SubBlock>
        );
      })}
    </div>
  );
};

export default WeatherSlider;
