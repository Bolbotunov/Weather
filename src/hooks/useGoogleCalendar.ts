import { useCallback, useMemo } from 'react';
import ApiCalendar from 'react-google-calendar-api';
import { useDispatch } from 'react-redux';

import {
  setCalendarEvents,
  setCalendarSignedIn,
} from '@/actions/calendarActions';
import { GOOGLE_ID, GOOGLE_KEY } from '@/config/env';
import { GOOGLE_DOCS, GOOGLE_SCOPE } from '@/constants/constants';
import { GoogleCalendarEventRaw } from '@/types/types';

import useAppSelector from './useAppSelector';

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
  const isSignedIn = useAppSelector((state) => state.calendar.isSignedIn);

  const signOut = useCallback(() => {
    apiCalendar.handleSignoutClick();
    dispatch(setCalendarSignedIn(false));
    dispatch(setCalendarEvents([]));
  }, [dispatch]);

  const loadEvents = useCallback(async () => {
    try {
      if (!apiCalendar.sign) {
        console.warn('User not signed in');
        return;
      }
      const response = await apiCalendar.listUpcomingEvents(10);
      const events = response.result.items.map(
        ({ id, summary, start }: GoogleCalendarEventRaw) => ({
          id,
          summary,
          start: start.dateTime || start.date,
        }),
      );
      dispatch(setCalendarEvents(events));
      dispatch(setCalendarSignedIn(true));
    } catch (error) {
      console.error('Failed to load events', error);
    }
  }, [dispatch]);

  const signIn = useCallback(async () => {
    try {
      await apiCalendar.handleAuthClick();
      if (apiCalendar.sign) {
        dispatch(setCalendarSignedIn(true));
        await loadEvents();
      }
    } catch (error) {
      console.error('Sign-in failed', error);
    }
  }, [dispatch, loadEvents]);
  const buttonLabel = useMemo(
    () => (isSignedIn ? 'Sign Out' : 'Sign In'),
    [isSignedIn],
  );

  const handleAuth = useCallback(() => {
    if (isSignedIn) {
      signOut();
    } else {
      signIn();
    }
  }, [isSignedIn, signIn, signOut]);

  return {
    isSignedIn,
    buttonLabel,
    handleAuth,
  };
};
