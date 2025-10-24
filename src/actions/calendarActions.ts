import {
  SET_CALENDAR_EVENTS,
  SET_CALENDAR_SIGNED_IN,
} from '@/constants/constants';

type CalendarEventProps = {
  id: string;
  summary: string;
  start: string;
};

export const setCalendarEvents = (events: CalendarEventProps[]) => ({
  type: SET_CALENDAR_EVENTS,
  payload: events,
});

export const setCalendarSignedIn = (status: boolean) => ({
  type: SET_CALENDAR_SIGNED_IN,
  payload: status,
});
