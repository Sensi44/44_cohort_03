import type { RootState } from '../..';

export const getDisabled = (state: RootState): boolean =>
  state.profile.disabled;
