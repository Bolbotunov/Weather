import useAppSelector from '@/hooks/useAppSelector';
import { FormatType, getFormatDate } from '@/utils/getFormatDate';

import styles from './styles.module.scss';

const TemperatureAndDate = () => {
  const weather = useAppSelector((state) => state.app.weather);
  return (
    <>
      <div className={styles.temperature}>{weather?.temperature}°C</div>
      <div className={styles.date}>
        {getFormatDate(new Date(), FormatType.FullDate)}
      </div>
    </>
  );
};

export default TemperatureAndDate;
