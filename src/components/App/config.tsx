import NotFound from '@/pages/NotFound';
import { AppRoutes } from '@/types/types';

import MainLayout from '../MainLayout';

export const configRoutes = [
  { path: AppRoutes.MAINLAYOUT, element: <MainLayout /> },
  { path: AppRoutes.NOTFOUND, element: <NotFound /> },
];
