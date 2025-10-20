import { BlockProps } from '@/types/types';

import classNames from 'classnames';

import styles from './styles.module.scss';

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
