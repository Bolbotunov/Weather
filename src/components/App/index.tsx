import { useLayoutEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import useAppSelector from '@/hooks/useAppSelector';

import { configRoutes } from './config';

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
          {configRoutes.map(({ path, element }) => (
            <Route path={path} element={element} />
          ))}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
