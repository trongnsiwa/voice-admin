import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store/store';

export const selectMessage = (state: RootState) => state.mess.messsage;

export const messageSelector = createSelector(selectMessage, (state) => state);
