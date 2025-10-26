import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setSelectedDate } from '@/actions/actions';
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
  const dispatch = useDispatch();
  const [activeIndex, setActiveIndex] = useState(0);

  const handleDayChange = (index: number) => {
    setActiveIndex(index);
    const selected = new Date(dailyWeather[index].dt * 1000).toDateString();
    dispatch(setSelectedDate(selected));
  };

  if (!dailyWeather || dailyWeather.length === 0) {
    return null;
  }
  return (
    <Block size={BlockSize.DailyBlock} gridClass={gridClass}>
      <DailySlider
        forecast={dailyWeather}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        handleDayChange={handleDayChange}
      />

      <WeatherDailyConditions conditions={dailyWeather[activeIndex]} />
    </Block>
  );
};

export default DailyBlock;
