import { TypedUseSelectorHook, useSelector } from 'react-redux';

import { RootState } from '@/reducers/rootReducer';

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useAppSelector;
