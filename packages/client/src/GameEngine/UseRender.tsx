import { drawBackground, drawPlayer } from '@RenderFunctions';
import { getPlayer, useAppSelector } from '@Store';

import type { TCanvas } from '@Types';

export const useRender = (ctx: TCanvas) => {
  const player = useAppSelector(getPlayer);

  return () => {
    drawBackground(ctx);
    drawPlayer(ctx, player);
  };
};
