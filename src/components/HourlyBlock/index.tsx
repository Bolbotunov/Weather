import ClockIcon from '@/assets/ClockIcon.svg?react';
import useAppSelector from '@/hooks/useAppSelector';
import { BlockSize } from '@/types/types';
import { FormatType, getFormatDate } from '@/utils/getFormatDate';

import WeatherIconWrapper from '../ImageComponent';
import StatusWrapper from '../StatusWrapper';
import WeatherSlider from '../WeatherSlider';
import Block from '../WidgetContainer';
import styles from './styles.module.scss';

import '@/styles/global.scss';

const HourlyBlock = ({ gridClass }: { gridClass?: string }) => {
  const hourlyWeather = useAppSelector((state) => state.app.hourlyWeather);
  const selectedDate = useAppSelector((state) => state.app.selectedDate);
  const filteredWeather = hourlyWeather
    .filter((entry) => {
      const entryDate = new Date(entry.time).toDateString();
      return entryDate === selectedDate;
    })
    .slice(0, 8);

  return (
    <Block size={BlockSize.HourlyBlock} gridClass={gridClass}>
      <StatusWrapper>
        <div className={styles.location}>
          <div className={styles.locationText}>24-hour forecast</div>
          <div className={styles.clockWrapper}>
            <div>{getFormatDate(new Date(), FormatType.Time12)}</div>
            <WeatherIconWrapper icon={<ClockIcon />} variant="small" />
          </div>
        </div>
        <WeatherSlider hourlyWeather={filteredWeather} />
      </StatusWrapper>
    </Block>
  );
};

export default HourlyBlock;
