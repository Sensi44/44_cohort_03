import {
  Box,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from '@mui/material';

import { TableLeaderBord } from '@Components';
import { useGetLeaderBordQuery } from '@Store';

export const LeaderBordPage = () => {
  const { data: rows, isLoading } = useGetLeaderBordQuery();

  return (
    <Stack
      spacing={2}
      sx={{
        paddingTop: '60px',
        marginTop: 2,
        alignItems: 'center',
      }}>
      <Container>
        <Typography textAlign='center' variant='h4' color='primary'>
          Список лидеров
        </Typography>
        {isLoading ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <CircularProgress />
          </Box>
        ) : (
          <TableLeaderBord rows={rows || []} />
        )}
      </Container>
    </Stack>
  );
};
