import { useEffect, useState } from 'react';

import { MOBILE_BREAKPOINT, TABLET_BREAKPOINT } from '@/constants/constants';

export const useBreakPoints = () => {
  const [matches, setMatches] = useState({
    isMobileSize: false,
    isTabletSize: false,
    isDesktopSize: false,
  });

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
      setMatches({
        isMobileSize: mobileQuery.matches,
        isTabletSize: tabletQuery.matches,
        isDesktopSize: desktopQuery.matches,
      });
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
  }, []);

  return matches;
};
