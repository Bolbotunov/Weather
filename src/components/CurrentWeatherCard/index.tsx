import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchWeatherRequest } from '@/actions/actions';
import WeatherConditions from '@/components/WeatherConditions';
import useAppSelector from '@/hooks/useAppSelector';
import { useBreakPoints } from '@/hooks/useBreakPoints';
import useTheme from '@/hooks/useTheme';
import { RootState } from '@/reducers/rootReducer';
import { BlockSize } from '@/types/types';

import { PersistState } from 'redux-persist';

import CurrentLocation from '../CurrentLocation';
import StatusWrapper from '../StatusWrapper';
import TemperatureAndDate from '../TemperatureAndDate';
import WidgetContainer from '../WidgetContainer';
import styles from './styles.module.scss';

import '@/styles/global.scss';

export type ExtendedRootState = RootState & {
  _persist: PersistState;
};

const CurrentWeatherCard = ({ gridClass }: { gridClass?: string }) => {
  const { isTabletSize } = useBreakPoints();

  const dispatch = useDispatch();

  const weather = useAppSelector((state) => state.app.weather);

  const rehydrated = useSelector(
    (state: ExtendedRootState) => state._persist?.rehydrated,
  );

  useTheme();
  useEffect(() => {
    if (rehydrated && !weather) {
      dispatch(fetchWeatherRequest());
    }
  }, [dispatch, rehydrated, weather]);

  return (
    <WidgetContainer size={BlockSize.CurrentWeatherCard} gridClass={gridClass}>
      <StatusWrapper>
        <CurrentLocation />
        {!isTabletSize && (
          <div className={styles.wrapper}>
            <WeatherConditions />
            <TemperatureAndDate />
          </div>
        )}
      </StatusWrapper>
    </WidgetContainer>
  );
};

export default CurrentWeatherCard;
