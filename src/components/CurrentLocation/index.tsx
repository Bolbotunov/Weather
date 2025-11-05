import LocationIcon from '@/assets/locationIcon.svg?react';
import useAppSelector from '@/hooks/useAppSelector';

import styles from './styles.module.scss';

const CurrentLocation = () => {
  const weather = useAppSelector((state) => state.app.weather);

  return (
    <div className={styles.location}>
      <LocationIcon className={styles.locationIcon} />
      <p className={styles.locationText}>{weather?.city ?? 'Your City'}</p>
    </div>
  );
};

export default CurrentLocation;
