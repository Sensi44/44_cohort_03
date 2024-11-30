import {
  Box,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';

import { ErrorNotification, TableLeaderBord } from '@Components';
import { useGetLeaderBordMutation } from '@Store';
import { TLeaderBordData } from '@Types';

export const LeaderBordPage = () => {
  const [rows, setRows] = useState<TLeaderBordData[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [leaderBord, { isLoading: isLoadingLeaderBord }] =
    useGetLeaderBordMutation();

  useEffect(() => {
    leaderBord()
      .unwrap()
      .then((data) => setRows(data))
      .catch((error) => {
        setErrorMessage(`Не удалось загрузить список лидеров ${error}`);
      });
  }, []);

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
        {isLoadingLeaderBord ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <CircularProgress />
          </Box>
        ) : (
          <TableLeaderBord rows={rows} />
        )}
        <ErrorNotification
          isOpen={errorMessage.length > 0}
          errorText={errorMessage}
          whenClose={() => setErrorMessage('')}
        />
      </Container>
    </Stack>
  );
};
