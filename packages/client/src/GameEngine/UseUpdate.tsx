import { getEnemiesList, getMaximumEnemiesCount, useAppSelector } from '@Store';
import { usePlayerControls, useUpdateEnemies } from '../UpdateFunctions';

export const useUpdate = () => {
  const { updatePlayerPosition } = usePlayerControls();
  const { createEnemy, updateEnemiesPosition, checkIfEnemyHitsPlayer } =
    useUpdateEnemies();
  const maxEnemiesCount = useAppSelector(getMaximumEnemiesCount);
  const enemies = useAppSelector(getEnemiesList);

  return () => {
    updatePlayerPosition();
    updateEnemiesPosition();
    checkIfEnemyHitsPlayer();

    if (maxEnemiesCount > enemies.length) {
      createEnemy();
    }
    // todo тут будут выполняться функции по пересчёту чего-либо, либо обновлению состояния игры
    // todo работа ии, рандомная генерация врагов и предметом
  };
};
