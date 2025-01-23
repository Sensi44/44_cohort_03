import { useEffect, useRef, useState } from 'react';

const FIXED_TIMESTEP = 1000 / 60; // 60 FPS in milliseconds
const MAX_DELTA_TIME = 1000; // Maximum delta time to prevent spiral of death

const globalState = {
  gameState: false,
  lastGameUpdate: 0,
  updateCount: 0,
  currentFps: 0,
};

export const useGameLoop = (update: () => void, render: () => void) => {
  const [animationFrameId, setAnimationFrameId] = useState<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const accumulatorRef = useRef<number>(0);

  const updateRef = useRef(update);
  const renderRef = useRef(render);

  useEffect(() => {
    updateRef.current = update;
    renderRef.current = render;
  }, [update, render]);

  const gameLoop = (currentTime: number) => {
    if (!globalState.gameState) return;

    if (lastTimeRef.current === 0) {
      lastTimeRef.current = currentTime;
    }

    let deltaTime = currentTime - lastTimeRef.current;
    lastTimeRef.current = currentTime;

    if (deltaTime > MAX_DELTA_TIME) {
      deltaTime = MAX_DELTA_TIME;
    }

    accumulatorRef.current += deltaTime;

    while (accumulatorRef.current >= FIXED_TIMESTEP) {
      updateRef.current();
      globalState.updateCount++;

      const now = performance.now();
      if (now - globalState.lastGameUpdate >= 1000) {
        globalState.currentFps = Math.round(
          (globalState.updateCount * 1000) / (now - globalState.lastGameUpdate),
        );
        globalState.updateCount = 0;
        globalState.lastGameUpdate = now;
      }

      accumulatorRef.current -= FIXED_TIMESTEP;
    }

    renderRef.current();

    const id = requestAnimationFrame(gameLoop);
    setAnimationFrameId(id);
  };

  const startGame = () => {
    if (!globalState.gameState) {
      globalState.gameState = true;
      lastTimeRef.current = 0;
      accumulatorRef.current = 0;
      globalState.lastGameUpdate = performance.now();
      globalState.updateCount = 0;
      globalState.currentFps = 0;
      requestAnimationFrame(gameLoop);
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

  const currentFps = globalState.currentFps;

  return { startGame, stopGame, currentFps };
};
