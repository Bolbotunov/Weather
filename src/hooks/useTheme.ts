import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { setTheme } from '@/actions/actions';
import { weatherConfig } from '@/constants/weatherConfig';

import useAppSelector from './useAppSelector';

const useApplyCurrentTheme = () => {
  const dispatch = useDispatch();

  const condition = useAppSelector(
    (state) => state.app.weather.currentData?.condition,
  );

  useEffect(() => {
    if (condition) {
      const theme =
        weatherConfig[condition]?.theme ?? weatherConfig['Clear'].theme;
      dispatch(setTheme(theme));
    }
  }, [condition, dispatch]);
};

export default useApplyCurrentTheme;
