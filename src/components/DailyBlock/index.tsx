import { useSelector } from 'react-redux';

import { RootState } from '@/reducers/rootReducer';
import { BlockSize } from '@/types/types';

import Block from '../Block';
import DailySlider from '../DailySlider';
import WeatherDailyConditions from '../WeatherDailyConditions';

import '@/styles/global.scss';

const DailyBlock = ({ gridClass }: { gridClass?: string }) => {
  const dailyWeather = useSelector(
    (state: RootState) => state.app.dailyWeather,
  );
  if (!dailyWeather || dailyWeather.length === 0) {
    return null;
  }
  return (
    <Block size={BlockSize.DailyBlock} gridClass={gridClass}>
      <DailySlider forecast={dailyWeather} />
      <WeatherDailyConditions conditions={dailyWeather[0]} />
    </Block>
  );
};

export default DailyBlock;
