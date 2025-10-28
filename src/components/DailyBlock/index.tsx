import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { setSelectedDate } from '@/actions/actions';
import useAppSelector from '@/hooks/useAppSelector';
import { BlockSize } from '@/types/types';
import { formatDate, FormatType } from '@/utils/getFormatDate';

import Block from '../Block';
import DailySlider from '../DailySlider';
import WeatherDailyConditions from '../WeatherDailyConditions';

import '@/styles/global.scss';

const DailyBlock = ({ gridClass }: { gridClass?: string }) => {
  const dailyWeather = useAppSelector((state) => state.app.dailyWeather);
  const dispatch = useDispatch();
  const [activeIndex, setActiveIndex] = useState(0);

  const handleDayChange = (index: number) => {
    setActiveIndex(index);
    const selected = formatDate(dailyWeather[index].dt, FormatType.RawDate);
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
