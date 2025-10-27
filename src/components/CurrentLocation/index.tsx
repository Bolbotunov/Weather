import { useSelector } from 'react-redux';

import LocationIcon from '@/assets/locationIcon.svg?react';
import { RootState } from '@/reducers/rootReducer';

import styles from './styles.module.scss';

import '@/styles/global.scss';

const CurrentLocation = () => {
  const weather = useSelector((state: RootState) => state.app.weather);
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
