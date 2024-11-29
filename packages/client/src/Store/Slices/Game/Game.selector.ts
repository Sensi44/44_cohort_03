import type { RootState } from '../..';
import type { TPlayer } from './Game.slice';

export const getPlayer = (state: RootState): TPlayer => state.game.player;
