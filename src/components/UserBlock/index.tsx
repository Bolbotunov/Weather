import useAppSelector from '@/hooks/useAppSelector';
import { useBreakPoints } from '@/hooks/useBreakPoints';
import { BlockSize, SubBlockSize } from '@/types/types';
import { FormatType, getFormatDate } from '@/utils/getFormatDate';

import Header from '../Header';
import InnerWidgetContainer from '../InnerWidgetContainer';
import StatusWrapper from '../StatusWrapper';
import WidgetContainer from '../WidgetContainer';
import styles from './styles.module.scss';

const UserBlock = ({ gridClass }: { gridClass?: string }) => {
  const { events, isSignedIn } = useAppSelector((state) => state.calendar);

  const { isTabletSize } = useBreakPoints();

  return (
    <WidgetContainer size={BlockSize.UserBlock} gridClass={gridClass}>
      <StatusWrapper>
        {!isTabletSize && <Header />}
        <div className={styles.taskWrapper}>
          {isSignedIn ? (
            events.map(({ id, summary, start }) => (
              <InnerWidgetContainer key={id} size={SubBlockSize.UserSubBlock}>
                <div className={styles.taskTime}>
                  {getFormatDate(new Date(start), FormatType.Time24)}
                </div>
                <div className={styles.taskTitle}>{summary}</div>
              </InnerWidgetContainer>
            ))
          ) : (
            <InnerWidgetContainer size={SubBlockSize.NoTasksSubBlock}>
              <p className={styles.noTasks}>Sign in to see your events</p>
            </InnerWidgetContainer>
          )}
        </div>
      </StatusWrapper>
    </WidgetContainer>
  );
};

export default UserBlock;
