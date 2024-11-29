import { RootState } from '@Store';

export const getDisabled = (state: RootState): boolean =>
  state.profile.disabled;
