import { BlockSize } from '@/constants/enums';

import Block from '../Block';
import styles from './styles.module.scss';

import '@/styles/global.scss';

const RunningLine = ({ gridClass }: { gridClass?: string }) => {
  return (
    <Block size={BlockSize.RunningLine} gridClass={gridClass}>
      <div className={styles.location}>
        <span className={styles.locationText}>RunningLine</span>
      </div>
    </Block>
  );
};

export default RunningLine;
