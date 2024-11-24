import { useRef, useEffect } from 'react';

import { useGetCanvasSize, useSetCanvasContext } from '@Hooks/index';
import { useRender, useUpdate } from '@Game/index';

import './App.scss';

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [width, height] = useGetCanvasSize();
  const ctx = useSetCanvasContext(canvasRef);

  const render = useRender(ctx);
  const update = useUpdate();

  useEffect(() => {
    setInterval(() => {
      render();
    }, 1000);
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
    </>
  );
}

export default App;
