import UserIcon from '@/assets/UserIcon.svg?react';
import useAppSelector from '@/hooks/useAppSelector';
import { useGoogleCalendar } from '@/hooks/useGoogleCalendar';

import Button from '../Button';
import WeatherIconWrapper from '../ImageComponent';
import styles from './styles.module.scss';

const UserIconBlock = () => {
  const { signIn, signOut } = useGoogleCalendar();
  const isSignedIn = useAppSelector((state) => state.calendar.isSignedIn);

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
          <WeatherIconWrapper icon={<UserIcon />} variant="extraSmall" />
        </div>
      </div>
    </>
  );
};

export default UserIconBlock;
