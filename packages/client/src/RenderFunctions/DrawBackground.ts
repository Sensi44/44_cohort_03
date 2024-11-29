import type { TCanvas } from '@Types';

const backgroundImage = new Image();
backgroundImage.src = '../../src/Assets/img/background.jpg';

let backGroundX = 0;
console.log('init');
export const drawBackground = (ctx: TCanvas) => {
  if (ctx) {
    ctx.drawImage(backgroundImage, backGroundX, 0);
    ctx.drawImage(backgroundImage, backGroundX + backgroundImage.width, 0);
  }

  backGroundX -= 2;

  if (backGroundX <= -backgroundImage.width) {
    backGroundX = 0;
  }
};
