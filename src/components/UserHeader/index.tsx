import { useSelector } from 'react-redux';

import UserIcon from '@/assets/UserIcon.svg?react';
import { useGoogleCalendar } from '@/hooks/useGoogleCalendar';
import { RootState } from '@/reducers/rootReducer';

import Button from '../Button';
import WeatherIconWrapper from '../ImageComponent';
import styles from './styles.module.scss';

import '@/styles/global.scss';

const UserHeader = () => {
  const { signIn, signOut } = useGoogleCalendar();
  const isSignedIn = useSelector(
    (state: RootState) => state.calendar.isSignedIn,
  );
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.blockWrapper}>
          <Button onClick={isSignedIn ? signOut : signIn}>
            {isSignedIn ? 'Sign Out' : 'Sign In'}
          </Button>
        </div>
        <div className={styles.blockWrapper}>
          <p className={styles.title}>Hello User</p>
          <WeatherIconWrapper icon={<UserIcon />} variant="small" />
        </div>
      </div>
    </>
  );
};

export default UserHeader;
