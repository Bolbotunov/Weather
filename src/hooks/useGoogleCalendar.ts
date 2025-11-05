import ApiCalendar from 'react-google-calendar-api';
import { useDispatch } from 'react-redux';

import {
  setCalendarEvents,
  setCalendarSignedIn,
} from '@/actions/calendarActions';
import { GoogleCalendarEventRaw } from '@/types/types';

const config = {
  clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
  apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
  scope: 'https://www.googleapis.com/auth/calendar.readonly',
  discoveryDocs: [
    'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
  ],
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
