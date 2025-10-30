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
import { AppAction } from '@/reducers/appReducer';
import { fetchWeatherSaga } from '@/sagas/weatherSaga';
import {
  HourlyWeatherData,
  OpenWeatherForecastEntry,
  WeatherCondition,
  WeatherData,
} from '@/types/types';
import { formatDate } from '@/utils/getFormatDate';

import { mocked } from 'jest-mock';
import { runSaga } from 'redux-saga';

jest.mock('@/constants/constants');

jest.mock('@/api/getUserCoordinates', () => ({
  getUserCoordinates: jest.fn(),
}));
jest.mock('@/api/getCurrentWeather', () => ({
  getCurrentWeather: jest.fn(),
}));
jest.mock('@/api/getHourlyWeather', () => ({
  getHourlyWeather: jest.fn(),
}));
jest.mock('@/api/getDailyWeather', () => ({
  getDailyWeather: jest.fn(),
}));
jest.mock('@/utils/getFormatDate', () => ({
  formatDate: jest.fn(),
  FormatType: { RawDate: 'RawDate' },
}));

describe('fetchWeatherSaga', () => {
  it('dispatches weather actions in correct order', async () => {
    const dispatched: AppAction[] = [];

    const mockCoords = { lat: 53.9, lon: 27.5667 };

    const mockWeather: WeatherData = {
      temperature: 10,
      condition: WeatherCondition.Clouds,
      city: 'Minsk',
    };

    const mockHourly: HourlyWeatherData[] = [
      {
        temperature: 10,
        condition: WeatherCondition.Clouds,
        windSpeed: 5,
        time: 123456000,
      },
    ];

    const mockDaily: OpenWeatherForecastEntry[] = [
      {
        dt: 123456,
        main: {
          temp: 10,
          feels_like: 8,
        },
        weather: [
          {
            main: WeatherCondition.Clouds,
          },
        ],
        wind: {
          speed: 5,
        },
        pop: 0.1,
        uvi: 2.5,
      },
    ];

    const mockDate = '2025-10-29';

    mocked(getUserCoordinates).mockResolvedValue(mockCoords);
    mocked(getCurrentWeather).mockResolvedValue(mockWeather);
    mocked(getHourlyWeather).mockResolvedValue(mockHourly);
    mocked(getDailyWeather).mockResolvedValue(mockDaily);
    mocked(formatDate).mockReturnValue(mockDate);

    await runSaga(
      {
        dispatch: (action: AppAction) => dispatched.push(action),
      },
      fetchWeatherSaga,
    ).toPromise();

    expect(dispatched).toEqual([
      setWeather(mockWeather),
      setHourlyWeather(mockHourly),
      setDailyWeather(mockDaily),
      setSelectedDate(mockDate),
    ]);
  });

  it('handles errors gracefully', async () => {
    (getUserCoordinates as jest.Mock).mockRejectedValue(
      new Error('Geolocation error'),
    );

    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    await runSaga({ dispatch: () => {} }, fetchWeatherSaga).toPromise();

    expect(consoleSpy).toHaveBeenCalledWith('Saga error:', expect.any(Error));

    consoleSpy.mockRestore();
  });
});
