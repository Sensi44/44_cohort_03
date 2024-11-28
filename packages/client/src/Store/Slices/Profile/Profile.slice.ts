import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  first_name: 'Inga',
  second_name: 'Baranets',
  display_name: 'rubi',
  login: 'rubi2',
  avatar: '',
  email: 'i@test.ru',
  phone: '+79101111111',
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
