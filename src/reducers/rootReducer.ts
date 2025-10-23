import { combineReducers } from 'redux';

import { reducers as app } from './reducers';

export const rootReducer = combineReducers({
  app,
});

export type RootState = ReturnType<typeof rootReducer>;
