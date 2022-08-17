import {
    TypedUseSelectorHook,
    useDispatch,
    useSelector,
  } from 'react-redux';
  import type {
    AppDispatch,
    RootState,
  } from './store';
  
  export const useAppDispatch = () => useDispatch<AppDispatch>();
  export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  export const useAuth = () => useAppSelector(state => state.auth);
  export const useUtil = () => useAppSelector(state => state.util);