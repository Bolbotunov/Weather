import { useMemo } from 'react';

import useAppSelector from '@/hooks/useAppSelector';
import { BlockSize } from '@/types/types';
import getTimeBeforeEvent from '@/utils/getTimeBeforeEvent';

import WidgetContainer from '../WidgetContainer';
import styles from './styles.module.scss';

import '@/styles/global.scss';

const RunningLine = ({ gridClass }: { gridClass?: string }) => {
  const events = useAppSelector((state) => state.calendar.events);

  const isSignedIn = useAppSelector((state) => state.calendar.isSignedIn);

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
    <WidgetContainer size={BlockSize.RunningLine} gridClass={gridClass}>
      <div className={styles.line}>
        <span className={styles.lineText}>{runningTextElements}</span>
      </div>
    </WidgetContainer>
  );
};

export default RunningLine;
