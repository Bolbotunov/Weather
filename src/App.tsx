import { Provider } from 'react-redux';

import Content from '@/components/Content';

import { store } from './store/store';

import '@/styles/global.scss';

function App() {
  return (
    <Provider store={store}>
      <div className="appContainer">
        <Content />
      </div>
    </Provider>
  );
}

export default App;
