import {
  SET_DAILY_WEATHER,
  SET_HOURLY_WEATHER,
  SET_SELECTED_DATE,
  SET_SUGGESTIONS,
  SET_THEME,
  SET_WEATHER,
} from '@/constants/constants';

import { appReducer } from './appReducer';

describe('appReducer', () => {
  it('should set weather', () => {
    const action = {
      type: SET_WEATHER,
      payload: { temperature: 20, condition: 'Clouds', city: 'Minsk' },
    };
    const state = appReducer(undefined, action);
    expect(state.weather).toEqual(action.payload);
  });

  it('should set theme', () => {
    const action = { type: SET_THEME, payload: 'rainy' };
    const state = appReducer(undefined, action);
    expect(state.theme).toBe('rainy');
  });

  it('should set suggestions', () => {
    const action = {
      type: SET_SUGGESTIONS,
      payload: [{ name: 'Minsk', lat: 53.9, lon: 27.5667 }],
    };
    const state = appReducer(undefined, action);
    expect(state.suggestions).toEqual(action.payload);
  });

  it('should set hourly weather', () => {
    const action = {
      type: SET_HOURLY_WEATHER,
      payload: [
        { temperature: 18, condition: 'Clear', windSpeed: 5, time: 123 },
      ],
    };
    const state = appReducer(undefined, action);
    expect(state.hourlyWeather).toEqual(action.payload);
  });

  it('should set daily weather', () => {
    const action = {
      type: SET_DAILY_WEATHER,
      payload: [
        {
          dt: 123,
          main: { temp: 20 },
          weather: [{ main: 'Rain' }],
          wind: { speed: 4 },
        },
      ],
    };
    const state = appReducer(undefined, action);
    expect(state.dailyWeather).toEqual(action.payload);
  });

  it('should set selected date', () => {
    const action = { type: SET_SELECTED_DATE, payload: '2025-10-29' };
    const state = appReducer(undefined, action);
    expect(state.selectedDate).toBe('2025-10-29');
  });

  it('should return initial state for unknown action', () => {
    const state = appReducer(undefined, { type: 'UNKNOWN' });
    expect(state).toEqual({
      weather: null,
      suggestions: [],
      theme: 'sunny',
      hourlyWeather: [],
      dailyWeather: [],
      selectedDate: '',
      error: null,
      loading: false,
    });
  });
});
