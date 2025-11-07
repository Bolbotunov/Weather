import { AppState } from '@/types/types';
import { formatDate, FormatType } from '@/utils/getFormatDate';

import storage from 'redux-persist/lib/storage';
import expireIn from 'redux-persist-transform-expire-in';

const expireTime = expireIn(3600, 'weatherExpire', {
  expiredState: (state: AppState) => {
    console.log('selectedCity:', state.selectedCity?.name);

    return {
      ...state,
      weather: null,
      hourlyWeather: [],
      dailyWeather: [],
      selectedDate: formatDate(Date.now(), FormatType.RawDate),
      selectedCity: state.selectedCity,
    };
  },
  autoExpire: true,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['app', 'calendar'],
  transforms: [expireTime],
};

export default persistConfig;
