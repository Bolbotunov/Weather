import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['app', 'calendar'],
};

export default persistConfig;
