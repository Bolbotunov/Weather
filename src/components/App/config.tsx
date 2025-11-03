import Content from '@/components/Content';
import NotFound from '@/pages/NotFound';
import { AppRoutes } from '@/types/types';

export const configRoutes = [
  { path: AppRoutes.CONTENT, element: <Content /> },
  { path: AppRoutes.NOTFOUND, element: <NotFound /> },
];
