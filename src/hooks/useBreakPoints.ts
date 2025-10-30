import { useEffect, useState } from 'react';

import { MOBILE_BREAKPOINT, TABLET_BREAKPOINT } from '@/constants/constants';

export const useBreakpoint = (query: string): boolean => {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const handleChange = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [query]);

  return matches;
};

export const useBreakPoints = () => {
  return {
    isMobileSize: useBreakpoint(`(max-width: ${MOBILE_BREAKPOINT}px)`),
    isTabletSize: useBreakpoint(`(max-width: ${TABLET_BREAKPOINT}px)`),
  };
};
