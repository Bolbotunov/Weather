import { weatherWatcherSaga } from '@/sagas/weatherSaga';

import { all } from 'redux-saga/effects';

export function* rootSaga() {
  yield all([weatherWatcherSaga()]);
}
