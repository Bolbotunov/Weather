import { SET_SUGGESTIONS, SET_THEME, SET_WEATHER } from '@/constants/constants';
import { AppState, LocationSuggestion, WeatherData } from '@/types/types';

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

export type AppAction =
  | SetWeatherAction
  | SetSuggestionsAction
  | SetThemeAction;

const initialState: AppState = {
  weather: null,
  suggestions: [],
  theme: 'sunny',
};

export const reducers = (state = initialState, action: AppAction): AppState => {
  switch (action.type) {
    case SET_WEATHER:
      return { ...state, weather: action.payload };
    case SET_SUGGESTIONS:
      return { ...state, suggestions: action.payload ?? [] };
    case SET_THEME:
      return { ...state, theme: action.payload };
    default:
      return state;
  }
};
