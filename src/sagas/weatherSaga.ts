import {
  setDailyWeather,
  setError,
  setHourlyWeather,
  setLoading,
  setSelectedDate,
  setWeather,
} from '@/actions/actions';
import { getCurrentWeather } from '@/api/getCurrentWeather';
import { getDailyWeather } from '@/api/getDailyWeather';
import { getHourlyWeather } from '@/api/getHourlyWeather';
import { getUserCoordinates } from '@/api/getUserCoordinates';
import { FETCH_WEATHER_REQUEST } from '@/constants/constants';
import { formatDate, FormatType } from '@/utils/getFormatDate';

import type { SagaIterator } from 'redux-saga';
import { all, call, put, takeLatest } from 'redux-saga/effects';

export function* fetchWeatherSaga(): SagaIterator {
  try {
    yield put(setLoading(true));
    yield put(setError(null));
    const { lat, lon } = yield call(getUserCoordinates);

    const [weather, hourly, daily] = yield all([
      call(getCurrentWeather, lat, lon),
      call(getHourlyWeather, lat, lon),
      call(getDailyWeather, lat, lon),
    ]);

    yield put(setWeather(weather));
    yield put(setHourlyWeather(hourly));
    yield put(setDailyWeather(daily));

    yield put(setSelectedDate(formatDate(daily[0].dt, FormatType.RawDate)));
  } catch (error) {
    if (error instanceof Error) {
      yield put(setError(error.message));
    } else {
      yield put(setError('Unknown Error'));
    }
  } finally {
    yield put(setLoading(false));
  }
}

export function* weatherWatcherSaga() {
  yield takeLatest(FETCH_WEATHER_REQUEST, fetchWeatherSaga);
}
