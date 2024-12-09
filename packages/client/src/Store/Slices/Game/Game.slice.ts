import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export type TGameState = 'start' | 'game' | 'end';

export type TPlayer = {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
};

export type IGameInitState = {
  gameState: TGameState;
  gameSpeed: number;
  player: TPlayer;
};

const initialState: IGameInitState = {
  gameState: 'start',
  gameSpeed: 1,
  player: {
    x: 0,
    y: 50,
    width: 128,
    height: 54,
    speed: 1,
  },
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
  },
});

export const { setGameState, movePlayer } = gameSlice.actions;
