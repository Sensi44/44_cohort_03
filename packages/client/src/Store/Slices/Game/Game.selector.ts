import type { RootState } from '../..';
import type { TEnemy, TPlayer } from './Game.slice';

export const getPlayer = (state: RootState): TPlayer => state.game.player;
export const getEnemiesList = (state: RootState): TEnemy[] =>
  state.game.enemies;
export const getMaximumEnemiesCount = (state: RootState): number =>
  state.game.maxEnemyCount;
export const getHitsCount = (state: RootState): number => state.game.hitsCount;
