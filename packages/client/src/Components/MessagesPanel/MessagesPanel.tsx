import {
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { TMessage, TMessagesProps } from './MessagesPanel.props';

export const MessagesPanel = ({
  currentRoomMessages,
  selectedRoomTitle,
  whenCreateComment,
}: TMessagesProps) => {
  const [message, setMessage] = useState('');
  return (
    <Box
      sx={{
        position: 'relative',
        flex: 4,
        p: 2,
      }}>
      <Typography variant='h5' gutterBottom>
        Диалог в комнате {selectedRoomTitle}
      </Typography>
      <Divider />
      <Box
        sx={{
          height: 'calc(100vh - 140px)',
          overflowY: 'auto',
        }}>
        {currentRoomMessages.length > 0 ? (
          currentRoomMessages.map((message: TMessage) => (
            <Box key={message.createdAt}>
              <Typography>{`${message.user_id}: ${message.text}`}</Typography>
              <Typography variant='caption'>
                {new Date(message.createdAt).toLocaleDateString('ru-RU')}
              </Typography>
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
        <TextField
          label='Сообщение'
          fullWidth
          value={message}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setMessage(event.target.value)
          }
        />
        <Button
          disabled={selectedRoomTitle.length === 0}
          type='submit'
          variant='contained'
          onClick={() => whenCreateComment(message)}>
          Отправить
        </Button>
      </Stack>
    </Box>
  );
};
