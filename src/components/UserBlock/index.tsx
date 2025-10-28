import useAppSelector from '@/hooks/useAppSelector';
import { BlockSize, SubBlockSize } from '@/types/types';
import { FormatType, getFormatDate } from '@/utils/getFormatDate';

import Block from '../Block';
import SubBlock from '../SubBlock';
import UserHeader from '../UserHeader';
import styles from './styles.module.scss';

import '@/styles/global.scss';

const UserBlock = ({ gridClass }: { gridClass?: string }) => {
  const events = useAppSelector((state) => state.calendar.events);
  const isSignedIn = useAppSelector((state) => state.calendar.isSignedIn);

  return (
    <Block size={BlockSize.UserBlock} gridClass={gridClass}>
      <UserHeader />
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
      </div>
    </Block>
  );
};

export default UserBlock;
