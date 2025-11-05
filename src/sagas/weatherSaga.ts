import {
  setDailyWeather,
  setHourlyWeather,
  setSelectedDate,
  setWeather,
} from '@/actions/actions';
import {
  getCurrentWeather,
  getDailyWeather,
  getHourlyWeather,
  getUserCoordinates,
} from '@/api';
import { FETCH_WEATHER_REQUEST } from '@/constants/constants';
import { formatDate, FormatType } from '@/utils/getFormatDate';

import type { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';

function* fetchWeatherSaga(): SagaIterator {
  try {
    const { lat, lon } = yield call(getUserCoordinates);
    const currentWeather = yield call(getCurrentWeather, lat, lon);
    yield put(setWeather(currentWeather));

    const hourlyWeather = yield call(getHourlyWeather, lat, lon);
    yield put(setHourlyWeather(hourlyWeather));

    const dailyWeather = yield call(getDailyWeather, lat, lon);
    yield put(setDailyWeather(dailyWeather));

    yield put(
      setSelectedDate(formatDate(dailyWeather[0].dt, FormatType.RawDate)),
    );
  } catch (error) {
    console.error('Saga error:', error);
  }
}

export function* weatherWatcherSaga() {
  yield takeLatest(FETCH_WEATHER_REQUEST, fetchWeatherSaga);
}
