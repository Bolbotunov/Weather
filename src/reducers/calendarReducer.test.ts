import {
  SET_CALENDAR_EVENTS,
  SET_CALENDAR_SIGNED_IN,
} from '@/constants/constants';

import { calendarReducer } from './calendarReducer';

describe('calendarReducer', () => {
  it('set calendar events', () => {
    const action = {
      type: SET_CALENDAR_EVENTS,
      payload: [{ id: '1', summary: 'Meeting', start: '2025-11-11 11:00' }],
    };

    const state = calendarReducer(undefined, action);
    expect(state.events).toEqual(action.payload);
  });

  it('signed-in status', () => {
    const action = { type: SET_CALENDAR_SIGNED_IN, payload: true };

    const state = calendarReducer(undefined, action);
    expect(state.isSignedIn).toBe(true);
  });
});
