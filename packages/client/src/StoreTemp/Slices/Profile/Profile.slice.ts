import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  disabled: false,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setDisabled(state, action: PayloadAction<boolean>) {
      return {
        ...state,
        disabled: action.payload,
      };
    },
  },
});

export const { setDisabled } = profileSlice.actions;
