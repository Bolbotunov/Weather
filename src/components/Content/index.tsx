import { useBreakPoints } from '@/hooks/useBreakPoints';

import CurrentWeatherCard from '../CurrentWeatherCard';
import DailyBlock from '../DailyBlock';
import Header from '../Header';
import HourlyBlock from '../HourlyBlock';
import RunningLine from '../RunningLine';
import UserBlock from '../UserBlock';
import WeatherIconBlock from '../WeatherIconBlock';
import styles from './styles.module.scss';

const Content = () => {
  const { isTabletSize, isMobileSize } = useBreakPoints();

  return (
    <main className={styles.grid}>
      {(isMobileSize || isTabletSize) && <Header />}
      <WeatherIconBlock />
      <CurrentWeatherCard gridClass={styles.weather} />
      <UserBlock gridClass={styles.user} />
      <RunningLine gridClass={styles.running} />
      <HourlyBlock gridClass={styles.hourly} />
      <DailyBlock gridClass={styles.daily} />
    </main>
  );
};

export default Content;
