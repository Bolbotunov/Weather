import { useEffect, useRef } from 'react';

import WeatherIconWrapper from '@/components/ImageComponent';
import SubBlock from '@/components/SubBlock';
import { HourlyWeatherData, SubBlockSize, weatherConfig } from '@/types/types';

import styles from './styles.module.scss';

type WeatherSliderProps = {
  hourlyWeather: HourlyWeatherData[];
};

const WeatherSlider = ({ hourlyWeather }: WeatherSliderProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const currentHour = new Date().getHours();
  const visibleCount = 2;
  const maxVisible = 6;

  const sorted = [...hourlyWeather].sort(
    (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime(),
  );

  const centerIndex = sorted.findIndex(
    (hour) => new Date(hour.time).getHours() === currentHour,
  );

  let start = centerIndex - visibleCount;
  let end = centerIndex + visibleCount + 1;

  if (start < 0) {
    end += Math.abs(start);
    start = 0;
  }

  if (end > sorted.length) {
    const overflow = end - sorted.length;
    start = Math.max(0, start - overflow);
    end = sorted.length;
  }

  const visibleWeather = sorted.slice(start, end).slice(0, maxVisible);

  useEffect(() => {
    const container = wrapperRef.current;
    const centerCard = container?.children[centerIndex - start];

    if (container && centerCard instanceof HTMLElement) {
      const containerRect = container.getBoundingClientRect();
      const targetRect = centerCard.getBoundingClientRect();
      const offset =
        targetRect.left -
        containerRect.left -
        container.clientWidth / 2 +
        targetRect.width / 2;

      container.scrollTo({
        left: container.scrollLeft + offset,
        behavior: 'smooth',
      });
    }
  }, [visibleWeather, centerIndex, start]);

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      {visibleWeather.map((hour, index) => {
        const Icon = weatherConfig[hour.condition]?.icon;
        return (
          <SubBlock key={index} size={SubBlockSize.HourlySubBlock}>
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
