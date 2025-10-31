import useAppSelector from '@/hooks/useAppSelector';

import styles from './styles.module.scss';

const Condition = () => {
  const weather = useAppSelector((state) => state.app.weather);
  return (
    <div className={styles.wrapper}>
      <div className={styles.condition}>{weather?.condition}</div>
    </div>
  );
};

export default Condition;
