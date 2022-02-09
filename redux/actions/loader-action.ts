import { HIDE_LOADER, SHOW_LOADER } from '@constants/action-types';
import { createAction } from '@reduxjs/toolkit';

export const showLoader = createAction(SHOW_LOADER);

export const hideLoader = createAction(HIDE_LOADER);
