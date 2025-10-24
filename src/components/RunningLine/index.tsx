import { useSelector } from 'react-redux';

import { RootState } from '@/reducers/rootReducer';
import { BlockSize } from '@/types/types';
import getTimeBeforeEvent from '@/utils/getTimeBeforeEvent';

import Block from '../Block';
import styles from './styles.module.scss';

import '@/styles/global.scss';

const RunningLine = ({ gridClass }: { gridClass?: string }) => {
  const events = useSelector((state: RootState) => state.calendar.events);
  const isSignedIn = useSelector(
    (state: RootState) => state.calendar.isSignedIn,
  );
  const runningTextElements = isSignedIn
    ? events.map((event) => (
        <span className={styles.textItem} key={event.id}>
          {`${event.summary} • ${getTimeBeforeEvent(event.start)}`}
        </span>
      ))
    : 'Sign in to see your events';
  return (
    <Block size={BlockSize.RunningLine} gridClass={gridClass}>
      <div className={styles.line}>
        <span className={styles.lineText}>{runningTextElements}</span>
      </div>
    </Block>
  );
};

export default RunningLine;
