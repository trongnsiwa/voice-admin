import { clearMessage, setMessage } from '@redux/actions';
import { createReducer } from '@reduxjs/toolkit';

export type MessageType = {
  messsage: string;
};

const initialState: MessageType = {
  messsage: '',
};

export const messageReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setMessage, (state, action) => {
      state.messsage = action.payload;
      console.log(action.payload);
    })
    .addCase(clearMessage, (state) => {
      state.messsage = '';
    });
});
