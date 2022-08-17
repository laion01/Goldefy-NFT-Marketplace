import {
  Action,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import utilReducer from './slices/utilSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    util: utilReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;