import { useEffect, useState } from 'react';

import { BREAKPOINTS } from '@/constants/constants';

export const useBreakPoints = () => {
  const { DESKTOP, TABLET, MOBILE } = BREAKPOINTS;

  const [screenSize, setScreenSize] = useState(DESKTOP.SIZE);

  useEffect(() => {
    const mobileQuery = window.matchMedia(
      `(max-width: ${MOBILE.BREAKPOINT}px)`,
    );

    const tabletQuery = window.matchMedia(
      `(min-width: ${MOBILE.BREAKPOINT}px) and (max-width: ${TABLET.BREAKPOINT}px)`,
    );

    const desktopQuery = window.matchMedia(
      `(min-width: ${TABLET.BREAKPOINT}px)`,
    );

    const handleChange = () => {
      switch (true) {
        case mobileQuery.matches:
          setScreenSize(MOBILE.SIZE);
          break;
        case tabletQuery.matches:
          setScreenSize(TABLET.SIZE);
          break;
        case desktopQuery.matches:
          setScreenSize(DESKTOP.SIZE);
          break;
        default:
          setScreenSize(DESKTOP.SIZE);
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
    isMobileSize: screenSize === MOBILE.SIZE,
    isTabletSize: screenSize === TABLET.SIZE,
    isDesktopSize: screenSize === DESKTOP.SIZE,
  };
};
