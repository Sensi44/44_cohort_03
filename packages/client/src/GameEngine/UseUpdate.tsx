import { usePlayerControls } from '../UpdateFunctions';

export const useUpdate = () => {
  const { updatePlayerPosition } = usePlayerControls();

  return () => {
    updatePlayerPosition();
    // todo тут будут выполняться функции по пересчёту чего-либо, либо обновлению состояния игры
    // todo работа ии, рандомная генерация врагов и предметом
  };
};
