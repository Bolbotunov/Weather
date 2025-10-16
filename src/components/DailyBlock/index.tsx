import { BlockSize } from '@/types/types';

import Block from '../Block';
import styles from './styles.module.scss';

import '@/styles/global.scss';

const DailyBlock = ({ gridClass }: { gridClass?: string }) => {
  return (
    <Block size={BlockSize.DailyBlock} gridClass={gridClass}>
      <span className={styles.locationText}>DailyBlock</span>
    </Block>
  );
};

export default DailyBlock;
