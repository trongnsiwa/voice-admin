import { TOGGLE_SIDEBAR } from '@constants/action-types';

export const toggleSidebar = (val: boolean) => ({
  type: TOGGLE_SIDEBAR,
  open: val,
});
