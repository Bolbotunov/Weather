import LocationIcon from '@/assets/locationIcon.svg?react';
import useAppSelector from '@/hooks/useAppSelector';

import styles from './styles.module.scss';

import '@/styles/global.scss';

const CurrentLocation = () => {
  const weather = useAppSelector((state) => state.app.weather);

  return (
    <>
      <div className={styles.location}>
        <LocationIcon className={styles.locationIcon} />
        <div className={styles.locationText}>
          {weather?.city ?? 'Your City'}
        </div>
      </div>
    </>
  );
};

export default CurrentLocation;
