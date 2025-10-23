import { useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';

import Content from '@/components/Content';

import { RootState } from './reducers/rootReducer';

import '@/styles/global.scss';

function App() {
  const theme = useSelector((state: RootState) => state.app.theme);
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
