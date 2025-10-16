import { SET_SUGGESTIONS, SET_WEATHER } from '@/reducers/reducers';
import { LocationSuggestion, WeatherData } from '@/types/types';

export const setWeather = (data: WeatherData) => ({
  type: SET_WEATHER,
  payload: data,
});

export const setSuggestions = (data: LocationSuggestion[]) => ({
  type: SET_SUGGESTIONS,
  payload: data,
});
