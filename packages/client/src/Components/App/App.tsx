import { useRef, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { useDispatch } from '@Store/Hooks';
import { useGetCanvasSize } from '@Hooks/UseGetCanvasSize';
import { useSetCanvasContext } from '@Hooks/UseSetCanvasContext';
import { useGameLoop } from '@Hooks/UseGameLoop';
import { useRender } from '@Game/UseRender';
import { useUpdate } from '@Game/UseUpdate';
import { DebugPanel } from '@Components/DebugPanel/DebugPanel';
import { Menu } from '@Components/Menu/Menu';
import { movePlayer } from '@Store/Slices/Game/Game.slice';

import './App.scss';

function App() {
  const dispatch = useDispatch();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [width, height] = useGetCanvasSize();
  const ctx = useSetCanvasContext(canvasRef);

  const render = useRender(ctx);
  const update = useUpdate();
  const handleRender = () => {
    if (ctx) {
      ctx.clearRect(0, 0, width, height);
      render();
    }
  };

  const { startGame, stopGame } = useGameLoop(update, handleRender);

  useEffect(() => {
    startGame();

    return () => {
      stopGame();
    };
  }, [ctx]);

  const handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowUp':
        dispatch(movePlayer({ x: 0, y: -6 }));
        break;
      case 'ArrowDown':
        dispatch(movePlayer({ x: 0, y: 6 }));
        break;
      case 'ArrowLeft':
        dispatch(movePlayer({ x: -6, y: 0 }));
        break;
      case 'ArrowRight':
        dispatch(movePlayer({ x: 6, y: 0 }));
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <article className={'game-page'}>
      <h1 className='game-page__title'>Космолёт с бобрами</h1>
      <Outlet />
      <Menu />

      <section className={'game-field'}>
        <DebugPanel onStart={startGame} onStop={stopGame} />

        <div className={'game-field__canvas-container'}>
          <canvas
            className={'game-field__canvas'}
            ref={canvasRef}
            width={width}
            height={height}
          />
        </div>
      </section>
    </article>
  );
}

export default App;
