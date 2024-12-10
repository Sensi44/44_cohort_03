import { TEnemy, TPlayer } from '@Store';

export const isIntersecting = (player: TPlayer, enemy: TEnemy) => {
  return !(
    player.x + player.width < enemy.x ||
    player.x > enemy.x + enemy.width ||
    player.y + player.height < enemy.y ||
    player.y > enemy.y + enemy.height
  );
};
