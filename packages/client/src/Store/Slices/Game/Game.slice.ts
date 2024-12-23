import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { IGameInitState, TEnemy, TGameState } from '@Store';

const initialState: IGameInitState = {
  gameState: 'start',
  gameSpeed: 1,
  hitsCount: 0,
  player: {
    x: 0,
    y: 50,
    width: 128,
    height: 54,
    speed: 1,
  },
  maxEnemyCount: 7,
  enemies: [],
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGameState(state, action: PayloadAction<TGameState>) {
      state.gameState = action.payload;
    },
    movePlayer(state, action: PayloadAction<{ x: number; y: number }>) {
      state.player.x += action.payload.x;
      state.player.y += action.payload.y;
    },
    increaseHitsCount(state) {
      state.hitsCount = state.hitsCount + 1;
    },
    addEnemy(state, action: PayloadAction<TEnemy>) {
      state.enemies.push(action.payload);
    },
    deleteEnemy(state, action: PayloadAction<{ enemyId: string }>) {
      state.enemies = state.enemies.filter(
        (enemy) => enemy.id !== action.payload.enemyId,
      );
    },
    moveEnemy(
      state,
      action: PayloadAction<{ enemyId: string; x: number; y: number }>,
    ) {
      const movedEnemy = state.enemies.find(
        (enemy) => enemy.id === action.payload.enemyId,
      );
      if (movedEnemy) {
        movedEnemy.x = action.payload.x;
        movedEnemy.y = action.payload.y;
      }
    },
  },
});

export const {
  setGameState,
  movePlayer,
  addEnemy,
  moveEnemy,
  deleteEnemy,
  increaseHitsCount,
} = gameSlice.actions;
