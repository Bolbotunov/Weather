import { useLayoutEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Content from '@/components/Content';

import useAppSelector from './hooks/useAppSelector';
import NotFound from './pages/NotFound/index';
import { AppRoutes } from './types/types';

import '@/styles/global.scss';

function App() {
  const theme = useAppSelector((state) => state.app.theme);
  const themeClass = `${theme}-theme`;

  useLayoutEffect(() => {
    document.documentElement.className = themeClass;
  }, [themeClass]);

  return (
    <BrowserRouter>
      <div className="appContainer">
        <Routes>
          <Route path={AppRoutes.CONTENT} element={<Content />} />
          <Route path={AppRoutes.NOTFOUND} element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
