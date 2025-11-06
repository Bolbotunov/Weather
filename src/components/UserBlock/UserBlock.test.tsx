import useAppSelector from '@/hooks/useAppSelector';
import { render, screen } from '@testing-library/react';

import UserBlock from '.';

jest.mock('@/hooks/useAppSelector', () => ({
  __esModule: true,
  default: jest.fn(),
}));
jest.mock('@/components/Header', () => () => <div />);
jest.mock('@/hooks/useBreakPoints', () => ({
  useBreakPoints: () => ({
    isMobile: false,
  }),
}));

describe('UserBlock', () => {
  it('show event if entered', () => {
    (useAppSelector as jest.Mock).mockReturnValue({
      isSignedIn: true,
      events: [{ id: '1', summary: 'Meet', start: '2025-11-11 11:00' }],
    });

    render(<UserBlock />);
    expect(screen.getByText('Meet')).toBeInTheDocument();
    expect(screen.getByText(/11:00/)).toBeInTheDocument();
  });

  it('show mock if not entered', () => {
    (useAppSelector as jest.Mock).mockReturnValue({
      isSignedIn: false,
      events: [],
    });

    render(<UserBlock />);
    expect(screen.getByText(/Sign in to see your events/i)).toBeInTheDocument();
  });
});
