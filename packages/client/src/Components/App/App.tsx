import { useRef, useEffect } from 'react';

import {
  useGetCanvasSize,
  useSetCanvasContext,
  useGameLoop,
} from '@Hooks/index';
import { useRender, useUpdate } from '@Game/index';
import { DebugPanel } from '@Components/DebugPanel/DebugPanel';

import './App.scss';

function App() {
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
      <h1 className='game-page__title'>Космолёт с бобрами</h1>

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
}

export default App;
