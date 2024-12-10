import { useGetCanvasSize } from '@Hooks';
import {
  addEnemy,
  deleteEnemy,
  EnemyType,
  getEnemiesList,
  getPlayer,
  increaseHitsCount,
  moveEnemy,
  TBomb,
  TEnemy,
  TPirate,
  useAppDispatch,
  useAppSelector,
} from '@Store';
import {
  createAsteroid,
  createBomb,
  createPirate,
  getRandomNumber,
  isIntersecting,
} from '@Utils';

export const useUpdateEnemies = () => {
  const dispatch = useAppDispatch();
  const [width, height] = useGetCanvasSize();
  const enemies = useAppSelector(getEnemiesList);
  const player = useAppSelector(getPlayer);

  const getNewEnemy = (enemyType: EnemyType) => {
    switch (enemyType) {
      case EnemyType.asteroid:
        return createAsteroid(width, height);
      case EnemyType.pirate:
        return createPirate(width, height);
      case EnemyType.bomb:
        return createBomb(width, height);
    }
  };

  const getMovePayload = (enemy: TEnemy) => {
    switch (enemy.type) {
      //прямая траектория
      case EnemyType.asteroid:
        return {
          enemyId: enemy.id,
          x: enemy.x - enemy.speed,
          y: enemy.y,
        };
      //диагональ
      case EnemyType.pirate:
        return {
          enemyId: enemy.id,
          x: enemy.x - enemy.speed,
          y: enemy.y + ((enemy as TPirate).coefficient * enemy.speed) / 2,
        };
      //синусоида
      case EnemyType.bomb:
        return {
          enemyId: enemy.id,
          x: enemy.x - enemy.speed,
          y:
            enemy.y +
            (enemy as TBomb).coefficient * Math.sin(enemy.x - enemy.speed),
        };
    }
  };

  const createEnemy = () => {
    const enemyType =
      Object.values(EnemyType)[
        getRandomNumber(0, Object.values(EnemyType).length)
      ];

    dispatch(addEnemy(getNewEnemy(enemyType)));
  };

  const updateEnemiesPosition = () => {
    enemies.forEach((enemy) => {
      if (enemy.x < 0 || enemy.y < 0 || enemy.y > height) {
        dispatch(
          deleteEnemy({
            enemyId: enemy.id,
          }),
        );
      } else {
        dispatch(moveEnemy(getMovePayload(enemy)));
      }
    });
  };

  const checkIfEnemyHitsPlayer = () => {
    enemies.forEach((enemy) => {
      if (isIntersecting(player, enemy)) {
        dispatch(increaseHitsCount());
        dispatch(
          deleteEnemy({
            enemyId: enemy.id,
          }),
        );
      }
    });
  };

  return { createEnemy, updateEnemiesPosition, checkIfEnemyHitsPlayer };
};
