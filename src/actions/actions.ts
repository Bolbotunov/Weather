import {
  FETCH_WEATHER_REQUEST,
  SET_DAILY_WEATHER,
  SET_ERROR,
  SET_HOURLY_WEATHER,
  SET_LOADING,
  SET_SELECTED_CITY,
  SET_SELECTED_DATE,
  SET_SUGGESTIONS,
  SET_THEME,
  SET_WEATHER,
} from '@/constants/constants';
import {
  HourlyWeatherData,
  LocationSuggestion,
  OpenWeatherForecastEntry,
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

export const setDailyWeather = (data: OpenWeatherForecastEntry[]) => ({
  type: SET_DAILY_WEATHER,
  payload: data,
});

export const setSelectedDate = (date: string) => ({
  type: SET_SELECTED_DATE,
  payload: date,
});

export const fetchWeatherRequest = () => ({
  type: FETCH_WEATHER_REQUEST,
});

export const setLoading = (value: boolean) => ({
  type: SET_LOADING,
  payload: value,
});

export const setError = (message: string | null) => ({
  type: SET_ERROR,
  payload: message,
});

export const setSelectedCity = (city: LocationSuggestion | null) => ({
  type: SET_SELECTED_CITY,
  payload: city,
});
