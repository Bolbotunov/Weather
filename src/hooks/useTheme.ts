import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setTheme } from '@/actions/actions';
import { RootState } from '@/store/store';
import { weatherConfig } from '@/types/types';

const useTheme = () => {
  const dispatch = useDispatch();
  const condition = useSelector(
    (state: RootState) => state.app.weather?.condition,
  );

  useEffect(() => {
    if (condition) {
      const theme = weatherConfig[condition]?.theme ?? 'sunny';
      dispatch(setTheme(theme));
    }
  }, [condition, dispatch]);
};

export default useTheme;
