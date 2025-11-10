import {
  SET_CALENDAR_EVENTS,
  SET_CALENDAR_SIGNED_IN,
} from '@/constants/constants';

import { calendarReducer } from './calendarReducer';

const meeting = { id: '1', summary: 'Meeting', start: '2025-11-11 11:00' };

const study = { id: '2', summary: 'Study', start: '2025-11-12 14:00' };

describe('calendarReducer', () => {
  it('set calendar events', () => {
    const action = {
      type: SET_CALENDAR_EVENTS,
      payload: [meeting],
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

it('events should contain specific meeting after update', () => {
  const events = [meeting, study];

  const action = { type: SET_CALENDAR_EVENTS, payload: events };

  const state = calendarReducer(undefined, action);

  expect(state.events).toEqual(expect.arrayContaining(events));
  expect(state.events).toHaveLength(2);
});
