import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store/store';

export const selectOpenSidebar = (state: RootState) => state.sidebar.open;

export const sidebarSelector = createSelector(
  selectOpenSidebar,
  (state) => state
);
