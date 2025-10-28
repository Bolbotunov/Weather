import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { setTheme } from '@/actions/actions';
import { weatherConfig } from '@/types/types';

import useAppSelector from './useAppSelector';

const useTheme = () => {
  const dispatch = useDispatch();
  const condition = useAppSelector((state) => state.app.weather?.condition);

  useEffect(() => {
    if (condition) {
      const theme =
        weatherConfig[condition]?.theme ?? weatherConfig['Clear'].theme;
      dispatch(setTheme(theme));
    }
  }, [condition, dispatch]);
};

export default useTheme;
