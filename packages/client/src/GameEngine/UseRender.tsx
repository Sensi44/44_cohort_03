import type { TCanvas } from '@Types';

import { testDrawFunction } from '@RenderFunctions';

export const useRender = (ctx: TCanvas) => {
  return () => {
    // todo сюда будут передавать функции на отрисовку всех необходимых сущностей игры
    // drawPlayer(ctx);
    // drawAsteroids(ctx);
    testDrawFunction(ctx);
  };
};
