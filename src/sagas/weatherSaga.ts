import {
  setDailyWeather,
  setError,
  setHourlyWeather,
  setLoading,
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
import { all, call, put, select, takeLatest } from 'redux-saga/effects';

export function* fetchWeatherSaga(): SagaIterator {
  try {
    yield put(setLoading(true));
    yield put(setError(null));
    const { selectedCity } = yield select((state) => state.app);
    console.log('[fetchWeatherSaga] selectedCity:', selectedCity);
    let lat;
    let lon;

    if (selectedCity) {
      lat = selectedCity.lat;
      lon = selectedCity.lon;
    } else {
      console.warn(
        '[fetchWeatherSaga] selectedCity is missing, using geolocation',
      );
      const coords = yield call(getUserCoordinates);
      lat = coords.lat;
      lon = coords.lon;
    }

    const [currentWeather, hourlyWeather, dailyWeather] = yield all([
      call(getCurrentWeather, lat, lon),
      call(getHourlyWeather, lat, lon),
      call(getDailyWeather, lat, lon),
    ]);

    console.log('cuurentweather', currentWeather);
    console.log('selectedCity', selectedCity);

    yield put(setWeather(currentWeather));
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
