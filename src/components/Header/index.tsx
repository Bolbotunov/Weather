import { useBreakPoints } from '@/hooks/useBreakPoints';

import CurrentLocation from '../CurrentLocation';
import UserHeader from '../UserHeader';
import styles from './styles.module.scss';

import '@/styles/global.scss';

const Header = () => {
  const { isTabletSize } = useBreakPoints();

  return (
    <>
      <header className={styles.header}>
        {isTabletSize && <CurrentLocation />}
        <UserHeader />
      </header>
    </>
  );
};

export default Header;
