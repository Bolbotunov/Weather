import { BlockSize } from '@/constants/enums';

import Block from '../Block';
import styles from './styles.module.scss';

import '@/styles/global.scss';

const CurrentWeatherCard = ({ gridClass }: { gridClass?: string }) => {
  return (
    <Block size={BlockSize.CurrentWeatherCard} gridClass={gridClass}>
      <div className={styles.location}>
        <span className={styles.locationIcon} />
        <span className={styles.locationText}>Minsk</span>
      </div>
      <div className={styles.condition}>Sunny</div>
      <div className={styles.temperature}>11°C</div>
      <div className={styles.date}>Friday | 13 Oct 2025</div>
    </Block>
  );
};

export default CurrentWeatherCard;
