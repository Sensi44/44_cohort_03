import { Box, Button, Stack, Typography } from '@mui/material';

import type { IDebugPanelProps } from './DebugPanel.props';

export const DebugPanel = ({ onStart, onStop }: IDebugPanelProps) => {
  return (
    <Box
      className='game-field__debug-panel'
      sx={{ padding: 3, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
      <Typography variant='h6' component='h2' gutterBottom>
        debug-panel
      </Typography>
      <Stack flexDirection='column' gap={1}>
        <Button variant='contained' color='primary' onClick={onStart}>
          Запустить игру
        </Button>
        <Button variant='contained' color='secondary' onClick={onStop}>
          Остановить игру
        </Button>
      </Stack>
    </Box>
  );
};
