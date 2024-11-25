import { Button, Typography, Box } from '@mui/material';

import type { IDebugPanelProps } from './DebugPanel.props';
import type { FC } from 'react';

export const DebugPanel: FC<IDebugPanelProps> = ({ onStart, onStop }) => {
  return (
    <Box
      className={'game-field__debug-panel'}
      sx={{ padding: 3, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
      <Typography variant='h6' component='h2' gutterBottom>
        debug-panel
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Button variant='contained' color='primary' onClick={onStart}>
          Запустить игру
        </Button>
        <Button variant='contained' color='secondary' onClick={onStop}>
          Остановить игру
        </Button>
      </Box>
    </Box>
  );
};
