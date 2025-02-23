import type { TPlayer } from '@Store';
import type { TCanvas } from '@Types';
import beaverPlane from '../../src/Assets/img/beaver-plane.png';

let image: HTMLImageElement | null = null;

export const initializeImage = () => {
  image = new Image();
  image.src = beaverPlane;
};

export const drawPlayer = (ctx: TCanvas, player: TPlayer) => {
  if (image === null) {
    initializeImage();
  }

  if (image !== null) {
    if (ctx) {
      ctx.drawImage(image, player.x, player.y, player.width, player.height);
    }
  }
};
