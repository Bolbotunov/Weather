import { PropsWithChildren } from 'react';

import ErrorBlock from '@/components/ErrorBlock';
import Loader from '@/components/Loader';
import useAppSelector from '@/hooks/useAppSelector';

const StatusWrapper = ({ children }: PropsWithChildren) => {
  const { loading, error } = useAppSelector((state) => state.app);

  if (loading) return <Loader />;
  if (error) return <ErrorBlock message={error} />;

  return <>{children}</>;
};

export default StatusWrapper;
