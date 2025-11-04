import useAppSelector from '@/hooks/useAppSelector';
import { useBreakPoints } from '@/hooks/useBreakPoints';
import { BlockSize, SubBlockSize } from '@/types/types';
import { FormatType, getFormatDate } from '@/utils/getFormatDate';

import Header from '../Header';
import StatusWrapper from '../StatusWrapper';
import SubBlock from '../SubBlock';
import WidgetContainer from '../WidgetContainer';
import styles from './styles.module.scss';

import '@/styles/global.scss';

const UserBlock = ({ gridClass }: { gridClass?: string }) => {
  const events = useAppSelector((state) => state.calendar.events);

  const isSignedIn = useAppSelector((state) => state.calendar.isSignedIn);

  const { isTabletSize } = useBreakPoints();

  return (
    <WidgetContainer size={BlockSize.UserBlock} gridClass={gridClass}>
      <StatusWrapper>
        {!isTabletSize && <Header />}
        <div className={styles.taskWrapper}>
          {isSignedIn ? (
            events.map(({ id, summary, start }) => (
              <SubBlock key={id} size={SubBlockSize.UserSubBlock}>
                <div className={styles.taskTime}>
                  {getFormatDate(new Date(start), FormatType.Time24)}
                </div>
                <div className={styles.taskTitle}>{summary}</div>
              </SubBlock>
            ))
          ) : (
            <SubBlock size={SubBlockSize.NoTasksSubBlock}>
              <p className={styles.noTasks}>Sign in to see your events</p>
            </SubBlock>
          )}
        </div>
      </StatusWrapper>
    </WidgetContainer>
  );
};

export default UserBlock;
