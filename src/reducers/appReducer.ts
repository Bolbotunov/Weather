import {
  SET_CURRENT_WEATHER,
  SET_DAILY_WEATHER,
  SET_ERROR,
  SET_HOURLY_WEATHER,
  SET_LOADING,
  SET_SELECTED_DATE,
  SET_SUGGESTIONS,
  SET_THEME,
  SET_WEATHER,
  SET_WEATHER_CACHE,
} from '@/constants/constants';
import {
  AppState,
  HourlyWeatherData,
  LocationSuggestion,
  WeatherData,
} from '@/types/types';

import { AnyAction } from 'redux';

type SetThemeAction = {
  type: typeof SET_THEME;
  payload: string;
};

type SetWeatherAction = {
  type: typeof SET_WEATHER;
  payload: WeatherData;
};

type SetSuggestionsAction = {
  type: typeof SET_SUGGESTIONS;
  payload: LocationSuggestion[];
};

type SetHourlyWeather = {
  type: typeof SET_HOURLY_WEATHER;
  payload: HourlyWeatherData[];
};

export type AppAction =
  | SetWeatherAction
  | SetSuggestionsAction
  | SetThemeAction
  | SetHourlyWeather;

export const initialState: AppState = {
  weather: {
    currentData: null,
    cityCache: {},
  },
  citySuggestions: [],
  selectedCity: null,
  theme: 'sunny',
  hourlyWeather: [],
  dailyWeather: [],
  selectedDate: '',
  loading: false,
  error: null,
};

export const appReducer = (
  state = initialState,
  action: AnyAction,
): AppState => {
  switch (action.type) {
    case SET_WEATHER:
      return {
        ...state,
        weather: {
          ...state.weather,
          [action.payload.city]: {
            data: action.payload.data,
            updated: action.payload.updated,
          },
        },
      };
    case SET_WEATHER_CACHE:
      return {
        ...state,
        weather: {
          ...state.weather,
          cityCache: {
            ...state.weather.cityCache,
            [action.payload.key]: {
              data: action.payload.data,
              updated: action.payload.updated,
            },
          },
        },
      };
    case SET_CURRENT_WEATHER:
      return {
        ...state,
        weather: {
          ...state.weather,
          currentData: action.payload,
        },
      };
    case SET_SUGGESTIONS:
      return { ...state, citySuggestions: action.payload ?? [] };
    case SET_THEME:
      return { ...state, theme: action.payload };
    case SET_HOURLY_WEATHER:
      return { ...state, hourlyWeather: action.payload };
    case SET_DAILY_WEATHER:
      return { ...state, dailyWeather: action.payload };
    case SET_SELECTED_DATE:
      return { ...state, selectedDate: action.payload };
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case SET_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
