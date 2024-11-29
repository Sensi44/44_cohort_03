import { Typography } from '@mui/material';
import { useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';

import { DebugPanel, Menu } from '@Components';
import { useRender, useUpdate } from '@Game';
import { useGameLoop, useGetCanvasSize, useSetCanvasContext } from '@Hooks';
import { movePlayer, useAppDispatch } from '@Store';

import './App.scss';

export const App = () => {
  const dispatch = useAppDispatch();

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
    // startGame();

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
      <Typography
        variant='h1'
        textAlign='center'
        fontSize='22px'
        className='game-page__title'>
        Космолёт с бобрами
      </Typography>
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
};
