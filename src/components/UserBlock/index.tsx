import { useSelector } from 'react-redux';

import UserIcon from '@/assets/UserIcon.svg?react';
import { useGoogleCalendar } from '@/hooks/useGoogleCalendar';
import { RootState } from '@/reducers/rootReducer';
import { BlockSize, SubBlockSize } from '@/types/types';
import { FormatType, getFormatDate } from '@/utils/getFormatDate';

import Block from '../Block';
import Button from '../Button';
import WeatherIconWrapper from '../ImageComponent';
import SubBlock from '../SubBlock';
import styles from './styles.module.scss';

import '@/styles/global.scss';

const UserBlock = ({ gridClass }: { gridClass?: string }) => {
  const isSignedIn = useSelector(
    (state: RootState) => state.calendar.isSignedIn,
  );
  const events = useSelector((state: RootState) => state.calendar.events);
  const { signIn, signOut } = useGoogleCalendar();

  return (
    <Block size={BlockSize.UserBlock} gridClass={gridClass}>
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
      <div className={styles.taskWrapper}>
        {isSignedIn ? (
          events.map((event) => (
            <SubBlock key={event.id} size={SubBlockSize.UserSubBlock}>
              <div className={styles.taskTime}>
                {getFormatDate(new Date(event.start), FormatType.Time24)}
              </div>
              <div className={styles.taskTitle}>{event.summary}</div>
            </SubBlock>
          ))
        ) : (
          <SubBlock size={SubBlockSize.NoTasksSubBlock}>
            <p className={styles.noTasks}>Sign in to see your events</p>
          </SubBlock>
        )}

        {/* {events.map((event) => (
          <SubBlock key={event.id} size={SubBlockSize.UserSubBlock}>
            <div className={styles.taskTime}>
              {getFormatDate(new Date(event.start), FormatType.Time24)}
            </div>
            <div className={styles.taskTitle}>{event.summary}</div>
          </SubBlock>
        ))} */}
      </div>
    </Block>
  );
};

export default UserBlock;
