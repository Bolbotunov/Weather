import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { fetchWeatherRequest } from '@/actions/actions';
import WeatherConditions from '@/components/WeatherConditions';
import useAppSelector from '@/hooks/useAppSelector';
import { useBreakPoints } from '@/hooks/useBreakPoints';
import useApplyCurrentTheme from '@/hooks/useTheme';
import { BlockSize } from '@/types/types';

import CurrentLocation from '../CurrentLocation';
import StatusWrapper from '../StatusWrapper';
import TemperatureAndDate from '../TemperatureAndDate';
import WidgetContainer from '../WidgetContainer';
import styles from './styles.module.scss';

const CurrentWeatherCard = ({ gridClass }: { gridClass?: string }) => {
  const { isTabletSize } = useBreakPoints();

  const dispatch = useDispatch();

  const currentWeather = useAppSelector(
    (state) => state.app.weather.currentData,
  );

  const weather = useAppSelector((state) => state.app.weather);

  const rehydrated = useAppSelector((state) => state._persist?.rehydrated);

  useApplyCurrentTheme();
  useEffect(() => {
    console.log(currentWeather);
    console.log(weather);
    if (rehydrated && !currentWeather) {
      dispatch(fetchWeatherRequest());
    }
  }, [dispatch, rehydrated, currentWeather]);

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
