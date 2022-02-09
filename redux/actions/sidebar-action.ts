import { TOGGLE_SIDEBAR } from '@constants/action-types';
import { createAction } from '@reduxjs/toolkit';

export const toggleSidebar = createAction<boolean>(TOGGLE_SIDEBAR);
