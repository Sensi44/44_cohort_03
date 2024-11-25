import { testDrawFunction } from '../RenderFunctions';

import type { TCanvas } from '@Types/common.types';

export const useRender = (ctx: TCanvas) => {
  // console.log(ctx);

  return () => {
    // todo сюда будут передавать функции на отрисовку всех необходимых сущностей игры
    // drawPlayer(ctx);
    // drawAsteroids(ctx);
    testDrawFunction(ctx);
  };
};
