import CurrentLocation from '../CurrentLocation';
import UserHeader from '../UserHeader';
import styles from './styles.module.scss';

import '@/styles/global.scss';

const Header = () => {
  return (
    <>
      <header className={styles.header}>
        <CurrentLocation />
        <UserHeader />
      </header>
    </>
  );
};

export default Header;
