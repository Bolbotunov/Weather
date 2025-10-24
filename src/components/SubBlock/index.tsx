import { SubBlockProps } from '@/types/types';

import classNames from 'classnames';

import styles from './styles.module.scss';

const SubBlock = ({ size, children }: SubBlockProps) => {
  return (
    <div className={classNames(styles.subBlock, styles[size])}>{children}</div>
  );
};

export default SubBlock;
