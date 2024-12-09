import type { TCanvas } from '@Types';

let lastFrameTime = performance.now();
let frameCount = 0;
let displayedFps = 0;

export const drawFps = (ctx: TCanvas) => {
  const now = performance.now();
  frameCount++;

  if (now - lastFrameTime >= 1000) {
    displayedFps = frameCount;
    frameCount = 0;
    lastFrameTime = now;
  }

  if (ctx) {
    ctx.fillStyle = 'white';
    ctx.font = '16px Arial';
    ctx.fillText(`FPS: ${displayedFps}`, 10, 20);
  }
};
