import ErrorBlock from '@/components/ErrorBlock';
import Loader from '@/components/Loader';
import useAppSelector from '@/hooks/useAppSelector';
import { ChildrenProps } from '@/types/types';

const StatusWrapper = ({ children }: ChildrenProps) => {
  const loading = useAppSelector((state) => state.app.loading);

  const error = useAppSelector((state) => state.app.error);

  if (loading) return <Loader />;
  if (error) return <ErrorBlock message={error} />;

  return <>{children}</>;
};

export default StatusWrapper;
