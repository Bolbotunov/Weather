import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Condition from '@/Condition';
import useAppSelector from '@/hooks/useAppSelector';
import { useBreakPoints } from '@/hooks/useBreakPoints';
import { useStatus } from '@/hooks/useStatus';
import useTheme from '@/hooks/useTheme';
import { RootState } from '@/reducers/rootReducer';
import { BlockSize } from '@/types/types';

import { PersistState } from 'redux-persist';

import Block from '../Block';
import CurrentLocation from '../CurrentLocation';
import ErrorBlock from '../ErrorBlock';
import Loader from '../Loader';
import TemperatureAndDate from '../TemperatureAndDate';

import '@/styles/global.scss';

export type ExtendedRootState = RootState & {
  _persist: PersistState;
};

const CurrentWeatherCard = ({ gridClass }: { gridClass?: string }) => {
  const { loading, error } = useStatus();
  const { isTabletSize } = useBreakPoints();
  const dispatch = useDispatch();
  const weather = useAppSelector((state) => state.app.weather);
  const rehydrated = useSelector(
    (state: ExtendedRootState) => state._persist?.rehydrated,
  );

  useTheme();
  useEffect(() => {
    if (!rehydrated || weather) return;
    dispatch({ type: 'FETCH_WEATHER_REQUEST' });
  }, [dispatch, rehydrated, weather]);

  let content;

  if (loading) {
    content = <Loader />;
  } else if (error) {
    content = <ErrorBlock message={error} />;
  } else {
    content = (
      <>
        <CurrentLocation />
        {!isTabletSize && (
          <>
            <Condition />
            <TemperatureAndDate />
          </>
        )}
      </>
    );
  }

  return (
    <Block size={BlockSize.CurrentWeatherCard} gridClass={gridClass}>
      {content}
    </Block>
  );
};

export default CurrentWeatherCard;
