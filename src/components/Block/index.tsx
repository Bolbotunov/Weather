import { BlockSize } from '@/constants/enums';

import classNames from 'classnames';

import styles from './styles.module.scss';

type BlockProps = {
  size: BlockSize;
  className?: string;
  gridClass?: string;
  children?: React.ReactNode;
};

const Block = ({ size, className, gridClass, children }: BlockProps) => {
  return (
    <section
      className={classNames(styles.block, styles[size], gridClass, className)}
    >
      {children}
    </section>
  );
};

export default Block;
