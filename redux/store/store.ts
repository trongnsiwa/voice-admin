import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import sidebarReducer from '../reducers/sidebar-reducer';
import authReducer from '../reducers/auth-reducer';
import loaderReducer from '../reducers/loader-reducer';
import messageReducer from '../reducers/message-reducer';

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    auth: authReducer,
    loader: loaderReducer,
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
