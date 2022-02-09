import { setMessage } from '@redux/actions';
import { loginService } from '@services/auth.service';
import { createAction } from '@reduxjs/toolkit';
import { AppDispatch } from '@redux/store/store';
import { LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT } from '@constants/action-types';
import { ERRORS } from '@constants/error-code';

export const login = (
  username: string,
  password: string,
  dispatch: AppDispatch
) => {
  return loginService(username, password).then(
    (data) => {
      if (!data) {
        dispatch(loginFailAction);

        dispatch(setMessage(ERRORS.ERR_LOGIN_FAIL));

        return Promise.reject();
      }

      dispatch(loginSuccessAction({ user: data }));

      return Promise.resolve();
    },
    (error) => {
      const messages = error.response;

      dispatch(loginFailAction);

      console.log(messages.data.data);

      // dispatch(setMessage(ERRORS[messages.data.data]));
      dispatch(setMessage(ERRORS.ERR_LOGIN_FAIL));

      return Promise.reject();
    }
  );
};

export const loginSuccessAction = createAction<{ user: any }>(LOGIN_SUCCESS);
export const loginFailAction = createAction(LOGIN_FAIL);

export const logoutAction = createAction(LOGOUT);
