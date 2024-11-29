import { useEffect, useState } from 'react';

export const useGetCanvasSize = () => {
  const [canvasSize, setCanvasSize] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const canvasContainer = document.querySelector(
      '.game-field__canvas-container',
    );
    if (canvasContainer) {
      setCanvasSize({
        x: canvasContainer.clientWidth - 22,
        y: canvasContainer.clientHeight - 16,
      });
    }
  }, []);
  return [canvasSize.x, canvasSize.y];
};
