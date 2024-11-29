import type { TCanvas } from '@Types';

let a = 0;

export const testDrawFunction = (ctx: TCanvas) => {
  if (!ctx) return;

  if (a < 400) {
    a += 2;
  } else if (a === 400) {
    a = -400;
  }

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  const size = 100;
  const x = (ctx.canvas.width - size) / 2 + a;
  const y = (ctx.canvas.height - size) / 2 + a / 4;

  const colors = ['red', 'green', 'blue', 'yellow'];
  const lineWidth = 4;

  for (let i = 0; i < 4; i++) {
    ctx.strokeStyle = colors[i];
    ctx.lineWidth = lineWidth;

    ctx.beginPath();
    switch (i) {
      case 0:
        ctx.moveTo(x, y);
        ctx.lineTo(x + size, y);
        break;
      case 1:
        ctx.moveTo(x + size, y);
        ctx.lineTo(x + size, y + size);
        break;
      case 2:
        ctx.moveTo(x + size, y + size);
        ctx.lineTo(x, y + size);
        break;
      case 3:
        ctx.moveTo(x, y + size);
        ctx.lineTo(x, y);
        break;
    }
    ctx.stroke();
  }
};
