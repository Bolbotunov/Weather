import { BlockProps } from '@/types/types';

import classNames from 'classnames';

import styles from './styles.module.scss';

const WidgetContainer = (props: BlockProps) => {
  const { size, className, gridClass, children } = props;
  return (
    <section
      className={classNames(styles.block, styles[size], gridClass, className)}
    >
      {children}
    </section>
  );
};

export default WidgetContainer;
