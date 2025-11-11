import { DEFAULT_CITY } from '@/constants';
import LocationIcon from '@/assets/LocationIcon.svg?react';
import useAppSelector from '@/hooks/useAppSelector';

import styles from './styles.module.scss';

const CurrentLocation = () => {
  const currentCity = useAppSelector(
    (state) => state.app.weather.currentData?.city,
  );

  return (
    <div className={styles.location}>
      <LocationIcon className={styles.locationIcon} />
      <div className={styles.locationText}>{currentCity ?? DEFAULT_CITY}</div>
    </div>
  );
};

export default CurrentLocation;
