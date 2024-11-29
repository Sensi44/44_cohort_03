import { drawPlayer } from '@RenderFunctions';
import { useAppSelector } from '@Store';
import { getPlayer } from '../Store/Slices/Game/Game.selector';

import type { TCanvas } from '@Types';

export const useRender = (ctx: TCanvas) => {
  const player = useAppSelector(getPlayer);
  // console.log('1', player.x);

  return () => {
    drawPlayer(ctx, player);
    // testDrawFunction(ctx);
  };
};
