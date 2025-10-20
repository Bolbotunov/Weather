import { ReactElement } from 'react';

import styles from './styles.module.scss';

const WeatherIconWrapper = ({ icon }: { icon: ReactElement }) => (
  <div className={styles.weatherIconContent}>{icon}</div>
);

export default WeatherIconWrapper;
