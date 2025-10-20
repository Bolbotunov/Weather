import { reducers } from '@/reducers/reducers';

import { combineReducers, createStore } from 'redux';

const rootReducer = combineReducers({
  app: reducers,
});

export const store = createStore(rootReducer);
export type RootState = ReturnType<typeof rootReducer>;
