import { SET_CALENDAR_EVENTS, SET_CALENDAR_SIGNED_IN } from '@/constants';

import { AnyAction } from 'redux';

type CalendarState = {
  events: { id: string; summary: string; start: string }[];
  isSignedIn: boolean;
};

const initialState: CalendarState = {
  events: [],
  isSignedIn: false,
};

export const calendarReducer = (
  state = initialState,
  action: AnyAction,
): CalendarState => {
  switch (action.type) {
    case SET_CALENDAR_EVENTS:
      return { ...state, events: action.payload };
    case SET_CALENDAR_SIGNED_IN:
      return { ...state, isSignedIn: action.payload };
    default:
      return state;
  }
};
