import type { TCanvas } from '@Types';
import backGroundImage from '../../src/Assets/img/background.jpg';

let backGroundX = 0;
let image: HTMLImageElement | null = null;
console.log('init');

export const initializeImage = () => {
  image = new Image();
  image.src = backGroundImage;
};

export const drawBackground = (ctx: TCanvas) => {
  if (image === null) {
    initializeImage();
  }

  if (image !== null) {
    if (ctx) {
      ctx.drawImage(image, backGroundX, 0);
      ctx.drawImage(image, backGroundX + image.width, 0);
    }

    backGroundX -= 2;

    if (backGroundX <= -image.width) {
      backGroundX = 0;
    }
  }
};
