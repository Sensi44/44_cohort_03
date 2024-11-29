import type { TPlayer } from '@Store';
import type { TCanvas } from '@Types';

const image = new Image();
image.src = '../../src/Assets/img/beaver-plane.png';

const backgroundImage = new Image();
backgroundImage.src = '../../src/Assets/img/background.jpg';

const backTemp = {
  x: 0,
  y: 0,
};

export const drawBackground = (ctx: TCanvas) => {
  if (ctx) {
    ctx.drawImage(backgroundImage, backTemp.x, 0);
    ctx.drawImage(backgroundImage, backTemp.x + backgroundImage.width, 0);
  }

  backTemp.x -= 4; // Двигаем фон влево

  if (backTemp.x <= -backgroundImage.width) {
    backTemp.x = 0;
  }
};

export const drawPlayer = (ctx: TCanvas, player: TPlayer) => {
  if (ctx) {
    drawBackground(ctx);

    ctx.drawImage(image, player.x, player.y, player.width, player.height);
  }
};
