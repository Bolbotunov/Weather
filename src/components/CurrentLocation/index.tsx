import LocationIcon from '@/assets/LocationIcon.svg?react';
import { DEFAULT_CITY } from '@/constants/constants';
import useAppSelector from '@/hooks/useAppSelector';

import styles from './styles.module.scss';

const CurrentLocation = () => {
  const weather = useAppSelector((state) => state.app.weather);

  return (
    <div className={styles.location}>
      <LocationIcon className={styles.locationIcon} />
      <div className={styles.locationText}>{weather?.city ?? DEFAULT_CITY}</div>
    </div>
  );
};

export default CurrentLocation;
