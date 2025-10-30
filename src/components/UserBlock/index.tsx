import useAppSelector from '@/hooks/useAppSelector';
import { useBreakPoints } from '@/hooks/useBreakPoints';
import { BlockSize, SubBlockSize } from '@/types/types';
import { FormatType, getFormatDate } from '@/utils/getFormatDate';

import Block from '../Block';
import Header from '../Header';
import SubBlock from '../SubBlock';
import styles from './styles.module.scss';

import '@/styles/global.scss';

const UserBlock = ({ gridClass }: { gridClass?: string }) => {
  const events = useAppSelector((state) => state.calendar.events);
  const isSignedIn = useAppSelector((state) => state.calendar.isSignedIn);
  const { isTabletSize } = useBreakPoints();

  return (
    <Block size={BlockSize.UserBlock} gridClass={gridClass}>
      {!isTabletSize && <Header />}
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
