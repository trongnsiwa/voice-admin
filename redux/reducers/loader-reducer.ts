import { HIDE_LOADER, SHOW_LOADER } from '@constants/action-types';

const initialState = {
  loading: false,
};

export default function loaderReducer(state = initialState, action: any) {
  switch (action.type) {
    case SHOW_LOADER:
      return {
        loading: true,
      };
    case HIDE_LOADER:
      return {
        loading: false,
      };
    default:
      return state;
  }
}
