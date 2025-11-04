import { useNavigate } from 'react-router-dom';

import Button from '@/components/Button';

import styles from './styles.module.scss';

const NotFound = () => {
  const navigate = useNavigate();

  function returnHandle() {
    navigate('/');
  }

  return (
    <div className={styles.notFound}>
      <h1>404 — Page not found</h1>
      <p className={styles.text}>
        You may have entered the wrong address, or the page no longer exists.
      </p>
      <Button onClick={returnHandle}>go back</Button>
    </div>
  );
};

export default NotFound;
