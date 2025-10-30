import useAppSelector from '@/hooks/useAppSelector';

import styles from './styles.module.scss';

const Condition = () => {
  const weather = useAppSelector((state) => state.app.weather);
  return (
    <>
      <div className={styles.condition}>{weather?.condition}</div>
    </>
  );
};

export default Condition;
