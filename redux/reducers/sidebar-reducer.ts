import { TOGGLE_SIDEBAR } from '@constants/action-types';

const initialState = {
  open: true,
};

export default function sidebarReducer(state = initialState, action: any) {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return { open: action.open };
    default:
      return state;
  }
}
