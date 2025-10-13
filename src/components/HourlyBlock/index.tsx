import { BlockSize } from '@/constants/enums';

import Block from '../Block';
import styles from './styles.module.scss';

import '@/styles/global.scss';

const HourlyBlock = ({ gridClass }: { gridClass?: string }) => {
  return (
    <Block size={BlockSize.HourlyBlock} gridClass={gridClass}>
      <div className={styles.location}>
        <span className={styles.locationText}>HOURLY LINE</span>
      </div>
    </Block>
  );
};

export default HourlyBlock;
