import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import {
  authReducer,
  loaderReducer,
  messageReducer,
  sidebarReducer,
} from '../reducers';

export const store = configureStore({
  reducer: {
    loader: loaderReducer,
    sidebar: sidebarReducer,
    auth: authReducer,
    mess: messageReducer,
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
