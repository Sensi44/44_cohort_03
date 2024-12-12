import {
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { TMessage, TMessagesProps } from './MessagesPanel.props';

export const MessagesPanel = ({ currentRoomMessages }: TMessagesProps) => {
  return (
    <Box
      sx={{
        position: 'relative',
        flex: 4,
        p: 2,
      }}>
      <Typography variant='h5' gutterBottom>
        Диалог в комнате
      </Typography>
      <Divider />
      <Box
        sx={{
          height: 'calc(100vh - 140px)',
          overflowY: 'auto',
        }}>
        {currentRoomMessages.length > 0 ? (
          currentRoomMessages.map((message: TMessage) => (
            <Box key={message.id}>
              <Typography>{`${message.user}: ${message.text}`}</Typography>
              <Typography variant='caption'>{message.time}</Typography>
            </Box>
          ))
        ) : (
          <Typography>Выберите комнату.</Typography>
        )}
      </Box>
      <Stack
        direction='row'
        sx={{
          position: 'sticky',
          bottom: 0,
          left: 0,
          width: '100%',
          gap: 2,
        }}>
        <TextField label='Сообщение' fullWidth />
        <Button type='submit' variant='contained'>
          Отправить
        </Button>
      </Stack>
    </Box>
  );
};
