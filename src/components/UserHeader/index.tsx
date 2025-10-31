import UserIcon from '@/assets/UserIcon.svg?react';
import { useGoogleCalendar } from '@/hooks/useGoogleCalendar';

import Button from '../Button';
import WeatherIconWrapper from '../ImageComponent';
import styles from './styles.module.scss';

import '@/styles/global.scss';

const UserHeader = () => {
  const { buttonLabel, handleAuth } = useGoogleCalendar();

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.blockWrapper}>
          <Button onClick={handleAuth}>{buttonLabel}</Button>
        </div>
        <div className={styles.blockWrapper}>
          <p className={styles.title}>Hello User</p>
          <WeatherIconWrapper icon={<UserIcon />} variant="extraSmall" />
        </div>
      </div>
    </>
  );
};

export default UserHeader;
