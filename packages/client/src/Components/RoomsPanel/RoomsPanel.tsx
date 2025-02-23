import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Stack,
  TextField,
} from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { TRoomsPanelProps } from './RoomsPanel.props';

export const RoomsPanel = ({
  rooms,
  setSelectedRoomId,
  whenAddTopic,
}: TRoomsPanelProps) => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [name, setName] = useState('');

  const handleClickOpen = () => {
    setIsAddDialogOpen(true);
  };

  const handleClose = () => {
    setIsAddDialogOpen(false);
  };

  const handleAddTopic = () => {
    whenAddTopic(name);
    handleClose();
  };

  return (
    <Box
      sx={{
        flex: 1,
        maxWidth: 300,
        borderRight: 1,
        borderColor: 'divider',
        maxHeight: '100vh',
        overflowY: 'auto',
      }}>
      <List
        subheader={
          <Stack
            direction='row'
            justifyContent='space-between'
            alignItems='center'>
            <ListSubheader>Комнаты</ListSubheader>
            <AddCircleOutlineIcon
              sx={{ mr: 2, color: 'purple' }}
              onClick={handleClickOpen}
            />
          </Stack>
        }>
        <Dialog
          open={isAddDialogOpen}
          onClose={handleClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'>
          <DialogTitle id='alert-dialog-title'>
            Введите название новой комнаты
          </DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              <TextField
                label='Название'
                fullWidth
                value={name}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setName(event.target.value)
                }
              />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAddTopic} autoFocus>
              Добавить
            </Button>
            <Button onClick={handleClose}>Отмена</Button>
          </DialogActions>
        </Dialog>
        {rooms?.map((room) => (
          <ListItemButton
            key={room.id}
            onClick={() => setSelectedRoomId(room.id)}>
            <ListItemText primary={room.title} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};
