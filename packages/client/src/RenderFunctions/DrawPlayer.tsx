import type { TPlayer } from '@Store';
import type { TCanvas } from '@Types';

const image = new Image();
image.src = '../../src/Assets/img/beaver-plane.png';

export const drawPlayer = (ctx: TCanvas, player: TPlayer) => {
  if (ctx) {
    ctx.drawImage(image, player.x, player.y, player.width, player.height);
  }
};
