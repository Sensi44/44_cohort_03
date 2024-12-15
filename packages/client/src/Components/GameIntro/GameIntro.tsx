import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { GameIntroProps } from './GameIntro.props';

const BUTTON_WIDTH = 150;
const BUTTON_HEIGHT = 42;

const TIMER_WIDTH = 51;
const TIMER_HEIGHT = 112;

export const GameIntro = ({ onStart }: GameIntroProps) => {
  const [showButton, setShowButton] = useState(true);
  const [showTimer, setShowTimer] = useState(false);
  const [timer, setTimer] = useState(3);

  const handleClick = () => {
    setShowButton(false);
    setShowTimer(true);
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 1) {
          clearInterval(intervalId);
          setShowTimer(false);
          onStart();
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);
  };

  return (
    <>
      {showButton && (
        <Button
          variant='contained'
          size='large'
          sx={{
            position: 'absolute',
            top: `calc(50% - ${BUTTON_HEIGHT / 2}px)`,
            right: `calc(50% - ${BUTTON_WIDTH / 2}px)`,
          }}
          onClick={handleClick}>
          Начать игру
        </Button>
      )}
      {showTimer && (
        <Typography
          variant='h1'
          sx={({ palette }) => ({
            position: 'absolute',
            top: `calc(50% - ${TIMER_HEIGHT / 2}px)`,
            right: `calc(50% - ${TIMER_WIDTH / 2}px)`,
            color: palette.primary.main,
          })}>
          {timer}
        </Typography>
      )}
      {(showButton || showTimer) && (
        <Box
          sx={({ palette }) => ({
            position: 'absolute',
            top: 10,
            right: 10,
            borderRadius: 2,
            backgroundColor: palette.grey.A200,
            color: palette.primary.dark,
            border: `1px solid ${palette.primary.main}`,
            padding: '10px',
            maxWidth: 300,
          })}>
          <Typography color='textPrimary'>Движение</Typography>
          <Stack direction='row' alignItems='center'>
            <KeyboardArrowLeftIcon color='action' />
            <Typography>Движение влево</Typography>
          </Stack>
          <Stack direction='row' alignItems='center'>
            <KeyboardArrowRightIcon color='action' />
            <Typography>Движение вправо</Typography>
          </Stack>
          <Stack direction='row' alignItems='center'>
            <KeyboardArrowUpIcon color='action' />
            <Typography>Движение вверх</Typography>
          </Stack>
          <Stack direction='row' alignItems='center'>
            <KeyboardArrowDownIcon color='action' />
            <Typography>Движение вниз</Typography>
          </Stack>
          <Typography color='textPrimary'>Цель игры</Typography>
          <Typography whiteSpace='wrap'>
            Сбить космолетом максимальное количество астероидов
          </Typography>
        </Box>
      )}
    </>
  );
};
