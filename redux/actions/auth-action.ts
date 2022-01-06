import { ERRORS } from '@constants/error-code';
import {
  SET_MESSAGE,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
} from '@constants/action-types';
import { hideLoader } from './loader-action';
import { loginService, logoutService } from '@services/auth.service';
import { AppDispatch } from '../store/store';

export const loginAction =
  (username: string, password: string) => (dispatch: AppDispatch) => {
    return loginService(username, password).then(
      (data) => {
        if (!data) {
          dispatch({
            type: LOGIN_FAIL,
          });

          dispatch({
            type: SET_MESSAGE,
            payload: ERRORS.ERR_LOGIN_FAIL,
          });

          return Promise.reject();
        }

        dispatch({
          type: LOGIN_SUCCESS,
          payload: { user: data },
        });

        return Promise.resolve();
      },
      (error) => {
        const messages = error.response && error.response.data;

        dispatch({
          type: LOGIN_FAIL,
        });

        dispatch({
          type: SET_MESSAGE,
          payload: ERRORS[messages[0].message],
        });

        return Promise.reject();
      }
    );
  };

export const logoutAction = () => (dispatch: AppDispatch) => {
  logoutService();

  dispatch({
    type: LOGOUT,
  });

  dispatch(hideLoader());
};
