import styles from './styles.module.scss';

type ErrorProps = {
  message: string;
};

const ErrorBlock = ({ message }: ErrorProps) => {
  return (
    <div className={styles.error}>
      <p>{message}</p>
    </div>
  );
};

export default ErrorBlock;
