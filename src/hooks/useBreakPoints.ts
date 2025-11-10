import { useEffect, useState } from 'react';

import {
  DESKTOP_SIZE,
  MOBILE_BREAKPOINT,
  MOBILE_SIZE,
  TABLET_BREAKPOINT,
  TABLET_SIZE,
} from '@/constants/constants';

export const useBreakPoints = () => {
  const [screenSize, setScreenSize] = useState(DESKTOP_SIZE);

  useEffect(() => {
    const mobileQuery = window.matchMedia(
      `(max-width: ${MOBILE_BREAKPOINT}px)`,
    );

    const tabletQuery = window.matchMedia(
      `(min-width: ${MOBILE_BREAKPOINT}px) and (max-width: ${TABLET_BREAKPOINT}px)`,
    );

    const desktopQuery = window.matchMedia(
      `(min-width: ${TABLET_BREAKPOINT}px)`,
    );

    const handleChange = () => {
      switch (true) {
        case mobileQuery.matches:
          setScreenSize(MOBILE_SIZE);
          break;
        case tabletQuery.matches:
          setScreenSize(TABLET_SIZE);
          break;
        case desktopQuery.matches:
          setScreenSize(DESKTOP_SIZE);
          break;
        default:
          setScreenSize(DESKTOP_SIZE);
      }
    };
    handleChange();

    mobileQuery.addEventListener('change', handleChange);
    tabletQuery.addEventListener('change', handleChange);
    desktopQuery.addEventListener('change', handleChange);

    return () => {
      mobileQuery.removeEventListener('change', handleChange);
      tabletQuery.removeEventListener('change', handleChange);
      desktopQuery.removeEventListener('change', handleChange);
    };
  }, [screenSize]);

  return {
    isMobileSize: screenSize === MOBILE_SIZE,
    isTabletSize: screenSize === TABLET_SIZE,
    isDesktopSize: screenSize === DESKTOP_SIZE,
  };
};
