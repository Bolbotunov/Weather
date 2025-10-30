import ApiCalendar from 'react-google-calendar-api';
import { useDispatch } from 'react-redux';

import {
  setCalendarEvents,
  setCalendarSignedIn,
} from '@/actions/calendarActions';
import { GOOGLE_ID, GOOGLE_KEY } from '@/config/env';
import { GOOGLE_DOCS, GOOGLE_SCOPE } from '@/constants/constants';
import { GoogleCalendarEventRaw } from '@/types/types';

const config = {
  clientId: GOOGLE_ID,
  apiKey: GOOGLE_KEY,
  scope: GOOGLE_SCOPE,
  discoveryDocs: [GOOGLE_DOCS],
};

const apiCalendar = new ApiCalendar(config);
export type CalendarEvent = {
  id: string;
  summary: string;
  start: string;
};

export const useGoogleCalendar = () => {
  const dispatch = useDispatch();

  const signIn = async () => {
    try {
      await apiCalendar.handleAuthClick();
      if (apiCalendar.sign) {
        dispatch(setCalendarSignedIn(true));
        loadEvents();
      }
    } catch (error) {
      console.error('Sign-in failed', error);
    }
  };

  const signOut = () => {
    apiCalendar.handleSignoutClick();
    dispatch(setCalendarSignedIn(false));
    dispatch(setCalendarEvents([]));
  };

  const loadEvents = async () => {
    try {
      if (!apiCalendar.sign) {
        console.warn('User not signed in');
        return;
      }
      const response = await apiCalendar.listUpcomingEvents(10);
      const events = response.result.items.map(
        (event: GoogleCalendarEventRaw) => ({
          id: event.id,
          summary: event.summary,
          start: event.start.dateTime || event.start.date,
        }),
      );
      dispatch(setCalendarEvents(events));
      dispatch(setCalendarSignedIn(true));
    } catch (error) {
      console.error('Failed to load events', error);
    }
  };

  return { signIn, signOut };
};
