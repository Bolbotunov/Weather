import {
  setCurrentWeather,
  setDailyWeather,
  setError,
  setHourlyWeather,
  setLoading,
  setSelectedDate,
  setWeatherCache,
} from '@/actions/actions';
import {
  getCurrentWeather,
  getDailyWeather,
  getHourlyWeather,
  getUserCoordinates,
} from '@/api';
import { EXPIRE_TIME, FETCH_WEATHER_REQUEST } from '@/constants';
import { formatDate, FormatType } from '@/utils/getFormatDate';

import type { SagaIterator } from 'redux-saga';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';

export function* fetchWeatherSaga(): SagaIterator {
  try {
    yield put(setLoading(true));
    yield put(setError(null));
    const state = yield select((state) => state.app);

    const now = Date.now();
    let lat, lon;

    if (state.weather.currentData) {
      lat = state.weather.currentData.lat;
      lon = state.weather.currentData.lon;
      const key = `${lat}_${lon}`;

      const cached = state.weather.cityCache[key];
      if (cached && now - cached.updated < EXPIRE_TIME) {
        yield put(setCurrentWeather(cached.data));

        return;
      }
    } else {
      const coords = yield call(getUserCoordinates);
      lat = coords.lat;
      lon = coords.lon;
    }

    const [currentWeather, hourlyWeather, dailyWeather] = yield all([
      call(getCurrentWeather, lat, lon),
      call(getHourlyWeather, lat, lon),
      call(getDailyWeather, lat, lon),
    ]);

    yield put(setWeatherCache({ ...currentWeather, lat, lon }));
    yield put(setCurrentWeather({ ...currentWeather, lat, lon }));
    yield put(setHourlyWeather(hourlyWeather));
    yield put(setDailyWeather(dailyWeather));
    yield put(
      setSelectedDate(formatDate(dailyWeather[0].dt, FormatType.RawDate)),
    );
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
