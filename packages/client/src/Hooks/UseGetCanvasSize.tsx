import { useState, useEffect } from 'react';

export const useGetCanvasSize = () => {
  const [canvasSize, setCanvasSize] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const canvasContainer = document.querySelector('.gameField');
    if (canvasContainer) {
      setCanvasSize({
        x: canvasContainer.clientWidth - 22,
        y: canvasContainer.clientHeight - 104,
      });
    }
  }, []);

  return [canvasSize.x, canvasSize.y];
};
