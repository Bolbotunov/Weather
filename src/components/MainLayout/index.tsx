import { useBreakPoints } from '@/hooks/useBreakPoints';

import CurrentWeatherCard from '../CurrentWeatherCard';
import DailyBlock from '../DailyBlock';
import Header from '../Header';
import HourlyBlock from '../HourlyBlock';
import UserBlock from '../UserBlock';
import UserEvents from '../UserEvents';
import WeatherIconBlock from '../WeatherIconBlock';
import styles from './styles.module.scss';

const MainLayout = () => {
  const { isTabletSize, isMobileSize } = useBreakPoints();

  return (
    <main className={styles.grid}>
      {(isMobileSize || isTabletSize) && <Header />}
      <WeatherIconBlock className={styles.weatherIcon} />
      <CurrentWeatherCard gridClass={styles.weather} />
      <UserBlock gridClass={styles.user} />
      <UserEvents gridClass={styles.userEvents} />
      <HourlyBlock gridClass={styles.hourly} />
      <DailyBlock gridClass={styles.daily} />
    </main>
  );
};

export default MainLayout;
