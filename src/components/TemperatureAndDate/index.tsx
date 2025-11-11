import useAppSelector from '@/hooks/useAppSelector';
import { FormatType, getFormatDate } from '@/utils/getFormatDate';

import styles from './styles.module.scss';

const TemperatureAndDate = () => {
  const currentWeather = useAppSelector(
    (state) => state.app.weather.currentData?.temperature,
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.temperature}>{currentWeather}°C</div>
      <div className={styles.date}>
        {getFormatDate(new Date(), FormatType.FullDate)}
      </div>
    </div>
  );
};

export default TemperatureAndDate;
