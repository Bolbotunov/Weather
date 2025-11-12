import { WeatherIconWrapperProps } from '@/types/types';

import classNames from 'classnames';

import styles from './styles.module.scss';

const WeatherIconWrapper = ({
  icon,
  variant = 'big',
}: WeatherIconWrapperProps) => (
  <div className={classNames(styles.weatherIconContent, styles[variant])}>
    {icon}
  </div>
);

export default WeatherIconWrapper;
