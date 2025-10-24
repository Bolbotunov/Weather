import { ReactNode } from 'react';

import styles from './styles.module.scss';

type ButtonProps = {
  onClick: () => void;
  children: ReactNode;
};

const Button = ({ onClick, children }: ButtonProps) => {
  return (
    <button onClick={onClick} className={styles.button}>
      {children}
    </button>
  );
};

export default Button;
