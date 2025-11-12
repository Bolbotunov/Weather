import { TypedUseSelectorHook, useSelector } from 'react-redux';

import { RootState } from '@/reducers/rootReducer';

import { PersistState } from 'redux-persist';

export type ExtendedRootState = RootState & {
  _persist?: PersistState;
};

const useAppSelector: TypedUseSelectorHook<ExtendedRootState> = useSelector;

export default useAppSelector;
