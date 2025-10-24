import { combineReducers } from 'redux';

import { appReducer } from './appReducer';
import { calendarReducer } from './calendarReducer';

export const rootReducer = combineReducers({
  app: appReducer,
  calendar: calendarReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
