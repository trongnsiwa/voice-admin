import { CLEAR_MESSAGE, SET_MESSAGE } from '@constants/action-types';

export const setMessage = (message: string) => ({
  type: SET_MESSAGE,
  payload: message,
});

export const clearMessage = () => ({
  type: CLEAR_MESSAGE,
});
