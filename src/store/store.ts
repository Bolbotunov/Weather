import { rootReducer } from '@/reducers/rootReducer';

import { createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';

import persistConfig from './persistConfig';

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
