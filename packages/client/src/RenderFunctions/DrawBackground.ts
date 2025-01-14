import type { TCanvas } from '@Types';
import backGroundImage from '../../src/Assets/img/background.jpg';

let backGroundX = 0;
console.log('init');
export const drawBackground = (ctx: TCanvas) => {
  const image = new Image();
  image.src = backGroundImage;
  if (ctx) {
    ctx.drawImage(image, backGroundX, 0);
    ctx.drawImage(image, backGroundX + image.width, 0);
  }

  backGroundX -= 2;

  if (backGroundX <= -image.width) {
    backGroundX = 0;
  }
};
