import CurrentWeatherCard from '../CurrentWeatherCard';
import DailyBlock from '../DailyBlock';
import HourlyBlock from '../HourlyBlock';
import RunningLine from '../RunningLine';
import UserBlock from '../UserBlock';
import WeatherIconBlock from '../WeatherIconBlock';
import styles from './styles.module.scss';

import '@/styles/global.scss';

const Content = () => {
  return (
    <main className={styles.grid}>
      <CurrentWeatherCard gridClass={styles.weather} />
      <UserBlock gridClass={styles.user} />
      <WeatherIconBlock />
      <RunningLine gridClass={styles.running} />
      <HourlyBlock gridClass={styles.hourly} />
      <DailyBlock gridClass={styles.daily} />
    </main>
  );
};

export default Content;
