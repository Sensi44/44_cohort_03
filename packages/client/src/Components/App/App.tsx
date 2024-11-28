import { Typography } from '@mui/material';
import { useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';

import { DebugPanel, Menu } from '@Components';
import { useRender, useUpdate } from '@Game';
import { useGameLoop, useGetCanvasSize, useSetCanvasContext } from '@Hooks';

import './App.scss';

export const App = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [width, height] = useGetCanvasSize();
  const ctx = useSetCanvasContext(canvasRef);

  const render = useRender(ctx);
  const update = useUpdate();

  const { startGame, stopGame } = useGameLoop(update, render);

  useEffect(() => {
    startGame();

    return () => {
      stopGame();
    };
  }, [ctx]);

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

        <canvas
          className={'game-field__canvas'}
          ref={canvasRef}
          width={width}
          height={height}
        />
      </section>
    </article>
  );
};
