import { useSelector } from 'react-redux';

import ClockIcon from '@/assets/ClockIcon.svg?react';
import { RootState } from '@/reducers/rootReducer';
import { BlockSize } from '@/types/types';
import { getFormatDate } from '@/utils/getFormatDate';

import Block from '../Block';
import WeatherIconWrapper from '../ImageComponent';
import WeatherSlider from '../WeatherSlider';
import styles from './styles.module.scss';

import '@/styles/global.scss';

const HourlyBlock = ({ gridClass }: { gridClass?: string }) => {
  const hourlyWeather = useSelector(
    (state: RootState) => state.app.hourlyWeather,
  );

  return (
    <Block size={BlockSize.HourlyBlock} gridClass={gridClass}>
      <div className={styles.location}>
        <div className={styles.locationText}>24-hour forecast</div>
        <div className={styles.clockWrapper}>
          <div>{getFormatDate(new Date(), 'time')}</div>
          <WeatherIconWrapper icon={<ClockIcon />} variant="small" />
        </div>
      </div>
      <WeatherSlider hourlyWeather={hourlyWeather} />
    </Block>
  );
};

export default HourlyBlock;
