import { SET_CALENDAR_EVENTS, SET_CALENDAR_SIGNED_IN } from '@/constants';
import { CalendarEventProps } from '@/types/types';

export const setCalendarEvents = (events: CalendarEventProps[]) => ({
  type: SET_CALENDAR_EVENTS,
  payload: events,
});

export const setCalendarSignedIn = (status: boolean) => ({
  type: SET_CALENDAR_SIGNED_IN,
  payload: status,
});
