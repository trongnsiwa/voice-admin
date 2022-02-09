import { createReducer } from '@reduxjs/toolkit';
import { hideLoader, showLoader } from '../actions';

type LoaderState = {
  loading: boolean;
};

const initialState: LoaderState = {
  loading: false,
};

export const loaderReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(showLoader, (state) => {
      state.loading = true;
    })
    .addCase(hideLoader, (state) => {
      state.loading = false;
    });
});
