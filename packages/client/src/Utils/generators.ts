import { MAX_ENEMY_SPEED } from '@Constants';
import { EnemyType, TBaseEnemy, TBomb, TPirate } from '@Store';

export const getRandomNumber = (min: number, max: number) => {
  return Math.ceil(Math.random() * (max - min)) + min - 1;
};

export const generateRandomId = () => 'id' + new Date().getTime();

export const createAsteroid = (
  canvasWidth: number,
  canvasHeight: number,
): TBaseEnemy => ({
  id: generateRandomId(),
  x: canvasWidth,
  y: getRandomNumber(1, canvasHeight),
  width: 60,
  height: 60,
  speed: getRandomNumber(1, MAX_ENEMY_SPEED),
  type: EnemyType.asteroid,
});

export const createBomb = (
  canvasWidth: number,
  canvasHeight: number,
): TBomb => ({
  id: generateRandomId(),
  x: canvasWidth,
  y: getRandomNumber(1, canvasHeight),
  width: 60,
  height: 50,
  speed: getRandomNumber(5, MAX_ENEMY_SPEED),
  type: EnemyType.bomb,
  coefficient: getRandomNumber(10, 20),
});

export const createPirate = (
  canvasWidth: number,
  canvasHeight: number,
): TPirate => {
  const coefficient = getRandomNumber(1, 100) > 50 ? -1 : 1;

  return {
    id: generateRandomId(),
    x: canvasWidth - getRandomNumber(1, canvasWidth / 2),
    y: coefficient === 1 ? 0 : canvasHeight,
    width: 70,
    height: 70,
    speed: getRandomNumber(1, MAX_ENEMY_SPEED),
    type: EnemyType.pirate,
    coefficient,
  };
};
