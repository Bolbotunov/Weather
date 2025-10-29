import {
  setDailyWeather,
  setHourlyWeather,
  setSelectedDate,
  setWeather,
} from '@/actions/actions';
import { getCurrentWeather } from '@/api/getCurrentWeather';
import { getDailyWeather } from '@/api/getDailyWeather';
import { getHourlyWeather } from '@/api/getHourlyWeather';
import { getUserCoordinates } from '@/api/getUserCoordinates';
import { formatDate, FormatType } from '@/utils/getFormatDate';

import type { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';

function* fetchWeatherSaga(): SagaIterator {
  console.log('Saga triggered');
  try {
    const { lat, lon } = yield call(getUserCoordinates);
    const weather = yield call(getCurrentWeather, lat, lon);
    yield put(setWeather(weather));

    const hourly = yield call(getHourlyWeather, lat, lon);
    yield put(setHourlyWeather(hourly));

    const daily = yield call(getDailyWeather, lat, lon);
    yield put(setDailyWeather(daily));

    yield put(setSelectedDate(formatDate(daily[0].dt, FormatType.RawDate)));
  } catch (error) {
    console.error('Saga error:', error);
  }
}

export function* weatherWatcherSaga() {
  yield takeLatest('FETCH_WEATHER_REQUEST', fetchWeatherSaga);
}
