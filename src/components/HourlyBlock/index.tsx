import { useSelector } from 'react-redux';

import { RootState } from '@/store/store';
import { BlockSize, SubBlockSize, weatherConfig } from '@/types/types';

import Block from '../Block';
import SubBlock from '../SubBlock';
import styles from './styles.module.scss';

import '@/styles/global.scss';

const HourlyBlock = ({ gridClass }: { gridClass?: string }) => {
  const hourlyWeather = useSelector(
    (state: RootState) => state.app.hourlyWeather,
  );
  return (
    <Block size={BlockSize.HourlyBlock} gridClass={gridClass}>
      <div className={styles.location}>
        <span className={styles.locationText}>HOURLY LINE</span>
      </div>
      <div className={styles.wrapper}>
        {hourlyWeather.map((hour, index) => {
          const Icon = weatherConfig[hour.condition]?.icon;
          return (
            <SubBlock key={index} size={SubBlockSize.HourlySubBlock}>
              <div className={styles.hourItem}>
                <div>{hour.temperature}°C</div>
                <div>{Icon && <Icon />}</div>
                <div>{hour.windSpeed} km/h</div>
                <div>{new Date(hour.time).getHours()}:00</div>
              </div>
            </SubBlock>
          );
        })}
      </div>
    </Block>
  );
};

export default HourlyBlock;
