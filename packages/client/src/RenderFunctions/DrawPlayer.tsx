import type { TCanvas } from '@Types/common.types';
import type { TPlayer } from '@Store/Slices/Game/Game.slice';

export const drawPlayer = (ctx: TCanvas, player: TPlayer) => {
  const image = new Image();
  image.src = '../../src/Assets/img/plane.png';

  // console.log('2', player.x);
  if (ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // ctx.drawImage(image, player.x, player.y, player.width, player.height);
  }
};
