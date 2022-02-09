import {
  loginFailAction,
  loginSuccessAction,
  logoutAction,
} from '@redux/actions';
import { createReducer } from '@reduxjs/toolkit';
import { logoutService } from '@services/auth.service';

let user;

if (typeof window !== 'undefined') {
  user = JSON.parse(localStorage.getItem('user') as any);
}

export type AuthState = {
  isLoggedIn: boolean;
  user: any | null;
};

const initialState: AuthState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

export const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loginSuccessAction, (state, { payload }) => {
      state.isLoggedIn = true;
      state.user = payload;

      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(payload));
      }
    })
    .addCase(loginFailAction, (state, { payload }) => {
      state.isLoggedIn = false;
      state.user = null;
    })
    .addCase(logoutAction, (state) => {
      logoutService();
      state.isLoggedIn = false;
      state.user = null;
    });
});
