import type { TCanvas } from '@Types';

export const drawHitsCount = (ctx: TCanvas, hitsCount: number) => {
  if (ctx) {
    ctx.fillStyle = 'white';
    ctx.font = '16px Arial';
    ctx.fillText(`Hits: ${hitsCount}`, 10, 40);
  }
};
