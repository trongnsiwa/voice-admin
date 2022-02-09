import { createReducer } from '@reduxjs/toolkit';
import { toggleSidebar } from '../actions';

type SidebarState = {
  open: boolean;
};

const initialState: SidebarState = {
  open: true,
};

export const sidebarReducer = createReducer(initialState, (builder) => {
  builder.addCase(toggleSidebar, (state, action) => {
    state.open = action.payload;
  });
});
