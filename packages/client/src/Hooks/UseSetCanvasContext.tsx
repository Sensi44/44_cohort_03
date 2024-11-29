import type { RefObject } from 'react';
import { useEffect, useState } from 'react';

import type { TCanvas } from '@Types';

export const useSetCanvasContext = (
  canvasRef: RefObject<HTMLCanvasElement>,
) => {
  const [ctx, setCtx] = useState<TCanvas>(null);

  useEffect(() => {
    const currentCtx = canvasRef.current
      ? canvasRef.current.getContext('2d')
      : null;
    setCtx(currentCtx);
  }, [canvasRef]);

  return ctx;
};
