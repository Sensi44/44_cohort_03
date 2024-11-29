import { useEffect, useState, useRef } from 'react';

// todo позже тут будет подключён редакс
const globalState = {
  gameState: false,
};

export const useGameLoop = (update: () => void, render: () => void) => {
  const [animationFrameId, setAnimationFrameId] = useState<number | null>(null);

  const updateRef = useRef(update);
  const renderRef = useRef(render);

  useEffect(() => {
    updateRef.current = update;
    renderRef.current = render;
  }, [update, render]);

  const gameLoop = () => {
    if (globalState.gameState) {
      // Используем актуальные функции из рефов
      updateRef.current();
      renderRef.current();
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
