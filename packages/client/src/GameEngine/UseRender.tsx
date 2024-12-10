import {
  drawBackground,
  drawEnemy,
  drawFps,
  drawHitsCount,
  drawPlayer,
} from '@RenderFunctions';
import {
  getEnemiesList,
  getHitsCount,
  getPlayer,
  useAppSelector,
} from '@Store';
import type { TCanvas } from '@Types';

export const useRender = (ctx: TCanvas) => {
  const player = useAppSelector(getPlayer);
  const enemies = useAppSelector(getEnemiesList);
  const hitsCount = useAppSelector(getHitsCount);

  return () => {
    drawBackground(ctx);
    drawPlayer(ctx, player);
    drawFps(ctx);
    drawHitsCount(ctx, hitsCount);
    enemies.forEach((enemy) => drawEnemy(ctx, enemy));
  };
};
