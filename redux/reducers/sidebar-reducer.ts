import { CLEAR_MESSAGE, SET_MESSAGE } from '@constants/action-types';

const initialState = {
  message: '',
};

export default function messageReducer(state = initialState, action: any) {
  const { type, payload } = action;

  switch (type) {
    case SET_MESSAGE:
      return { message: payload };
    case CLEAR_MESSAGE:
      return { message: '' };
    default:
      return state;
  }
}
