import { EnemyType, TEnemy } from '@Store';
import type { TCanvas } from '@Types';
import asteroidImg from '../../src/Assets/img/asteroid.png';
import bombImg from '../../src/Assets/img/bomb.png';
import pirateImg from '../../src/Assets/img/pirate.png';

const asteroidImage = new Image();
asteroidImage.src = asteroidImg;
const pirateImage = new Image();
pirateImage.src = pirateImg;
const bombImage = new Image();
bombImage.src = bombImg;

export const drawEnemy = (ctx: TCanvas, enemy: TEnemy) => {
  if (ctx) {
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
    ctx.drawImage(
      getImage(enemy.type),
      enemy.x,
      enemy.y,
      enemy.width,
      enemy.height,
    );
  }
};
