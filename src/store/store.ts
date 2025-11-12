import { rootReducer, RootState } from '@/reducers/rootReducer';

import { AnyAction, applyMiddleware, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import persistConfig from './persistConfig';
import { rootSaga } from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer<RootState, AnyAction>(
  persistConfig,
  rootReducer,
);

export const store = createStore(
  persistedReducer,
  applyMiddleware(sagaMiddleware),
);
sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
