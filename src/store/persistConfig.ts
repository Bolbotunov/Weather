import { EXPIRE_TIME } from '@/constants/constants';
import { AppState } from '@/types/types';

import storage from 'redux-persist/lib/storage';
import expireIn from 'redux-persist-transform-expire-in';

const expireTime = expireIn(EXPIRE_TIME, 'weatherExpire', {
  autoExpire: true,
  expiredState: (state: AppState) => {
    return {
      ...state,
      weather: null,
      hourlyWeather: [],
      dailyWeather: [],
      selectedCity: state.selectedCity,
    };
  },
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['app', 'calendar'],
  transforms: [expireTime],
};

export default persistConfig;
