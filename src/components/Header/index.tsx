import { useBreakPoints } from '@/hooks/useBreakPoints';

import CurrentLocation from '../CurrentLocation';
import UserIconBlock from '../UserIconBlock';
import styles from './styles.module.scss';

const Header = () => {
  const { isDesktopSize } = useBreakPoints();

  return (
    <>
      <header className={styles.header}>
        {!isDesktopSize && <CurrentLocation />}
        <UserIconBlock />
      </header>
    </>
  );
};

export default Header;
