import { Typography } from '@mui/material';
import { useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';

import { DebugPanel, InactivityWarning, Menu } from '@Components';
import { useRender, useUpdate } from '@Game';
import { useGameLoop, useGetCanvasSize, useSetCanvasContext } from '@Hooks';

import { config } from '@Constants';
import { startServiceWorker, stopRegistrationWorker } from '@ServiceWorker';
import { GameIntro } from '../GameIntro/GameIntro';
import './App.scss';

export const App = () => {
  if (config.isDev) {
    startServiceWorker();
  } else {
    stopRegistrationWorker();
  }

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

  const toggleFullscreen = () => {
    const elem = document.querySelector('.game-field__canvas');

    if (!document.fullscreenElement) {
      elem?.requestFullscreen().catch((err) => {
        alert(
          `Error attempting to enable fullscreen mode: ${err.message} (${err.name})`,
        );
      });
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.shiftKey && event.key === 'F11') {
        toggleFullscreen();
      }
    }
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
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
        <DebugPanel
          onStart={startGame}
          onStop={stopGame}
          toggleFullscreen={toggleFullscreen}
        />

        <div className={'game-field__canvas-container'}>
          <canvas
            className={'game-field__canvas'}
            ref={canvasRef}
            width={width}
            height={height}
          />
          <GameIntro onStart={startGame} />
        </div>
      </section>
      <InactivityWarning stopGame={stopGame} />
    </article>
  );
};
