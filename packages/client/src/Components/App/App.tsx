import { useRef, useEffect, useState } from 'react';

import { useGetCanvasSize, useSetCanvasContext } from '@Hooks/index';
import { useRender, useUpdate } from '@Game/index';

import './App.scss';

const globalState = {
  gameState: false, // true - игра запущена, false - остановлена
};

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [width, height] = useGetCanvasSize();
  const ctx = useSetCanvasContext(canvasRef);

  const render = useRender(ctx);
  const update = useUpdate();

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
    startGame();

    return () => {
      stopGame();
    };
  }, [ctx]);

  return (
    <>
      <h1 className='App'>Космолёт с бобрами</h1>
      <canvas
        className={'game-field'}
        ref={canvasRef}
        width={width}
        height={height}
      />
      <button onClick={startGame}>Запустить игру</button>
      <button onClick={stopGame}>Остановить игру</button>
    </>
  );
}

export default App;
