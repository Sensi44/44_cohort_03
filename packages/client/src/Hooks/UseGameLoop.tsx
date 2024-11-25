import { useEffect, useState } from 'react';

// todo позже тут будет подключён редакс
const globalState = {
  gameState: false,
};

export const useGameLoop = (update: () => void, render: () => void) => {
  const [animationFrameId, setAnimationFrameId] = useState<number | null>(null);

  const gameLoop = () => {
    if (globalState.gameState) {
      update();
      render();
      const id = requestAnimationFrame(gameLoop);
      setAnimationFrameId(id);
    }
  };

  const startGame = () => {
    if (!globalState.gameState) {
      globalState.gameState = true;
      gameLoop();
    }
  };

  const stopGame = () => {
    if (globalState.gameState) {
      globalState.gameState = false;
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        setAnimationFrameId(null);
      }
    }
  };

  useEffect(() => {
    return () => {
      stopGame();
    };
  }, []);

  return { startGame, stopGame };
};
