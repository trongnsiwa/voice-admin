import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store/store';

export const selectLoading = (state: RootState) => state.loader.loading;

export const loaderSelector = createSelector(selectLoading, (state) => state);
