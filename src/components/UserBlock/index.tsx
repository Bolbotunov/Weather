import { BlockSize } from '@/constants/enums';

import Block from '../Block';
import styles from './styles.module.scss';

import '@/styles/global.scss';

const UserBlock = ({ gridClass }: { gridClass?: string }) => {
  return (
    <Block size={BlockSize.UserBlock} gridClass={gridClass}>
      <div className={styles.location}>
        <span className={styles.locationText}>UserBlock</span>
      </div>
    </Block>
  );
};

export default UserBlock;
