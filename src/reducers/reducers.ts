import { SET_SUGGESTIONS, SET_WEATHER } from '@/constants/constants';
import { AppState, LocationSuggestion, WeatherData } from '@/types/types';

type SetWeatherAction = {
  type: typeof SET_WEATHER;
  payload: WeatherData;
};

type SetSuggestionsAction = {
  type: typeof SET_SUGGESTIONS;
  payload: LocationSuggestion[];
};

export type AppAction = SetWeatherAction | SetSuggestionsAction;

const initialState: AppState = {
  weather: null,
  suggestions: [],
};

export const reducers = (state = initialState, action: AppAction): AppState => {
  switch (action.type) {
    case SET_WEATHER:
      return { ...state, weather: action.payload };
    case SET_SUGGESTIONS:
      return { ...state, suggestions: action.payload ?? [] };
    default:
      return state;
  }
};
