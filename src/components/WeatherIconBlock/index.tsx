import { BlockSize } from '@/constants/enums';

import Block from '../Block';
import styles from './styles.module.scss';

import '@/styles/global.scss';

const WeatherIconBlock = ({ gridClass }: { gridClass?: string }) => {
  return (
    <Block size={BlockSize.WeatherIconBlock} gridClass={gridClass}>
      <div className={styles.location}>
        <span className={styles.locationText}>WeatherIconBlock</span>
      </div>
    </Block>
  );
};

export default WeatherIconBlock;
