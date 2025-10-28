import { useLayoutEffect } from 'react';

import Content from '@/components/Content';

import useAppSelector from './hooks/useAppSelector';

import '@/styles/global.scss';

function App() {
  const theme = useAppSelector((state) => state.app.theme);
  const themeClass = `${theme}-theme`;

  useLayoutEffect(() => {
    document.documentElement.className = themeClass;
  }, [themeClass]);

  return (
    <div className="appContainer">
      <Content />
    </div>
  );
}

export default App;
