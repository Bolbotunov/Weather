import {
  SET_HOURLY_WEATHER,
  SET_SUGGESTIONS,
  SET_THEME,
  SET_WEATHER,
} from '@/constants/constants';
import {
  HourlyWeatherData,
  LocationSuggestion,
  WeatherData,
} from '@/types/types';

export const setWeather = (data: WeatherData) => ({
  type: SET_WEATHER,
  payload: data,
});

export const setSuggestions = (data: LocationSuggestion[]) => ({
  type: SET_SUGGESTIONS,
  payload: data,
});

export const setTheme = (theme: string) => ({
  type: SET_THEME,
  payload: theme,
});

export const setHourlyWeather = (data: HourlyWeatherData[]) => ({
  type: SET_HOURLY_WEATHER,
  payload: data,
});
