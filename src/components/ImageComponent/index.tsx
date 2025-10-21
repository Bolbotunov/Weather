import { ReactElement } from 'react';

import classNames from 'classnames';

import styles from './styles.module.scss';

type WeatherIconWrapperProps = {
  icon: ReactElement;
  variant?: 'big' | 'small';
};

const WeatherIconWrapper = ({
  icon,
  variant = 'big',
}: WeatherIconWrapperProps) => (
  <div className={classNames(styles.weatherIconContent, styles[variant])}>
    {icon}
  </div>
);

export default WeatherIconWrapper;
