import { memo } from 'react';

import { BlockProps } from '@/types/types';

import classNames from 'classnames';

import styles from './styles.module.scss';

const BlockComponent = ({
  size,
  className,
  gridClass,
  children,
}: BlockProps) => {
  return (
    <section
      className={classNames(styles.block, styles[size], gridClass, className)}
    >
      {children}
    </section>
  );
};

const Block = memo(BlockComponent);

export default Block;
