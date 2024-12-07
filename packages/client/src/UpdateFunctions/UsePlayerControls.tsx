import { movePlayer, useAppDispatch } from '@Store';
import { useEffect, useState } from 'react';

export const usePlayerControls = () => {
  const dispatch = useAppDispatch();

  const [keysPressed, setKeysPressed] = useState<{ [key: string]: boolean }>(
    {},
  );

  const handleKeyDown = (event: KeyboardEvent) => {
    setKeysPressed((prev) => ({ ...prev, [event.key]: true }));
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    setKeysPressed((prev) => ({ ...prev, [event.key]: false }));
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const updatePlayerPosition = () => {
    const speed = 4; // Скорость движения
    let dx = 0;
    let dy = 0;

    if (keysPressed['ArrowUp']) dy -= speed;
    if (keysPressed['ArrowDown']) dy += speed;
    if (keysPressed['ArrowLeft']) dx -= speed;
    if (keysPressed['ArrowRight']) dx += speed;

    if (dx !== 0 || dy !== 0) {
      dispatch(movePlayer({ x: dx, y: dy }));
    }
  };

  return { updatePlayerPosition };
};
