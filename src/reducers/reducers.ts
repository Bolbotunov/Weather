import {
  SET_HOURLY_WEATHER,
  SET_SUGGESTIONS,
  SET_THEME,
  SET_WEATHER,
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

const initialState: AppState = {
  weather: null,
  suggestions: [],
  theme: 'sunny',
  hourlyWeather: [],
};

export const reducers = (state = initialState, action: AnyAction): AppState => {
  switch (action.type) {
    case SET_WEATHER:
      return { ...state, weather: action.payload };
    case SET_SUGGESTIONS:
      return { ...state, suggestions: action.payload ?? [] };
    case SET_THEME:
      return { ...state, theme: action.payload };
    case SET_HOURLY_WEATHER:
      return { ...state, hourlyWeather: action.payload };
    default:
      return state;
  }
};
