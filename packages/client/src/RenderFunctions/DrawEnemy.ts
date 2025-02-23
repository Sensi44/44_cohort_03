import { EnemyType, TEnemy } from '@Store';
import type { TCanvas } from '@Types';
import asteroidImg from '../../src/Assets/img/asteroid.png';
import bombImg from '../../src/Assets/img/bomb.png';
import pirateImg from '../../src/Assets/img/pirate.png';

let asteroidImage: HTMLImageElement | null = null;
let pirateImage: HTMLImageElement | null = null;
let bombImage: HTMLImageElement | null = null;

export const initializeImages = () => {
  asteroidImage = new Image();
  asteroidImage.src = asteroidImg;
  pirateImage = new Image();
  pirateImage.src = pirateImg;
  bombImage = new Image();
  bombImage.src = bombImg;
};

export const drawEnemy = (ctx: TCanvas, enemy: TEnemy) => {
  const getImage = (enemyType: EnemyType) => {
    switch (enemyType) {
      case EnemyType.asteroid:
        return asteroidImage;
      case EnemyType.pirate:
        return pirateImage;
      case EnemyType.bomb:
        return bombImage;
    }
  };

  const image = getImage(enemy.type);

  if (image === null) {
    initializeImages();
  }
  if (image !== null) {
    if (ctx) {
      ctx.drawImage(image, enemy.x, enemy.y, enemy.width, enemy.height);
    }
  }
};
