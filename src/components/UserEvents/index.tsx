import { useMemo } from 'react';

import useAppSelector from '@/hooks/useAppSelector';
import { BlockSize } from '@/types/types';
import getTimeBeforeEvent from '@/utils/getTimeBeforeEvent';

import WidgetContainer from '../WidgetContainer';
import styles from './styles.module.scss';

const UserEvents = ({ gridClass }: { gridClass?: string }) => {
  const { isSignedIn, events } = useAppSelector((state) => state.calendar);

  const runningTextElements = useMemo(() => {
    if (!isSignedIn) {
      return 'Sign in to see your events';
    }

    return events.map(({ id, summary, start }) => (
      <span className={styles.textItem} key={id}>
        {`${summary} • ${getTimeBeforeEvent(start)}`}
      </span>
    ));
  }, [isSignedIn, events]);

  return (
    <WidgetContainer size={BlockSize.UserEvents} gridClass={gridClass}>
      <div className={styles.line}>
        <span className={styles.lineText}>{runningTextElements}</span>
      </div>
    </WidgetContainer>
  );
};

export default UserEvents;
