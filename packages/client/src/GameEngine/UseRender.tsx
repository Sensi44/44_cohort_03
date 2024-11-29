import { useSelector } from '@Store/Hooks';
import { getPlayer } from '@Store/Slices/Game/Game.selector';
import { testDrawFunction, drawPlayer } from '../RenderFunctions';

import type { TCanvas } from '@Types/common.types';

export const useRender = (ctx: TCanvas) => {
  const player = useSelector(getPlayer);
  // console.log('1', player.x);

  return () => {
    drawPlayer(ctx, player);
    // testDrawFunction(ctx);
  };
};
