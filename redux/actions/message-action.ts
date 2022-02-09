import { CLEAR_MESSAGE, SET_MESSAGE } from '@constants/action-types';
import { createAction } from '@reduxjs/toolkit';

export const setMessage = createAction<string>(SET_MESSAGE);
export const clearMessage = createAction(CLEAR_MESSAGE);
